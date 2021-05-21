/*
| ------------------------------------------------------------------------------
| Ajax
|
| @param {String} url
| @param {String} data
| @param {Function} callback
| ------------------------------------------------------------------------------
| => GET
|
| ajax("/url");
|
| ajax("/url", function (response) {
|
|     response.data   - "Text..."
|     response.status - 200, 404...
|     response.result - true | false
| });
|
| => POST
|
| ajax("/url", "Form data");
|
| ajax("/url", "Form data", function (response) {
|
|     response.data   - "Text..."
|     response.status - 200, 404...
|     response.result - true | false
| });
| ------------------------------------------------------------------------------
*/
function ajax(url, data = null, callback = null) {
    var type     = "get";
    var response = {};
    if (arguments.length > 1) {
        if (typeof data === "function") {
            callback = data;
            data     = null;
        } else {
            type = "post";
        }
    }
    axios[type](url, data).then(res => {
        response        = res;
        response.result = true;
    }).catch(error => {
        response        = error.response;
        response.result = false;
    }).finally(() => {
        if (callback) {
            return callback(response);
        }
        return $(document).trigger("ajax", response.data);
    });
}
$(document).ready(function () {
    $(this).on("ajax", function (e, content) {
        $("#ajax").html(content);
        $(this).trigger("main");
        language(url.split("/")[1]);
        e.preventDefault();
    });
    $(this).on("click", "a.ajax", function (e) {
        if ($(this).attr("href")) {
            ajax($(this).attr("href"));
        }
        e.preventDefault();
    });
    $(this).on("submit", "form.ajax", function (e) {
        var form = $(this);
        ajax(form.attr("action"), form.serialize(), function (response) {
            if (response.result) {
                alert(response.data);
                form.trigger("reset");
            }
        });
        e.preventDefault();
    });
});
module.exports = ajax;
