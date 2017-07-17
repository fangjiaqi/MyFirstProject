/// <reference path="../WebControllers/NextOperationSelector.js" />

var __localFieldTypeKey = "sgw_dataframe_localfieldtypekey";
var __sgwCache = {};
var __hasStayInWebApp = false;

var sgw = {
    Actions: {
        Return: function (returnKey) {
            if (!returnKey) {
                returnKey = "returnUrl";
            }
            if (GetUrlParms && typeof (GetUrlParms) == "function") {
                var params = GetUrlParms();
                if (params[returnKey] && params[returnKey].length) {
                    window.location.href = params[returnKey];
                } else {
                    window.history.go(-1);
                }
            } else {
                window.history.go(-1);
            }
        },
        StayInWebApp: function () {
            if (!__hasStayInWebApp) {
                __hasStayInWebApp = true;
                $.getScript("/js/jquery/jquery.stayInWebApp.js", function () {
                    $.stayInWebApp();
                });
            }
        }
    },
    Ajax: {
        /*
            option: {
                url: web api url,
                async: true for async ajax call, false for sync ajax call,
                success: function handler if response.status = "success",
                warning: function handler if response.status = "warning",
                failure: function handler if response.status = "failure",
                showMask: true for show waiting dialog, false for not show,
                waitingMessage: text message if show waiting mask,
                maskElement: show waiting mask on element,
                showServerError: show error message from server
            }
        */
        Get: function (option) {
            console.log("sgwAjax.Get Method:");
            console.log(option);

            var maskObj = null;

            var ajaxCall = function () {
                $.ajax({
                    url: option.url,
                    async: option.async ? true : option.async,
                    method: "GET",
                    success: function (result) {
                        console.log("ajax response: ");
                        console.log(result);
                        option.showMask && sgw.Mask.off();
                        if (result.Status == "success") {
                            if (option.success && typeof (option.success) === "function") {
                                option.success(result.Result);
                            }
                        } else if (result.Status == "warning") {
                            if (option.warning && typeof (option.warning) === "function") {
                                option.warning(result.Message);
                            }
                        } else {
                            if (option.failure && typeof (option.failure) === "function") {
                                option.failure(result.Message);
                            } else {
                                sgw.Message.error(result.Message);
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        option.showMask && sgw.Mask.off();

                        console.log("XMLHttpRequest=" + XMLHttpRequest);
                        console.log("textStatus=" + textStatus);
                        console.log("errorThrown=" + errorThrown);
                        if (option.failure && typeof (option.failure) === "function") {
                            option.failure(textStatus);
                        }
                    }
                });
            };
            if (option.showMask) {
                sgw.Mask.on(option.waitingMessage, ajaxCall);
            } else {
                ajaxCall();
            }
        },
        Delete: function (option) {
            console.log("Delete Method:");
            console.log(option);

            var ajaxCall = function () {
                $.ajax({
                    url: option.url,
                    async: option.async ? true : option.async,
                    method: "DELETE",
                    success: function (result) {
                        console.log("ajax response: " + result);
                        option.showMask && sgw.Mask.off();

                        if (result.Status == "success") {
                            if (option.success && typeof (option.success) === "function") {
                                option.success(result.Result);
                            }
                        } else if (result.Status == "warning") {
                            if (option.warning && typeof (option.warning) === "function") {
                                option.warning(result.Message);
                            }
                        } else {
                            if (option.failure && typeof (option.failure) === "function") {
                                option.failure(result.Message);
                            } else {
                                sgw.Message.error(result.Message);
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        option.showMask && sgw.Mask.off();

                        console.log("XMLHttpRequest=" + XMLHttpRequest);
                        console.log("textStatus=" + textStatus);
                        console.log("errorThrown=" + errorThrown);
                        if (option.failure && typeof (option.failure) === "function") {
                            option.failure(textStatus);
                        }
                    }
                });
            }

            if (option.showMask) {
                sgw.Mask.on(option.waitingMessage, ajaxCall);
            } else {
                ajaxCall();
            }
        },
        Post: function (option) {
            console.log("ajax request: " + option);
            var ajaxCall = function () {
                $.ajax({
                    url: option.url,
                    async: option.async ? true : option.async,
                    method: "post",
                    data: option.data,
                    datatype: "json",
                    contentType: "application/json",
                    success: function (result) {
                        option.showMask && sgw.Mask.off();

                        console.log("ajax response: ");
                        console.log(result);
                        if (result.Status == "success") {
                            if (option.success && typeof (option.success) === "function") {
                                option.success(result.Result);
                            }
                        } else if (result.Status == "warning") {
                            if (option.warning && typeof (option.warning) === "function") {
                                option.warning(result.Message);
                            }
                        } else {
                            if (option.failure && typeof (option.failure) === "function") {
                                option.failure(result.Message);
                            } else {
                                sgw.Message.error(result);
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        option.showMask && sgw.Mask.off();

                        console.log("XMLHttpRequest=" + XMLHttpRequest);
                        console.log("textStatus=" + textStatus);
                        console.log("errorThrown=" + errorThrown);
                        if (option.failure && typeof (option.failure) === "function") {
                            option.failure(textStatus);
                        }
                    }
                });
            }

            if (option.showMask) {
                sgw.Mask.on(option.waitingMessage, ajaxCall);
            } else {
                ajaxCall();
            }
        },
        PostFiles: function (option) {
            console.log("ajax PostFiles request: " + option);
            var ajaxCall = function () {
                $.ajax({
                    type: "POST",
                    url: option.url,
                    contentType: false,
                    processData: false,
                    data: option.data,
                    success: function (result) {
                        option.showMask && sgw.Mask.off();
                        console.log("ajax response");
                        console.log(result);
                        if (result && result.Status) {
                            if (result.Status == "success") {
                                if (option.success && typeof (option.success) === "function") {
                                    if (result.Result) {
                                        option.success(result.Result);
                                    } else {
                                        option.success(result);
                                    }
                                }
                            } else if (result.Status == "warning") {
                                if (option.warning && typeof (option.warning) === "function") {
                                    option.warning(result.Message);
                                }
                            } else {
                                if (option.failure && typeof (option.failure) === "function") {
                                    option.failure(result.Message);
                                } else {
                                    sgw.Message.error(result);
                                }
                            }
                        } else {
                            option.success(result);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        option.showMask && sgw.Mask.off();

                        console.log("XMLHttpRequest=" + XMLHttpRequest);
                        console.log("textStatus=" + textStatus);
                        console.log("errorThrown=" + errorThrown);
                        if (option.failure && typeof (option.failure) === "function") {
                            option.failure(textStatus);
                        }
                   }
                })
            }

            if (option.showMask) {
                sgw.Mask.on(option.waitingMessage, ajaxCall);
            } else {
                ajaxCall();
            }
       },
        Upload: function(option){
            console.log("ajax request: " + option);
            var ajaxCall = function () {
                $.ajax({
                    url: option.url,
                    async: option.async ? true : option.async,
                    type: "post",
                    data: option.data,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        option.showMask && sgw.Mask.off();

                        console.log("ajax response: ");
                        console.log(result);
                        if (result.Status == "success") {
                            if (option.success && typeof (option.success) === "function") {
                                option.success(result.Result);
                            }
                        } else if (result.Status == "warning") {
                            if (option.warning && typeof (option.warning) === "function") {
                                option.warning(result.Message);
                            }
                        } else {
                            if (option.failure && typeof (option.failure) === "function") {
                                option.failure(result.Message);
                            } else {
                                sgw.Message.error(result.Message);
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        option.showMask && sgw.Mask.off();

                        console.log("XMLHttpRequest=" + XMLHttpRequest);
                        console.log("textStatus=" + textStatus);
                        console.log("errorThrown=" + errorThrown);
                        if (option.failure && typeof (option.failure) === "function") {
                            option.failure(textStatus);
                        }
                    }
                });
            }

            if (option.showMask) {
                sgw.Mask.on(option.waitingMessage, ajaxCall);
            } else {
                ajaxCall();
            }
        }
    },
    Animate: {
        show: function (element, timeSpan) {
            var nextHandler = null;

            $(element).css({ "opacity": "0" });
            $(element).show();

            $(element).animate({
                "opacity": 1
            }, timeSpan ? timeSpan : 300, function () {
                nextHandler && typeof (nextHandler) === "function" && nextHandler();
            });

            return {
                done: function (next) {
                    next && typeof (next) === "function" && (function () {
                        nextHandler = next;
                    })();
                }
            };
        },
        hide: function (element, timeSpan) {
            var nextHandler = null;

            $(element).css({ "opacity": "1" });
            $(element).show();

            $(element).animate({
                "opacity": 0
            }, timeSpan ? timeSpan : 300, function () {
                $(element).hide();
                nextHandler && typeof (nextHandler) === "function" && nextHandler();
            });

            return {
                done: function (next) {
                    next && typeof (next) === "function" && (function () {
                        nextHandler = next;
                    })();
                }
            };
        }
    },
    Approval: {
        /*
            option: {
                approvalCategory: web api 名称，例如：ApprovalFlow(WebApi类为ApprovalFlowController)
                id: 参数Id
            }
         */
        Dialog: function (option) {
            var DIALOG_SCREEN_WIDTH = 800;
            var DIALOG_SCREEN_HEIGHT = 600;


            var showDialog = function (url) {
                var bWidth = document.body.clientWidth;
                var bHeight = document.body.clientHeight;

                width = bWidth * 0.8;
                if (width < DIALOG_SCREEN_WIDTH) {
                    width = DIALOG_SCREEN_WIDTH;
                }

                height = bHeight * 0.8;
                if (height < DIALOG_SCREEN_HEIGHT) {
                    height = DIALOG_SCREEN_HEIGHT;
                }

                var approvalDlg = $("<iframe></iframe>");
                approvalDlg.attr("id", "appproval_" + (new Date()).valueOf());
                approvalDlg.attr("src", url);
                approvalDlg.css({ "width": width + "px", "height": height + "px" });
                approvalDlg.css({ "border": "none" });

                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: "审批记录单",
                    width: width,
                    height: height,
                    padding: 0,
                    content: $(approvalDlg).clone(),
                    onShow: function (_dialog) {
                        if (option.showHandler && typeof (option.showHandler) === "function") {
                            option.showHandler(_dialog);
                        }
                    }
                });
            }

            var url = "/Views/Approval/ApprovalView.html?category=" + option.approvalCategory + "&id=" + option.id;
            showDialog(url);
        }
    },
    Archives: {
        LeftTree: {
            IsClassify: "1",// 下级分类
            IsFolder: "2"// 文件夹
        }
    },
    Business: {
        Base: {
            Get: function (url) {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Get({
                        url: url,
                        success: function (result) {
                            deferred.resolve(result);
                        }
                    });
                });
            },
            Post: function (url, data) {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Post({
                        url: url,
                        data: JSON.stringify(data),
                        success: function (result) {
                            return deferred.resolve(result);
                        }
                    });
                });
            }
        },
        IsEditableByFlowStatus: function (propertyTypeName, businessDataId, nextHandler, businessDataURL, businessDataPath) {
            var url = "/api/SaleCommon";
            var path = "/Views/Sale/NoEditablePopup.html";
            if (businessDataURL) url = businessDataURL;
            if (businessDataPath) path = businessDataPath;
            sgw.Mask.on();
            sgw.Ajax.Get({
                url: url + "?typeName=" + encodeURIComponent(propertyTypeName) + "&businessDataId=" + businessDataId,
                success: function (result) {
                    sgw.Mask.off();
                    if (result) {
                        if (nextHandler) {
                            nextHandler();
                        }
                    } else {
                        $.Dialog({
                            shadow: true,
                            overlay: true,
                            draggable: true,
                            dialogClass: "no-close",
                            overlayClickClose: false,
                            title: '无法编辑此数据',
                            width: 600,
                            height: '600',
                            padding: 10,
                            content: '<iframe style="width:600px;height:550px;border:none;" src="' + path + '?id=' + businessDataId + '&pt=' + encodeURIComponent(propertyTypeName) + '"></iframe>',
                            sysButtons: {
                                btnClose: false
                            }
                        });
                    }
                }
            });
        },
        GenerateFlowForBusiness: function (urlForToken) {
            sgw.Mask.on();
            sgw.Ajax.Get({
                url: urlForToken,
                success: function (result) {
                    sgw.Mask.off();

                    $.Dialog({
                        shadow: true,
                        overlay: true,
                        draggable: true,
                        overlayClickClose: false,
                        title: '快速创建审批流程',
                        width: 600,
                        height: '600',
                        padding: 10,
                        content: '<iframe style="width:600px;height:550px;border:none;" src="/Views/Flow/CreateFlowWithAttach.html?token=' + result + '"></iframe>',
                        sysButtons: {
                            btnClose: true,
                        },
                        sysBtnCloseClick: function (event) {
                            $.Dialog.close();
                        }
                    });
                },
                error: function (textStatus) {
                    alert(textStatus);
                    $.Dialog.close();
                }
            });
        },
        RefreshFlow: function (urlForRefresh, urlForAfterRefresh) {
            sgw.Mask.on();
            sgw.Ajax.Get({
                url: urlForRefresh,
                success: function (result) {
                    sgw.Mask.off();

                    if (result && result.length) {
                        var flowId = result[0].Id;
                        $.Dialog({
                            shadow: true,
                            overlay: true,
                            draggable: true,
                            overlayClickClose: false,
                            title: '表单更新',
                            width: 600,
                            height: '600',
                            padding: 10,
                            content: '<iframe style="width:600px;height:550px;border:none;" src="' + urlForAfterRefresh + '"></iframe>',
                            sysButtons: {
                                btnClose: true,
                            },
                            sysBtnCloseClick: function (event) {
                                $.Dialog.close();
                            }
                        });
                    }
                },
                error: function (textStatus) {
                    alert(textStatus);
                    $.Dialog.close();
                }
            });
        },
        AfterSave: function (businessDataId, businessDataPropertyType, businessDataPath, businessReturnPath) {
            var path = "/Views/Sale/AfterSavePopup.html";
            var returnpath = "";
            if (businessDataPath) path = businessDataPath;
            if (businessReturnPath) returnpath = businessReturnPath;
            $.Dialog({
                shadow: true,
                overlay: true,
                draggable: true,
                dialogClass: "no-close",
                overlayClickClose: false,
                title: '保存成功！',
                width: 600,
                height: '600',
                padding: 10,
                content: '<iframe style="width:600px;height:550px;border:none;" src="' + path + '?id=' + businessDataId + '&pt=' + encodeURIComponent(businessDataPropertyType) + returnpath + '"></iframe>',
                sysButtons: {
                    btnClose: false
                }
            });
        },
        RenderFlowStatusInListPage: function (flowFields, noflowTmpl, newFlowTmpl, getBusinessDataId, BusinessDataType) {
            $.each(flowFields, function (index, item) {
                var idElement = getBusinessDataId(item);
                if ($(item).data("property-value")) {
                    var flowId = $(item).data("property-value");
                    sgw.Ajax.Get({
                        url: "/api/flow?flowById=" + flowId,
                        success: function (result) {
                            var flow = result;

                            if (flow == null || flow.Id <= 0) {
                                var objectId = $(idElement).val();
                                if (BusinessDataType) {
                                    $(item).html($(noflowTmpl).render({ Id: objectId }));
                                }
                                else {
                                    $(item).html($(noflowTmpl).render({ ObjectId: objectId }));
                                }
                            } else {
                                if (BusinessDataType) {
                                    $(item).html($(newFlowTmpl).render({ FlowId: flow.Id }));
                                } else {
                                    $(item).html($(newFlowTmpl).render({ Value: flow.Id }));
                                }
                                if (flow.Status == 0) {
                                    $(item).find(".description").text("审批状态：未发起");
                                } else if (flow.Status == 1) {
                                    $(item).find(".description").text("审批状态：已发起");
                                } else if (flow.Status == 2) {
                                    $(item).find(".description").text("审批状态：已结束");
                                }
                            }
                        }
                    });

                } else {
                    var objectId = $(idElement).val();
                    if (BusinessDataType) {
                        $(item).html($(noflowTmpl).render({ Id: objectId }));
                    }
                    else {
                        $(item).html($(noflowTmpl).render({ Objectid: objectId }));
                    }
                }
            });
        },
        Attachment: {
            NewAttachmentId: function () {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Get({
                        url: "/act/AttachmentUpload/NewAttachmentId",
                        success: function (result) {
                            deferred.resolve(result);
                        }
                    });
                });
            },
            ListByAttachmentId: function (attachmentId) {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Get({
                        url: "/act/AttachmentFile/ListByAttachmentId?attachmentId=" + attachmentId,
                        success: function (result) {
                            deferred.resolve(result);
                        }
                    });
                });
            },
            ListWithFileURLByAttachmentId: function (attachmentId) {
                return sgw.Business.Base.Get("/act/AttachmentFile/ListWithFileURLByAttachmentId?attachmentId=" + attachmentId)
            },
            SaveDocList: function (attachmentId, files) {
                var parameter = {
                    attachmentId: attachmentId,
                    files: files
                };
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Post({
                        url: "/act/AttachmentFile/SaveDocList",
                        data: JSON.stringify(parameter),
                        success: function (result) {
                            return deferred.resolve(result);
                        }
                    });
                });
            },
            SortAttachmentFiles: function (sortListData) {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Post({
                        url: "/act/AttachmentFile/SortAttachmentFiles",
                        data: JSON.stringify(sortListData),
                        success: function (result) {
                            return deferred.resolve(result);
                        }
                    });
                });
            },
            DeleteAttachmentFile: function (attachmentFileId, attachmentId, attachmentFileName) {
                var parameter = {
                    attachmentFileId: attachmentFileId,
                    attachmentId: attachmentId,
                    attachmentFileName: attachmentFileName
                };
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Post({
                        url: "/act/AttachmentFile/DeleteAttachmentFile",
                        data: JSON.stringify(parameter),
                        success: function (result) {
                            return deferred.resolve(result);
                        }
                    })
                });
            },
            CloneByAttachmentId: function (attachmentId) {
                var parameter = {
                    attachmentId: attachmentId
                };
                return sgw.Business.Base.Post("/act/AttachmentFile/CloneByAttachmentId", parameter);
            }
        },
        Mission: {
            AddFlowtoMission: function (missionId, flowId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/AddFlowToMission?missionId=" + missionId + "&flowId=" + flowId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    });
                });
            },
            CheckDownloadMissionPermission: function () {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/Mission/CheckDownloadMissionPermission",
                        success: function (result) {
                            dtd.resolve(result);
                        },
                        failure: function (message) {
                            console.log(message);
                        }
                    });
                });
            },
            DeleteFlowFromMission: function (missionId, flowId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/DeleteFlowFromMission?missionId=" + missionId + "&flowId=" + flowId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            DeleteFlowPropertyFromMission: function (missionId, flowId, propertyId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/DeleteFlowPropertyFromMission?missionId=" + missionId + "&flowId=" + flowId + "&propertyId=" + propertyId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            DeleteFlowFileFromMission: function (missionId, attachmentFileId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/DeleteFlowFileFromMission?missionId=" + missionId + "&attachmentFileId=" + attachmentFileId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            DownloadFileByMissionId: function (missionId) {
                sgw.Business.Mission.GetMissionDownloadUrl(missionId).done(function (url) {
                    $("body").append($("<iframe src='" + url + "' style='display:none'></iframe>"));
                });
                //var downloadPath = "/act/Mission/DownloadFileByMissionId?missionId=" + missionId;
                //$("body").append($("<iframe src='" + downloadPath + "' style='display:none'></iframe>"));
            },
            DownloadFileByFileName: function (fileName, missionId) {
                var downloadPath = "/dwn/Mission/DownloadFileByFileName/" + fileName + "?missionId=" + missionId;
                $("body").append($("<iframe src='" + downloadPath + "' style='display:none'></iframe>"));
            },
            GetMissionStatus: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/Mission/GetMissionStatus?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            GetMission: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/Mission/GetData?Id=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    });
                });
            },
            GetMissionDownloadUrl: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/Mission/GetMissionDownloadUrl?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    });
                });
            },
            ListToWorkbench: function () {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/Mission/ListToWorkbench",
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    });
                });
            },
            MissionStart: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionStart?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            MissionContinue: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionContinue?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            MissionToPause: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionToPause?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            MissionReAdd: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionReAdd?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            MissionDelete: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionDelete?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve();
                        }
                    })
                });
            },
            MissionArchive: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionArchive?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve();
                        }
                    })
                });
            },
            MissionCancelToCreating: function (missionId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/MissionCancelToCreating?missionId=" + missionId,
                        success: function (result) {
                            dtd.resolve();
                        }
                    })
                });
            },
            MissionSave: function (mission) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/SaveData",
                        data: JSON.stringify(mission),
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })

                });
            },
            NewMission: function (data) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Post({
                        url: "/act/Mission/NewMission",
                        data: JSON.stringify(data),
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            WaitToStatusChange: function (missionId, nowStatus, interval) {

                var checkStatus = function (mId, ts, deferred) {
                    sgw.Business.Mission.GetMissionStatus(mId).done(function (newStatus) {
                        if (newStatus === ts) {
                            setTimeout(function () {
                                checkStatus(mId, ts, deferred);
                            }, interval || 1000);
                        } else {
                            sgw.Business.Mission.GetMission(missionId).done(function (mission) {
                                deferred.resolve(mission);
                            });
                        }
                    })
                }

                return sgw.Utilities.Deferred(function (dtd) {
                    checkStatus(missionId, nowStatus, dtd);
                });
            },
        },
        Module: {
            GetBusinessModuleByFlowNodeId: function (flowNodeId, nextHandle) {
                sgw.Ajax.Get({
                    url: "/api/BusinessModule/GetByFlowNodeId?flowNodeId=" + flowNodeId,
                    success: function (result) {
                        if (nextHandle) {
                            nextHandle(result);
                        }
                    }
                });
            },
            GetFunctionsByModuleId: function (businessModuleId, nextHandle) {
                sgw.Ajax.Get({
                    url: "/api/BusinessModuleFunction/GetByBusinessModuleId?businessModuleId=" + businessModuleId,
                    success: function (result) {
                        if (nextHandle) {
                            nextHandle(result);
                        }
                    }
                });
            },
            GetActionNodeRedirection: function (actionNodeId, nextHandle) {
                //sgw.Mask.on();
                sgw.Ajax.Get({
                    url: "/api/BusinessModuleFunction/GetActionNodeRedirection?actionNodeId=" + actionNodeId + "&returnUrl=" + encodeURIComponent($(location).attr('href')),
                    async: false,
                    success: function (result) {
                        if (result && result.length) {
                            if (nextHandle && typeof (nextHandle) === "function") {
                                nextHandle(result);
                            } else {
                                window.location.href = result;
                            }
                        } else {
                            //sgw.Mask.off();
                        }
                    }
                });
            }
        },
        Flow: {
            /*
             * 针对流程附件操作写入流程日志
             */
            FlowAttachmentAudit: function (ctrl, attachmentTypeName, flowId, actionNodeId) {
                if (ctrl && ctrl.event && flowId) {
                    ctrl.event.on("attach", function (e) {
                        sgw.Business.Flow.FlowAudit(flowId, actionNodeId, "添加了" + attachmentTypeName + "：" + e.files.join("，"));
                    }).event.on("disattach", function (e) {
                        sgw.Business.Flow.FlowAudit(flowId, actionNodeId, "删除了" + attachmentTypeName + "：" + e.files.join("，"));
                    }).event.on("order", function (e) {
                        sgw.Business.Flow.FlowAudit(flowId, actionNodeId, "调整了" + attachmentTypeName + "的顺序：" + e.files.join("，"));
                    });
                }
            },
            /*
             * 写入流程日志
             */
            FlowAudit: function (flowId, actionNodeId, content) {
                var parameter = {
                    flowId: flowId,
                    actionNodeId: actionNodeId,
                    content: content
                };
                return sgw.Business.Base.Post("/act/FlowAudit/Audit", parameter);
            },
            /*
             * get the first node Id of the flow
             */ 
            GetFirstNodeId: function (flowId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    $.get("/api/workflow?flowId=" + flowId, function (data) {
                        dtd.resolve(data);
                    });
                });
            },
            /*
             * Get the flow's template's node' id
             */
            GetFlowNodeIdByActionNodeId: function (actionNodeId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/ActionNode/GetFlowNodeIdByActionNodeId?actionNodeId=" + actionNodeId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            /*
             * Get the node data of flow template by flow template id
             */
            GetFlowTemplateNodeDataByFlowTemplateId: function (flowTemplateId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/V2FlowTemplateNode/GetByFlowTemplateId?flowTemplateId=" + flowTemplateId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            /*
             * List next nodes info
             */
            GetNextNodesDataByNodeId: function (flowId, nodeId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/MyWork/GetNextNodesDataByNodeId?flowId=" + flowId + "&currentNodeId=" + nodeId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            /*
             * list the next nodes of the node in the flow
             */
            ListNextNodes: function (flowId, nodeId) {
                return sgw.Utilities.Deferred(function (dfd) {
                    sgw.Ajax.Get({
                        url: "/act/Workflow/ListNextNodes?flowId=" + flowId + "&nodeId=" + nodeId,
                        success: function (result) {
                            dfd.resolve(result);
                        }
                    })
                });
            },
            /*
             * list the JBRs of the node in the flow
             */
            ListNodeJBRs: function (flowId, nodeId) {
                return sgw.Utilities.Deferred(function (dfd) {
                    $.ajax({
                        url: "/act/MyWork/GetIsHaveJBR?flowId=" + flowId + "&nextNodeId=" + nodeId + "&actionNodeId=0",
                        type: "get",
                        success: function (result) {
                            var data = JSON.parse(result);
                            dfd.resolve(data);
                        }
                    });
                });
            },
            /*
             * Get the pending action nodes of current user for specific flow id
             */
            ListMyPendingActionNodes: function (flowId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/MyWork/ListMyPendingActionNodes?flowId=" + flowId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            },
            /*
             * 取得当前用户待发起的流程
             */
            ListMyFlowsToStart: function () {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/MyWork/ListMyFlowsToStart",
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    });
                })
            },
            /*
             * start flow
             */
            StartFlow: function (flowId, startNodeId, nextNodeId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    $.ajax({
                        url: "../../api/workflow?flowId=" + flowId + "&startNodeId=" + startNodeId + "&nextNodeId=" + nextNodeId,
                        type: "get",
                        success: function (data) {
                            dtd.resolve();
                        },
                        error: function () {
                            alert("工作流发起失败!");
                        }
                    });

                })
            },
            /*
             * Update the JBRs of the node in the flow
             */
            UpdateFlowNodeJBR: function (flowId, nodeId, personId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    var postObj = {
                        NodeId: nodeId,
                        FlowId: flowId,
                        PersonId: personId
                    };

                    $.ajax({
                        url: "/api/FlowNodeAssignee",
                        type: "post",
                        data: JSON.stringify(postObj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function () {
                            dtd.resolve();
                        },
                        error: function () {
                            alert("办理失败！");
                        }
                    })
                })
            },
            GetFlowAttachmentFiles: function (flowId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/FlowData/GetFlowAttachmentFiles?flowId=" + flowId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    });
                });
            }
        },
        Library: {
            GetRootFolderItemsForCurrentUser: function () {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Get({
                        url: "/act/library/GetRootFolderItemsForCurrentUser",
                        success: function (result) {
                            deferred.resolve(result);
                        }
                    });
                });
            },
            GetDocumentLibraryFolderItemsForCurrentUser: function (spFolderId) {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.Get({
                        url: "/act/library/GetDocumentLibraryFolderItemsForCurrentUser?spFolderId=" + spFolderId,
                        success: function (result) {
                            deferred.resolve(result);
                        }
                    });
                });
            },
            FilesUpload: function (data, attachmentId) {
                return sgw.Utilities.Deferred(function (deferred) {
                    sgw.Ajax.PostFiles({
                        url: "/act/AttachmentUpload/FilesUpload?attachmentId=" + encodeURIComponent(attachmentId),
                        data: data,
                        success: function (result) {
                            deferred.resolve();
                        }
                    });
                });
            }
        },
        Person: {
            /*
             * check if the person id contains current user id
             * return true/false
             */
            IsPersonContainCurrentUser: function (personId) {
                return sgw.Utilities.Deferred(function (dtd) {
                    sgw.Ajax.Get({
                        url: "/act/PersonUser/IsContainCurrentUser?personId=" + personId,
                        success: function (result) {
                            dtd.resolve(result);
                        }
                    })
                });
            }
        }
    },
    Controller: {
        /*
        fillSetting: {
            valueFieldName: 值列名,
            textFieldName: 文本列名,
            listAjaxUrl: 取得选项列表的Ajax请求地址,
            isFirstEmpty: 首选项是否为空,
            firstDefault: 首选项的显示文本（仅在isFirstEmpty为true时有效）,
            select: 下拉框控件,
            valueForamt: 值格式化方法（若本参数设置，则valueFieldName参数不再有效）,
            textFormat: 显示文本格式化方法（若本参数设置，则textFieldName参数不再有效）
        }
        */
        fillSelect: function (fillSetting) {

            var fdtd = $.Deferred();

            var valueField = "Id";
            var textField = "Name";

            if (fillSetting.valueFieldName && fillSetting.valueFieldName.length) {
                valueField = fillSetting.valueFieldName;
            }

            if (fillSetting.textFieldName && fillSetting.textFieldName.length) {
                textField = fillSetting.textFieldName;
            }

            $(fillSetting.select).empty();
            sgw.Ajax.Get({
                url: fillSetting.listAjaxUrl,
                success: function (result) {
                    if (fillSetting.isFirstEmpty) {
                        if (fillSetting.firstDefault) {
                            $(fillSetting.select).append("<option value=''>" + fillSetting.firstDefault + "</option>");
                        } else {
                            $(fillSetting.select).append("<option value=''></option>");
                        }
                    }

                    if (result && result.length) {
                        $.each(result, function (index, item) {
                            var optionText = null;
                            var optionValue = null;
                            if (fillSetting.valueForamt && typeof (fillSetting.valueForamt) === "function") {
                                optionValue = fillSetting.valueForamt(item);
                            } else {
                                optionValue = item[valueField];
                            }
                            if (fillSetting.textFormat && typeof (fillSetting.textFormat) === "function") {
                                optionText = fillSetting.textFormat(item);
                            } else {
                                optionText = item[textField];
                            }

                            $(fillSetting.select).append("<option value='" + optionValue + "'" + (fillSetting.defaultValue == optionValue ? "selected" : "") + ">" + optionText + "</option>");
                        });
                    }

                    if (fillSetting.nextHandler) {
                        fillSetting.nextHandler(result);
                    }

                    fdtd.resolve();
                }
            });

            return fdtd;
        },
        enterPress: function (input) {
            var button = $(input).data("enter-button");
            if (button && $(button) && $(button).length) {

                $(input).off("keypress");
                $(input).keypress(function (e) {
                    var key = e.which;
                    if (key == 13) { // the enter key code
                        $(button).trigger("click");
                    }
                });
            }
        }
    },
    DataFrame: {
        FieldType: {
            Get: function (fieldTypeId) {
                console.log('DataFrame.FieldType.Get');
                var lc = localStorage.getItem(__localFieldTypeKey);
                if (lc) {
                    lc = JSON.parse(lc);
                    if (lc[fieldTypeId]) {
                        return lc[fieldTypeId];
                    } else {
                        dataFrameFieldTypeLoad(true);
                        lc = localStorage.getItem(__localFieldTypeKey);
                        if (lc) {
                            lc = JSON.parse(lc);
                            return lc[fieldTypeId];
                        }
                    }
                } else {
                    dataFrameFieldTypeLoad(true);
                    lc = localStorage.getItem(__localFieldTypeKey);
                    if (lc) {
                        lc = JSON.parse(lc);
                        return lc[fieldTypeId];
                    }
                }
            },
            _templateTypeName: "template",
            TemplateId: function () {
                var lc = localStorage.getItem(__localFieldTypeKey);
                if (lc && lc.length) {
                    lc = JSON.parse(lc);
                    for (var prop in lc) {
                        prop = lc[prop];
                        if (prop.Name == sgw.DataFrame.FieldType._templateTypeName) {
                            return prop.Id;
                        }
                    }
                }
                return null;
            }
        },
        WebCtrlHelper: {
            /*
             * 返回填充好的options
             */
            FillOptions: function (string) {
                var options = string.split("|");

                var sel = $("<select />");

                $.each(options, function (index, item) {
                    if (item) {
                        if (item.match(/!$/)) {
                            var itemValue = item.slice(0, -1);
                            sel.append($("<option value='" + itemValue + "' selected='selected'>" + itemValue + "</option>"));
                        } else {
                            sel.append($("<option value='" + item + "'>" + item + "</option>"));
                        }
                    } else {
                        sel.append($("<option value=''></option>"));
                    }
                });
                
                return $(sel).html();
            }
        }
    },
    Dialog: {
        /*
        show:option:
            title: 弹出框的显示名称
            width:
            height:
            content:
            showHandler: function(dialog) 弹出框显示后的处理逻辑
        */
        show: function (option) {
            $.Dialog({
                shadow: true,
                overlay: true,
                draggable: true,
                overlayClickClose: false,
                title: option.title,
                width: option.width,
                height: option.height,
                padding: 10,
                content: option.content,
                onShow: function (_dialog) {
                    if (option.showHandler && typeof (option.showHandler) === "function") {
                        option.showHandler(_dialog);
                    }
                }
            });
        },
        NextOperation: function (options) {
            return sgw.Utilities.Deferred(function (dtd) {
                (new window.WebCtrls.NextOperationSelector()).init().done(function (sender) {
                    sender.ShowDialog(options).done(function (result) {
                        dtd.resolve(result);
                    });
                });
            });
        }
    },
    Form: {
        /*
         * form: 表单元素（录入元素所在区域块）
         * data: 填充表单元素的对象
         * updateData: 用于更新的对象。将表单元素的值填入此对象
         * customInputHandler: 自定义的数据显示委托
         * inputMark: 用于选择录入元素的选择器
         * fieldMask: 用于取得表单字段名称的data属性
         */
        Inputs: function (option) {

            var form = option.form;
            var data = option.data;
            var updateData = option.updateData;
            var customInputHandler = option.customInputHandler;
            var inputMark = option.inputMark;
            var fieldMark = option.fieldMark;

            if (!inputMark) {
                inputMark = "[data-action='input']";
            }
            if (!fieldMark) {
                fieldMark = "field";
            }

            var inputElements = $(form).find(inputMark);
            if (inputElements && inputElements.length) {

                if (data) {

                    $.each(inputElements, function (index, item) {
                        $(item).val("");

                        var fieldName = $(item).data(fieldMark);
                        if (fieldName && fieldName.length) {
                            if (data[fieldName]) {
                                $(item).val(data[fieldName]);
                            }
                        }
                    })

                    if (customInputHandler && typeof (customInputHandler) === "function") {
                        data = customInputHandler(data);
                    }

                    console.log("表单数据收集：");
                    console.log(data);

                    return data;

                } else {

                    if (updateData) {
                        data = updateData;
                    } else {
                        data = {};
                    }

                    $.each(inputElements, function (index, item) {
                        var fieldName = $(item).data(fieldMark);
                        if (fieldName && fieldName.length) {

                            var fieldValue = $(item).val();
                            data[fieldName] = fieldValue;
                        }
                    })

                    if (customInputHandler && typeof (customInputHandler) === "function") {
                        data = customInputHandler(data);
                    }

                    console.log("表单数据收集：");
                    console.log(data);

                    return data;
                }

            } else {
                return null;
            }
        },
        OrderConfigClass: "OrderConfigClassName",
        OrderConfig: function (containers, fnGetValue) {
            var selects = [];

            $.each(containers, function (index, item) {
                var valueObj = fnGetValue(item);
                $(item).empty();
                var select = $("<select></select>");
                $(select).attr("id", (new Date()).valueOf() + "_" + index);

                var i = 0;
                for (i = 0; i < containers.length; i++) {
                    var iValue = (i + 1) + "";
                    $(select).append($("<option value='" + iValue + "'>" + iValue + "</option>"));
                }
                $(select).val(valueObj.value);
                $(select).data("value", valueObj.value);
                $(select).data("id", valueObj.id);
                $(select).addClass(sgw.Form.OrderConfigClass);
                $(item).append($(select));

                selects.push($(select));
            });

            $.each(selects, function (index, select) {
                $(select).off("change").change(function () {
                    console.log($(this));

                    var nowValue = $(this).val() * 1;
                    var oldValue = $(this).data("value") * 1;
                    $(this).data("value", $(this).val() * 1);

                    $.each(selects, function (index, oSelect) {
                        if ($(oSelect).attr("id") != $(select).attr("id")) {
                            var oValue = $(oSelect).val() * 1;
                            if (nowValue < oldValue) {
                                if (oValue >= nowValue && oValue < oldValue) {
                                    $(oSelect).val(oValue + 1);
                                    $(oSelect).data("value", $(oSelect).val());
                                }
                            } else { // nowValue > oldValue
                                if (oValue <= nowValue && oValue > oldValue) {
                                    $(oSelect).val(oValue - 1);
                                    $(oSelect).data("value", $(oSelect).val());
                                }
                            }
                        }
                    });
                });
            });
        },
        GetOrderConfig: function (containers) {
            var orderResult = {};
            $.each(containers, function (index, item) {
                var selectControl = $(item).find("." + sgw.Form.OrderConfigClass);
                if (selectControl.length) {

                    var id = $(selectControl).data("id");
                    var order = $(selectControl).val();

                    orderResult[id] = order;

                }
            });
            console.log("排序设定");
            console.log(orderResult);
            return orderResult;
        }
    },
    Link: {
        ViewFlow: function (sender) {
            var flowUrl = "/Views/Flow/FlowDetail.html?Id=" + $(sender).data("flowid");
            window.open(flowUrl, "_blank");
        },
        EditFlow: function (sender) {
            var flowUrl = "/Views/Flow/Flow.html?Id=" + $(sender).data("flowid") + "&flowtype=2";
            window.open(flowUrl, "_blank");
        }
    },
    Load:{
        Css: function (css_url) {
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: css_url
            }).appendTo("head");
        },
        Js: function (js_url) {
            return sgw.Utilities.Deferred(function (dtd) {
                console.log("start loading: " + js_url);
                $.getScript(js_url).done(function (data, textStatus) {
                    //console.log(data);
                    console.log(textStatus);
                    //console.log(jqxhr.status);
                    console.log("Load was performed." + js_url);
                    dtd.resolve();
                }).fail(function (jqxhr, settings, exception) {
                    debugger;
                    console.error("triggered ajaxError handler." + js_url);
                });
            });
        },
        PreWdatePicker: function () {
            if (typeof WdatePicker === "undefined") {
                $.getScript("/js/My97DatePicker/WdatePicker.js").done(function (script, textStatus) {
                    console.log(textStatus);
                });;
            }
        }
    },
    Mask: {
        _doneHandler: null,
        on: function (message, nextHandler) {
            sgw.Mask._doneHandler = null;
            function popup(contentHtml) {
                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: '处理中，这不会花很长时间',
                    width: 'auto',
                    height: 'auto',
                    padding: 10,
                    content: contentHtml,
                    onShow: function (_dialog) {
                        console.log(_dialog);
                    }
                });
            }
            var hidDiv = $("<div></div>");
            $(hidDiv).load("/Views/HtmlSegments/Loading.html", function () {
                if (message && message.length) {
                    $(hidDiv).find(".message").html(message);
                }
                popup($(hidDiv));
                if (nextHandler && typeof (nextHandler) === "function") {
                    nextHandler();
                }
                else if (sgw.Mask._doneHandler && typeof (sgw.Mask._doneHandler) === "function") {
                    sgw.Mask._doneHandler();
                    sgw.Mask._doneHandler = null;
                }
            });
            return sgw.Mask;
        },
        off: function () {
            $.Dialog.close();
        },
        done: function (doneHandler) {
            if (doneHandler && typeof (doneHandler) === "function") {
                sgw.Mask._doneHandler = doneHandler;
            }
        },
        hide: function (element, timeSpan) {
            var nextHandler = null;

            $(element).css({ "opacity": "1" });
            $(element).show();

            $(element).animate({
                "opacity": 0
            }, timeSpan ? timeSpan : 300, function () {
                $(element).hide();
                nextHandler && typeof (nextHandler) === "function" && nextHandler();
            });
            //if (sgw.Message.htmlSegment) {                
            //    popup();
            //} else {
            //    var hidDiv = $("<div style='display:none'></div>");
            //    $(hidDiv).load("/Views/HtmlSegments/ErrorMessage.html", function () {
            //        sgw.Message.htmlSegment = $(hidDiv);
            //        popup();
            //    });
            //}
        },
        tip: function(element, message){
            var messageElement = $("<div class='text-alert'>" + message + "</div>");
            $(element).prepend($(messageElement));
            setTimeout(function () {
                sgw.Animate.hide($(messageElement));
            }, 1000);
        },
        confirm: function (message, nextHandler) {
            function popup(contentHtml) {
                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: '删除数据',
                    width: 'auto',
                    height: 'auto',
                    padding: 10,
                    content: contentHtml,
                    onShow: function (_dialog) {
                        console.log(_dialog);
                    }
                });
            }
            var hidDiv = $("<div></div>");
            $(hidDiv).load("/Views/HtmlSegments/Confirm.html", function () {
                $(hidDiv).find(".message").html(message);
                $(hidDiv).find(".ok").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                    if (nextHandler) {
                        nextHandler();
                    }
                })
                $(hidDiv).find(".cancel").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                });
                popup($(hidDiv));
            });
        },
        actionConfirm: function (message, title, nextHandler, cancelNextHandler) {
            function popup(contentHtml) {
                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: title,
                    width: 'auto',
                    height: 'auto',
                    padding: 10,
                    content: contentHtml,
                    onShow: function (_dialog) {
                        console.log(_dialog);
                    }
                });
            }
            var hidDiv = $("<div></div>");
            $(hidDiv).load("/Views/HtmlSegments/ActionConfirm.html", function () {
                $(hidDiv).find(".message").html(message);
                $(hidDiv).find(".ok").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                    if (nextHandler) {
                        nextHandler();
                    }
                })
                $(hidDiv).find(".cancel").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                    if (cancelNextHandler) {
                        cancelNextHandler();
                    }
                });
                popup($(hidDiv));
            });
        },
        inline: function (options) {
            var loadMask = $('<img style="height:15px;margin:0 5px;" src="../../images/icons/loading.gif" />');
            if (options.sender) {
                $(options.sender).after(loadMask);
                $(options.sender).hide();
            }

            var dtd = null;

            sgw.Utilities.Deferred(function (dfd) {
                options.request(dfd);
            }).then(function () {
                $(loadMask).remove();
                $(options.sender).show();
            });
        }
    },
    Message: {
        htmlSegment: null,
        error: function (message) {
            $(sgw.Message.htmlSegment).html(message);
            function popup(contentHtml) {
                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: '遇到错误',
                    width: 'auto',
                    height: 'auto',
                    padding: 10,
                    content: contentHtml
                });
            }
            var hidDiv = $("<div></div>");
            $(hidDiv).load("/Views/HtmlSegments/ErrorMessage.html", function () {
                if (typeof (message) == "string") {
                    $(hidDiv).find(".message").html(message);
                } else if (typeof (message) == "object") {
                    $(hidDiv).find(".message").html(message.Message);
                    $(hidDiv).find(".errorId").html("error id: " + message.ErrorID);
                }
                popup($(hidDiv));
            });
            //if (sgw.Message.htmlSegment) {                
            //    popup();
            //} else {
            //    var hidDiv = $("<div style='display:none'></div>");
            //    $(hidDiv).load("/Views/HtmlSegments/ErrorMessage.html", function () {
            //        sgw.Message.htmlSegment = $(hidDiv);
            //        popup();
            //    });
            //}
        },
        tip: function (element, message) {
            var messageElement = $("<div class='text-alert'>" + message + "</div>");
            $(element).prepend($(messageElement));
            setTimeout(function () {
                sgw.Animate.hide($(messageElement)).done(function () {
                    $(messageElement).remove();
                });
            }, 3000);
        },
        warningTip: function (element, message) {
            var messageElement = $("<div class='text-warning'>" + message + "</div>");
            $(element).prepend($(messageElement));
            setTimeout(function () {
                sgw.Animate.hide($(messageElement)).done(function () {
                    $(messageElement).remove();
                });
            }, 3000);
        },
        confirm: function (message, nextHandler) {
            function popup(contentHtml) {
                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: '删除数据',
                    width: 'auto',
                    height: 'auto',
                    padding: 10,
                    content: contentHtml,
                    onShow: function (_dialog) {
                        console.log(_dialog);
                    }
                });
            }
            var hidDiv = $("<div></div>");
            $(hidDiv).load("/Views/HtmlSegments/Confirm.html", function () {
                $(hidDiv).find(".message").html(message);
                $(hidDiv).find(".ok").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                    if (nextHandler) {
                        nextHandler();
                    }
                })
                $(hidDiv).find(".cancel").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                });
                popup($(hidDiv));
            });
        },
        /*
  * options: {
  *      message: display string
  *      title: title of open dialog
  *      ok_icon: icon class name of ok button
  *      ok_label: text of ok button
  *      cancel_icon: icon class name of cancel button
  *      cancel_label: text of cancel button
  *      ok_handler: func of clicking ok button
  *      cancel_handler: func of clicking cancel button         
         other_checkbox_title:如果title 有值则显示checkbox,
         height: the height of the dialog
  * }
  */
        confirmEx: function (options) {
            if (!options.height) {
                options.height=300
            }   
            if (!options.width) {
                options.width = 'auto'
            } 
            function popup(contentHtml) {
                $.Dialog({
                    shadow: true,
                    overlay: true,
                    draggable: true,
                    overlayClickClose: false,
                    title: options.title,
                    width: options.width,
                    height: options.height,
                    padding: 10,
                    content: contentHtml,
                    sysBtnCloseClick: function (event) {
                        $.Dialog.close();
                        if (options.cancel_handler && typeof options.cancel_handler === "function") {
                            options.cancel_handler();
                        }
                    },
                    onShow: function (_dialog) {
                        console.log(_dialog);
                    }
                });
            }
            var hidDiv = $("<div></div>");
            $(hidDiv).load("/Views/HtmlSegments/Confirm.html", function () {                
                if (options.other_checkbox_title) {
                    var chkBox = "<br/><br/><input type='checkbox' id='chkDele' class='chkWH20' value='1'>" + options.other_checkbox_title
                    $(hidDiv).find(".message").html(options.message + chkBox);
                } else
                {
                    $(hidDiv).find(".message").html(options.message);
                }
                $(hidDiv).find(".ok").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                    if (options.ok_handler && typeof options.ok_handler === "function") {
                        if (options.other_checkbox_title) {
                            var chkSelected=$(hidDiv).find(".message").find(".chkDele").is(':checked');
                            options.ok_handler(chkSelected)
                        } else
                        {
                            options.ok_handler();
                        }
                    }
                });
                if (options.ok_icon && options.ok_icon.length) {
                    $(hidDiv).find(".ok i").attr("class", options.ok_icon);
                }
                if (options.ok_label && options.ok_label.length) {                   
                    $(hidDiv).find(".ok .text").text(options.ok_label);
                    console.log($(hidDiv).find(".ok .text").text());
                }
                $(hidDiv).find(".cancel").click(function (e) {
                    e.preventDefault();
                    $.Dialog.close();
                    if (options.cancel_handler && typeof options.cancel_handler === "function") {
                        options.cancel_handler();
                    }
                });
                if (options.cancel_icon && options.cancel_icon.length) {
                    $(hidDiv).find(".cancel i").attr("class", options.cancel_icon);
                }
                if (options.cancel_label && options.cancel_label.length) {
                    $(hidDiv).find(".cancel .text").text(options.cancel_label);
                }

                popup($(hidDiv));
            });
        }
    },
    Page: {
        PageData: function (data) {
            var pageData = $("#pageDataInfo");
            if (!pageData.length) {
                pageData = $("<input type='hidden' id='pageDataInfo' />");
                $("body").append(pageData);
            }

            if (data) {
                $(pageData).val(Base64.encode(JSON.stringify(data)));
                return data;
            } else {
                if ($(pageData).val() && $(pageData).val().length) {
                    return JSON.parse(Base64.decode($(pageData).val()));
                } else {
                    return null;
                }
            }
        },
        PageDataDictionary: function (dataKey, data) {
            if (data) {
                var bData = sgw.Page.PageData();
                if (!bData) {
                    bData = {};
                }
                bData[dataKey] = data;
                sgw.Page.PageData(bData);
                return bData[dataKey];
            } else {
                var bData = sgw.Page.PageData();
                if (bData) {
                    return bData[dataKey]
                } else {
                    return null;
                }
            }
        }
    },
    SP: {
        AppSettings: null
    },
    Scripts: {
        LoadRecords: {},
        Load: function (scriptUrl, nextHandler) {
            if (sgw.Scripts.LoadRecords[scriptUrl]) {
                if (nextHandler && typeof (nextHandler) === "function") {
                    nextHandler();
                }
            } else {
                $.getScript(scriptUrl, function () {
                    if (nextHandler && typeof (nextHandler) === "function") {
                        nextHandler();
                    }
                });
            }
        }
    },
    URL: {
        Parameters: function (params) {

            if (params) {
                var paramString = encodeURIComponent(Base64.encode(JSON.stringify(params)));
                return "p=" + paramString;
            } else {
                if (GetUrlParms && typeof (GetUrlParms) === "function") {
                    var paramObjectString = getQueryStringParameter("p");
                    if (paramObjectString && paramObjectString.length) {
                        return JSON.parse(Base64.decode(decodeURIComponent(paramObjectString)));
                    } else {
                        return getQueryObject();
                    }
                }
                return {}; //返回空对象，避免null错误。
            }


        },
        GetSingleBase64Param: function (queryName) {
            if (GetUrlParms && typeof (GetUrlParms) === "function") {
                var paramObjectString = getQueryStringParameter(queryName);
                if (paramObjectString && paramObjectString.length) {
                    return JSON.parse(Base64.decode(decodeURIComponent(paramObjectString)));
                } else {
                    return getQueryObject();
                }
            }
            return {}; //返回空对象，避免null错误。
        },
        SetSingleBase64Param: function (paramObj) {
            return encodeURIComponent(Base64.encode(JSON.stringify(paramObj)));
        },
        GetQueryValue: function (queryParamName) {
            return getQueryStringParameter(queryParamName);
        }
    },
    Utilities: {
        Date: {
            Format: function (data, fmt) {
                data = data.replace("T", " ");
                console.log("sgw.Utilities.Date.Format() data: " + data);
                data = new Date(data);
                var o = {
                    "M+": data.getMonth() + 1, //月份 
                    "d+": data.getDate(), //日 
                    "h+": data.getHours(), //小时 
                    "m+": data.getMinutes(), //分 
                    "s+": data.getSeconds(), //秒 
                    "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
                    "S": data.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            FormatToMinute: function (data) {   
                data = data.replace("T", " ");
                console.log("sgw.Utilities.Date.Format() data: " + data);
                return data.substring(0, data.lastIndexOf(":"));
            },
            FormatToSecond: function (data) {
                //var a = data.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4")
                var date = new Date(data.replace('T', ' ').replace('-', '/'));
                var min = date.getMinutes();
                var second = date.getSeconds();
                if (min < 10)  min = "0" + min;
                if (second < 10) second = "0" + second;
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + min + ':' + second;
            },
            FormatDate: function (data) {
                //var a = data.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4")
                var date = new Date(data.replace('T', ' ').replace('-', '/'));
                var month = date.getMonth()+1;
                var day = date.getDate();
                if (month < 10) month = "0" + month;
                if (day < 10) day = "0" + day;
                return date.getFullYear() + month + day;
            },
            FormatToDate: function (data) {
                //var a = data.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4")
                var date = new Date(data.replace('T', ' ').replace('-', '/'));
                var month = date.getMonth() + 1;
                var day = date.getDate();
                if (month < 10) month = "0" + month;
                if (day < 10) day = "0" + day;
                return date.getFullYear() + "-" + month + "-" + day;
            }
        },
        inputSet: function(data, fieldName, inputValue) {
            if (inputValue) {
                data[fieldName] = inputValue;
            }
        },
        /*
         * 客户端搜索
         * option: {
         *   query: 搜索内容
         *   area: 搜索区域
         *   itemSelector: 每个元素的选择器
         *   searchSelector: 在元素中支持搜索的Class名称选择器
         *   highlightSelector: 符合高亮的Class名称选择器
         * }
         */
        Search: {
            _lastQuery: null,
            LocalSearch: function (options) {
                var highlightClass = options.highlightSelector.substring(1);

                var areas = [];
                if (options.area instanceof Array) {
                    // do nothing...
                    areas = options.area;
                } else {
                    areas = [options.area];
                }

                $.each(areas, function (index, area) {
                    options.area = area;

                if (sgw.Utilities.Search._lastQuery) {
                    $(options.area).find(options.itemSelector).find(options.highlightSelector).after(sgw.Utilities.Search._lastQuery);
                    $(options.area).find(options.itemSelector).find(options.highlightSelector).remove();
                }

                if (!options.query || !options.query.length) {
                    sgw.Utilities.Search._lastQuery = null;
                    $(options.area).find(options.itemSelector).show();
                } else {
                    $(options.area).find(options.itemSelector).hide();
                    sgw.Utilities.Search._lastQuery = options.query;
                    $.each($(options.area).find(options.itemSelector), function (index, item) {
                        var isItemMatch = false;
                        $.each($(item).find(options.searchSelector), function (index, itemSearch) {
                            var isMatch = false;
                            var html = $(itemSearch).html();
                            var htmlForRender = '';
                            while (html.indexOf(options.query) >= 0) {
                                isMatch = true;

                                var idx = html.indexOf(options.query);
                                htmlForRender += html.substring(0, idx) + "<span class='" + highlightClass + "'></span>";
                                html = html.substring(idx + options.query.length);
                            }
                            htmlForRender += html;

                            if (isMatch) {
                                $(itemSearch).html(htmlForRender);
                                $(itemSearch).find(options.highlightSelector).text(options.query);
                                isItemMatch = true;
                            }
                        });

                            if (isItemMatch) {
                                $(item).show();
                            }
                        });
                    }
                });
            }
        },
        Deferred: function (handler) {
            var fdtd = $.Deferred();
            if (handler && typeof (handler) === "function") {
                handler(fdtd);
            }
            return fdtd;
        },
        Deferreds: function (deferreds) {
            return sgw.Utilities.Deferred(function (deferred) {
                $.when.apply(null, deferreds).done(function () {
                    deferred.resolve();
                })
            });
        },
        Row2Col: function (jsonData, idField, colField, valueField, emptyValue) {
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
        },
        RandomIdSuffix: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return ((new Date()).valueOf() + S4() + S4() + S4());
        }
    },
    Validation: {
        requiredValid: function (input) {
            if ($(input).val().length) {
                $(input).closest(".input-control").removeClass("warning-state");
                return true;
            } else {
                $(input).closest(".input-control").addClass("warning-state");
                return false;
            }
        },
        isNumber: function (input) {
            if ($(input).val().length == 0) {
                $(input).closest(".input-control").removeClass("warning-state");
                return true;
            }

            var maybeNumber = $(input).val();
            if ((maybeNumber * 0) == 0) {
                $(input).closest(".input-control").removeClass("warning-state");
                return true;
            } else {
                $(input).closest(".input-control").addClass("warning-state");
                return false;
            }
        },
        isDate: function (input) {
            if ($(input).val().length == 0) {
                $(input).closest(".input-control").removeClass("warning-state");
                return true;
            }

            var maybeDate = new Date($(input).val());
            if (Object.prototype.toString.call(maybeDate) === "[object Date]") {
                if (isNaN(maybeDate.getTime())) {
                    $(input).closest(".input-control").addClass("warning-state");
                    return false;
                } else {
                    $(input).closest(".input-control").removeClass("warning-state");
                    return true;
                }
            } else {
                $(input).closest(".input-control").addClass("warning-state");
                return false;
            }
        }
    },
    WebCtrls: {
        Templates: {},
        PrepareTmpls: function (tmplDefines, webControlName) {

            var dfd = $.Deferred();
            var dfds = [];
            var tmpls = sgw.WebCtrls.Templates[webControlName];
            if (!tmpls) {
                tmpls = {};
            }
            var tmplKeys = [];
            var todoCount = 0;
            var doneCount = 0;

            function getHtml(thisKey, url, tmpls, deferred) {
                $.get(url, function (tmplContent) {
                    tmpls[thisKey] = $.templates(tmplContent);

                    doneCount++;
                    if (doneCount == todoCount) {
                        sgw.WebCtrls.Templates[webControlName] = tmpls;
                        deferred.resolve(tmpls);
                    }
                });
            }

            for (var key in tmplDefines) {
                todoCount++;
                getHtml(key, tmplDefines[key], tmpls, dfd);
                //if (tmpls[key] == null) {
                //    todoCount++;

                //    getHtml(key, tmplDefines[key], tmpls, dfd);

                //    //$.get(tmplDefines[thisKey], function (tmplContent) {
                //    //    debugger;
                //    //    tmpls[thisKey] = $.templates(tmplContent);
                //    //    thisDfd.resolve();

                //    //    doneCount++;
                //    //    if (doneCount == dfds.length) {
                //    //        sgw.WebCtrls.Templates[webControlName] = tmpls;
                //    //        dfd.resolve(tmpls);
                //    //    }
                //    //});
                //}
            }

            //debugger;
            //$.when.apply($, dfds).done(function () {
            //    //$.templates(tmpls);
            //    debugger;
            //    sgw.WebCtrls.Templates[webControlName] = tmpls;
            //    dfd.resolve(tmpls);
            //});

            return dfd;
        },
        /*
         * options: {
         *    css: [],
         *    js: []
         * }
         */
        PrepareCssAndJs: function (options, isJSObO) {
            if (options["css"] && options["css"].length) {
                $.each(options["css"], function (index, item) {
                    sgw.Load.Css(item);
                });
            }
            var dfd = $.Deferred();
            if (options["js"] && options["js"].length) {
                var todoCount = options["js"].length;
                var doneCount = 0;
                if (isJSObO) {
                    var loadJsList = function (jsAry, index, deferred) {
                        if (jsAry && jsAry.length > index) {
                            var item = jsAry[index];
                            sgw.Load.Js(item).done(function () {
                                loadJsList(jsAry, index + 1, deferred);
                            })
                        } else {
                            deferred.resolve();
                        }
                    }
                    loadJsList(options["js"], 0, dfd);
                } else {
                    $.each(options["js"], function (index, item) {
                        sgw.Load.Js(item).done(function () {
                            doneCount += 1;
                            if (doneCount == todoCount) {
                                dfd.resolve();
                            }
                        });
                    });
                }
            } else {
                dfd.resolve();
            }
            return dfd;
        },
        EventManager: function (target) {
            var target = target || window,
                events = {};
            this.on = function (eventName, cb) {
                if (events[eventName]) events[eventName].push(cb);
                else events[eventName] = new Array(cb);
                return target;
            };
            this.off = function (eventName, cb) {
                if (events[eventName]) {
                    if (cb) {
                        var i = events[eventName].indexOf(cb);
                        if (i > -1) events[eventName].splice(i, 1);
                        else return false;
                        return true;
                    } else {
                        events[eventName] = null;
                        return true;
                    }
                }
                else return false;
            };
            this.trigger = function (eventName) {
                if (!events[eventName]) return false;
                for (var i = 0; i < events[eventName].length; i++) {
                    events[eventName][i].apply(target, Array.prototype.slice.call(arguments, 1));
                }
            };
        }
    },
    With: {
        SpFileURL: function (spFile) {
            if (!__sgwCache["SpFileWebURL"]) {
                sgw.Ajax.Get({
                    url: "/api/attachment?spFileWebURL=spFileWebURL",
                    async: false,
                    success: function (spFileWebURL) {
                        __sgwCache["SpFileWebURL"] = spFileWebURL;
                    }
                });
            }

            return __sgwCache["SpFileWebURL"] + encodeURIComponent(spFile);
        },
        SpURL: function (spFile) {
            return sgw.SP.AppSettings["SPURL"] + spFile;
        }
    }
}

/* other method */
var maskOnElement = function (element, message) {
    var width = $(element).outerWidth();
    var height = $(element).outerHeight();

    var top = $(element).position().top;
    var left = $(element).position().left;

    $(element).css({ "position": "relative" });

    var mask = $("<div style='background-color:white;display:none;'></div>");
    $(mask).load("/Views/HtmlSegments/ElementLoading.html", function () {
        $(this).find(".message").text(message);
        //$(this).css({ "width": width + "px" });
        //$(this).css({ "height": height + "px" });
        $(this).css({ "width": "100%" });
        $(this).css({ "height": "100%" });
        $(this).css({ "position": "absolute" });
        //$(this).css({ "top": top + "px" });
        //$(this).css({ "left": left + "px" });
        $(this).css({ "top": 0 });
        $(this).css({ "left": 0 });
        $(this).css({ "z-index": "10000" });
        $(this).css({ "opacity": "0" });

        $(element).append($(mask));

        $(mask).show();
        $(mask).animate({
            "opacity": 1
        }, 300);
    });

    return {
        close: function () {
            $(mask).animate({
                "opacity": 0
            }, 300, function () {
                $(mask).remove();
            })
        }
    };
};

var getQueryStringParameter = function (urlParameterKey) {
    if (document.URL.indexOf('?') > 0) {
        var urlQuery = document.URL.split('?')[1];
        var params = urlQuery.split('&');
        var strParams = '';
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split('=');
            if (singleParam[0] == urlParameterKey)
                return singleParam[1];
        }
    }
    return null;
}
var getQueryObject = function () {
    if (typeof (GetUrlParms) === "function") {
        return GetUrlParms();
    } else {
        var args = {};
        var query = location.search.substring(1);//获取查询串   
        var pairs = query.split("&");//在逗号处断开   
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');//查找name=value   
            if (pos == -1) continue;//如果没有找到就跳过   
            var argname = pairs[i].substring(0, pos);//提取name   
            var value = pairs[i].substring(pos + 1);//提取value   
            args[argname] = decodeURIComponent(value); //存为属性(解码) 
        }

        return args;
    }
}

/* data frame initiation */
var dataFrameFieldTypeLoad = function (isForceReload, nextHandler) {
    console.log('dataFrameFieldTypeLoad');
    if (!localStorage) {
        return;
    }

    var lc = localStorage.getItem(__localFieldTypeKey);
    if (!isForceReload && lc) {
        lc = JSON.parse(lc);
        if (nextHandler) {
            nextHandler(lc);
        }
    } else {
        sgw.Ajax.Get({
            async: false,
            url: "/act/DataFrameFieldType/ListData",
            success: function (result) {
                var dic = {};
                $.each(result, function (index, item) {
                    dic[item.Id] = item;
                });

                localStorage.setItem(__localFieldTypeKey, JSON.stringify(dic));
                if (nextHandler) {
                    nextHandler(lc);
                }
            }
        })
    }
}
var appSettingsLoad = function () {
    sgw.SP.AppSettings = localStorage.getItem("sp_appSettings");
    if (!sgw.SP.AppSettings) {
        sgw.Ajax.Get({
            url: "/act/SPAppSettings/ListSPAppSettings",
            async: false,
            success: function (result) {
                localStorage.setItem("sp_appSettings", JSON.stringify(result));
            }
        })
    }

    sgw.SP.AppSettings = JSON.parse(localStorage.getItem("sp_appSettings"));
}

var referenceInit = function () {
    dataFrameFieldTypeLoad();
    appSettingsLoad();
}

referenceInit();

