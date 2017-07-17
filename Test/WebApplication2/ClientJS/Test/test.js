$(function () { 
    $("#btnAdd").on("click", SaveMeeting);   
});

var SaveMeeting = function () {    
    sgw.Ajax.Get({
        url: "/act/Test/GetRequestInfo?param=1",
        success: function (result) {
            alert(result);
        },
        failure: function (message) {
            alert("failure");
        }
    });
}