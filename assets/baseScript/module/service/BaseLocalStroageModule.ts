import BaseServiceModule from '../BaseServiceModule';

export default class BaseLocalStroageModule extends BaseServiceModule {
    getItem(key: string) {
        const infoString = cc.sys.localStorage.getItem(key);
        try {
            const infoData = JSON.parse(infoString);
            return infoData;
        } catch (err) {
            return infoString;
        }
    }
    setItem(key: string, value: any) {
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
