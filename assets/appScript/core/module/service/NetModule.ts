import BaseNetModule from '../../../../baseScript/module/service/BaseNetModule';
import pomelo from '../../../core/lib/pomelo';


enum eventType {
    onReceiveCmd = 'onReceiveCmd',
    onGameStart = 'onGameStart',
};

export default class NetModule extends BaseNetModule {
    pomelo: any;
    isConnect: boolean = false;
    Event = eventType;
    constructor() {
        super();
        this.pomelo = pomelo;
        this.connect();
    }
    connect(cb?) {
        if (!this.pomelo) {
            cb('pomelo不存在')
            return;
        }
        const pomelo = this.pomelo;
        const host = window.location.hostname;
        const port = "3010";
        pomelo.init({
            host: host,
            port: port,
            log: true
          }, (socket) => {
            this.listener();
            this.isConnect = true;
            cb && cb(null);
          });
    }
    // 监听事件
    listener() {
        pomelo.on('onGameStart', (msg) => {
            console.log('onGameStart', msg)
            this.emit(eventType.onGameStart, msg);
        })
        // pomelo.on('onInterRoom', (msg) => {
        //     console.log(msg);
        // })
        pomelo.on('onReceiveCmd', (msg) => {
            this.emit(eventType.onReceiveCmd, msg);
        })
    }
    sendCmd(cmd) {
        const sendRoute = 'snake.gameHandler.gameOption';
        this.pomelo.notify(sendRoute, {
            cmd
        });
    }
    disconnect() {
        this.pomelo.disconnect();
    }
    quitGame() {
        this.request("snake.gameHandler.quitGame", {}, function(errMsg, roomData) {
        });
    }
    matchRoom(cb?: Function) {
        this.request("snake.roomHandler.matchSingerRoom", {}, function(errMsg, roomData) {
            if (errMsg) {
                cb(errMsg);
                return;
            }
            cb && cb(null, roomData);
        });
    }
    // 登陆
    login(param: any, cb?: Function) {
        const { uid, username } = param;
        this.request("connector.entryHandler.entry", {
            uid, username
        }, function(errMsg, userData) {
            if (errMsg) {
                cb(errMsg);
                return;
            }
            cb(null, userData);
        });
    }
    // 复活
    reliveSnake(gameId) {
        this.request("snake.gameHandler.reliveSnake", { gameId }, function(errMsg, roomData) {
            // if (errMsg) {
            //     cb(errMsg);
            //     return;
            // }
            // cb && cb(null, roomData);
        });
    }
    request(route, params, cb) {
        try {
            this.pomelo.request(route, params, function(res) {
                console.group(`socket request: ${route}`);
                console.log('params:', params);
                console.log('response:', res);
                console.groupEnd();
                const { code, msg, data } = res;
                if (code != 200) {
                    cb(msg);
                    return;
                }
                cb(null, data)
            });
        } catch (error) {
            cb('无法连接网络');
            return;
        }
    }
}
