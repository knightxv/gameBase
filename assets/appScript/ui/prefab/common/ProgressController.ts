import BasePrefabController from '../BasePrefabController';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ProgressController extends BasePrefabController {
    public progress = 0;

    InitState() {
        return {
            progress: 0,
        };
    }
    onStateProgressChange(newProgress: number) {
        const progressBar = this.node.getComponent(cc.ProgressBar);
        progressBar.progress = parseFloat((newProgress / 100).toFixed(2));
    }
}
