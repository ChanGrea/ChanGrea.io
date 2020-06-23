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

하지만, 스크립트 태그 내에서 **특정한 도메인 간(Cross-Domain) 요청**, 특히 Ajax 요청은 다른 도메인에 데이터를 요청하는 것이 금지되었다.

### :thinking: Cross Domain이 뭔데?

예전에 정리했던 [REST API와 설계원칙(2) 중 'URI의 Authority 부분'](https://changrea.io/Web/rest-api-design-1/#authority) 을 참고하면, Authority는 **서버명**과 **도메인명**으로 구성된다.

여기서 **도메인**에 해당하는 부분은 **userinfo@host:port** 형식으로 구성된다. 보통 userinfo는 ssh 접속을 할 때 많이 사용되고, 우리가 보는 **웹 페이지의 도메인**은 **host(ip 주소)**와 **port(포트 번호)**일 것이다.

> 즉, Cross Domain은 <u>ip 주소 또는 포트 번호가 다른 것</u>을 의미한다.

### :question: 그럼 CORS가 왜 생겼고, 왜 이것을 따라야 할까?

언급했듯이, 기존에는 다른 도메인에 데이터를 요청하는 것 자체가 불가능했다. 하지만, Ajax가 점점 널리 쓰이게 되고, 요즘은 프론트엔드 개발을 "localhost:3000" 같이 다른 도메인에서 개발을 하듯이 타 도메인에 대해 데이터 요청이 필요하게 되었다.

Cross-Site HTTP Requests에 대한 요구가 늘어나자 **W3C**에서 `CORS` 라는 권고안을 내 준 것이다.

당연히 Cross-site HTTP Requests는 **"보안"**을 위해서 막아뒀었기 때문에 이를 허용해주는 정책인 CORS 권고안을 따라야 한다.



### :construction: CORS 프로세스

<img src="./img/cors_wiki.png" />

<div style="text-align:right; font-style:italic; font-weight:100;">cors 위키백과 참고</div>

위키백과에서 cors를 검색하면 위와 같은 그림이 있다.

우리가 브라우저에서 Ajax 요청(XHR call)을 보내면 발생하는 프로세스를 그림으로 나타낸 것이다.

<span style="color: green;">녹색</span>으로 표시된 부분과 <span style="color: red;">적색</span>으로 표시된 부분을 나눠서 살펴보자.

<div style="border: 3px solid RGB(220, 233, 213); padding:5px;">
1. 먼저 Cross-domain Ajax 요청이 들어오면 브라우저에서는 <code class="language-text">GET</code> 또는 <code class="language-text">HEAD</code> 요청인지를 본다.<br>
  2. 단순히 데이터를 가져오기 위한 GET과 HEAD 요청이라면 사용자가 정의한 HTTP header(<code class="language-text">custom HTTP header</code>) 항목이 있는지 검사한다.
</div>

<br>

<div style="border: 3px solid RGB(223, 186, 177); padding:5px;">
  
</div>