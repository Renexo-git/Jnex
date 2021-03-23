function index() {
    datagrid();
}
function resize_iframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + "px";
}
function language(module) {
    var language = document.documentElement.lang;
    if (language !== "en") {
        module = (module !== "") ? "/modules/" + module : "";
        var scope = (module !== "") ? "module" : "global";
        $.getJSON({
            url: "/languages" + module + "/" + language + ".json",
            success: function (data) {
                cache.set(scope + "_language", data);
            },
            error: function () {
                cache.remove(scope + "_language");
            }
        });
    }
}
$(document).ready(function () {
    global.cache = new RMStore();
    $("[onload]").trigger("onload");
    language(""); // Global language
});
