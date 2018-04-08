import BaseClass from '../../baseClass/BaseClass';
const {ccclass, property} = cc._decorator;
/**
 * getHttpPrefix : 拿到请求的前缀,'http://192.168.1.100:3000'
 * setGetOption : 设置get option
 * setPostOption : 设置post option
 * getQueryString ： 拿到get的后缀，类似：a=33b=4d
 * resolveRes ： 处理res
 */
@ccclass
export default abstract class BaseHttpModule extends BaseClass {
    constructor() {
        super();
        this.init();
    }
    getDefaultOption: any;
    postDefaultOption: any;
    private init() {
        this.getDefaultOption = {
            method: 'GET',
        };
        this.postDefaultOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }
    private checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
    
        const error = new Error(response.statusText);
        const throwErr = {
            ...error,
            response,
        };
        throw throwErr;
    }
    protected async request(url: string, options?: any) {
        const response = await fetch(url, options);
        const data = await response.json();
        const ret = {
            data,
            headers: {},
        };
        if (response.headers.get('x-total-count')) {
            ret.headers['x-total-count'] = response.headers.get('x-total-count');
        }
        return ret;
    }
    protected async getHttpPrefix() {
        return '';
    }
    protected async setGetOption() {
        return null;
    }
    protected async setPostOption(body: any) {
        return {
            body: JSON.stringify(body)
        };
    }
    /**
     * 通过参数的得到queryString
     * @param params 
     */
    protected async getQueryString(params: any) {
        let query = '';
        for (var attr in params) {
            if (params.hasOwnProperty(attr)) {
                const element = params[attr];
                query += `${attr}=${element}`;
            }
        }
        return query;
    }
    protected async resolveRes(resolveRes) {
        return resolveRes;
    }
    protected async get(url, params) {
        const httpPrefix = await this.getHttpPrefix();
        const userOption = await this.setGetOption();
        const getOption = {
            ...this.getDefaultOption,
            ...userOption,
        };
        const queryString = await this.getQueryString(params);
        const fetchUrl = `${httpPrefix}${url}?${queryString}`
        const res = await this.request(fetchUrl, getOption);
        const resolveRes = await this.resolveRes(res);
        return resolveRes;
    }
    protected async post(url, body) {
        const httpPrefix = await this.getHttpPrefix();
        const userOption = await this.setPostOption(body);
        const postOption = {
            ...this.postDefaultOption,
            ...userOption,
        };
        const fetchUrl = `${httpPrefix}${url}`
        const res = await this.request(fetchUrl, postOption);
        const resolveRes = await this.resolveRes(res);
        return resolveRes;
    }
}
