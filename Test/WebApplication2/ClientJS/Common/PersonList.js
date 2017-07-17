
var selectNodeId;
var selectedPerson;

$(function () {
    //常用联系人
    BindTopContacts();

    //部门领导
    BindDepartmentHead();

    //组织结构
    BindOrganizationStructure();

    //自定义联系人
    BindUserDefined();

});

var BindTopContacts = function () {
    $("#TopContacts").jstree({
        "plugins": [
            "themes", "json_data", "ui", "crrm", "dnd", "search", "types"//, "contextmenu"
        ],
        "json_data": {
            data: [{
                "attr": { "id": "topContacts", "rel": "folder" },
                "data": "常用联系人",
                "state": "open",
                "metadata": { "id": "topContacts" },
                //"children": [{ "data": "山东高速集团", "attr": { "id": "1", "rel": "Profile" }, "metadata": { "id": "1", "pid": "Profile" } },
                //    { "data": "山东高速物流集团", "attr": { "id": "2", "rel": "Company" }, "metadata": { "id": "2", "pid": "Company" } },
                //    { "data": "青岛集装箱物流公司", "attr": { "id": "3", "rel": "Administrator" }, "metadata": { "id": "3", "pid": "Administrator" } }]
            }]
        },

        "types": {
            "max_depth": -2,
            "max_children": -2,
            "valid_children": ["drive"],
            "types": {
                "default": {
                    "valid_children": "none",
                    "icon": {
                        "image": "../../images/user_1.jpg"//file
                    }
                },
                "folder": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/user_1.jpg"
                    }
                },
                "drive": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/root.png"
                    },
                    "start_drag": false,
                    "move_node": false,
                    "delete_node": false,
                    "remove": false
                }
            }
        }
    })
    .bind("select_node.jstree", function (event, data) {
        // `data.rslt.obj` is the jquery extended node that was clicked
        //selectNodeRel = data.rslt.obj.attr("rel");
        selectNodeId = data.rslt.obj.attr("id");
        //selectNodeObj = data.rslt.obj;

        var SelectedNode = $("#TopContacts").jstree("get_selected");
        var NodeJson = $("#TopContacts").jstree("get_json", SelectedNode)[0];
        //$("#txtFunctionName").val(NodeJson.metadata["name"]);
        //$("#txtURL").val(NodeJson.metadata["href"]);
        //$("#selUserType").val(NodeJson.metadata["userTypeId"]);

        //if (NodeJson.metadata["isEnable"] == "1") {
        //    $("#rDisable").removeAttr("checked");
        //    $("#rEnable").attr("checked", "checked");
        //}
        //else if (NodeJson.metadata["isEnable"] == "0") {
        //    $("#rEnable").removeAttr("checked");
        //    $("#rDisable").attr("checked", "checked");
        //}

        //selectNodePid = NodeJson.metadata["pid"];

        TreeChildNodeSave(this, data.rslt.obj);
        console.log(data.rslt.obj.attr("id"), NodeJson.metadata["pid"]);
    })
    .delegate("a", "click", function (event, data) {
        //console.log(selectNodeId);
    })
}
var BindDepartmentHead = function () {
    $("#DepartmentHead").jstree({
        "plugins": [
            "themes", "json_data", "ui", "crrm", "dnd", "search", "types"//, "contextmenu"
        ],
        "json_data": {
            data: [{
                "attr": { "id": "lead1", "rel": "folder" },
                "data": "各部门负责人",
                "state": "open",
                "metadata": { "id": "lead1" }
            },
            {
                "attr": { "id": "lead2", "rel": "folder" },
                "data": "分管领导",
                "state": "open",
                "metadata": { "id": "lead2" }
            },
            {
                "attr": { "id": "lead3", "rel": "folder" },
                "data": "领导班子",
                "state": "open",
                "metadata": { "id": "lead3" }
            }
            ]
        },

        "types": {
            "max_depth": -2,
            "max_children": -2,
            "valid_children": ["drive"],
            "types": {
                "default": {
                    "valid_children": "none",
                    "icon": {
                        "image": "../../images/user_3.jpg"//file
                    }
                },
                "folder": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/user_3.jpg"
                    }
                },
                "drive": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/root.png"
                    },
                    "start_drag": false,
                    "move_node": false,
                    "delete_node": false,
                    "remove": false
                }
            }
        }
    })
    .bind("select_node.jstree", function (event, data) {
        // `data.rslt.obj` is the jquery extended node that was clicked
       
        selectNodeId = data.rslt.obj.attr("id");

        var SelectedNode = $("#DepartmentHead").jstree("get_selected");
        var NodeJson = $("#OrganizationStructure").jstree("get_json", SelectedNode)[0];
       

        //selectNodePid = NodeJson.metadata["pid"];

        TreeChildNodeSave(this, data.rslt.obj);
        //console.log(data.rslt.obj);
    })
    .delegate("a", "click", function (event, data) {
        //console.log(selectNodeId);
    })
}
var BindOrganizationStructure = function () {
    $("#OrganizationStructure").jstree({
        "plugins": [
            "themes", "json_data", "ui", "crrm", "dnd", "search", "types"//, "contextmenu"
        ],
        "json_data": {
            data: [{
                "attr": { "id": "zhbgs", "rel": "drive" },
                "data": "综合办公室",
                "state": "open",
                "metadata": { "id": "zhbgs" }
            }, {
                "attr": { "id": "rszg", "rel": "drive" },
                "data": "人事政工部",
                "state": "open",
                "metadata": { "id": "rszg" }
            },
            {
                "attr": { "id": "cwjr", "rel": "drive" },
                "data": "财务金融部",
                "state": "open",
                "metadata": { "id": "cwjr" }
            },
            {
                "attr": { "id": "aqjs", "rel": "drive" },
                "data": "安全技术部",
                "state": "open",
                "metadata": { "id": "aqjs" }
            }, {
                "attr": { "id": "qyfz", "rel": "drive" },
                "data": "企业发展部",
                "state": "open",
                "metadata": { "id": "qyfz" }
            },
            {
                "attr": { "id": "yyzx", "rel": "drive" },
                "data": "运营中心",
                "state": "open",
                "metadata": { "id": "yyzx" }
            }
            ]
        },

        "types": {
            "max_depth": -2,
            "max_children": -2,
            "valid_children": ["drive"],
            "types": {
                "default": {
                    "valid_children": "none",
                    "icon": {
                        "image": "../../images/user_1.jpg"//file
                    }
                },
                "folder": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/user_3.jpg"
                    }
                },
                "drive": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/root.png"
                    },
                    "start_drag": false,
                    "move_node": false,
                    "delete_node": false,
                    "remove": false
                }
            }
        }
    })
    .bind("select_node.jstree", function (event, data) {
        // `data.rslt.obj` is the jquery extended node that was clicked
        //selectNodeRel = data.rslt.obj.attr("rel");
        selectNodeId = data.rslt.obj.attr("id");

        //var SelectedNode = $("#OrganizationStructure").jstree("get_selected");
        //var NodeJson = $("#OrganizationStructure").jstree("get_json", SelectedNode)[0];

        //selectNodePid = NodeJson.metadata["pid"];

        TreeChildNodeSave(this, data.rslt.obj);
    })
    .delegate("a", "click", function (event, data) {
        //console.log(selectNodeId);
    })
}
var BindUserDefined = function () {
    $("#UserDefined").jstree({
        "plugins": [
            "themes", "json_data", "ui", "crrm", "dnd", "search", "types"//, "contextmenu"
        ],
        "json_data": {
            data: [{
                "attr": { "id": "userdefined", "rel": "folder" },
                "data": "熟悉的同事",
                "state": "open",
                "metadata": { "id": "userdefined" }
            },
            {
                "attr": { "id": "userdefined", "rel": "folder" },
                "data": "外勤人员",
                "state": "open",
                "metadata": { "id": "userdefined" }
            },
            {
                "attr": { "id": "userdefined", "rel": "folder" },
                "data": "外派人员",
                "state": "open",
                "metadata": { "id": "userdefined" }
            }
            ]
        },

        "types": {
            "max_depth": -2,
            "max_children": -2,
            "valid_children": ["drive"],
            "types": {
                "default": {
                    "valid_children": "none",
                    "icon": {
                        "image": "../../images/user_2.jpg"//file
                    }
                },
                "folder": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/user_2.jpg"
                    }
                },
                "drive": {
                    "valid_children": ["default", "folder"],
                    "icon": {
                        "image": "../../images/root.png"
                    },
                    "start_drag": false,
                    "move_node": false,
                    "delete_node": false,
                    "remove": false
                }
            }
        }
    })
    .bind("select_node.jstree", function (event, data) {
        // `data.rslt.obj` is the jquery extended node that was clicked
        //selectNodeRel = data.rslt.obj.attr("rel");
        selectNodeId = data.rslt.obj.attr("id");
       
        TreeChildNodeSave(this, data.rslt.obj);
    })
    .delegate("a", "click", function (event, data) {
        var SelectedNode = $("#UserDefined").jstree("get_selected");
        var NodeJson = $("#UserDefined").jstree("get_json", SelectedNode)[0];

        selectedPerson += NodeJson.metadata["name"]+",";
        console.log(selectedPerson);
    })
}

var NodeObject = function () {
    var me = this;
    me.id = "";
    me.name = "";
    me.tooltip = "";
    me.metadata = null;
}

var NewTreeNode = function (treeObj,selectedNode, nodeObject, callback) {
    var newNodeObject = {
        "data": nodeObject.name,
        "state": "closed",
        "attr": { "id": nodeObject.id, "title": nodeObject.tooltip },
        "metadata": nodeObject.metadata
    };
    $(treeObj).jstree("create", selectedNode, "last", newNodeObject, callback, true);
}

var TreeChildNodeSave = function (current, obj) {
    obj.children("UL").remove();
    if (selectNodeId == "topContacts") {
        //$("#divTree").jstree("refresh");
        var nodeObject = new NodeObject();
        nodeObject.id = 1;
        nodeObject.name = "张某";
        nodeObject.tooltip = "张某";
        nodeObject.metadata = { "id": 1, "pid": "topContacts" };

        NewTreeNode($("#TopContacts"),obj, nodeObject, "");

        nodeObject = new NodeObject();
        nodeObject.id = 2;
        nodeObject.name = "孙三丰";
        nodeObject.tooltip = "孙三丰";
        nodeObject.metadata = { "id": 2, "pid": "topContacts" };

        NewTreeNode($("#TopContacts"),obj, nodeObject, "");

        nodeObject = new NodeObject();
        nodeObject.id = 3;
        nodeObject.name = "宋智孝";
        nodeObject.tooltip = "宋智孝";
        nodeObject.metadata = { "id": 3, "pid": "topContacts" };

        NewTreeNode($("#TopContacts"),obj, nodeObject, "");
    }
    else if (selectNodeId == "lead1") {
        var headlist = ([
            { Id: "01", Name: "孙海", Href: "综合办公室", ParentId: "lead1" },
            { Id: "02", Name: "王珂", Href: "人事政工部", ParentId: "lead1" },
            { Id: "03", Name: "李志平", Href: "安全技术部", ParentId: "lead1" },
            { Id: "04", Name: "孙海", Href: "审计法务部", ParentId: "lead1" },
            { Id: "05", Name: "王珂", Href: "金融财务部", ParentId: "lead1" },
            { Id: "06", Name: "李志平", Href: "运营中心", ParentId: "lead1" }
        ]);
        $(headlist).each(function (index,item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#DepartmentHead"), obj, nodeObject, "");
        });
    }
    else if (selectNodeId == "lead2") {
        var headlist = ([
            { Id: "01", Name: "刘志海", Href: "综合办公室", ParentId: "lead2" },
            { Id: "02", Name: "孙明奇", Href: "人事政工部", ParentId: "lead2" },
            { Id: "03", Name: "刘兆忠", Href: "安全技术部", ParentId: "lead2" },
            { Id: "04", Name: "韩启明", Href: "审计法务部", ParentId: "lead2" }
        ]);
        $(headlist).each(function (index, item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#DepartmentHead"), obj, nodeObject, "");
        });
    }
    else if (selectNodeId == "lead3") {
        var headlist = ([
            { Id: "01", Name: "齐元静", Href: "综合办公室", ParentId: "lead3" },
            { Id: "02", Name: "秦成志", Href: "人事政工部", ParentId: "lead3" },
            { Id: "03", Name: "于朝磊", Href: "安全技术部", ParentId: "lead3" }
        ]);
        $(headlist).each(function (index, item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#DepartmentHead"), obj, nodeObject, "");
        });
    }
    else if (selectNodeId == "zhbgs") {
        var headlist = ([
            { Id: "01", Name: "齐元静", Href: "综合办公室", ParentId: "lead3" },
            { Id: "02", Name: "秦成志", Href: "人事政工部", ParentId: "lead3" },
            { Id: "03", Name: "于朝磊", Href: "安全技术部", ParentId: "lead3" }
        ]);
        $(headlist).each(function (index, item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#OrganizationStructure"), obj, nodeObject, "");
        });
    }
    else if (selectNodeId == "rszg") {
        var headlist = ([
            { Id: "01", Name: "冯海", Href: "综合办公室", ParentId: "lead3" },
            { Id: "02", Name: "李丽丽", Href: "人事政工部", ParentId: "lead3" },
            { Id: "03", Name: "孙庆海", Href: "安全技术部", ParentId: "lead3" }
        ]);
        $(headlist).each(function (index, item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#OrganizationStructure"), obj, nodeObject, "");
        });
    }
    else if (selectNodeId == "cwjr" || selectNodeId == "aqjs" || selectNodeId == "qyfz" || selectNodeId == "yyzx") {
        var headlist = ([
            { Id: "01", Name: "萨斯", Href: "综合办公室", ParentId: "lead3" },
            { Id: "02", Name: "方清", Href: "人事政工部", ParentId: "lead3" },
            { Id: "03", Name: "刘凤阳", Href: "安全技术部", ParentId: "lead3" }
        ]);
        $(headlist).each(function (index, item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#OrganizationStructure"), obj, nodeObject, "");
        });
    }
    else if (selectNodeId == "userdefined") {
        var headlist = ([
            { Id: "01", Name: "萨斯", Href: "综合办公室", ParentId: "lead3" },
            { Id: "02", Name: "方清", Href: "人事政工部", ParentId: "lead3" },
            { Id: "03", Name: "刘凤阳", Href: "安全技术部", ParentId: "lead3" }
        ]);
        $(headlist).each(function (index, item) {
            var nodeObject = new NodeObject();
            nodeObject.id = item.Id;
            nodeObject.name = item.Name;
            nodeObject.tooltip = item.Href;
            nodeObject.metadata = { "href": item.Href, "pid": item.ParentId, "name": item.Name };
            NewTreeNode($("#UserDefined"), obj, nodeObject, "");
        });
    }
}

var AddPerson = function (obj) {
    console.log(selectedPerson);

    $.Dialog.close();
    //$("#txtApprover").val(selectedPerson);
}