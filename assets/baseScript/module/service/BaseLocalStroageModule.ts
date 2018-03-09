import BaseServiceModule from '../BaseServiceModule';

export default class BaseLocalStroageModule extends BaseServiceModule {
    getItem(key: string) {
        cc.sys.localStorage.getItem(key);
    }
    setItem(key: string, value: string | null) {
        if (Object.prototype.toString.call(value) === '[object Object]') {
            cc.sys.localStorage.setItem(key, JSON.stringify(value)); 
        } else {
            cc.sys.localStorage.setItem(key, value);
        }
    }
    removeItem(key ?: string) {
        cc.sys.localStorage.removeItem(key);
    }
    clear() {
        cc.sys.localStorage.clear();
    }
}
