
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

$(function () {
    $(".top6").load("../Default/Head.html");
   
    BindUrl();
    //绑定代办事务
    BindContactsList();

});

var BindUrl = function () {
    var path = request("path");
    if (path == "pwork" || $.cookie("type") == "pwork") {
        $(".zyo").load("../Default/pworkLeftMenu.html");
        $(".top1_2").removeClass("top1_2").addClass("top1");
    }
    else if (path == "portal" || $.cookie("type") == "portal") {
        $(".zyo").load("../Default/portalLeftMenu.html");
        $(".top1").removeClass("top1").addClass("top1_2");
    }
}

var BindContactsList = function () {
    var task = ([
        { Id: "11", Title: "个人信息更新", Content: "及时提交个人信息，以方便存档和定义考核绩效。及时提交个人信息，以方便存档和定义考核绩效。及时提交个人信息，以方便存档和定义考核绩效。及时提交个人信息，以方便存档和定义考核绩效。",Type:"text" },
        { Id: "12", Title: "集团企业发展计划", Content: "工会职权运行流程图编号:GH-001 单位名称 类别 工会 内部职权 职权名称 承办...GH-008 单位名称 类别 工会 内部职权工会发文 确定评选人数及人员比例 名额分配...", Type: "pdf" },
        { Id: "13", Title: "党纪报告", Content: "会议名称:总经理办公例会 主持人:X总 记录员:XXX 时间:XXXX年XX月XX日 地点:XX房地产会议室 参加人员:X总、XXX、XXX、XXX、XXX等XX房地产公司员工;XX房地产...", Type: "pdf" },
        { Id: "14", Title: "项目立项申请", Content: "委员会、新华网、半月谈杂志社、非公有制企业党建杂志、中国非公企业党建网等5家单位联合举办的“全国非公有制企业双强百佳党组织”评选揭晓,盛辉物流集团党委荣膺表彰...", Type: "text" },
        { Id: "15", Title: "请假审核流程", Content: "经营工作会 会议纪要 福田物纪字[2011]第 号 □通知 □通报 ■纪要 □报告 ...未形成“集团化”的物流信息管控平台,人为提供和分析数据导致工作量大、数据偏差...", Type: "word" },
        { Id: "16", Title: "招标书拟定", Content: "某某发布的合同急需您的签字和备注，请在某某天之前完成审批并提交一下文档整理。", Type: "text" },
        { Id: "17", Title: "车辆使用制度", Content: "便函是信函的一种,是各级机关、单位互相进行日常交往时使用的一种简便公函。 便函可以不按机关、单位的公文统一编号,但只要内容是公务的,即使是以双方领导机关的", Type: "word" }
    ]);
    //$.each(task, function (index, item) {
    //    if (item.Content.length > 75) {
    //        item.Content = item.Content.substring(0, 72) + "...";
    //    };
    //});

    $.tmpl($("#contacts"), task).appendTo("#contactsList");
}

var ShowDetail = function (type) {
    window.location.href = 'TaskDetail.html?type=' + type;
}
