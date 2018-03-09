import BaseRouterController from '../../common/BaseRouterController';
const {ccclass, property} = cc._decorator;

@ccclass
export default class MainRouterController extends BaseRouterController {
   Onload() {
       this.setRoot('rootPage');
   }
}
