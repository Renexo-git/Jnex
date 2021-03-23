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
