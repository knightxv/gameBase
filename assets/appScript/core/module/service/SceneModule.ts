import BaseSceneModule from '../../../../baseScript/module/service/BaseSceneModule';
export default class SceneModule extends BaseSceneModule {
    PreLoadLaunch() {
        this.preloadScene('LaunchScene');
    }
    EnterLaunch() {
        this.loadScene('LaunchScene');
    }
    EnterLogin() {
        this.loadScene('LoginScene');
    }
    EnterMain() {
        this.loadScene('MainScene');
    }
    EnterFight() {
        this.loadScene('FightScene');
    }
}
