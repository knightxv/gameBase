import BaseModuleManage from '../../../baseScript/module/BaseModuleManage';
import ClientManage from '../module/business/ClientManage';
import LoginModule from '../module/business/LoginModule';
import SceneModule from '../module/service/SceneModule';
import ToolModule from './service/ToolModule';
import AudioModule from '../module/service/AudioModule';
import EnumModule from '../module/business/EnumModule';
import GameModule from './business/GameModule';
import NetModule from './service/NetModule';
import CmdModule from './business/CmdModule';
import LocalStroageModule from './service/LocalStroageModule';

enum ModuleDef {
    LoginModule = 'LoginModule',
    SceneModule = 'SceneModule',
    ToolModule = 'ToolModule',
    AudioModule = 'AudioModule',
    EnumModule = 'EnumModule',
    GameModule = 'GameModule',
    NetModule = 'NetModule',
    CmdModule = 'CmdModule',
    LocalStroageModule = 'LocalStroageModule',
};

class ModuleManage extends BaseModuleManage {
    public ModuleDef = ModuleDef;
    LoginModule: LoginModule;
    ClientManage: ClientManage;
    SceneModule: SceneModule;
    ToolModule: ToolModule;
    AudioModule: AudioModule;
    GameModule: GameModule;
    NetModule: NetModule;
    CmdModule: CmdModule;
    LocalStroageModule: LocalStroageModule;
    EnumModule: any = {};
    // 共有的模块(默认会初始化)
    public commonModules: ModuleDef[] = [
        ModuleDef.SceneModule,
        ModuleDef.ToolModule,
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
