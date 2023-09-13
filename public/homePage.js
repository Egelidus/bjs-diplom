let out = new LogoutButton();
out.action = ApiConnector.logout(callback) && location.reload();
//
ApiConnector.current(callback) &&
  (ProfileWidget.showProfile =
    "Не знаю как, но передаются данные ответа от сервера");
//
let rates = new RatesBoard();
ApiConnector.getStocks(callback) && rates.clearTable && rates.fillTable(data);
setInterval(() => ApiConnector.getStocks(callback), 60000);
//
let money = new MoneyManager();
money.addMoneyCallback = function () {
  if (
    ApiConnector.addMoney({ currency, amount }, callback) //Используйте аргумент функции свойства `addMoneyCallback` для передачи данных `data` в запрос. Где в запросе передаются данные?
  ) {
    ProfileWidget.showProfile(data);
    FavoritesWidget.setMessage(isSuccess, "Баланс можно пополнить");
  } else {
    FavoritesWidget.setMessage(isSuccess, "Баланс нельзя пополнить");
  }
};
money.conversionMoneyCallback = function () {
  if (
    ApiConnector.convertMoney(
      { fromCurrency, targetCurrency, fromAmount },
      callback
    ) //Используйте аргумент функции свойства `conversionMoneyCallback` для передачи данных в запрос. Как передать данные в запрос?
  ) {
    ProfileWidget.showProfile(data);
    FavoritesWidget.setMessage(isSuccess, "Баланс можно пополнить");
  } else {
    FavoritesWidget.setMessage(isSuccess, "Баланс нельзя пополнить");
  }
};
money.sendMoneyCallback = function () {
  if (
    ApiConnector.transferMoney({ to, currency, amount }, callback) //Используйте аргумент функции свойства `sendMoneyCallback` для передачи данных в запрос. Как передать данные в запрос?
  ) {
    ProfileWidget.showProfile(data);
    FavoritesWidget.setMessage(isSuccess, "Баланс можно пополнить");
  } else {
    FavoritesWidget.setMessage(isSuccess, "Баланс нельзя пополнить");
  }
};
//
let favorit = new FavoritesWidget();
ApiConnector.getFavorites(callback) && RatesBoard.clearTable();
RatesBoard.fillTable(data);
MoneyManager.updateUsersList(data);
favorit.addUserCallback = function () {
  if (
    ApiConnector.addUserToFavorites({ id, name }, callback) //Используйте аргумент функции свойства `addUserCallback` для передачи данных в запрос. Непонятное задание. И еще "name" зачеркнуто в vs. Говорит, что устарело.
  ) {
    RatesBoard.clearTable();
    RatesBoard.fillTable(data);
    MoneyManager.updateUsersList(data);
    FavoritesWidget.setMessage(isSuccess, "Пользователь добавлен");
  } else {
    FavoritesWidget.setMessage(isSuccess, "Пользователя нельзя добавить");
  }
};
favorit.removeUserCallback = function () {
  if (
    ApiConnector.removeUserFromFavorites(id, callback) //Используйте аргумент функции свойства `removeUserCallback` для передачи данных в запрос. Непонятно.
  ) {
    RatesBoard.clearTable();
    RatesBoard.fillTable(data);
    MoneyManager.updateUsersList(data);
    FavoritesWidget.setMessage(isSuccess, "Пользователь удален");
  } else {
    FavoritesWidget.setMessage(isSuccess, "Пользователя нельзя удалить");
  }
};
