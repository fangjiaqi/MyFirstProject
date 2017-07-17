function loadRenderHelperUtility() {
    $.views.helpers({
        dateFormatToMinute: function (val) {
            var formatDateTimeString = val.replace("T", " ");
            if (val.indexOf("+") != -1) {
                formatDateTimeString = formatDateTimeString.substring(0, formatDateTimeString.indexOf("+"));
            }
            formatDateTimeString = formatDateTimeString.substring(0, formatDateTimeString.lastIndexOf(":"));
            //var date = new Date(formatDateTimeString);
            //var min = date.getMinutes();
            //if (min < 10) {
            //    min = "0" + min;
            //}
            //return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + min;
            return formatDateTimeString;
        },
        dateFormat: function (val) {
            //var a = val.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4")
            var date = new Date(val.replace('T', ' ').replace('-', '/'));
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            return date.getFullYear() + '-' + month + '-' + day;
        },
        dateFormatToMonth: function (val) {
            var date = new Date(val);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月份';
        },
        dateFormatToYear: function (val) {
            var date = new Date(val);
            return date.getFullYear() + '年';
        },
        dateFormatToMinute: function (data) {
            var date = new Date(data.replace('T', ' ').replace('-', '/'));
            var min = date.getMinutes();
            if (min < 10) min = "0" + min;
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + min;
        },
        dateFormatToSecond: function (data) {
            var date = new Date(data.replace('T', ' ').replace('-', '/'));
            var min = date.getMinutes();
            var second = date.getSeconds();
            if (min < 10) min = "0" + min;
            if (second < 10) second = "0" + second;
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + min + ':' + second;
        },
        dateFormatGetTime: function (data) {
            if (data == "" || data == null) {
                return "无";
            }
            else {
                //var d = new Date(data.replace('T', ' ').replace('-', '/'));
                var d = data.split('T')[1].split(':');
                return d[0] + ":" + d[1];
            }
        },
        fileSizeFormat: function (size) {
            if (size < 1024) {
                return size + "字节";
            } else {
                var k = size / 1024;
                if (k < 1024) {
                    return k.toFixed(2) + "KB";
                } else {
                    k = k / 1024;
                    if (k < 1024) {
                        return k.toFixed(2) + "MB";
                    } else {
                        k = k / 1024;
                        return k.toFixed(2) + "GB";
                    }
                }
            }
        }
    });
}


$(function () {
    if ($.views && $.views.helpers) {
        loadRenderHelperUtility();
    } else {
        $.getScript("/js/jquery/jsrender.min.js", function (response, status, xhr) {
            if ($.views && $.views.helpers) {
                loadRenderHelperUtility();
            }
        })
    }
});