import BaseModuleManage from '../../../baseScript/module/BaseModuleManage';
import ClientManage from '../module/business/ClientManage';
import LoginModule from '../module/business/LoginModule';
import SceneModule from '../module/service/SceneModule';

enum ModuleDef {
    LoginModule = 'LoginModule',
    SceneModule = 'SceneModule',
};

class ModuleManage extends BaseModuleManage {
    public ModuleDef = ModuleDef;
    LoginModule: LoginModule;
    ClientManage: ClientManage;
    SceneModule: SceneModule;
    // 共有的模块(默认会初始化)
    public commonModules: ModuleDef[] = [
        ModuleDef.SceneModule,
    ];
    // 初始化模块
    constructor() {
        super();
        this.createModules(this.commonModules);
    }
}

export default new ModuleManage();

// export default (() => {
//     let manageInstance: ModuleManage | null = null;
//     return () : ModuleManage => {
//         if (!manageInstance) {
//             manageInstance = new ModuleManage();
//         }
//         return manageInstance;
//     };
// })();
