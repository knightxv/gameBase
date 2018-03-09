const path  = require('path');
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseRouterController extends cc.Component {
    @property({
        tooltip: '相对resouces目录的地址',
    })
    resourceRelativePath: string = '';

    onLoad() {
        this.Onload();
    }
    Onload() {
        cc.log('rewrite Onload to setRoot');
    }

    private rootPage: string = '';
    private prefabCache: { [propName: string]: cc.Prefab } = {};
    loadPrefab(prefabName: string): Promise<cc.Prefab | null> {
        const routerPath = this.resourceRelativePath;
        return new Promise(resolve => {
            if (this.prefabCache[prefabName]) {
                resolve(this.prefabCache[prefabName]);
                return;
            }
            const prefabPath = path.join(routerPath, prefabName);
            cc.loader.loadRes(prefabPath, (err, prefab) => {
                if (err) {
                    cc.error('加载rootPage页面prefab资源失败');
                    resolve(null);
                    return;
                }
                this.prefabCache[prefabName] = prefab;
                resolve(prefab);
            })
        });
    }
    setRoot(rootPageName?: string) {
        if (!rootPageName) {
            return;
        }
        this.rootPage = rootPageName;
        this.push(rootPageName);
    }
    // 放置重复push
    private isLoadingPrefab: boolean = false;
    push(pageName: string) {
        if (this.isLoadingPrefab) {
            return;
        }
        this.isLoadingPrefab = true;
        this.loadPrefab(pageName).then((prefabRes: cc.Prefab | null) => {
            this.isLoadingPrefab = false;
            if (!prefabRes) {
                cc.warn('找不到路由所指定的prefab');
                return;
            }
            const PrefabNode = cc.instantiate(prefabRes);
            this.node.addChild(PrefabNode);
        });
    }
    goBack() {
        const childrenCount = this.node.childrenCount;
        if (childrenCount <= 1) {
            return;
        }
        const lastChild: cc.Node = this.node.children[childrenCount - 1];
        lastChild.destroy();
    }
    backRoot() {
        this.node.removeAllChildren();
        this.setRoot();
    }
}
