---
title: Spring Security Session과 CSRF에 대해..
date: 2020-06-09 00:06:41
category: spring
---

##  Intro

지금까지 스프링 시큐리티의 개요와 인증, 인가에 대해서 정리했었다.

이제 CSRF와 세션에 대한 내용이 남았다. 정리하려고 여기저기 살펴보니, 사실 내용이 많지는 않았다. 그래서 이 포스팅에서 한번에 정리하고자 한다.

- [스프링 시큐리티, 설정, 아키텍처](https://changrea.io/spring/spring-security-start/)
- [인증(Form)](https://changrea.io/spring/spring-security-authentication/), [인증(DB, Logout)](https://changrea.io/spring/spring-security-authentication-db/) / [인가](https://changrea.io/spring/spring-security-authorization/)
- **CSRF 방지**
- **세션 관리**



## CSRF(<u>C</u>ross <u>S</u>ite <u>R</u>equest <u>F</u>orgery)

### CSRF란?

**사용자의 의지와는 무관한** 수정/삭제/등록 등의 행위를 요청하는 것을 의미한다.



### Spring Security에서 CSRF를 방지하는 방법

스프링 시큐리티에서는 아래와 같은 방법으로 CSRF를 방지한다.

1. 세션 단위로 **무작위로 만든 토큰 값(CSRF 토큰)**을 발급
2. 그 토큰을 요청 파라미터(HTML 폼의 hidden 항목)에 포함시켜서 전송



### CSRF 방지 기능의 적용

CSRF 방지 기능은 **Spring Framework 3.2**부터 추가되었다.

####  :exclamation: 4.0부터는 기본적으로 적용되는 기능이다.

- 따라서 따로 뭔가를 적용할 필요는 없다.
- 하지만 CSRF 방지 기능을 적용하고 싶지 않을 때는 명시적으로 비활성해야 한다.

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  
  http.csrf().disable();
}
```

