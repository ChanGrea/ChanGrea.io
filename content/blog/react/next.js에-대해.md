---
title: Next.js에 대해
date: 2022-03-21 21:03:41
category: react
---

> 프론트엔드 공부를 하다보니 여러 기업에서 또는 개발자들이 기본적으로 깔고 가는 스택들이 보인다. 요즘에는 **React, Typescript**가 주 베이스이고, 필요에 따라 **Redux, Recoil** 같은 상태관리 라이브러리 그리고 **GraphQL**, SSR을 지원하는 리액트 프레임워크인 **Next.js** 등등..
>
> 그 중에 요즘 가장 눈에 많이 띄는 것이 Next.js여서 이게 무엇이고, 왜 쓰는지에 대해 우선 정리하고자 한다.

## CSR(Client Side Rendering)의 장,단점?

기존에 React와 같은 CSR 방식의 장,단점은 무엇일까?

### 장점

- 사용자가 URL을 이동해도 서버에서 새로운 HTML을 내려 받지 않고 클라이언트에서 그리기 때문에 화면 깜빡임이 없는 사용자 경험을 제공

### 단점

- 번들링된 JS 파일의 크기가 크기 때문에 사용자가 웹 사이트를 요청했을 때 **사용자에게 실제 보여지는 타이밍이 늦어진다**.
  :point_right: 요청한 파일의 크기가 클수록 다운받는 시간이 증가
- **SEO(Search Engine Optimization)**이 힘들다.
  :point_right: 국내 검색 엔진들은 HTML 파일을 파싱한다.

> 이런 CSR의 단점을 커버할 수 있는 것이 SSR(Server Side Rendering)이다.



## SSR vs CSR

잠시 SSR과 CSR을 비교하면 아래와 같은 특징을 가지고 있다.

| SSR                                                      | CSR                                                       |
| -------------------------------------------------------- | --------------------------------------------------------- |
| :heavy_plus_sign: 정적 사이트에 이상적이다.              | :heavy_plus_sign: 웹 앱에 이상적이다.                     |
| :heavy_plus_sign: 빠른 초기 페이지 로딩                  | :heavy_plus_sign: 초기 로딩 후 빠른 렌더링                |
| :heavy_plus_sign: Javascript dependency가 없다.          | :heavy_plus_sign: 사용자 반응성이 좋다.                   |
| :heavy_plus_sign: SEO가 용이                             | :heavy_plus_sign: Javascript 라이브러리 선택의 폭이 넓다. |
| :heavy_minus_sign: 서버 요청이 잦아지게 된다.            | :heavy_minus_sign: SEO가 쉽지 않다.                       |
| :heavy_minus_sign: 새로 고침 시, 전체 페이지를 로딩한다. | :heavy_minus_sign: 초기 로딩 시간이 느리다.               |
| :heavy_minus_sign: 사용자 반응성이 좋지 않다.            | :heavy_minus_sign: 외부 라이브러리가 요구된다.            |
| :heavy_minus_sign: latency가 높다.                       | :heavy_minus_sign: 메모리 소비율이 높다.                  |



## Next.js란?

Next.js는 SSR의 장점과 CSR의 장점을 가지고 있다.

### Next.js의 정의

Next.js는 React로 만드는 **서버사이드 렌더링 프레임워크**이다. 즉, SSR을 쉽게 구현할 수 있게 도와주는 프레임워크다. 그렇다면 React에서 SSR이 불가능한가? 답은 "React에서도 SSR이 구현 가능하다."이다. 하지만, React에서 SSR을 구현하는 것은 Next.js에 비해 러닝 커브가 꽤 있다.



## Next.js를 사용하는 이유와 특징

### 1. Next.js는 서버에서 자바스크립트를 로딩한다.

이것은 클라이언트에서 빈 HTML을 받고나서 자바스크립트로 HTML을 채우는 것이 아닌, **서버에서 자바스크립트로 HTML에 컨텐츠를 채운 결과물을 첫 페이지로** 클라이언트에게 넘겨준다는 뜻이다.

그러면 클라이언트에서는 DOM을 그대로 그리기만 하면 되므로, 사용자에게 실제 보여지는 시점이 빨라진다.

### 2. Next.js는 SEO 문제를 해결한다.

자연스럽게 HTML, CSS, Javascript로 만들어진 HTML을 제공함으로써 SEO 문제를 해결할 수 있다.

### 3. Next.js는 SPA의 장점을 유지한다.

첫 페이지를 SSR 방식으로 받은 후, 이후 요청, 다른 페이지 이동할 때부터는 CSR 방식으로 브라우저에서 처리하기 때문에 SPA의 장점을 유지 가능하다.



## Next.js의 동작원리

이미 위에 특징들을 읽었다면 어느정도 짐작하겠지만, Next.js는 아래와 같이 동작한다.

1. 초기에 Client가 Server에 웹페이지를 요청하면, 서버에서는 SSR 방식으로 만든 HTML을 응답으로 준다.
2. Client에서는 받은 HTML을 렌더링하고, 필요한 Javascript를 다운로드한다.
3. 이후 사용자 요청, 다른 페이지 이동시에는 CSR 방식으로 브라우저에서 처리된다.



## 정리

Next.js는 결국 React에서 SSR 방식을 사용할 수 있도록 도와주는 프레임워크이다.

그리고 이것은 **초기 페이지 로딩 시점을 빠르게** 앞당기고, CSR에서 문제가 되었던 **SEO 문제를 해결**하면서도 **CSR 방식의 장점인 좋은 사용자 반응성을 그대로 가져간다**는 특징이 있다.
