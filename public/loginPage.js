"use strict";
let user = new UserForm();
let hhr = new HtmlHttpRequest();
user.loginFormCallback = authorizationRequest(data);
function authorizationRequest(data) {
  ApiConnector.login({ login, password }, callback);
  if (hhr.send()) {
    hhr.onload = callback;
    return location.reload();
  }
  alert("ошибка авторизации");
}
user.registerFormCallback = registrationRequest(data);
function registrationRequest(data) {
  ApiConnector.register;
  if (hhr.send()) {
    hhr.onload = callback;
    return location.reload();
  }
  alert("ошибка регистрации");
}
