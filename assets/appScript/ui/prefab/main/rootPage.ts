const {ccclass, property} = cc._decorator;

@ccclass
export default class Page extends cc.Component {
    onLoad() {
        const pveNode = this.node.getChildByName('pveGame');
        pveNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.dispatchEvent(new cc.Event.EventCustom('pveGameStart', true));
        })
        const pvpNode = this.node.getChildByName('pvpGame');
        pvpNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.dispatchEvent(new cc.Event.EventCustom('pvpGameStart', true));
        })
    }
}
