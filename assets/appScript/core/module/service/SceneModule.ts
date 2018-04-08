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
    // 进入无尽模式
    EnterEndLessGame() {
        this.loadScene('EndLessGame');
    }
    // 进入单人限时
    EnterTimeLimitSingleGame() {
        this.loadScene('TimeLimitSingleGame');
    }
    // 进入团队限时
    EnterTimeLimitTeamGame() {
        this.loadScene('TimeLimitTeamGame');
    }


    // 旋转逻辑(还未验证)
    IsWindows() {
        return false;
    }
    private DesignResolution = {
        height: 480,
            width: 960,
    };
    // 原生平台的旋转
    nativeOrigin(orientation) {
        // app.NativeManager().CallToNative("changedActivityOrientation", [{
        //     "Name": "orientation",
        //     "Value": orientation
        // }]);
    }
    private SCREEN_ORIENTATION_LANDSCAPE = "1";
    //竖屏
    private SCREEN_ORIENTATION_PORTRAIT = "2";
    //切换横竖屏
    ChangeNativeOrientation(orientation: string) {
        let defaultFrameSize: cc.Size = this.GetDefaultFrameSize();
        let isWaitNativeChange = false;

        //如果切换到横屏
        if (orientation == this.SCREEN_ORIENTATION_LANDSCAPE) {
            if (cc.sys.isNative) {
                //cc.view.setViewPortInPoints(0,0, defaultFrameSize["height"], defaultFrameSize["width"]);
                //ios和android需要调用原生层切换
                if (!this.IsWindows()) {
                    //暂停游戏逻辑,IOS不暂停的话切换场景onUpdate会崩溃
                    cc.director.pause();
                    this.nativeOrigin(orientation);
                    isWaitNativeChange = true;
                }
                //windows直接调用设置窗口大小
                cc.view.setFrameSize(defaultFrameSize.height, defaultFrameSize.width);
                //设计分辨率
                cc.view.setDesignResolutionSize(this.DesignResolution.height, this.DesignResolution.width, cc.ResolutionPolicy.FIXED_WIDTH);
            } else {
                //网页端渲染要设置视口大小
                if (cc.sys.browserType) {
                    //如果是移动端的网页渲染,不需要设置窗口大小
                    if (cc.sys.isMobile) {
                        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                    }
                    else {
                        //cc.view.setFrameSize(defaultFrameSize["height"], defaultFrameSize["width"]);
                        this.updateResolution(cc.macro.ORIENTATION_LANDSCAPE);
                    }
                }
            }
        } else {
            if (cc.sys.isNative) {
                //cc.view.setViewPortInPoints(0,0, defaultFrameSize["width"], defaultFrameSize["height"]);
                //ios和android需要调用原生层切换
                if (!this.IsWindows()) {
                    //暂停游戏逻辑,IOS不暂停的话切换场景onUpdate会崩溃
                    cc.director.pause();
                    this.nativeOrigin(orientation);
                    isWaitNativeChange = true;
                }
                cc.view.setFrameSize(defaultFrameSize.width, defaultFrameSize.height);
                //设计分辨率
                cc.view.setDesignResolutionSize(this.DesignResolution.width, this.DesignResolution.height, cc.ResolutionPolicy.FIXED_WIDTH);
            } else {
                //网页端渲染要设置视口大小
                if (cc.sys.browserType) {
                    //如果是移动端的网页渲染,不需要设置窗口大小
                    if (cc.sys.isMobile) {
                        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                    }
                    else {
                        //cc.view.setFrameSize(defaultFrameSize["width"], defaultFrameSize["height"]);
                        this.updateResolution(cc.macro.ORIENTATION_PORTRAIT);
                    }
                }
            }
        }
        return isWaitNativeChange
    }
    updateResolution(orientation: number) {
        var size = this.isFullScreen() ? document.documentElement.getBoundingClientRect() : this.getEmulatedScreenSize(orientation);
        cc.log("updateResolution(%s):", orientation, size);
        var gameDiv = document.getElementById('GameDiv');
        gameDiv.style.width = size.width + 'px';
        gameDiv.style.height = size.height + 'px';
        cc.view.setFrameSize(size.width, size.height);
    }
    GetDefaultFrameSize() {
        return cc.view.getFrameSize();
    }
    isFullScreen() {
        var toolbar = document.getElementsByClassName('toolbar')[0];
        return getComputedStyle(toolbar).display === 'none';
    }
    getEmulatedScreenSize(orientation: number) {
        let defaultFrameSize = this.GetDefaultFrameSize();
        if (orientation == cc.macro.ORIENTATION_PORTRAIT) {
            return {
                width: defaultFrameSize.width,
                height: defaultFrameSize.height
            };
        } else {
            return {
                width: defaultFrameSize.height,
                height: defaultFrameSize.width
            };
        }
    }
}
