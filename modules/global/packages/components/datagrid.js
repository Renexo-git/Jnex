var record = null;
function tabulator(columns, attr) {
    record = function (action) {
        action = action.id;
        if (action === "add") {
            ajax(attr["register"]);
        } else if (action === "delete" || action === "edit") {
            var data = table.getSelectedData();
            var size = data.length;
            if (action === "edit" && size === 1) {
                ajax(attr["register"], function () {
                    $("form").prepend('<input type="hidden" name="id">');
                    for( var key in data[0] ) {
                        $('input[name="' + key + '"]').val(data[0][key]);
                    }
                });
            } else if (action === "delete" && size > 0) {
                bootbox.confirm({
                    centerVertical: true,
                    message: icon["warning"] + " " + i18n("@delete_record"),
                    buttons: {
                        cancel: {
                            label: icon["close"] + " " + i18n("cancel"),
                            className: "btn-danger"
                        },
                        confirm: {
                            label: icon["check"] + " " + i18n("confirm"),
                            className: "btn-success"
                        }
                    },
                    callback: function (event) {
                        if (event) {
                            var id = [];
                            var n  = 0;
                            for (var i=0; i < size; i++) {
                                if (data[i].id) {
                                    id[n] = data[i].id;
                                    n++;
                                }
                            }
                            $.ajax({
                                url: "/" + SYS_NAME + attr["delete"] + "/" + id,
                                success: function (result) {
                                    table.deselectRow();
                                    $("#action > #delete").attr("disabled", true);
                                    $("#action > #edit").attr("disabled", true);
                                    if (result) {
                                        table.deleteRow(id);
                                        result = icon["success"] + " " + i18n("@delete_true");
                                    } else {
                                        result = icon["danger"] + " " + i18n("@delete_false");
                                    }
                                    bootbox.alert({
                                        centerVertical: true,
                                        message: result,
                                        buttons: {
                                            ok: {
                                                label: icon["close"] + " " + i18n("close"),
                                                className: "btn-secondary"
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    };

    var table = new Tabulator(attr["id"], {
        ajaxURL:"/" + SYS_NAME + attr["data"],
        locale:true,
        langs: {
            "default": {
                "ajax": {
                    "loading": i18n("loading") + "...",
                    "error": i18n("error")
                },
                "groups": {
                    "item": i18n("item"),
                    "items": i18n("items")
                },
                "pagination": {
                    "page_size": i18n("page_size"),
                    "first": i18n("first"),
                    "first_title": i18n("first_page"),
                    "last": i18n("last"),
                    "last_title": i18n("last_page"),
                    "prev": i18n("previous"),
                    "prev_title": i18n("previous_page"),
                    "next": i18n("next"),
                    "next_title": i18n("next_page")
                },
                "headerFilters": {
                    "default": i18n("filter_column"),
                    "columns": {
                        "name": i18n("filter_name")
                    }
                }
            }
        },
        height:attr["height"],
        layout:"fitColumns",
        responsiveLayout:"hide",
        tooltips:true,
        history:true,
        pagination:"local",
        paginationSize:10,
        movableColumns:true,
        resizableRows:false,
        selectable:true,
        columns:columns,
        rowContextMenu:function (component) {
            component.select();
            var data = table.getSelectedData();
            var flag = true;
            if (data.length === 1) {
                flag = false;
            }
            var menu = [
                {
                    label: icon["check_square"] + " " + i18n("select_all"),
                    action:function (e, row) {
                        table.selectRow();
                    }
                },
                {
                    label: icon["square"] + " " + i18n("remove_selection"),
                    action:function (e, row) {
                        table.deselectRow();
                    }
                },
                {
                    separator:true,
                },
                {
                    label: icon["edit"] + " " + i18n("edit"),
                    disabled:flag,
                    action:function (e, row) {
                        record({id:"edit"});
                    }
                },
                {
                    label: icon["trash"] + " " + i18n("delete"),
                    action:function (e, row) {
                        record({id:"delete"});
                    }
                }
            ];
            return menu;
        },
        rowSelectionChanged:function (data, rows) {
            if (data.length === 1) {
                $("#action > #edit").attr("disabled", false);
            } else {
                $("#action > #edit").attr("disabled", true);
            }
            if (data.length > 0) {
                $("#action > #delete").attr("disabled", false);
            } else {
                $("#action > #delete").attr("disabled", true);
            }
        }
    });
    $('<div class="container-fluid">\
        <div class="row bg-gray">\
          <div id="action" class="col-auto">\
            <button id="add" class="btn btn-secondary btn-sm my-2 my-sm-2 mr-1" onclick="record(this)">' + icon["plus"] + ' ' + i18n("add") + '</button>\
            <button id="edit" class="btn btn-secondary btn-sm my-2 my-sm-2 mr-1" disabled onclick="record(this)">' + icon["edit"] + ' ' + i18n("edit") + '</button>\
            <button id="delete" class="btn btn-secondary btn-sm my-2 my-sm-2 mr-1" disabled onclick="record(this)">' + icon["trash"] + ' ' + i18n("delete") + '</button>\
          </div>\
          <div class="col">\
          </div>\
          <div class="col-auto">\
            <form action="#" class="form-inline my-2 my-lg-1">\
              <input class="form-control mr-sm-2" type="search" placeholder="' + i18n("search") + '" aria-label="Search" maxlength="250">\
              <button type="submit" class="btn btn-primary my-2 my-sm-0">' + icon["search"] + '</button>\
            </form>\
          </div>\
        </div>\
      </div>').insertBefore(attr["id"]);
    return table;
}

function datagrid() {
    $("datagrid").each(function (n) {
        var columns = [];
        var attr    = [];
        if (!$(this).attr("id")) {
            $(this).attr("id", "datagrid" + n);
        }
        $("#" + $(this).attr("id") + ">column").each(function (i) {
            columns[i]          = [];
            columns[i]["title"] = $(this).html();
            columns[i]["field"] = $(this).attr("name");
            if ($(this).attr("width")) {
                columns[i]["width"] = $(this).attr("width");
            }
            if ($(this).attr("align")) {
                columns[i]["align"] = $(this).attr("align");
            }
        });
        attr["id"]       = "#" + $(this).attr("id");
        attr["data"]     = $(this).attr("data");
        attr["register"] = $(this).attr("register");
        attr["delete"]   = $(this).attr("delete");
        attr["height"]   = $(this).attr("height") || "auto";
        tabulator(columns, attr);
    });
}
