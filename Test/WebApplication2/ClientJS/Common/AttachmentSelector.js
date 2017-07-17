
var attachmentSelector = {
    RaiseAttachmentId: null,
    GetAttachmentId: null,
    // 打开文件选择框
    ShowUploadDialog: function (item) {
        attachmentSelector.DivObj = $(item.parentElement).find(".FileQueue")[0];
        attachmentSelector.AttachmentIdObj = $(item.parentElement.parentElement.parentElement).find("input[type='hidden']")[0];
        attachmentSelector.FileObj = $(item.parentElement).find("input[type='file']")[0];
        attachmentSelector.DivFolderInfoObj = $(".ui-dialog .divFolderInfo")[0];
        if (!attachmentSelector.DivFolderInfoObj) attachmentSelector.DivFolderInfoObj = $(item.parentElement).find(".divFolderInfo")[0];
        attachmentSelector.DivFolderPathObj = $(attachmentSelector.DivFolderInfoObj).find(".folderPath")[0];
        attachmentSelector.DivTopFoldersObj = $(attachmentSelector.DivFolderInfoObj).find(".divFolderContent")[0];
        attachmentSelector.FolderListObj = $(attachmentSelector.DivFolderInfoObj).find(".divValue input[class='folderList']")[0];

        $(attachmentSelector.DivFolderInfoObj).dialog({
            autoOpen: true,
            width: 760,
            height: 430,
            modal: true,
            title: "文件库",
        });
        $(".ui-dialog .ui-dialog-titlebar button").remove();
        if ($(".ui-dialog .ui-dialog-titlebar img")) {
            $(".ui-dialog .ui-dialog-titlebar img").remove();
            $(".ui-dialog .ui-dialog-titlebar").append("<img src='/images/icons/btn-close.jpg' style='float:right;cursor:pointer;' onclick='attachmentSelector.CloseUploadDialog()' />");
        }
        //清空选择数据
        attachmentSelector.FolderInit();
        //绑定数据(根目录)
        attachmentSelector.BindRootFolder($(attachmentSelector.DivFolderPathObj).find("a:first"));

        attachmentSelector.InitPageControl();
    },
    // 外侧绑定附件框里的值 todo：flowId, actionNodeId 参数去掉
    // todo: 节点办理页面的第三部分（日志），要记录格式转换信息：转换前的文件地址->转换后的文件地址
    BindAttachmentFile: function (item, attachmentId, flowId, actionNodeId, nextHandler) {
        if (flowId) attachmentSelector.FlowId = flowId;
        if (actionNodeId) attachmentSelector.ActionNodeId = actionNodeId;
        var objDiv = item.find(".FileQueue");
        $.get("/api/attachment?filePath=filePath", function (fileUrl) {
            $.get("/api/attachment?attachmentId=" + parseInt(attachmentId), function (list) {
                var attachList = JSON.parse(list);
                $(attachList).each(function (pIndex, pItem) {
                    var extensions = (/[.]/.exec(pItem.Name)) ? /[^.]+$/.exec(pItem.Name) : undefined;
                    if (extensions == "xls") {
                        $(objDiv).find(".divValue ul").append("<li class='token-input-token-facebook'><p onclick=\"attachmentSelector.ViewFormFile('" + fileUrl + encodeURIComponent(pItem["FilePath"]) + "')\">" + pItem.Name + "</p><span class='token-input-delete-token-facebook'  data-fileid='" + pItem.Value + "' onclick='attachmentSelector.ExcelChangeExtensions(this)'><i class='icon-spin'></i></span><span class='token-input-delete-token-facebook'  data-fileid='" + pItem.Value + "' onclick='attachmentSelector.RemoveFile(this)'><i class='icon-cancel-2'></i></span></li>");
                    }
                    else {
                        $(objDiv).find(".divValue ul").append("<li class='token-input-token-facebook'><p onclick=\"attachmentSelector.ViewFormFile('" + fileUrl + encodeURIComponent(pItem["FilePath"]) + "')\">" + pItem.Name + "</p><span class='token-input-delete-token-facebook' data-fileid='" + pItem.Value + "' onclick='attachmentSelector.RemoveFile(this)'><i class='icon-cancel-2'></i></span></li>");
                    }
                });
                if (nextHandler) nextHandler();
            });
        });
    },
    InitPageControl: function () {
        $(attachmentSelector.FileObj).on("change", attachmentSelector.ManualUpload);
        attachmentSelector.InitDragDrop();
        attachmentSelector.InitUploader();
    },
    FolderInit: function () {
        //文件 
        var ulObj = $(attachmentSelector.DivFolderInfoObj).find(".divValue ul")[0];
        if ($(ulObj)) {
            $(ulObj).remove();
        }
        attachmentSelector.NowFolderPath = "";
        $(attachmentSelector.FolderListObj).val("");
        $(attachmentSelector.FolderListObj).tokenInput(null, { theme: "facebook", hintText: "" });
        $(attachmentSelector.FolderListObj).tokenInput("clear");
    },
    BindRootFolder: function (obj) {
        if (obj) {
            $(obj).nextAll().remove();
        }
        //遮罩
        $(attachmentSelector.DivFolderInfoObj).append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
            "<img src='/images/throbber.gif' alt='Loading' />" +
            "</div>");
        $(attachmentSelector.DivFolderInfoObj).addClass("divOverlay");
        $.get("/api/attachment", function (data) {
            if (data != "") {
                attachmentSelector.NowFolderPath = "";
                var rootlist = JSON.parse(data);
                $(attachmentSelector.DivTopFoldersObj).html("");
                $(attachmentSelector.DivTopFoldersObj).html($("#rootTemp").render(rootlist));
            }

            $(attachmentSelector.DivFolderInfoObj).removeClass("divOverlay");
            $(".divPageLoading").remove();
        });
    },
    BindChildNodeByFolderId: function (id, isFolder, name, SPPath, obj) {
        if (isFolder == "true") {
            $(attachmentSelector.DivFolderPathObj).append("<span> >> </span><a href='javascript:void(0)' onclick='GetChildFolderByPId(" + id + "\"" + SPPath + "\",this)'>" + name + "</a>");
            attachmentSelector.GetChildFolderByPId(id, SPPath, "");
        }
        else if (isFolder == "false") {
            var pathUrl = $(obj).find(".url").val();
            var uniqueID = $(obj).find(".uniqueID").val();
            if (!attachmentSelector.IsHaveFile(uniqueID)) {
                var fileInfo = { id: id, name: name, IsFolder: isFolder, URL: pathUrl, UniqueID: uniqueID };
                $(attachmentSelector.FolderListObj).tokenInput("add", fileInfo);
            }
        }
    },
    IsHaveFile: function (newId) {
        var list = $(attachmentSelector.FolderListObj).tokenInput("get");
        if (list.length > 0) {
            var ishave = false;
            $(list).each(function (index, item) {
                if (item.UniqueID == newId) {
                    ishave = true;
                }
            });
            return ishave;
        }
        else {
            return false;
        }
    },
    GetChildFolderByPId: function (pid, sppath, obj) {
        if (obj != "") {
            $(obj).nextAll().remove();
        }
        attachmentSelector.NowFolderPath = sppath;
        attachmentSelector.NowFolderId = pid;
        //遮罩
        $(attachmentSelector.DivFolderInfoObj).append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
            "<img src='/images/throbber.gif' alt='Loading' />" +
            "</div>");
        $(attachmentSelector.DivFolderInfoObj).addClass("divOverlay");
        $.get("/api/attachment?foldId=" + pid, function (data) {
            if (data != "") {
                var childlist = JSON.parse(data);
                $(attachmentSelector.DivTopFoldersObj).html("");
                $(attachmentSelector.DivTopFoldersObj).html($("#rootTemp").render(childlist));
            }

            $(attachmentSelector.DivFolderInfoObj).removeClass("divOverlay");
            $(".divPageLoading").remove();
        });
    },
    SaveFolderInfo: function () {
        var tokenlist = $(attachmentSelector.FolderListObj).tokenInput("get");
        if (tokenlist.length == 0) {
            alert("保存列表不能为空！");
            return false;
        }

        var filelist = new Array();
        $(tokenlist).each(function (index, item) {
            var attachemnt = new Object();
            attachemnt["IsFolder"] = item.IsFolder == "true" ? true : false;
            attachemnt["FileName"] = item.name;
            attachemnt["FilePath"] = item.URL;
            attachemnt["ExternalId"] = item.UniqueID;
            attachemnt["SpId"] = item.id;

            filelist.push(attachemnt);
        });
        var attachmentId;
        if (attachmentSelector.AttachmentIdObj.value == "") {
            attachmentId = null;
        }
        else {
            attachmentId = parseInt(attachmentSelector.AttachmentIdObj.value);
        }
        var list = { attachmentId: attachmentId, files: filelist };

        $.ajax({
            url: '/api/attachment',
            type: "post",
            data: JSON.stringify(list),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $(attachmentSelector.DivFolderInfoObj).dialog("close");
                //带值
                $.get("/api/attachment?filePath=filePath", function (fileUrl) {
                    $.get("/api/attachment?attachmentId=" + parseInt(data), function (list) {
                        var attachList = JSON.parse(list);
                        attachmentSelector.BindAttachmentData(attachmentSelector.DivObj, attachList, fileUrl);
                        var attachmentType = $(attachmentSelector.DivObj.parentElement.parentElement).data("type");
                        attachmentSelector.DoEventHandle(data, attachmentType, filelist);
                        $(attachmentSelector.AttachmentIdObj).val(data);
                    });
                });
            },
            error: function () {
                alert("保存失败!");
            }
        });
    },
    BindAttachmentData: function (item, attachList, fileUrl) {
        $(item).find(".divValue ul").html("");
        $(attachList).each(function (pIndex, pItem) {
            var extensions = (/[.]/.exec(pItem.Name)) ? /[^.]+$/.exec(pItem.Name) : undefined;
            var pclass = "p_" + pItem.Value;
            var xlsClass = "xls2xlsx_" + pItem.Value;
            var removeClass = "sp-delete_" + pItem.Value;
            $(item).find(".divValue ul").append($("#attachmentTemp").render({
                AttachmentFileId: pItem.Value,
                FileName: pItem.Name,
                SPFilePath: fileUrl + encodeURIComponent(pItem["FilePath"])
            }));
            var fileItem = $(item).find(".divValue ul li");
            var pobj = $(fileItem).find("." + pclass);
            var container = $(fileItem).find("." + xlsClass);
            var removeObj = $(fileItem).find("." + removeClass);
            var options = {
                container: $(container),
                attachmentFileId: pItem.Value,
                flowId: attachmentSelector.FlowId,
                actionNodeId: attachmentSelector.ActionNodeId,
                statusChange: function (status, attachmentFileObj) {
                    if (status === XlsToXlsxSetting.StatusEnum.inprogress) {
                        $(removeObj).hide();
                    }
                    else if (status === XlsToXlsxSetting.StatusEnum.success && attachmentFileObj) {
                        $(removeObj).show();
                        $(pobj).text(attachmentFileObj.fileName);
                        $(pobj).removeAttr("onclick");
                        $(pobj).on("click", function () {
                            window.open(attachmentFileObj.spFilePath, '_blank');
                        });
                        $(removeObj).attr("data-fileid", attachmentFileObj.attachmentFileId);
                    }
                    else if (status === XlsToXlsxSetting.StatusEnum.failed) {
                        $(removeObj).show();
                    }
                }
            };
            if (extensions == "xls") {
                $(container).show();
                sgw.Scripts.Load("/ClientJS/WebControllers/XlsToXlsxSetting.js", function () {
                    var setting = new XlsToXlsxSetting(options);
                });
            }
        });
    },
    CloseUploadDialog: function () {
        $(attachmentSelector.DivFolderInfoObj).dialog("close");
    },
    ExcelChangeExtensions: function (objspan) {
        debugger;
        var fileid = $(objspan).data("fileid");
        var objli = $(objspan.parentElement);
        objli.find("span").remove();
        objli.append("<span class='token-input-delete-token-facebook' data-fileid='" + fileid + "'><img style='height:15px;margin:0 5px;' src='/images/icons/loading.gif' /></span>");
        sgw.Ajax.Get({
            url: "/act/AttachmentFile/XlsToXlsxBackendTask?attachmentFileId=" + fileid + "&flowId=" + attachmentSelector.FlowId + "&actionNodeId=" + attachmentSelector.ActionNodeId,
            success: function (result) {
                var item = objli.find("span");
                attachmentSelector.CheckExcelIsChangeExtensions(item[0], result);
            },
            failure: function (message) {
                alert("格式转换失败");
                objli.find("span").remove();
                objli.append("<span class='token-input-delete-token-facebook' data-fileid='" + fileid + "' onclick='attachmentSelector.ExcelChangeExtensions(this)'><i class='icon-spin'></i></span><span class='token-input-delete-token-facebook'  data-fileid='" + fileid + "' onclick='attachmentSelector.RemoveFile(this)'><i class='icon-cancel-2'></i></span>");
            }
        });
    },
    CheckExcelIsChangeExtensions: function (item, taskId) {
        var fileid = $(item).data("fileid");
        var objli = $(item.parentElement);
        sgw.Ajax.Get({
            url: "/act/AttachmentFile/CheckExcelIsChangeExtensions?attachmentFileId=" + fileid + "&taskId=" + taskId,
            success: function (result) {
                if (result.FileUrl) {
                    objli.find("span").remove();
                    objli.find("p").remove();
                    objli.append("<p onclick=\"attachmentSelector.ViewFormFile('" + result.FileUrl + encodeURIComponent(result.FilePath) + "')\">" + result.Name + "</p><span class='token-input-delete-token-facebook'  data-fileid='" + result.Value + "' onclick='attachmentSelector.RemoveFile(this)'><i class='icon-cancel-2'></i></span>");
                }
                else {
                    setTimeout(attachmentSelector.CheckExcelIsChangeExtensions(item, taskId), 1000);
                }
            },
            failure: function (message) {
                alert("格式转换失败");
                objli.find("span").remove();
                objli.append("<span class='token-input-delete-token-facebook' data-fileid='" + fileid + "' onclick='ExcelChangeExtensions(this)'><i class='icon-spin'></i></span><span class='token-input-delete-token-facebook'  data-fileid='" + fileid + "' onclick='RemoveFile(this)'><i class='icon-cancel-2'></i></span>");
            }
        });
    },
    ViewFormFile: function (path) {
        window.open(path, '_blank');
    },
    RemoveFile: function (objFile) {
        debugger;
        var fileid = $(objFile).data("fileid");
        var objli = objFile.parentElement;
        var filePath = $(objli).find("p").text();

        if (confirm("将要删除文件: " + filePath + "。")) {
            if (attachmentSelector.AttachmentRemoveHandle != null && typeof attachmentSelector.AttachmentRemoveHandle == "function") {
                var deleteFileIds = new Array();
                deleteFileIds.push(fileid);
                attachmentSelector.AttachmentRemoveHandle(deleteFileIds, function () {
                    objli.remove();
                });
            }
            else {
                $.ajax({
                    url: "/api/attachmentfile",
                    type: "delete",
                    data: JSON.stringify({ id: fileid }),
                    dataType: "json",
                    contentType: "application/json",
                    success: function () {
                        objli.remove();
                    }
                });
            }
        }
    },
    InitDragDrop: function () {
        $(attachmentSelector.DivTopFoldersObj).on('dragenter dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(attachmentSelector.DivTopFoldersObj).addClass("highlighted");
        });
        $(attachmentSelector.DivTopFoldersObj).on('dragleave', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(attachmentSelector.DivTopFoldersObj).removeClass('highlighted');
        });
        $(attachmentSelector.DivTopFoldersObj).on('drop', function (e) {
            e.preventDefault();
            $(attachmentSelector.DivTopFoldersObj).removeClass('highlighted');
        });
    },
    InitUploader: function () {
        var box = attachmentSelector.DivTopFoldersObj; //拖拽区域   
        $(box).off("drop").on("drop", function (e) {
            e.preventDefault(); //取消默认浏览器拖拽效果 
            var fileList = e.originalEvent.dataTransfer.files; //获取文件对象 
            //检测是否是拖拽文件到页面的操作 
            if (fileList.length == 0) {
                return false;
            }
            var data = new FormData();
            for (i = 0; i < fileList.length; i++) {
                data.append("file" + i, fileList[i]);
            }
            attachmentSelector.UploadFile(data);
        });
    },
    Upload: function () {
        $(attachmentSelector.FileObj).trigger("click");
    },
    ManualUpload: function () {
        var files = $(attachmentSelector.FileObj).get(0).files;
        if (files.length > 0) {
            var data = new FormData();
            for (i = 0; i < files.length; i++) {
                data.append("file" + i, files[i]);
            }
            attachmentSelector.UploadFile(data, true);
        }
    },
    UploadFile: function (data) {
        //遮罩
        $(attachmentSelector.DivFolderInfoObj).append("<div class='divPageLoading' style='text-align:center;z-index: 2000;position: absolute;top: 10%;left:10%;'>" +
            "<img src='/images/throbber.gif' alt='Loading' />" +
            "</div>");
        $(attachmentSelector.DivFolderInfoObj).addClass("divOverlay");
        $.ajax({
            type: "POST",
            url: "/act/AttachmentUpload/FileUpload?spdocumentpath=" + encodeURIComponent(attachmentSelector.NowFolderPath),
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                $(attachmentSelector.DivFolderInfoObj).removeClass("divOverlay");
                $(".divPageLoading").remove();
                if (attachmentSelector.NowFolderPath == "") {
                    attachmentSelector.BindRootFolder();
                } else {
                    attachmentSelector.GetChildFolderByPId(attachmentSelector.NowFolderId, attachmentSelector.NowFolderPath, "");
                }
            },
            error: function (messages) {
                alert("上传失败");
                $(attachmentSelector.DivFolderInfoObj).removeClass("divOverlay");
                $(".divPageLoading").remove();
            }
        });
    },
    InitFileQueueDragDrop: function (divItem) // todo:外侧给attachment id
    {
        attachmentSelector.DivObj = $(divItem).find(".FileQueue");
        attachmentSelector.AttachmentIdObj = $($(divItem).parent()).find("input[type='hidden']");
        $(attachmentSelector.DivObj).on('dragenter dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(e.originalEvent.currentTarget).addClass("highlighted");
        });
        $(attachmentSelector.DivObj).on('dragleave', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(e.originalEvent.currentTarget).removeClass('highlighted');
        });

        //阻止浏览器默认行。 
        $(document).on({
            dragleave: function (e) {    //拖离 
                e.preventDefault();
            },
            drop: function (e) {  //拖后放 
                e.preventDefault();
            },
            dragenter: function (e) {    //拖进 
                e.preventDefault();
            },
            dragover: function (e) {    //拖来拖去 
                e.preventDefault();
            }
        });
        var me = this;
        $(attachmentSelector.DivObj).off("drop").on("drop", function (e) {
            debugger;
            var me = this;
            e.preventDefault(); //取消默认浏览器拖拽效果 
            $(e.originalEvent.currentTarget).removeClass('highlighted');
            var fileList = e.originalEvent.dataTransfer.files; //获取文件对象 
            // todo: 如何取到AttachmentId的方法在Flow.js中赋予
            var id = "";
            if (attachmentSelector.GetAttachmentId && typeof attachmentSelector.GetAttachmentId === "function") {
                id = attachmentSelector.GetAttachmentId(e.originalEvent.currentTarget);
            }
            var divFileQueueObj = e.originalEvent.currentTarget;
            var attachmentId;
            if (id == "") {
                attachmentId = null;
            }
            else {
                attachmentId = id;
            }
            //检测是否是拖拽文件到页面的操作 
            if (fileList.length == 0) {
                return false;
            }
            var data = new FormData();
            var loadData = new Array();
            for (i = 0; i < fileList.length; i++) {
                var obj = new Object();
                obj["FileName"] = fileList[i].name;
                data.append("file" + i, fileList[i]);
                loadData.push(obj);
            }
            $(divFileQueueObj).find(".divValue ul").append($("#attachmentLoadingTemp").render(loadData));
            $.ajax({
                type: "POST",
                url: "/act/AttachmentUpload/FileQueueUpload?attachmentId=" + attachmentId,
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    $.get("/api/attachment?filePath=filePath", function (fileUrl) {
                        $.get("/api/attachment?attachmentId=" + result, function (list) {
                            var attachList = JSON.parse(list);
                            attachmentSelector.BindAttachmentData(divFileQueueObj, attachList, fileUrl);
                            // todo: Flow.js 将 自身的方法赋予RaiseAttachmentId，用于将AttachmentId 赋给 Hidden
                            if (attachmentSelector.RaiseAttachmentId && typeof attachmentSelector.RaiseAttachmentId === "function") {
                                attachmentSelector.RaiseAttachmentId(me, result);
                            }
                        });
                    });
                },
                error: function (messages) {
                    alert("上传失败");
                    $(divFileQueueObj).find(".divValue ul .li-loading").remove();
                }
            });
        });

    },    
    NowFolderPath: "",
    NowFolderId: "",
    DivObj: null,
    FileObj: null,
    AttachmentIdObj: null,
    DivFolderInfoObj: null,
    DivFolderPathObj: null,
    DivTopFoldersObj: null,
    FolderListObj: null,
    FlowId: "",
    ActionNodeId: "",
    AttachmentAddHandle: null,
    AttachmentRemoveHandle: null,
    NextHandle: null,
    DoEventHandle: function (attachId, attachmentType, attachmentFiles) {
        if (attachmentSelector.NextHandle != null && typeof attachmentSelector.NextHandle === "function") {
            attachmentSelector.NextHandle();
        }
        if (attachmentSelector.AttachmentAddHandle != null && typeof attachmentSelector.AttachmentAddHandle === "function" && attachmentType) {
            attachmentSelector.AttachmentAddHandle(attachId, attachmentFiles, attachmentType);
        }
    }
}
