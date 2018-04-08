import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;


@ccclass
export default class MainScene extends BaseScene {
    protected needModules(ModuleDef?: any) {
        const { NetModule } = ModuleDef;
        return [NetModule];
    }
    OnLoad() {
        this.Log('进入主大厅');
        // this.moduleManage.NetModule.connect();
        this.node.on('endlessGame', (ev) => {
            this.endlessGame();
            ev.stopPropagation();
        });
        this.node.on('timeLimitSingle', (ev) => {
            this.timeLimitSingle();
            ev.stopPropagation();
        });
        this.node.on('timeLimitTeam', (ev) => {
            this.timeLimitTeam();
            ev.stopPropagation();
        });
    }
    endlessGame = () => {
        // 进入无尽模式
        this.Log('进入无尽模式');
        // this.moduleManage.SceneModule.EnterEndLessGame();
    }
    timeLimitSingle() {
        // 进行匹配
        // this.moduleManage.NetModule.matchRoom((err, roomData) => {
        //     if (err) {
        //         this.openMsgBox('匹配失败');
        //         return;
        //     }
        //     this.moduleManage.SceneModule.EnterTimeLimitSingleGame();
        // });
    }
    timeLimitTeam() {
        // this.moduleManage.SceneModule.EnterTimeLimitTeamGame();
        this.openMsgBox('暂未开放');
    }
}
