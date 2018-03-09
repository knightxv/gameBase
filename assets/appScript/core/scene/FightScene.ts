import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;

@ccclass
export default class FightScene extends BaseScene {
    OnLoad() {
        this.Log('开始战斗场景');
    }
}
