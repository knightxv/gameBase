
const {ccclass, property} = cc._decorator;

@ccclass
export default class BasePrefabController extends cc.Component {
    cacheState: any = {};
    onLoad() {
        const state = this.InitState();
        if (!state) {
            return;
        }
        this.cacheState = state;
        for(let key in state) {
            Object.defineProperty(this, key, {
                set(val) {
                    if (key && key.length > 0) {
                        const stateFunName = key[0].toLocaleUpperCase() + key.substr(1)
                        this[`onState${stateFunName}Change`] && this[`onState${stateFunName}Change`](val);
                    }
                    this.cacheState[key] = val;
                },
                get() {
                    return this.cacheState[key];
                }
            });
            this[key] = this.cacheState[key];
        }
    }
    InitState() {
        return {};
    }
    emit(...arg) {
        this.node.emit(...arg);
    }
    on(...arg) {
        this.node.on(...arg);
    }
}
