import BaseServiceModule from '../BaseServiceModule';

export default abstract class BaseToolModule extends BaseServiceModule {
    public formatDate(time: number, format: string) {
        const date = new Date(time);
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds(),
          };
          if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (`${date.getFullYear()  }`).substr(4 - RegExp.$1.length)); }
          for (let k in o) {
            if (new RegExp(`(${  k  })`).test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? o[k]
                : (`00${  o[k]}`).substr((`${  o[k]}`).length));
            }
          }
          return format;
    }
    public formatDateNow(format: string): string {
        if (!format) {
            return '';
        }
        const nowStramp = new Date().getTime();
        return this.formatDate(nowStramp, format);
    }

	//是否是纯数字
    CheckIsInteger(content) {
        let r, re;
        re = /\d*/i; //\d表示数字,*表示匹配多个数字
        r = content.match(re);
        return (r == content) ? true : false;
    }
	//----------------列表方法---------------

	//删除列表重复项
	DeleteListRepeat(targetList: any[]) {
		var returnList = [];
		var findDict: any = {};
		var prefix = "";

		var count = targetList.length;
		for (var index = 0; index < count; index++) {
			var value = targetList[index];

			//因为findDict[222] findDict["222"]等价，所以加入string判断
			if (typeof value == "string") {
				prefix = "_str";
			}
			else {
				prefix = "";
			}
			prefix += value;
			if (!findDict[prefix]) {
				returnList.push(value);
				findDict[prefix] = 1;
			}
		}
		return returnList
	}

	//第1个列表与第2个列表的交集
	TowListIntersect(aList: any[], bList: any[]) {
		var returnList = [];
		var aCount = aList.length;

		for (var index = 0; index < aCount; index++) {
			var value = aList[index];
			if (bList["InArray"](value)) {
				returnList.push(value);
			}
		}
		return returnList;
	}

	//第1个列表与第2个列表的差集
	TowListSubtraction(aList: any[], bList: any[]) {
		var returnList = [];
		var aCount = aList.length;

		for (var index = 0; index < aCount; index++) {

			var value = aList[index];
			if (!bList["InArray"](value)) {
				returnList.push(value);
			}
		}
		return returnList;
	}
    //第1个列表与第2个列表的差集(个对个的删除)
	TowListSubtracions(aList:any[],bList:any[]){
        let newCardIDList = this.DeepCopy(aList);
        for (let index = 0; index < bList.length; index++) {
            let cardID = bList[index];
            let num = newCardIDList.indexOf(cardID);
            if (num != -1) {
                newCardIDList.splice(num, 1)
            }
        }
        return newCardIDList;
	}
	//2个列表的并集
	TowListUnion(aList: any[], bList: any[]) {
		var returnList = aList.concat(bList);
		return this.DeleteListRepeat(returnList);
	}
	//随机筛选列表指定个数出来
	ListSample(targetList: any[], choiceCount: number) {
		var returnList = [];

		//需要拷贝一份避免原列表被修改
		var tempList = targetList.slice();
		var length = tempList.length;

		//需要拷贝一份列表,避免返回列表后原列表数据被修改
		if (length <= choiceCount) {
			return tempList;
		}

		for (var i = 0; i < choiceCount; i++) {
			var index = Math.floor(Math.random() * (length - i));
			returnList.push(tempList[index]);
			tempList.splice(index, 1);
		}
		return returnList;
	}
	//列表随机1个出来
	ListChoice(targetList: any[]) {
		var length = targetList.length;
		if (length < 1) {
			return null;
		}
		return targetList[Math.floor(Math.random() * (length))];
	}
	//求列表的最大值
	ListMaxNum(targetList: any[]) {
		return Math.max.apply(null, targetList);
	}

	//求列表的最小值
	ListMinNum(targetList: any[]) {
		return Math.min.apply(null, targetList);
	}
	//获取反向后的列表(返回新的)
	ListReverse(aList: any[]) {
		let count = aList.length;
		let bList = [];
		for (let index = 0; index < count; index++) {
			bList.push(aList.pop());
		}
		return bList
	}
    //-------------关于坐标整理---------------
    //获取2个坐标点之间的距离
    GetDistance(pos1:cc.Vec2,pos2:cc.Vec2){
        return cc.pDistance(pos1, pos2);
    }
    //获取当前向量与指定向量之间的弧度角。
    GetPRadian(pos1:cc.Vec2,pos2:cc.Vec2) {
        return cc.pAngleSigned(pos1,pos2);
    }
    //获取当前向量与指定向量之间的角度。
    GetPAngle(pos1:cc.Vec2,pos2:cc.Vec2) {
        var radian = this.GetPRadian(pos1,pos2);
        return radian*180/Math.PI;
    }
    //pos1和pos2连成的线 与 pos3和pos4连成的线相交的点
    GetIntersect(pos1:cc.Vec2,pos2:cc.Vec2,pos3:cc.Vec2,pos4:cc.Vec2){
        if(cc.pIntersectPoint(pos1,pos2,pos3,pos4)){
            return cc.pSegmentIntersect(pos1,pos2,pos3,pos4);
        }
        else{
            cc.error("没有相交的点");
            return false;
        }
    }
    //返回给定向量围绕指定轴心顺时针旋转一定角度后的结果
    GetRotateByAngle(pos:cc.Vec2,circleCenter:cc.Vec2,angle:number){
        var radian = angle/180*Math.PI;
        return cc.pRotateByAngle(pos,circleCenter,radian);
    }
    //获取点与原点连接直线的斜率
    GetToAngle(pos:cc.Vec2){
        return cc.pToAngle(pos);
    }
	// //----------------字符串方法------------------

	//增加字符串数字后缀 ("btnFight", 1, 2)) - > "btnFight01"
	StringAddNumSuffix(targetString: string, num: number, suffixLen: number) {
		var numString = "" + num;
		if (suffixLen) {
			var numLen = numString.length;
			numString = numLen < suffixLen ? (Array(suffixLen - numLen + 1).join('0') + num) : numString;
		}
		return [targetString, numString].join("");
	}

	//替换字符串中的文本("第{1}次", 10)) - > "第10次"
	StringReplace(targetString: string, argList: any[]) {

		var formatStr = targetString;
		var argumentsLen = argList.length;
		for (var index = 1; index <= argumentsLen; index++) {
			formatStr = formatStr.replace(new RegExp("\\{" + index + "\\}", "g"), argList[index - 1]);
		}
		return formatStr
	}

	//去除左空格
	StringLeftTrim(targetString: string) {
		return targetString.replace(/(^\s*)/g, "");
	}
	//去除右空格
	StringRightTrim(targetString: string) {
		return targetString.replace(/(\s*$)/g, "");
	}
	//去除2边空格
	StringTrim(targetString: string) {
		return targetString.replace(/(^\s*)|(\s*$)/g, "");
	}
    //替换指定位置的字符
    StringReplacePos(strObj, pos, replacetext) {
        let str = strObj.substr(0, pos-1) + replacetext + strObj.substring(pos, strObj.length);
        return str;
    }
	//---------------对象方法----------------
	//深拷贝(列表,字典)
	DeepCopy(target: any) {
		return JSON.parse(JSON.stringify(target));
	}

    GetUrlStr(dataDict:any) {

        if (!dataDict) {
            return ""
        }
        var urlSendStr = '?';
        for (var key in dataDict) {
            urlSendStr += key + '=' + dataDict[key] + '&';
        }
        //去掉最后一个&
        urlSendStr = urlSendStr.substring(0, urlSendStr.length - 1);

        return urlSendStr;
    }
	/**
     * 圆盘概率随机
     * @param curIDList
     * @param curRateList(必须是整数列表)
     * @param maxRate
     */
	GetDiskRandValue(curIDList: any[], curRateList: any[], maxRate: number) {
		//默认万分率随机
		if (!maxRate) {
			maxRate = 0;
			for (let index in curRateList) {
				var rate = curRateList[index];
				maxRate += rate;
			}
		}
		var listLength = curIDList.length
		if (!listLength) {
			cc.error("GetDiskRandValue curIDList empty");
			return null
		}
		if (listLength != curRateList.length) {
			cc.error("GetDiskRandValue (%s) != (%s)", curIDList, curRateList);
			return null
		}
		var oddsNum = this.RandInt(1, maxRate);
		var sortList = curRateList.map(function (rate, index) {
			var id = curIDList[index];
			return [rate, id];
		});
		//从小到大排序,相等按追加顺序排序
		sortList.sort(function (aList, bList) { return aList[0] > bList[0] ? 1 : -1 })
		var rateValue = 0;
		for (let index = 0; index < listLength; index++) {
			rateValue += sortList[index][0];
			if (rateValue < oddsNum) {
				continue;
			}
			return sortList[index][1];
		}
		cc.error("curIDList:%s,%s,%s,%s not find value", curIDList, curRateList, oddsNum, sortList);
		return null;
	}
    /**
     * 获得一个随机整数 ：start<= randValue <= end
     * @param {Array} below
     * @return {Number}
     * @remarks {}
     */
	RandInt(start: number, end: number) {
		return Math.floor(Math.random() * (end + 1 - start) + start);
	}
	/**
	 * 生成一个列表 range(0, 7)=>[0,1,2,3,4,5,6]
	 */
	Range(...argList: any[]) {
		var start, end, step, len, returnList;
		returnList = [];
		len = argList.length;

		//一个参数
		if (len == 1) {
			start = 0;
			end = argList[0];
			step = 1;
		}
		else if (len == 2) {
			start = argList[0];
			end = argList[1];
			step = 1;
		}
		else {
			start = argList[0];
			end = argList[1];
			step = argList[2];
		}

		if (step < 0) {
			for (start; start > end; start += step) {
				returnList.push(start);
			}
		}
		else {
			for (start; start < end; start += step) {
				returnList.push(start);
			}

		}
		return returnList
	}

    /**
     * 获取字典数据格式字符串（支持字典嵌套）
     * @param {Object} curDict
     * @param {Number} tabNum
     * @return {String}
     */
	GetPrintDictStr(curDict: any, tabNum?: number) {
		var key, value, classType, outEx, arg;

		tabNum = tabNum != null ? tabNum : 0;
		var outstr = "{\n";

		for (key in curDict) {
			value = curDict[key];
			classType = Object.prototype.toString.call(value).slice("[object ".length, -1);

			outEx = "";
			if (classType == "Object") {
				if (value.hasOwnProperty("JS_Name")) {
					outEx = "(" + value.toString() + "),\n";
				}
				else {
					outEx = this.GetPrintDictStr(value, tabNum + 1);
				}
			}
			else if (classType == "Function") {
				outEx = value.constructor.name + ",\n";
			}
			else {
				arg = "";
				try {
					arg = JSON.stringify(value);
				}
				catch (e) {
					//存在对象循环引用
					arg = "### cyclic object value:" + value.toString();
				}
				outEx = arg + ",\n";
			}

			outstr += "\t" + this.GetTabStr(tabNum) + JSON.stringify(key) + ":" + outEx;
		}

		outstr += this.GetTabStr(tabNum) + "}";

		if (tabNum) {
			outstr += ",";
		}
		outstr += "\n";

		return outstr;
	}

    /**
     * 返回tab字符串个数
     * @param {Object} num
     * @return {String}
     */
	GetTabStr(num: number) {
		var outstr = "";
		while (num--) {
			outstr += "\t";
		}
		return outstr;
	}

	/**
     * 输出类属性信息
     * @param obj
     */
	OutPutClassProperty(obj: any) {
		var propertyDict: any = {};
		for (var property in obj) {
			propertyDict[property] = obj[property];
		}
		this.Log(this.GetPrintDictStr(propertyDict));
	}
    /**
     *	获取时间天数差
     */
	GetDayDiffByTick(tick_1: number, tick_2: number) {
		var dateTime_1, dateTime_2;
		dateTime_1 = new Date(tick_1);
		dateTime_2 = new Date(tick_2);
		try {
			dateTime_1 = Date.parse((dateTime_1.getMonth() + 1) + "/" + dateTime_1.getDate() + "/" + dateTime_1.getFullYear());
			dateTime_2 = Date.parse((dateTime_2.getMonth() + 1) + "/" + dateTime_2.getDate() + "/" + dateTime_2.getFullYear());
			return Math.abs(dateTime_1 - dateTime_2) / (24 * 60 * 60 * 1000);
		} catch (e) {
			cc.error("GetDayDiffByTick error(%s)", e.message);
		}
	}
    /**
     * 获取当前时间字符串格式: 4/8 18:14
     */
	GetMonthDayHourMinute(time: number) {
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var houes = date.getHours();
		var minutes = date.getMinutes();
		return this.StringAddNumSuffix("", month, 2) + "/" + this.StringAddNumSuffix("", day, 2) + " " + this.StringAddNumSuffix("", houes, 2) + ":" + this.StringAddNumSuffix("", minutes, 2);
	}
    /**
	 * 获取当前时间字符串格式: 4月8日 18:14
     */
	GetMonthDayHourMinuteString(time: number) {
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var houes = date.getHours();
		var minutes = date.getMinutes();

		return this.StringAddNumSuffix("", month, 2) + "月" + this.StringAddNumSuffix("", day, 2) + "日 " + this.StringAddNumSuffix("", houes, 2) + ":" + this.StringAddNumSuffix("", minutes, 2);
	}
	/**
	 * 获取当前时间字符串格式: 2017/3/28 11:11
	 */
	GetDateYearMonthDayHourMinuteString(time: number) {
		var date = new Date(time * 1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var houes = date.getHours();
		var minutes = date.getMinutes();

		var dateString = [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("/");
		dateString += " ";
		dateString += [this.StringAddNumSuffix("", houes, 2), this.StringAddNumSuffix("", minutes, 2)].join(":");
		return dateString;
	}
	/**
	 *
	 * @returns {String} 2014/11/06
	 */
	GetNowDateDayString(time: number) {
		var date = new Date(time * 1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("/");
	}
	GetDateYearMonthDayHourMinutesString(time: number) {
		var date = new Date(time * 1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var houes = date.getHours();
		var minutes = date.getMinutes();
		var dateString = [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("-");
		dateString += " ";
		dateString += [this.StringAddNumSuffix("", houes, 2), this.StringAddNumSuffix("", minutes, 2)].join(":");
		return dateString;
	}

	/**
	 * 获取当前时间字符串格式: 2017-3-28 11:11:11
	 */
	GetDateYearMonthDayHourMinutesSecondString(time: number) {
		var date = new Date(time * 1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var houes = date.getHours();
		var minutes = date.getMinutes();
		var second = date.getSeconds();
		var dateString = [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("-");
		dateString += " ";
		dateString += [this.StringAddNumSuffix("", houes, 2), this.StringAddNumSuffix("", minutes, 2), this.StringAddNumSuffix("", second, 2)].join(":");
		return dateString;
	}

	/**
	 * 获取当前时间字符串格式: 2017-3-28
	 */
	GetDateYearMonthDayString(time: number) {
		var date = new Date(time);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var houes = date.getHours();
		var minutes = date.getMinutes();
		var second = date.getSeconds();

		var dateString = [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("-");
		return dateString;
	}
	/**
	 * 获取当前时间字符串格式
	 * @returns {String} 2014-11-06
	 */
	GetNowDateDayStr() {
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		return [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("-");
	}

	/**
	 * 获取当前时间字符串格式
	 * @returns {String} 2014-11
	 */
	GetNowDateMonthString() {
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		return [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2)].join("-");
	}
	/**
	 * 获取当前时间字符串格式
	 * @returns {String} 2014-11-06_193844
	 */
	GetNowDateTimeStr() {
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var hour = myDate.getHours();
		var min = myDate.getMinutes();
		var second = myDate.getSeconds();
		var dateString = [this.StringAddNumSuffix("", year, 4), this.StringAddNumSuffix("", month, 2), this.StringAddNumSuffix("", day, 2)].join("-");
		dateString += "_";
		dateString += [this.StringAddNumSuffix("", hour, 2), this.StringAddNumSuffix("", min, 2), this.StringAddNumSuffix("", second, 2)].join(":");
		return dateString
	}

    /**
     * 获取当前时间字符串格式分钟：秒: 18:20
     */
	GetMinuteSecond(time: number) {
		var date = new Date(time * 1000);

		var minutes = date.getMinutes();
		var second = date.getSeconds();
		return minutes + ":" + second;
	}
	/**
	 * 获取当前时间字符串格式小时：分钟: 18:20
	 */
	GetHourMinute(time: number) {
		var date = new Date(time * 1000);

		var minutes = date.getMinutes();
		var hour = date.getHours();
		return hour + ":" + minutes;
	}
	/**
	 * 获取字符串，去除；生成新的数组列表
	 */
	GetListFromStr(str_a: string) {
		var returnList = str_a.split(";");
		return returnList;
	}
	//buffer转base64
	// ArrayBufferToBase64(buffer: ArrayBuffer) {
	// 	var binary = '';
	// 	var bytes = new Uint8Array(buffer);
	// 	var len = bytes.byteLength;
	// 	for (var i = 0; i < len; i++) {
	// 		binary += String.fromCharCode(bytes[i]);
	// 	}
	// 	return app.base64.base64encode(binary);
	// }
}
