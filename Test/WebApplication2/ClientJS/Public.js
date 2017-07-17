/*******************************************************************
********************************************************************
------------------------------公用方法------------------------------
********************************************************************
*******************************************************************/
var __isDebuggerMode = false;

//获取查询字符串对象
var GetUrlParms = function () {
    var args = new Object();
    var query = location.search.substring(1);//获取查询串   
    var pairs = query.split("&");//在逗号处断开   
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');//查找name=value   
        if (pos == -1) continue;//如果没有找到就跳过   
        var argname = pairs[i].substring(0, pos);//提取name   
        var value = pairs[i].substring(pos + 1);//提取value   
        args[argname] = unescape(value); //存为属性(解码) 
    }

    args && args["mode"] === "debug" && (__isDebuggerMode = true);
    return args;
}

//获取跳转页面传递的参数
var request = function (paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};

//获取滚动条分页数据, 分页参数名称pageIndex, Url中不需要分页参数
var getPageDataList = function (url, tmpl, div, isNoPaging) {
    var pageIndex = 1;
    var pageParam = "";
    if (isNoPaging) {
        pageParam = "";
    } else {
        if (url.indexOf("?") > -1) {
            pageParam = "&pageIndex=" + pageIndex;
        }
        else {
            pageParam = "?pageIndex=" + pageIndex;
        }
    }

    var listContainer = $(div);
    listContainer.html("");
    $.get(url + pageParam, function (data) {
        var list = JSON.parse(data);
        if (list.length == 0) {
            listContainer.html("<div style='font-style:italic;text-align:center;color:gray;font-size:14px;'>没有对应的数据..</div>");
        }
        else {
            listContainer.html($(tmpl).render(list));
        }
    });
    listContainer.unbind("scroll");
    listContainer.scroll(function () {
        if (listContainer.prop("scrollHeight") > listContainer.height() &&
            listContainer.scrollTop() + listContainer.height() + 10 >= listContainer.prop("scrollHeight")) { // 快到底部时（相差10px）开始取得下一页

            if (pageIndex > 0 && listContainer.children(".divPageLoading").length == 0) {
                listContainer.append("<div class='divPageLoading' style='text-align:center'>" +
                    "<img src='../../images/throbber.gif' alt='Loading' />" +
                "</div>");
            }
            else {
                return;
            }
            if (pageIndex > 0) {
                pageIndex++;

                if (url.indexOf("?") > -1) {
                    pageParam = "&pageIndex=" + pageIndex;
                }
                else {
                    pageParam = "?pageIndex=" + pageIndex;
                }

                $.get(url + pageParam, function (data) {
                    $("div").remove(".divPageLoading");
                    var list = JSON.parse(data);
                    if (list.length == 0) {
                        pageIndex = 0;
                    }
                    else {
                        listContainer.append($(tmpl).render(list));
                    }
                });
            }
        }
    });
}
//角色排序
var Order = function (data) {
    var list = new Array();
    $(data).each(function (index, item) {
        if (item.GroupName == "总经理") {
            item["orderBy"] = 1;
            list.push(item);
        }
        else if (item.GroupName == "副总经理") {
            item["orderBy"] = 2;
            list.push(item);
        }
        else if (item.GroupName == "党委书记") {
            item["orderBy"] = 3;
            list.push(item);
        }
        else if (item.GroupName == "党委副书记") {
            item["orderBy"] = 4;
            list.push(item);
        }
        else if (item.GroupName == "总会计师") {
            item["orderBy"] = 5;
            list.push(item);
        }
        else if (item.GroupName == "总经理助理") {
            item["orderBy"] = 6;
            list.push(item);
        }
        else if (item.GroupName == "常务副总经理") {
            item["orderBy"] = 7;
            list.push(item);
        }
        else if (item.GroupName == "副总工程师") {
            item["orderBy"] = 8;
            list.push(item);
        }
        else if (item.GroupName == "经理") {
            item["orderBy"] = 9;
            list.push(item);
        }
        else if (item.GroupName == "副经理") {
            item["orderBy"] = 10;
            list.push(item);
        }
        else if (item.GroupName == "主任") {
            item["orderBy"] = 11;
            list.push(item);
        }
        else if (item.GroupName == "副主任") {
            item["orderBy"] = 12;
            list.push(item);
        }
        else if (item.GroupName == "部门经理") {
            item["orderBy"] = 13;
            list.push(item);
        }
        else if (item.GroupName == "办公室主任") {
            item["orderBy"] = 14;
            list.push(item);
        }
        else if (item.GroupName == "办公室副主任") {
            item["orderBy"] = 15;
            list.push(item);
        }
        else if (item.GroupName == "职员") {
            item["orderBy"] = 16;
            list.push(item);
        }
        else {
            item["orderBy"] = 17;
            list.push(item);
        }
    });

    list.sort(function (a, b) {
        return a["orderBy"] > b["orderBy"] ? 1 : -1;
    });

    return list;
}

//判断数组中是否包含某元素
Array.prototype.S=String.fromCharCode(2);  
Array.prototype.in_array=function(e)  
{  
    var r=new RegExp(this.S+e+this.S);  
    return (r.test(this.S+this.join(this.S)+this.S));  
}
//json 数据格式转换
function changejsondata(jsonData, propertyList) {
    var ObjectIds = new Array();
    var products = new Array();   
    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        var objectid = obj.ObjectId;
        if (!ObjectIds.in_array(objectid)) ObjectIds.push(objectid);  
    }
    for (var i = 0; i < ObjectIds.length; i++) {
        var objproduct = new Object();
        var properties = new Array();
        var objectid = ObjectIds[i];
        objproduct["Objectid"] = objectid;
        for (var j = 0; j < jsonData.length; j++) {
            var obj = jsonData[j];
            var property = new Object();
            if (obj.ObjectId == objectid) {
                property["Name"] = obj.Name;
                property["Value"] = obj.Value;
                properties.push(property);
            }            
        }
        objproduct["Properties"] = properties;
        products.push(objproduct);
    }

    if (propertyList) {
        $.each(products, function (index, prod) {
            $.each(propertyList, function (idx, prop) {
                for (var i = 0; i < prod.Properties.length; i++) {
                    if (prod.Properties[i].Name == prop.Name) {
                        return;
                    }
                }
                prod.Properties.push({ "Name": prop.Name, "Value": null, "Objectid": prod.Objectid });
            })
        });
    }

    console.log("整理 properties");
    console.log(products);
    return products;
}
function changejsondata_old(jsonData, propertyList) {
    var products = new Array();
    var objproduct;
    var properties = new Array();
    var objid = 0;
    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        var objectid = obj.ObjectId;
        var property = new Object();
        property["Name"] = obj.Name;
        property["Value"] = obj.Value;
        if (objid == 0) {
            objid = objectid;
            properties.push(property);
        } else if (objid == objectid) {
            properties.push(property);
        }
        else {
            objproduct = new Object();
            objproduct["Objectid"] = objid;
            objproduct["Properties"] = properties;
            products.push(objproduct);

            objid = objectid;
            properties = new Array();
            properties.push(property);
        }
        if (i == jsonData.length - 1) {
            objproduct = new Object();
            objproduct["Objectid"] = objid;
            objproduct["Properties"] = properties;
            products.push(objproduct);
        }
    }

    if (propertyList) {
        $.each(products, function (index, prod) {
            $.each(propertyList, function (idx, prop) {
                for (var i = 0; i < prod.Properties.length; i++) {
                    if (prod.Properties[i].Name == prop.Name) {
                        return;
                    }
                }
                prod.Properties.push({ "Name": prop.Name, "Value": null, "Objectid": prod.Objectid });
            })
        });
    }

    console.log("整理 properties");
    console.log(products);
    return products;
}
//json数据行转列
function row2col(jsonData, idField, colField, valueField, emptyValue) {
    var result = [], //存储返回的数据
        idIndexData = {},//存储id在数组中的信息(位置)
        resultColumns = {},//存储列名数据
        curRecord = null;//存储当前数据

    var colFields = colField.split(',');
    // 循环整个JSON数组：[{...},{...},{...},...]  
    for (var idx = 0; idx < jsonData.length; idx++) {
        //当前json数据对象
        var cdata = jsonData[idx];
        //根据主键值，查找到结果数组中的索引号
        var idValue = cdata[idField];
        var num = idIndexData[idValue];//获取存储该id的数组索引号
        if (num != null) {
            curRecord = result[num];
        } else {
            //初始化数据时保持完整的结构信息 避免因为缺乏数据，缺乏指定的列数据
            curRecord = {};
        }
        // 指定的colFields列下的数据作为y轴，则取出该列的数据作为y轴即可
        for (var i in colFields) {
            var key = colFields[i];
            //获取到colField的值，作为列名
            var value = cdata[valueField];
            curRecord[value] = cdata[key];
            //存储列名
            resultColumns[value] = null;
            break;
        }
        //除数据内容外，还需要添加主键数据  
        curRecord[idField] = idValue;
        //对象若为新建 则新增进数组
        if (num == null) {
            idIndexData[idValue] = result.push(curRecord) - 1;
        }
    }
    //数据检查 由于是将行数据作为列名，则可能会存在部分行缺少其他列数据，若缺少，则指定默认值
    for (var i in result) {
        for (var name in resultColumns) {
            if (!result[i].hasOwnProperty(name)) result[i][name] = emptyValue;
        }
    }
    return result;
}
//格式化金额  
function outputmoney(number) {
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
} 
function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3) ; i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
//金额小写转大写
function atoc(numberValue) {
    var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
    var chineseValue = ""; // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
    var len = numberValue.length; // numberValue 的字符串长度
    var Ch1; // 数字的汉语读法
    var Ch2; // 数字位的汉字读法
    var nZero = 0; // 用来计算连续的零值的个数
    var String3; // 指定位置的数值
    if (len > 15) {
        alert("超出计算范围");
        return "";
    }
    if (numberValue == 0) {
        chineseValue = "零元整";
        return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
        String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
        }
        else { // 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else {
                Ch1 = "";
                Ch2 = String2.substr(i, 1);
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
                Ch2 = String2.substr(i, 1);
            }
        }
        chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) { // 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue + "整";
    }
    return chineseValue;
}
//时间对象的格式化 
Date.prototype.format = function (format) {
    /* 
    * format="yyyy-MM-dd hh:mm:ss"; 
    */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
        - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
//字符串转时间格式
function getDate(strDate) {

    if (strDate && strDate.length) {
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
         function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
        return date;
    } else {
        return {
            format: function () {
                return '';
            }
        };
    }
}

//页面调试
var clientDebugger = function () {
    if (__isDebuggerMode) {
        debugger;
    }
}
//日期加天数
function AddDays(date, days) {
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    var cdate = y + "-" + m + "-" + d;
    return cdate;
}