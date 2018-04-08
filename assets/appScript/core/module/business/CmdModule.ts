/*  用户命令管理器
    * 对用户的命令和接受命令进行处理（用它来触发游戏帧的执行，可以借由它来进行加速和断线重新等操作）
    把从服务器拿到命令推给游戏管理器(做一层过滤)
    网络正常只有一条，如果由多条的话就要进行加速 [1:30!&3:10&4:80, 1:30!&3:10&4:80, ... ]
    
*/
import BaseBusinessModule from './BaseBusinessModule';
import gameContext from '../../../game/gameContext';
enum CmdEventType {
    receiveCmd = 'receiveCmd',
}
export default class CmdModule extends BaseBusinessModule {
    constructor() {
        super();
        this.serverTime = null;
    }
    private serverTime;
    // 开始服务器接受循环
    serverInit() {
        this.removeNetServer();
        this.listener();
        this.cmdCache = [];
        this.serverTime = setInterval(() => {
            this.catchUpProgess();
        }, gameContext.tickTime);
    }
    removeNetServer() {
        const NetModule = this.moduleManage.NetModule;
        NetModule.removeListener(NetModule.Event.onReceiveCmd, this.pushCmd);
        clearInterval(this.serverTime);
    }
    // 追逐进度
    catchUpProgess = () => {
        const cacheLen = this.cmdCache.length;
        // console.log('cacheLen:', cacheLen);
        // 说明已经落后大于一帧
        while(this.cmdCache.length > 0) {
            const cmd = this.cmdCache.shift();
            const controCmd = cmd.split('#')[0];
            const frameCount = cmd.split('#')[1];
            const disFrame = +frameCount - gameContext.netFrame;
            if (disFrame === 1) {
                this.emit(CmdEventType.receiveCmd,  controCmd);
                gameContext.netFrame += 1;
            } else {
                // console.log('disFrame:', disFrame);
            }
        }
    }
    private cmdCache = [];
    pushCmd = (cmd) => {
        this.cmdCache.push(cmd);
    }
    listener() {
        const NetModule = this.moduleManage.NetModule;
        NetModule.removeListener(NetModule.Event.onReceiveCmd, this.pushCmd);
        NetModule.on(NetModule.Event.onReceiveCmd, this.pushCmd);
    }
    // 当收到服务器的命令时 ['1:30!&3:10&4:80', ...]
    public EventType = CmdEventType;
    // 发送命令给服务器
    sendCmdToServer(deg: number, isQuick: boolean) {
        // 调用Net模块发送命令(如果是联机模式的话)'
        const NetModule = this.moduleManage.NetModule;
        const userCmd = this.InduceCmd(gameContext.gameId, deg, isQuick);
        NetModule.sendCmd(userCmd);
    }
    // 发送命令给客户端
    sendCmdToClient(deg: number, isQuick: boolean) {
        this.emit(CmdEventType.receiveCmd, this.InduceCmd(gameContext.gameId, deg, isQuick));
    }
    off(eventType) {
        this.removeAllListeners(eventType);
    }
    // 归纳命令
    InduceCmd(gameId, deg, isQuick): string {
        return `${gameId}:${deg}${isQuick ? '!': ''}`;
    }
    //  解析命令 1:30!&3:10&4:80,
    public resolveCmds(cmd: string): any[] {
        if (!cmd || !/\w+:\w+!?/.test(cmd)) {
            // c('收到的命令为' + cmd);
            return [];
        }
        const splitArr: string[] = cmd.split('&');
        return splitArr.map(splitCmd => {
            return {
                gameId: /\w+/.exec(splitCmd)[0],
                deg: /\w+:(\w+)/.exec(splitCmd)[1],
                isQuick: /!/.test(splitCmd),
            };
        });
    }

}
