<script>

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

</script>

<form action="/demo/put" class="needs-validation ajax" novalidate>
  <div class="container-fluid">
    <div class="row bg-gray">
      <div class="col-auto">
      </div>
        <div class="col mb-1">
            <fieldset><legend><i class="fa fa-arrow-alt-circle-right"></i> Endereço</legend>
            <div class="form-row">
              <div class="col-md-4 mb-2">
                <input type="text" class="form-control" id="validationTooltip01" placeholder="Primeiro nome" name="first_name" required>
                <div class="valid-tooltip">
                  Tudo certo!
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <input type="text" class="form-control" id="validationTooltip02" placeholder="Sobrenome" name="last_name" required>
                <div class="valid-tooltip">
                  Tudo certo!
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <input type="text" class="form-control" id="validationTooltipUsername" placeholder="Usuário" name="user_name" required>
                <div class="invalid-tooltip">
                  Por favor, escolha um usuário válido e único.
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-2">
                <input type="text" class="form-control" id="validationTooltip03" placeholder="Cidade" name="city" required>
                <div class="invalid-tooltip">
                  Por favor, informe uma cidade válida.
                </div>
              </div>
              <div class="col-md-3 mb-2">
                <input type="text" class="form-control" id="validationTooltip04" placeholder="Estado" name="state" required>
                <div class="invalid-tooltip">
                  Por favor, informe um estado válido.
                </div>
              </div>
              <div class="col-md-3 mb-2">
                <input type="text" class="form-control" id="validationTooltip05" placeholder="CEP" name="cep" required>
                <div class="invalid-tooltip">
                  Por favor, informe um CEP válido.
                </div>
              </div>
            </div>
            </fieldset>
            <div class="row">
              <div class="col text-center">
                <button type="link" href="/home" class="btn btn-secondary my-2 my-sm-4 mr-2 ajax"><i class="fa fa-times-circle"></i> Fechar</button><button type="submit" class="btn btn-primary my-2 my-sm-4 mr-2"><i class="fa fa-save"></i> Salvar</button>
              </div>
            </div>
        </div>
      <div class="col-auto">
      </div>
    </div>
  </div>
</form>
