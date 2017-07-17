var memberSelector = {
    BindZZJG: function () {
        //遮罩
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");

        if ($("#hidCompanyId").val() == "company") {

            $.get("/api/person?companyType=3", function (list) {
                console.log("得到公司");
                console.log(list);
                $.each(list, function (index, item) {
                    item["IsSingle"] = memberSelector.IsSingle;
                });

                $("#divZZJG").html("");
                $("#divZZJG").html($("#depInfoTemp").render(list));
                if (!memberSelector.IsSingle) $("#divUserInfo #tabs #tabs-1 .headDiv .add").show();

                $("#divUserInfo").removeClass("divOverlay");
                $(".divPageLoading").remove();
            });
        }
        else {
            $.get("/api/person?parentId=" + parseInt($("#hidGroupId").val()), function (list) {
                $.each(list, function (index, item) {
                    item["IsSingle"] = memberSelector.IsSingle;
                });
                $("#divZZJG").html("");
                $("#divZZJG").html($("#depGroupTemp").render(list));
                if (!memberSelector.IsSingle) $("#divUserInfo #tabs #tabs-1 .headDiv .add").show();

                $("#divUserInfo").removeClass("divOverlay");
                $(".divPageLoading").remove();
            });
        }
        $("#hidCompanyId").val("company");
        //getPageDataList("/api/person?group=1", "#depInfoTemp", "#divZZJG");
    },
    BindTopContacts: function () {
        //遮罩 绑定常用联系人
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");
        var type = $("#hidContactCompanyId").val();
        if (type == "topcontact") {
            $.get("/api/person?contact=3", function (data) {
                var list = JSON.parse(data);
                $("#divTopContacts").html("");
                $("#divTopContacts").html($("#contactInfoTemp").render(list));

                $("#divUserInfo").removeClass("divOverlay");
                $(".divPageLoading").remove();
            });
        }
        else {
            $.get("/api/person?parentId=" + parseInt($("#hidContactGroupId").val()), function (list) {
                $("#divTopContacts").html("");
                $("#divTopContacts").html($("#contactGroupTemp").render(list));

                $("#divUserInfo").removeClass("divOverlay");
                $(".divPageLoading").remove();
            });
        }

        $("#hidContactCompanyId").val("topcontact");
    },
    BindDefine: function () {
        //遮罩
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");


        $.get("/api/person?custom=4", function (list) {
            $.each(list, function (index, item) {
                item["IsSingle"] = memberSelector.IsSingle;
            });
            $("#divDefine").html("");
            $("#divDefine").html($("#customInfoTemp").render(list));

            $("#divUserInfo").removeClass("divOverlay");
            $(".divPageLoading").remove();
            if (!memberSelector.IsSingle) $("#divUserInfo #tabs #tabs-4 .headDiv .add").show();
        });
    },
    ShowDialog: function (SaveHandler, IsSingle) {
        memberSelector.SaveHandler = SaveHandler;
        if (IsSingle) memberSelector.IsSingle = IsSingle;
        if (memberSelector.IsSingle) {
            $(".add").hide();
            $("#divUserInfo #tabs #tabs-3 .headDiv .return").show();
        }
        $("#divUserInfo").dialog({
            autoOpen: true,
            width: 760,//$(window).width(),
            height: 430,//$(window).height(),
            modal: true,
            title: "人员信息表",
        });
        $(".ui-dialog .ui-dialog-titlebar button").remove();
        if ($(".ui-dialog .ui-dialog-titlebar img")) {
            $(".ui-dialog .ui-dialog-titlebar img").remove();
            $(".ui-dialog .ui-dialog-titlebar").append("<img src='/images/icons/btn-close.jpg' style='float:right;cursor:pointer;' onclick='memberSelector.Close()' />");
        }
        $("#tabs ul li").each(function (index, item) {
            if ($(item).hasClass("ui-state-focus")) {
                $(item).removeClass("ui-state-focus")
            }
        });
        $("#tabs").tabs({ active: 0 });

        if ($("#divUserInfo .divValue ul")) {
            $("#divUserInfo .divValue ul").remove();
        }

        $("#txtUserList").val("");
        //
        $("#txtUserList").tokenInput(null, { theme: "facebook", hintText: "" });
        //
        $(".ui-dialog #txtUserList").tokenInput("clear");

        //绑定数据(组织结构，角色，常用联系人，自定义)
        memberSelector.BindZZJG();
        //BindRoles();
        memberSelector.BindTopContacts();
        memberSelector.BindDefine();

    },
    BindGroupsByPID: function (parentId) {
        //遮罩
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");

        $.get("/api/person?parentId=" + parseInt(parentId), function (list) {
            $("#divZZJG").html("");
            $("#divZZJG").html($("#depGroupTemp").render(list));

            $("#divUserInfo").removeClass("divOverlay");
            $(".divPageLoading").remove();
        });
        //返回上一级(公司)
        $("#hidCompanyId").val("company");
        $("#hidGroupId").val(parentId);
    },
    BindUsersByGroupId: function (GroupId, GroupSPId) {
        //遮罩
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");

        $.get("/api/person?groupId=" + GroupId, function (list) {
            console.log("排序的人员");
            console.log(list);
            $("#divZZJG").html("");
            $("#divZZJG").html($("#userInfoTemp").render(list));
            $("#divUserInfo #tabs #tabs-1 .headDiv .add").hide();

            $("#divUserInfo").removeClass("divOverlay");
            $(".divPageLoading").remove();
        });
        //返回上一级(组)
        $("#hidCompanyId").val("group");
    },
    ContactBindUsersByGroupId: function (GroupId, GroupSPId) {
        //遮罩
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");

        $.get("/api/person?groupId=" + GroupId, function (list) {
            console.log("排序的人员");
            console.log(list);
            $("#divTopContacts").html("");
            $("#divTopContacts").html($("#userInfoTemp").render(list));

            $("#divUserInfo").removeClass("divOverlay");
            $(".divPageLoading").remove();
        });
        //返回上一级(组)
        $("#hidContactCompanyId").val("group");
    },
    BindUsersByCustomId: function (customId) {
        //遮罩
        $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                        "<img src='/images/throbber.gif' alt='Loading' />" +
                    "</div>");
        $("#divUserInfo").addClass("divOverlay");

        $.get("/api/person?customId=" + customId, function (list) {
            $("#divDefine").html("");
            $("#divDefine").html($("#userInfoTemp").render(list));

            $("#divUserInfo").removeClass("divOverlay");
            $(".divPageLoading").remove();
            $("#divUserInfo #tabs #tabs-4 .headDiv .add").hide();
        });
    },
    IsHave: function (newId) {
        var list = $(".ui-dialog #txtUserList").tokenInput("get");
        if (list.length > 0) {
            var ishave = false;
            $(list).each(function (index, item) {
                if (item.Value == newId) {
                    ishave = true;
                }
            });
            return ishave;
        }
        else {
            return false;
        }
    },
    AddZZJG: function (type, value, name) {
        if (memberSelector.IsSingle) $(".ui-dialog #txtUserList").tokenInput("clear");
        if (type == 3 && value && name) {
            if (!memberSelector.IsHave(value)) {
                var userInfo = { Type: 3, Value: value, name: name };
                $(".ui-dialog #txtUserList").tokenInput("add", userInfo);
            }
        } else {

            if ($("#divZZJG .modDiv input[type=checkbox]:checked").length == 0) {
                return false;
            }
            $("#divZZJG .depinfo input[type=checkbox]:checked").each(function (index, item) {
                if (!memberSelector.IsHave($(item).val())) {
                    var userInfo = { Type: 1, Value: $(item).val(), name: $(item).next().html() };
                    $(".ui-dialog #txtUserList").tokenInput("add", userInfo);
                }
            });
            $("#divZZJG .userinfo input[type=checkbox]:checked").each(function (index, item) {
                if (!memberSelector.IsHave($(item).val())) {
                    var userInfo = { Type: 3, Value: $(item).val(), name: $(item).next().html() };
                    $(".ui-dialog #txtUserList").tokenInput("add", userInfo);
                }
            });
        }
    },
    //添加常用联系人
    AddTopContact: function (type, value, name) {
        
        if (type && value && name) {
            if (memberSelector.IsSingle && type == 1) {
                sgw.Ajax.Get({
                    url: "/act/group/GetGroupType?GroupId=" + value,
                    success: function (result) {
                        if (result == 3) {
                            $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                            "<img src='/images/throbber.gif' alt='Loading' />" + "</div>");
                            $("#divUserInfo").addClass("divOverlay");

                            $.get("/api/person?parentId=" + parseInt(value), function (list) {
                                $("#divTopContacts").html("");
                                $("#divTopContacts").html($("#contactGroupTemp").render(list));

                                $("#divUserInfo").removeClass("divOverlay");
                                $(".divPageLoading").remove();
                            });
                            //返回上一级(公司)
                            $("#hidContactCompanyId").val("topcontact");
                            $("#hidContactGroupId").val(value);
                        }
                        else if (result == 1) {
                            $("#divUserInfo").append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
                            "<img src='/images/throbber.gif' alt='Loading' />" +
                            "</div>");
                            $("#divUserInfo").addClass("divOverlay");

                            $.get("/api/person?groupId=" + value, function (list) {
                                console.log("排序的人员");
                                console.log(list);
                                $("#divTopContacts").html("");
                                $("#divTopContacts").html($("#userInfoTemp").render(list));

                                $("#divUserInfo").removeClass("divOverlay");
                                $(".divPageLoading").remove();
                            });
                            //返回上一级(组)
                            $("#hidContactCompanyId").val("topcontact");
                        }
                    }
                });
            }
            else {
                if (!memberSelector.IsHave(value)) {
                    if (memberSelector.IsSingle) $(".ui-dialog #txtUserList").tokenInput("clear");
                    var userInfo = { Type: 3, Value: value, name: name };
                    $(".ui-dialog #txtUserList").tokenInput("add", userInfo);
                }
            }
        } else {
            if ($("#divTopContacts .modDiv input[type=checkbox]:checked").length == 0) {
                return false;
            }
            $("#divTopContacts .modDiv input[type=checkbox]:checked").each(function (index, item) {
                if (!memberSelector.IsHave($(item).val())) {
                    var userInfo = { Type: $(item).next().next().val(), Value: $(item).val(), name: $(item).next().html() };
                    $(".ui-dialog #txtUserList").tokenInput("add", userInfo);
                }
            });
        }
    },
    //添加自定义
    AddDefine: function () {
        if ($("#divDefine .modDiv input[type=checkbox]:checked").length == 0) {
            return false;
        }
        $("#divDefine .modDiv input[type=checkbox]:checked").each(function (index, item) {
            if (!memberSelector.IsHave($(item).val())) {
                var userInfo = { Type: 4, Value: $(item).val(), name: $(item).next().html() };
                $(".ui-dialog #txtUserList").tokenInput("add", userInfo);
            }
        });

    },
    SaveUserInfo: function () {
        var tokenlist = $(".ui-dialog #txtUserList").tokenInput("get");
        if (tokenlist.length == 0) {
            alert("保存列表不能为空！");
            return false;
        }
        var userlist = new Array();
        $(tokenlist).each(function (index, item) {
            var userInfo = new Object();
            userInfo["Type"] = item.Type;
            userInfo["Value"] = item.Value;
            userInfo["Name"] = item.name;

            userlist.push(userInfo);
        });
        var personId;
        if (personId == "") {
            personId = null;
        }
        else {
            personId = parseInt(personId);
        }
        var list = { personId: personId, personItems: userlist };

        $.ajax({
            url: '/api/person',
            type: "post",
            data: JSON.stringify(list),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                personId = parseInt(data);
                $("#divUserInfo").dialog("close");
                if (memberSelector.SaveHandler) {
                    memberSelector.SaveHandler(personId);
                }

            },
            error: function () {
                alert("保存失败!");
            }
        });
    },
    Close: function () {
        $("#divUserInfo").dialog("close");
    },
    SaveHandler: null,
    IsSingle: false
}

$(function () {
});
