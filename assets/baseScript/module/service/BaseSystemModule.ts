import BaseServiceModule from '../BaseServiceModule';
// enum Platform{
//     OS_WINDOWS,     /**< Windows */
//     OS_LINUX,       /**< Linux */
//     OS_MAC,         /**< Mac OS X*/
//     OS_ANDROID,     /**< Android */
//     OS_IPHONE,      /**< iPhone */
//     OS_IPAD,        /**< iPad */
//     OS_BLACKBERRY,  /**< BlackBerry */
//     OS_NACL,        /**< Native Client in Chrome */
//     OS_EMSCRIPTEN,  /**< Emscripten */
//     OS_TIZEN,       /**< Tizen */
//     OS_WINRT,       /**< Windows Runtime Applications */
//     OS_WP8          /**< Windows Phone 8 Applications */
// };
export default class BaseSystemModule extends BaseServiceModule {
    //是否是安卓微信环境
	IsAndroidWeChatBrowser() {
		if (cc.sys.os != "Android") {
			return false
		}
		var browserType = cc.sys.browserType;

		//mqqbrowser 安卓中微信浏览器标示
		if (browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ) {
			return true
		}
		//怕异常多处理wechat的判断 一般wechat是ios中微信标示
		else if (browserType == cc.sys.BROWSER_TYPE_WECHAT) {
			return true
		}

		return false
	}

	//是否是微信浏览器环境
	IsWeChatBrowser() {
		var browserType = cc.sys.browserType;
		//mqqbrowser 安卓中微信浏览器标示
		if (browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ) {
			return true
		}
		//怕异常多处理wechat的判断 一般wechat是ios中微信标示
		else if (browserType == cc.sys.BROWSER_TYPE_WECHAT) {
			return true
		}
		return false
	}

	/**
	 * 是否是ios平台
	 * @returns {Boolean}
	 */
	IsIOS() {
		var browserType = cc.sys.browserType;
		if (browserType) {
			return false
		}
		return cc.sys.os == cc.sys.OS_IOS
	}

	
	IsIOSPad() {
		if (cc.sys.platform == 5) {
			return true
		}
		return false
	}
	//是否是安卓
	IsAndroid() {
		var browserType = cc.sys.browserType;
		if (browserType) {
			return false
		}
		return cc.sys.os == cc.sys.OS_ANDROID
	}
	//是否是win
	IsWindows() {
		var browserType = cc.sys.browserType;
		if (browserType) {
			return false
		}
		return cc.sys.os == cc.sys.OS_WINDOWS;
	}
}
