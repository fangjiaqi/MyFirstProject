var _PAGE_SELECTOR = ".below-is-page";

$(function () {
    var pageContainer = $("<div class='this-is-page'></div>");
    $(_PAGE_SELECTOR).after(pageContainer);

    var pageItems = $(_PAGE_SELECTOR).nextAll();
    $(pageContainer).append(pageItems);

    var windowHeight = $(window).height();
    console.log($(pageContainer).position());

    var containerTop = null;
    var pageLayout = function () {
        if ($(pageContainer).position().top != containerTop) {
            containerTop = $(pageContainer).position().top;
            $(pageContainer).height(windowHeight - containerTop - 20);
        }
        setTimeout(pageLayout, 1000);
    }
    pageLayout();
    //$(pageContainer).height()
});