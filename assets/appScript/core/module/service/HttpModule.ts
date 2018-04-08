import BaseHttpModule from '../../../../baseScript/module/service/BaseHttpModule';

class WebHttp extends BaseHttpModule {
    async getHttpPrefix() {
        return ''; // http://192.168.1.100:3000
    }
    async resolveRes(res) {
        console.log(res);
        return res;
    }
//  * setGetOption : 设置get option
//  * setPostOption : 设置post option

}

export default class HttpModule {
    private _webHttp = null;
    get webHttp() {
        return this._webHttp || (this._webHttp = new WebHttp());
    }
}
