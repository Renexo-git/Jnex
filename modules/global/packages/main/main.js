/*
| ------------------------------------------------------------------------------
| Main
| ------------------------------------------------------------------------------
| resize_iframe(Object);
| language("String"); // Module name.
| ------------------------------------------------------------------------------
*/
function resize_iframe(self) {
    var obj = self.contentWindow.document;
    self.style.height = obj.documentElement.scrollHeight + "px";
}
function language(module) {
    var language = document.documentElement.lang;
    if (language !== "en") {
        module = (module !== "") ? module : "global";
        let prefix = (module !== "global") ? "module" : "global";
        $.getJSON({
            url: "/static/languages/" + module + "/" + language + ".json",
            success: function (data) {
                cache.set(prefix + "_language", data);
            },
            error: function () {
                cache.remove(prefix + "_language");
            }
        });
    }
}
$(document).ready(function () {
    global.cache = new RMStore();
    $("[onload]").trigger("onload");
    language("global");
    $(this).on("main", function () {
        datagrid();
    });
});
