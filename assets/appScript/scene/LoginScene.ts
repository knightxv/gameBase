import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginScene extends BaseScene {
    needModules(ModuleDef): string[] {
        const { AudioModule, NetModule, LocalStroageModule } = ModuleDef;
        return [AudioModule, NetModule, LocalStroageModule];
    }
    OnLoad() {
        // this.moduleManage.AudioModule.playBg();
        const self = this;
        this.showLoading();
        
        const userInfo = this.moduleManage.LocalStroageModule.getUserInfo();
        const uid = userInfo ? userInfo.uid : '';
        const username = 'knightxv';
        this.scheduleOnce(this.goMainWithNoNet, 3);
        this.moduleManage.NetModule.login({
            uid,
            username,
        }, (errMsg, userData = {}) => {
            self.hideLoading();
            if (errMsg) {
                return;
            }
            this.unschedule(this.goMainWithNoNet);
            this.moduleManage.LocalStroageModule.setUserInfo(userData);
            this.moduleManage.SceneModule.EnterMain();
        });
        
    }
    goMainWithNoNet = () => {
        this.hideLoading();
        this.openMsgBox('登陆错误,正在进入单机模式');
        this.moduleManage.NetModule.disconnect();
        this.moduleManage.SceneModule.EnterMain();
    }
}