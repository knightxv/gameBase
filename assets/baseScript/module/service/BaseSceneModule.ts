import BaseServiceModule from '../BaseServiceModule';
export default class BaseSceneModule extends BaseServiceModule {
    preloadScene(sceneName, cb?) {
        cc.director.preloadScene(sceneName, cb);
    }
    loadScene(sceneName) {
        cc.director.loadScene(sceneName);
    }
}
