/*
| -----------------------------------------------------------------------------
| Ajax
|
| @param {String} url
| @param {Function} callback
| -----------------------------------------------------------------------------
|
| var ajax = require("http/ajax");
| ajax("/url");
| ajax("/url", function (response) {
|     alert(response);
| });
| -----------------------------------------------------------------------------
*/
function ajax(url, callback = null) {
    language(url.split("/")[1]);
    $("#ajax").load(url, function (response) {
        if (callback) {
            return callback(response);
        }
        $(document).trigger("ajax", response);
    });
}
(function () {
    $(document).on("ajax", function (e, content) {
        $("#ajax").html(content);
        index();
        e.preventDefault();
    });
    $(document).on("click", "a.ajax", function (e) {
        if ($(this).attr("href")) {
            ajax($(this).attr("href"));
        }
        e.preventDefault();
    });
    $(document).on("submit", "form.ajax", function (e) {
        $.ajax({
            async: false,
            type: "POST",
            data: $(this).serialize(),
            url: $(this).attr("action"),
            success: function (response) {
                return $(document).trigger("ajax", response);
            },
            error: function (response) {
                return $(document).trigger("ajax", "Error - " + response.status);
            }
        });
        e.preventDefault();
    });
})();
module.exports = ajax;
