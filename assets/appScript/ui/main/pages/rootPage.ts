const {ccclass, property} = cc._decorator;

@ccclass
export default class Page extends cc.Component {
    onLoad() {
        const endlessGameNode = this.node.getChildByName('endlessGame');
        endlessGameNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.dispatchEvent(new cc.Event.EventCustom('endlessGame', true));
        })
        const timeLimitSingleNode = this.node.getChildByName('timeLimitSingle');
        timeLimitSingleNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.dispatchEvent(new cc.Event.EventCustom('timeLimitSingle', true));
        })
        const timeLimitTeamNode = this.node.getChildByName('timeLimitTeam');
        timeLimitTeamNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.dispatchEvent(new cc.Event.EventCustom('timeLimitTeam', true));
        })
    }
}
