const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMain extends cc.Component {
    onLoad() {
        
    }
    // 无尽模式
    onEndLessBtnClick() {
        this.node.dispatchEvent(new cc.Event.EventCustom('endlessGame', true));
    }
    // 限时模式
    onTimeLimitClick() {
        this.node.dispatchEvent(new cc.Event.EventCustom('timeLimitSingle', true));
    }
    // 组队模式
    onTeamClick() {
        this.node.dispatchEvent(new cc.Event.EventCustom('timeLimitTeam', true));
    }
}

