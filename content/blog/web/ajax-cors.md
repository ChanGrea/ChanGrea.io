---
title: AJAX와 CORS (feat. 인증/인가)
date: 2020-06-22 22:06:19
category: web

---

## AJAX

`AJAX`는 Javascript Library 중 하나이며, **<u>A</u>synchronous <u>J</u>avascript <u>A</u>nd <u>X</u>ml**의 약자이다.

브라우저가 가지고 있는 **XMLHttpRequest** 객체를 이용해서 전체 페이지를 새로고침하지 않고, 필요한 데이터만 **비동기적**으로 가져오는 방식이다.

이 경우 `Json` 이나 `XML` 형태로 데이터를 주고 받는다. 보통은 `JQuery`의 AJAX를 이용해서 **GET**, **POST** 등의 요청을 하는 식으로 많이 사용한다.



## CORS

`CORS`는 **<u>C</u>ross <u>O</u>rigin <u>R</u>esource <u>S</u>haring**의 약자로, **도메인** 또는 **포트**가 다른 서버의 자원을 요청하는 메커니즘이다.

웹페이지는 **Image**(`<img />`), **css**(`<link />`), **script**(`<script />`), Iframe, 동영상에 대해서는 자유롭게 가져올 수 있다.

하지만, 스크립트 태그 내에서 특정한 도메인 간(Cross-Domain) 요청, 특히 Ajax 요청은 CORS 정책에 의해 금지된다.

### :thinking: Cross Domain이 뭔데?

예전에 정리했던 [REST API와 설계원칙(2) 중 'URI의 Authority 부분'](https://changrea.io/Web/rest-api-design-1/#authority) 을 참고하면, Authority는 **서버명**과 **도메인명**으로 구성된다.

여기서 **도메인**에 해당하는 부분은 **userinfo@host:port** 형식으로 구성된다. 보통 userinfo는 ssh 접속을 할 때 많이 사용되고, 우리가 보는 **웹 페이지의 도메인**은 **host(ip 주소)**와 **port(포트 번호)**일 것이다.

> 즉, Cross Domain은 <u>ip 주소 또는 포트 번호가 다른 것</u>을 의미한다.

