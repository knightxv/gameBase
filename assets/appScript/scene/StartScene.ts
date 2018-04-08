import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScene extends BaseScene {
    // needModules(ModuleDef): string[] {
    //     const { LoginModule } = ModuleDef;
    //     return [LoginModule];
    // }
    OnLoad() {
        // 提前加载更新场景
        this.onSignSuccess();
        // this.onSignFail();
    }
    // 当验证成功时
    onSignSuccess() {
        const logo = this.node.getChildByName('logo');
        this.moduleManage.SceneModule.PreLoadLaunch();
        
        const hiddenAction = new cc.Sequence(cc.fadeIn(0.5), cc.delayTime(1), cc.fadeOut(0.5), cc.callFunc(this.goLaunchScene, this))
        logo.runAction(hiddenAction);
    }
    // 窗口提示
    onSignFail() {
        this.openMsgBox('验证失败');
    }
    goLaunchScene() {
        this.moduleManage.SceneModule.EnterLaunch();
    }
}
