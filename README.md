# ARSoft - тестовое задание

## Проблемы с которыми столкнулся

Если в браузере включен **HTTPS only**, например встроенными настройками или расширениями, то запросы к API **блокируются**. 

<hr>

В ответах **API** нет поля ``username``, но есть поле ``email``.

<hr>

В **API** роут ``/organization`` - то есть **списка организаций** - возвращал **403** ошибку. <br>
Заменил порт с ``8094`` на ``8093`` и всё заработает.

<hr>

Редактирование пользователя не всегда срабатывает. <br>
При редактировании пользователя с ролью **администратор** возвращается **415** ошибка. <br>
А если при редактировании **обычного** пользователя, не трогать **email**, оставить его без изменений, то сервер вернёт **400** ошибку и **просит изменить его**. <br>
Поэтому при редактировании пользователя поле **email** по умолчанию пустое.

<hr>

Не разобрался с параметрами ``sort`` у ``/account/api``. <br>
В задании просто сказано что он имеется, но нет примеров обращения. <br>
Пытался по разному: и ``/account/api?page=1&sort=name``, и другими способами, но так и не понял как. <br>
Оставил в коде реализацию с **названием полей**, при необходимости эту реализацию можно легко изменить на правильный вариант.

## Используемые библиотеки

- React
- React Hook Form

Сборщик - **Vite**, включая **TypeScript**.

## Авторизация и API

В `./src/hooks/useAuth.ts` можно поправить переменные **host** и **port**.
```js
export const host: string = 'http://23.111.202.224';
export const port: string = '8094';
```
Порт решено вынести в **отдельно от адреса** , так как запрос ``/organization`` отдаёт данные лишь по порту **8093**.

Данные для входа находятся в файле ``./src/Auth.tsx``.
```js
useAuth('email', 'password').then(...
```

## Как делать запросы

Для запросов к API используется хук `./src/hooks/useToken.ts`.

По умолчанию исполняется **GET** запрос, **токен** и прочие передаётся автоматически с помощью **request**.
```js
import { host, port, request } from "@/hooks/useToken";
...
fetch(`${host}:${port}/route`, request).then(res => res.json()...
```

Если требуется выполнить **POST** запрос со своими данными, тогда нужно деструктуризиовать ``request``.
```js
import { host, port, request } from "@/hooks/useToken";
...
let body: BodyInit = JSON.stringify({ "example": example });
...
fetch(`${host}:${port}/route`, { ...request, method: "POST", body: body }).then(...
```

Если запрос требует изменения ``headers``, можно применить следующий трюк:
```js
import { host, port, headers, request } from "@/hooks/useToken";
...
let myHeaders = headers;
myHeaders.append("Content-Type", `application/x-www-form-urlencoded`);
...
fetch(`${host}:${port}/route`, { ...request, method: "POST", headers: myHeaders }).then(...
```

Такая гибкость позволяет делать лёгкие запросы без трудностей, но при необходимости кастумизировать параметры как нужно. <br>

### Пример **асинхронного запроса** взятия пользователей:
```js
(async () => {
    await fetch(`${host}:${port}/account`, request)
    .then(res => res.json())
    .then(data => {
        someLogic(data)
    });
})();
```

### Пример со **списком организаций**, изящный способ в **одну строку**
```js
(async () => fetch(`${host}:8093/organization`, request).then(res => res.json()))().then(data => someLogic(data));
```

## Скриншоты

Главная страница
![Пример таблицы](https://i.ibb.co/McqBYWG/1.jpg)
Редактирование пользоваеля
![Пример редактирования](https://i.ibb.co/9Gdn06Y/2.jpg)
Удаление пользователя
![Пример удаления](https://i.ibb.co/41WykQk/3.jpg)
Создание пользователя
![Пример создания](https://i.ibb.co/g4PGkhm/4.jpg)