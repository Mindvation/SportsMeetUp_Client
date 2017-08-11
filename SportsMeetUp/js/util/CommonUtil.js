export default class CommonUtil {
    static dateFormat = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    static isEmpty = function (text) {
        if (text === null || text === undefined || text === "") {
            return true;
        }
        return false;
    }

    static updateGobalData(key, options) {
        GLOBAL[key] ? null : GLOBAL[key] = {};
        Object.assign(GLOBAL[key], options);
    }

    static typeToName(typeCode) {
        if ("080102" === typeCode) {
            return "保龄球馆";
        } else if ("080103" === typeCode) {
            return "网球";
        } else if ("080104" === typeCode) {
            return "篮球";
        } else if ("080105" === typeCode) {
            return "足球";
        } else if ("080112" === typeCode) {
            return "乒乓球";
        } else if ("080113" === typeCode) {
            return "台球";
        } else if ("080118" === typeCode) {
            return "羽毛球";
        } else if ("080201" === typeCode) {
            return "高尔夫";
        }
    }
}