import BasePrefabController from '../BasePrefabController';
const {ccclass, property} = cc._decorator;

enum MsgBoxEvent {
    onConfim = 'onConfim',
};

@ccclass
export default class MsgBoxController extends BasePrefabController {
    @property(cc.Label)
    contentLabel = null;
    
    public Event = MsgBoxEvent;
    private visible: boolean = false;
    private content: string = '';
    // 当按下确认时
    onConfim() {
        this.visible = false;
        this.emit(this.Event.onConfim);
    }
    InitState() {
        return {
            content: this.content,
            visible: this.visible,
        };
    }
    onStateContentChange(newContent: string) {
        if (!newContent) {
            this.contentLabel.string = '';
            return;
        }
        if (this.contentLabel) {
            this.contentLabel.string = newContent;
        }
    }
    onStateVisibleChange(newVal) {
        this.node.active = newVal;
    }

}
