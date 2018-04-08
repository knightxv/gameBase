import EventEmitter from './EventEmitter';

class BaseClass extends EventEmitter {
    private mName: string = '';// 模块名字
    protected isImportInNeed = true; // 是否按需加载模块

    public require(moduleName) {
        return require(moduleName).default;
    };
    public import(moduleName) {
        return import(moduleName);
    }
    get Name() {
        return this.mName || this.constructor.name;
    }
    set Name(moduleName: string) {
        this.mName = moduleName;
    }
    private _formatDateNow(format: string | null):string {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }
    Log(...arg) {
        const className = this.Name;
        const dateTimeLabel: string = this._formatDateNow('yyyy-MM-dd hh:mm:ss');
        let infoPrefix = `%c${className}[${dateTimeLabel}]:`;
        const logStyle = 'color: #35bdff;';
        const addArg = [infoPrefix, logStyle,  ...arg ];
        cc.log.apply(this, addArg);
    }
    LogError(...arg) {
        cc.error.apply(this, arg);
    }
}

export default BaseClass;
