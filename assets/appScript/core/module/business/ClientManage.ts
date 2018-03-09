import moduleManage from '../moduleManage';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ClientManage extends cc.Component {
    onLoad() {
        cc.game.addPersistRootNode(this.node);
        moduleManage.addModule('ClientManage', this);
    }
    messageBoxController = null;
    private showMsgBox(content) {
        this.messageBoxController.content = content;
        this.messageBoxController.visible = true;
    }
    openTipMsgBox(content) {
        // 加载messageBox，然后改变content
        if (this.messageBoxController) {
            this.showMsgBox(content);
            return;
        }
        const messageBoxPath = 'ui/prefab/common/messageBox';
        cc.loader.loadRes(messageBoxPath, (err, prefab) => {
            if (err) {
                cc.error(err);
                return;
            }
            const messageBoxNode: cc.Node = cc.instantiate(prefab);
            this.node.addChild(messageBoxNode);
            this.messageBoxController = messageBoxNode.getComponent('BasePrefabController');
            this.showMsgBox(content);
            // this.messageBoxController.on(this.messageBoxController.Event.onConfim, () => {
            //     console.log('确认按钮被按了');
            // })
        });
    }
    // 轻提示
    toast() {

    }
    setLoading(loadingState) {
        const loadingNode: cc.Node = this.node.getChildByName('loading');
        if (loadingNode) {
            loadingNode.active = loadingState;
        }
    }

    onDestroy() {
        cc.game.removePersistRootNode(this.node);
    }
}
