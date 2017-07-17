

$(function () {

});

var EmailWay = function () {
    $.Dialog({
        draggable:true,
        shadow: true,
        overlay: true,
        icon: '',
        title: '<i class="icon-mail"></i> 邮件',
        //width: 500,
        padding: 10,
        onShow: function (_dialog) {
            var html = [
                   '<iframe width="1000" height="500" src="../../images/outLook.jpg" frameborder="0"></iframe>'
            ].join("");

            $.Dialog.content(html);
        }
    });
}

var PhoneWay = function () {
    $.Dialog({
        draggable: true,
        shadow: true,
        overlay: true,
        icon: '',
        title: '<i class="icon-phone"></i> 电话',
        width: 300,
        height:120,
        padding: 10,
        onShow: function (_dialog) {
            var html = [
                   '<input type="text" style="width:200px;height:50px;" placeholder="请输入电话号码..." />' +
                   '<i class="icon-phone font45" style="color: green;top: 10px;left: 10px;position: relative;"></i>'
            ].join("");

            $.Dialog.content(html);
        }
    });
}

var MessageWay = function () {
    $.Dialog({
        draggable: true,
        shadow: true,
        overlay: true,
        icon: '',
        title: '<i class="icon-comments-2"></i> 短信',
        width: 350,
        height: 120,
        padding: 10,
        onShow: function (_dialog) {
            var html = [
                  '<input type="text" style="width:200px;height:30px;" placeholder="请输入电话号码..." />' +
                  '<input type="button" class="button" style="top: 4px;" value="发送" />'
            ].join("");

            $.Dialog.content(html);
        }
    });
}

var OnlineWay = function () {
    $.Dialog({
        draggable: true,
        shadow: true,
        overlay: true,
        icon: '',
        title: '<i class="icon-mic"></i> 在线沟通',
        width: 500,
        height: 590,
        padding: 10,
        onShow: function (_dialog) {
            var html = [
                  //'<iframe src="../../images/mess2.jpg" frameborder="0"></iframe>'
                  '<img style="width:100%;height:100%;" src="../../images/online.jpg"  />'
            ].join("");

            $.Dialog.content(html);
        }
    });
}
