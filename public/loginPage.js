"use strict";
let user = new UserForm();
user.loginFormCallback = (data) => {
  ApiConnector.login({ login, password }, callback) ? location.reload() : user.setLoginErrorMessage("ошибка авторизации");
}
user.registerFormCallback = (data) => {
  ApiConnector.register({login, password}, callback) ? location.reload() : user.setLoginErrorMessage("ошибка регистрации");
}
