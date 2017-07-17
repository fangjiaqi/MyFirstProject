
$(function () {   
    $("#ddlApprovalStatus").on("change", BindTemplaets);
    BindTemplaets();
    $("#btnSearch").off("click").click(function (e) {
        e.preventDefault();
        sgw.Utilities.Search.LocalSearch({
            query: $("#txtKeyword").val(),
            area: ".frames",
            itemSelector: ".data-item",
            searchSelector: ".searchable",
            highlightSelector: ".query-highlight"
        });

    });
    sgw.Controller.enterPress($("#txtKeyword"));
});


// 绑定申请会议列表
var BindTemplaets = function () {
    var Keyword = $("#txtKeyword").val();
    var approvalStatus = $("#ddlApprovalStatus").val();
    sgw.Ajax.Get({
        url: "/act/Test/GetMeetingApplyList?Keyword=" + Keyword + "&approvalStatus=" + approvalStatus,
        //showMask: true,
        success: function (result) {
            if (result.length == 0) {
                $("#divMeetingApply").html("<div style='font-style:italic;text-align:center;color:gray;font-size:14px;'>没有对应的数据..</div>");
            }
            else {
                $("#divMeetingApply").html($("#tmplMeetingApply").render(result));
            }
        },
        failure: function () {
            alert("获取数据失败！");
        }
    });
}