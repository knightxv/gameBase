import BaseLocalStroageModule from '../../../../baseScript/module/service/BaseLocalStroageModule';
const {ccclass, property} = cc._decorator;

@ccclass
export default class LocalStroageModule extends BaseLocalStroageModule{
    setUserInfo(data) {
        this.setItem('userInfo', data);
    }
    getUserInfo(): any {
        return this.getItem('userInfo');
    }
}
