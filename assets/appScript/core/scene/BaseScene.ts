import BaseBusinessModule from '../../../baseScript/module/BaseBusinessModule';
import moduleManage from '../module/moduleManage';
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseScene extends BaseBusinessModule {
    moduleManage = moduleManage;
    // 需要加载哪些模块(返回数组)
    protected needModules(ModuleDef?: any) {
        return [];
    }
    onLoad() {
        const needModules = this.needModules(this.moduleManage.ModuleDef);
        if (needModules && needModules.length > 0) {
            this.moduleManage.createModules(needModules);
        }
        this.OnLoad();
    }
    OnLoad() {
        this.Log('rewrite onLoad');
    }
    // 打开窗口
    openMsgBox(content: string) {
        this.moduleManage.sendMessage('ClientManage', 'openTipMsgBox', content);
    }
    // 显示loaing
    showLoading() {
        this.moduleManage.sendMessage('ClientManage', 'setLoading', true);
    }
    // 隐藏loading
    hideLoading() {
        this.moduleManage.sendMessage('ClientManage', 'setLoading', false);
    }
}
