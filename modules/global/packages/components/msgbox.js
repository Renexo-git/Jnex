/*
| -----------------------------------------------------------------------------
| Message display box.
|
| @param {String} message
| @param {String} type [ info | success | warning | danger ]
| -----------------------------------------------------------------------------
|
| msgbox("Message...", "info");
| -----------------------------------------------------------------------------
*/


/*
function box(result) {
//alert(result)
}

$("box").css("display", "none");
$("box").each(function () {
    if ($(this).html()) {
        var $bootbox = {};
        var buttons  = {};
        var type     = $(this).attr("type");
        var title    = $(this).attr("title");
        var options  = $(this).attr("options"); // options="Choice One:1, Choice Two:2, Choice Three:3"
        var locale   = {
            CONFIRM: "Confirmar",
            CANCEL: "Cancelar"
        };
        if (type === "alert") {
            $bootbox = bootbox.alert;
            buttons  = {
                ok: {
                    className: "btn-secondary"
                }
            };
        } else if (type === "confirm") {
            $bootbox = bootbox.confirm;
            buttons  = {
                cancel: {
                    label: '<i class="fa fa-times"></i> ' + locale.CANCEL,
                    className: "btn-danger"
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> ' + locale.CONFIRM,
                    className: "btn-success"
                }
            };
        } else if (type === "dialog") {
            $bootbox = bootbox.dialog;
        } else {
            title = title || "Prompt: " + type;
            if (options) {
                options  = options.split(",");
                var size = options.length;
                var data = [];
                for (var i = 0; i < size; i++) {
                    data = options[i].split(":");
                    options[i] = {text: data[0], value: data[1]};
                }
            }
            $bootbox = bootbox.prompt;
            buttons  = {
                cancel: {
                    label: '<i class="fa fa-times"></i> ' + locale.CANCEL,
                    className: "btn-danger"
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> ' + locale.CONFIRM,
                    className: "btn-success"
                }
            };
        }
        $bootbox({
            title: title,
            inputType: type,
            inputOptions: options,
            message: $(this).html(),
            value: ($(this).attr("value")) ? $(this).attr("value").replace(/ /g,"").split(",") : 0,
            className: $(this).attr("class"),
            multiple: ($(this).attr("multi") === "true") ? true : false,
            centerVertical: ($(this).attr("center") === "false") ? false : true,
            backdrop: ($(this).attr("backdrop") === "true") ? true : undefined,
            closeButton: ($(this).attr("close") === "false") ? false : true,
            size: $(this).attr("size"),
            buttons: buttons,
            callback: function (result) {
                if (typeof box === "function") {
                    box(result);
                }
            }
        });
    }
});
*/


function msgbox(message, type) {
    var icon = "";
    switch (type) {
    case "info":
        icon = "info-circle";
        break;
    case "success":
        icon = "check-circle";
        break;
    case "warning":
        icon = "exclamation-triangle";
        break;
    case "danger":
        icon = "times-circle";
        break;
    }
    return '<div class="alert alert-' + type + '" role="alert"><button type=\
"button" data-dismiss="alert" aria-hidden="true" class="close">×</button>\
<i class="fas fa-' + icon + '"></i> ' + message + '</div>';
}
module.exports = msgbox;
