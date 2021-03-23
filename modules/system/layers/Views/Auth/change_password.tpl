<div class="top-content">
    <div class="inner-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3 form-box">
                    <fieldset><legend>{{ i18n.change_password }}</legend>
                        <form role="form" action="Auth.changePassword" method="post" class="login-form">
                            {{ display }}
                            <div class="form-group">
                            	<input type="password" name="form[newpassword]" placeholder="{{ i18n.new_password }}..." value="" class="form-password form-control" required>
                            </div>
                            <div class="form-group">
                            	<input type="password" name="form[repassword]" placeholder="{{ i18n.repeat_the_password }}..." value="" class="form-password form-control" required>
                            </div>
                            <button type="submit" class="btn login"><span class="fa fa-exchange fa-lg" aria-hidden="true"></span> <strong>{{ i18n.change }}</strong></button>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</div>
