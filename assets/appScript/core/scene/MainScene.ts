import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;


@ccclass
export default class MainScene extends BaseScene {
    OnLoad() {
        this.Log('进入主大厅');
        this.node.on('pveGameStart', (ev) => {
            this.pveGameStart();
            ev.stopPropagation();
        });
        this.node.on('pvpGameStart', (ev) => {
            this.pvpGameStart();
            ev.stopPropagation();
        });
    }
    pveGameStart = () => {
        this.Log('开始单人游戏');
    }
    pvpGameStart() {
        this.Log('开始多人游戏');
    }
}
