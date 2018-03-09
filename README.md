
这套框架只是一套游戏的ui框架，跟游戏主体逻辑时分开的。主要方便快速开发游戏ui界面的一套框架。

# 框架说明

一.场景分类。
1.StartScene场景（初始化客户端管理器，把全局弹窗，loading组件和一些关于客户端操作的方法都放在clientManage上，初始化完加入moduleManage(总管理器)）
2.LaunchScene检查更新场景（拿到updateManage检查更新，查看新版本，然后热更新到最新版本，功能暂未开发）
3.LoginScene登陆场景(用户登陆场景，登陆场景，连接后带上session之类的验证信息，储存本地(方便下次登陆)然后链接大厅服务器（HallSocket），进入大厅场景)
4.MainScene主场景（大厅），监听HallSocket的消息，对消息进行处理。
5.FightScene战斗场景（游戏的场景，这一块未实现，具体游戏有具体的战斗场景）

二：模块Module分类（模块分为服务模块和业务模块，业务模块引用服务模块。服务模块可以相互引用(但不可以依赖业务模块)，用moduleManage.SendMessage进行通讯，可以保持解耦性，对应模块未加载也可以通信）
~服务模块~（所有模块只再用到时才会被实例化，并且实例化后会缓存到ModuleManage的缓存字典中，服务模块的单例模式时通过moduleManage来管理的）
1.ModuleManage（管理总管理器）,所有的模块的添加创建和移除都交给moduleManage来处理，是一个全局对象。
2.LocalStroageModule（本地储存管理，对用户信息进行存储），有必要会配合本地文件模块(FileModule)一起存储管理用户信息，和一些配置信息(SettingConfig,AppConfig,userData之类的信息)。
3.SceneModule（场景管理器），主要对dd.Director（场景导演）做一层代理，管理场景切换和一些关于场景的控制。（横竖屏之类的）
4.ConfigModulw(配置管理器，未开发)，主要配置一些信息。读取配置文件(.txt或.json或.xml)进行转化。
5.EnumModule(枚举管理器，未开发)，管理全局的枚举。
6.ToolModule(工具管理)，提供一些工具类

~业务模块~
1.ClientModule（客户端模块），对客户端进行管理。管理一些全局的信息。（通过开始界面加载后动态添加到moduleManage上，与其通信必须用SendMessage方法，保持其未加载时也不会报错，因为有时候入口并不一定时StartScene，再调试的时候）
2.LoginModule（登陆模块，对用户登陆和登陆结果进行管理，）

三。其他
目录文件有baseScript和appScript,baseScript主要放一些通用的模块,appScript主要放一些游戏用到的逻辑文件。resource是项目的资源文件。

所有的prefab都是有BasePrefabController来控制。其提供了类似React的组件控制形式，子类可以实现InitState,返回数据。然后如果其中的数据发生了改变会触发对应的函数。比如：（下面是消息组件的部分实现）

class MsgBoxController extends BasePrefabController {
    @property(cc.Label)
    contentLabel = null;
    
    public Event = MsgBoxEvent;
    private visible: boolean = false;
    private content: string = '';
    // 当按下确认时
    onConfim() {
        this.visible = false;
        this.emit(this.Event.onConfim);
    }
    InitState() {
        return {
            content: '',
            visible: false,
        };
    }
    onStateContentChange(newContent: string) {
        if (!newContent) {
            this.contentLabel.string = '';
            return;
        }
        if (this.contentLabel) {
            this.contentLabel.string = newContent;
        }
    }
    onStateVisibleChange(newVal) {
        this.node.active = newVal;
    }
}
