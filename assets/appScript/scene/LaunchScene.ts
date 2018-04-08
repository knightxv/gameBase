import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;

@ccclass
export default class LaunchScene extends BaseScene {
    private updateProgressController = null;
    OnLoad() {
        const updateProgress = this.node.getChildByName('progress');
        if (!updateProgress) {
            this.LogError('updateProgress not exist');
            return;
        }
        const updateProgressController = updateProgress.getComponent('BasePrefabController');
        if (!updateProgressController) {
            this.LogError('updateProgressController not exist');
            return;
        }
        this.updateProgressController = updateProgressController;
    }
    private updateProgress = 0;
    update() {
        if (this.updateProgress < 100) {
            this.setProgress(this.updateProgress += 2);
        }
    }
    setProgress(currentProgress: number) {
        this.updateProgressController.progress = currentProgress;
        if (currentProgress >= 100) {
            this.moduleManage.SceneModule.EnterLogin();
        }
    }
    onUpdateFail() {
        this.openMsgBox('更新失败');
    }
}
