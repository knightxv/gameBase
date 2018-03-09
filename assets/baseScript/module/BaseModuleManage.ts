import BaseServiceModule from './BaseServiceModule';

export default class BaseModuleManage extends BaseServiceModule {
    private createdModuleMap: { [moduleName: string]: any } = {};
    public getModule(moduleName: string): any {
        const cacheModule = this.createdModuleMap[moduleName];
        if (cacheModule) {
            return cacheModule;
        }
        const Modulerequire = this.require(moduleName);
        const moduleInstance = new Modulerequire();
        return this.createdModuleMap[moduleName] = moduleInstance;
    }
    // 创建一个module并把他放到moduleManage的属性上，可以直接获取
    createModule(moduleName: string) {
        const self = this;
        Object.defineProperty(self, moduleName, {
            get() {
                return self.getModule(moduleName);
            }
        });
    }
    createModules(moduleArr: string []) {
        if (!moduleArr) {
            this.logError('createModules 接受的参数未空');
            return;
        }
        moduleArr.forEach(moduleName => {
            this.createModule(moduleName);
        });
    }
    // 添加模块(动态添加)
    addModule(moduleName, moduleInstance) {
        this.createdModuleMap[moduleName] = moduleInstance;
        this.createModule(moduleName);
        if (this.messageCache[moduleName]) {
            this.messageCache[moduleName].forEach(cb => {
                cb.call(moduleInstance);
            })
            delete this.messageCache [moduleName];
        }
    }
    // 消息中间站
    private messageCache: {  } = {

    };
    // 发送消息(用于在模块还没加载时发送信息)
    sendMessage(moduleTargetName: string, funCal: string, ...arg) {
        const moduleTarge = this.createdModuleMap[moduleTargetName];
        if (moduleTarge) {
            (moduleTarge[funCal] instanceof Function) && moduleTarge[funCal].apply(moduleTarge, arg);
            return;
        }
        if (!this.messageCache[moduleTargetName]) {
            this.messageCache[moduleTargetName] = [];   
        }
        this.messageCache[moduleTargetName].push(function() {
            (this[funCal] instanceof Function) && this[funCal].apply(this, arg);
        });
    }
}
