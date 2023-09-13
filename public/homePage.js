// let out = new LogoutButton();
// out.action = ApiConnector.logout(callback) && location.reload();
// //
// ApiConnector.current(callback) &&
//   (ProfileWidget.showProfile =
//     "Не знаю как, но передаются данные ответа от сервера");
// //
// let rates = new RatesBoard();
// ApiConnector.getStocks(callback) && rates.clearTable && rates.fillTable(data);
// setInterval(() => ApiConnector.getStocks(callback), 60000);
// //
// let money = new MoneyManager();
// money.addMoneyCallback = function () {
//   if (
//     ApiConnector.addMoney({ currency, amount }, callback) //Используйте аргумент функции свойства `addMoneyCallback` для передачи данных `data` в запрос. Где в запросе передаются данные?
//   ) {
//     ProfileWidget.showProfile(data);
//     FavoritesWidget.setMessage(isSuccess, "Баланс можно пополнить");
//   } else {
//     FavoritesWidget.setMessage(isSuccess, "Баланс нельзя пополнить");
//   }
// };
// money.conversionMoneyCallback = function () {
//   if (
//     ApiConnector.convertMoney(
//       { fromCurrency, targetCurrency, fromAmount },
//       callback
//     ) //Используйте аргумент функции свойства `conversionMoneyCallback` для передачи данных в запрос. Как передать данные в запрос?
//   ) {
//     ProfileWidget.showProfile(data);
//     FavoritesWidget.setMessage(isSuccess, "Баланс можно пополнить");
//   } else {
//     FavoritesWidget.setMessage(isSuccess, "Баланс нельзя пополнить");
//   }
// };
// money.sendMoneyCallback = function () {
//   if (
//     ApiConnector.transferMoney({ to, currency, amount }, callback) //Используйте аргумент функции свойства `sendMoneyCallback` для передачи данных в запрос. Как передать данные в запрос?
//   ) {
//     ProfileWidget.showProfile(data);
//     FavoritesWidget.setMessage(isSuccess, "Баланс можно пополнить");
//   } else {
//     FavoritesWidget.setMessage(isSuccess, "Баланс нельзя пополнить");
//   }
// };
// //
// let favorit = new FavoritesWidget();
// ApiConnector.getFavorites(callback) && RatesBoard.clearTable();
// RatesBoard.fillTable(data);
// MoneyManager.updateUsersList(data);
// favorit.addUserCallback = function () {
//   if (
//     ApiConnector.addUserToFavorites({ id, name }, callback) //Используйте аргумент функции свойства `addUserCallback` для передачи данных в запрос. Непонятное задание. И еще "name" зачеркнуто в vs. Говорит, что устарело.
//   ) {
//     RatesBoard.clearTable();
//     RatesBoard.fillTable(data);
//     MoneyManager.updateUsersList(data);
//     FavoritesWidget.setMessage(isSuccess, "Пользователь добавлен");
//   } else {
//     FavoritesWidget.setMessage(isSuccess, "Пользователя нельзя добавить");
//   }
// };
// favorit.removeUserCallback = function () {
//   if (
//     ApiConnector.removeUserFromFavorites(id, callback) //Используйте аргумент функции свойства `removeUserCallback` для передачи данных в запрос. Непонятно.
//   ) {
//     RatesBoard.clearTable();
//     RatesBoard.fillTable(data);
//     MoneyManager.updateUsersList(data);
//     FavoritesWidget.setMessage(isSuccess, "Пользователь удален");
//   } else {
//     FavoritesWidget.setMessage(isSuccess, "Пользователя нельзя удалить");
//   }
// };

"use strict"

const logoutButton = new LogoutButton();
// Выход из личного кабинета
logoutButton.action = () => {
  ApiConnector.logout((response)=>{
    if (response.success) {
      location.reload();
    } 
  })
}


// Вывод данных пользователя
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data)
  }
})


// Получение текущих курсов валюты.
const ratesBoard = new RatesBoard();
setInterval(() => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  })
}, 5000);


//Операции с деньгами
const moneyManager = new MoneyManager();

//===Пополнения баланса
moneyManager.addMoneyCallback = (addMoney = {currency: null, amount: null}) => {
  ApiConnector.addMoney(addMoney, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data)
      favoritesWidget.setMessage(false, `Вам успешно добавлено ${addMoney.amount} ${addMoney.currency}`);
    } else {
      favoritesWidget.setMessage(true, response.data)
    }      
  })
}

//===Конвертация валюты
moneyManager.conversionMoneyCallback = (convertMoney = {fromCurrency: null, targetCurrency: null, fromAmount: null}) => {
  ApiConnector.convertMoney(convertMoney, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data)
      favoritesWidget.setMessage(false, `Вы конвертировали ${convertMoney.fromAmount} ${convertMoney.fromCurrency} в ${convertMoney.targetCurrency}`)
    } else {
      favoritesWidget.setMessage(true, response.data)
    }
  })
}

//===Перевод валюты
moneyManager.sendMoneyCallback = (transferMoney= {to: null, currency: null, amount: null}) => {
  ApiConnector.transferMoney(transferMoney, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data)
      favoritesWidget.setMessage(false, `Вы успешно перевели пользователю  ${transferMoney.to} ${transferMoney.amount}  ${transferMoney.currency}`)
    } else {
      favoritesWidget.setMessage(true, response.data)
    }
  })
}


// Работа с избранным
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  console.log(response)
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    favoritesWidget.setMessage(true, response.data)
  }   
})

//===Добавление пользователя в список избранных
favoritesWidget.addUserCallback = (addUserToFavorites = {id: null, name: null}) => {
  ApiConnector.addUserToFavorites(addUserToFavorites, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(false, `Пользователь ${addUserToFavorites.name} успешно добавлен в избранные`)
    } else {
      favoritesWidget.setMessage(true, response.data)
    }  
  })
}

//===Удаление пользователя из списока избранных
favoritesWidget.removeUserCallback = (idUser) => {
  ApiConnector.removeUserFromFavorites(idUser, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(false, `Пользователь  успешно удален из избранных`)
    } else {
      favoritesWidget.setMessage(true, response.data)
    }  
  })
}