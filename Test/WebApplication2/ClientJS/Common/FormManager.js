

$(function () {

    //绑定所有表单
    BindAllForm();

    //清除选择
    $("#btnClearSelect").click(function () {
        $(".listview .list").each(function (index, item) {
            if ($(item).hasClass("selected")) {
                $(item).toggleClass("selected");
            }
        });
    });
});

var BindAllForm = function () {
    var allform = ([
        { Id: "1", Title: "项目公司表单-出差申请单", PublishDate: "2012/02/19", Author: "李司棋", Type: "出差申请单" },
        { Id: "2", Title: "物流集团收文流程", PublishDate: "2012/3/29", Author: "张明海", Type: "收文表单" },
        { Id: "3", Title: "平阴--部门经理请假", PublishDate: "2012/04/08", Author: "孙见", Type: "请假申请单" },
        { Id: "4", Title: "平阴--部门经理出差申请", PublishDate: "2012/04/13", Author: "刘务", Type: "出差申请单" },
        { Id: "5", Title: "专题会议纪要", PublishDate: "2012/05/10", Author: "孙良心", Type: "会议纪要" },
        { Id: "6", Title: "招标书拟定", PublishDate: "2013/03/19", Author: "丁国庆", Type: "招标书申请单" },
        { Id: "7", Title: "物流集团便函", PublishDate: "2013/02/17", Author: "张震", Type: "便函" },
        { Id: "8", Title: "会签单流程", PublishDate: "2013/09/21", Author: "刘童辉", Type: "会签单申请表" },
    ]);
    $("#myForm").tmpl(allform).appendTo("#divForm");
}

var IsSelect = function (obj) {
    $(obj).toggleClass("selected");
}

var BindFlowStatus = function () {
    var flowStatus = [
        { Id: "1", Value: "新建" },
        { Id: "2", Value: "执行中" },
        { Id: "3", Value: "撤销" },
        { Id: "4", Value: "结束" }
    ];
    for (var i = 0; i < flowStatus.length; i++) {
        var option = document.createElement("OPTION");
        option.value = flowStatus[i].Id;
        option.text = flowStatus[i].Value;

        $(option).appendTo($("#selFlowStatus"));
    }
}

var ChangeFlowStatus = function () {
    if ($("#selFlowStatus").val() == 2 || $("#selFlowStatus").val() == 4) {
        $("#btnModifyFlow").attr("disabled", "disabled");
        $("#btnDeleteFlow").attr("disabled", true);
    }
    else {
        $("#btnModifyFlow").attr("disabled", false);
        $("#btnDeleteFlow").attr("disabled", false);
    }
}
