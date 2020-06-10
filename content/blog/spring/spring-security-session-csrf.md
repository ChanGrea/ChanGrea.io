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

### :banana: CSRF란?

**사용자의 의지와는 무관한** 수정/삭제/등록 등의 행위를 요청하는 것을 의미한다.



### :banana: Spring Security에서 CSRF를 방지하는 방법

스프링 시큐리티에서는 아래와 같은 방법으로 CSRF를 방지한다.

1. 세션 단위로 **무작위로 만든 토큰 값(CSRF 토큰)**을 발급
2. 그 토큰을 요청 파라미터(HTML 폼의 hidden 항목)에 포함시켜서 전송



### :banana: CSRF 방지 기능의 적용

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



## Session 관리

Spring Security의 인증 절차를 정상적으로 거쳤다면 아래와 같은 절차로 요청이 이루어진다.

1. 인증 성공하면, 서버는 사용자에게 **SessionID**를 발급된다.
   - 발금된 SessionID는 인메모리 세션 저장소인 **SecurityContextHolder**에 저장된다.
2. 사용자의 브라우저에는 `JSESSIONID`라는 항목으로 SessionID를 저장한다.
3. 이후 서버에 요청할 때마다 Request Header에 쿠키를 포함해서 보내는데, 여기에는 JSESSIONID도 포함된다.
4. 서버에서는 Request에 포함된 JSESSIONID를 저장한 SessionID와 비교하여 Session의 유효성을 판단한다.

> :exclamation: 번외의 이야기지만, 서버에 AJAX 요청할 때 도메인이 다르면, CORS 정책에 의해 쿠키를 보내지 않는다. (SPA 개발 시 흔히 겪는 경우다.)

<br />

### Session 관리 적용(?)

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  
  http.sessionManagement()
    .maximumSessions(1)
    .maxSessionsPreventsLogin(true)
    .expiredUrl("/duplicated-login")
    .sessionRegistry(sessionRegistry);
}

@Bean
public SessionRegistry sessionRegistry() {
  return new SessionRegistryImpl();
}// Register HttpSessionEventPublisher

@Bean
public static ServletListenerRegistrationBean httpSessionEventPublisher() {
  return new ServletListenerRegistrationBean(new HttpSessionEventPublisher());
}
```

#### :o: maximumSessions

- 최대 Session 수를 지정한다.
- 1을 지정하면 "1명"만 접속 가능하다.



#### :o: maxSessionsPreventsLogin

- 최대 세션을 넘어가면 로그인을 막겠다는 것이다.



#### :o: expiredUrl

- 세션이 만료되거나 중복되면 리다이렉트되는 URL이다.

<br />

이론상으로는 위 3가지 설정만 해주면 세션 동시성 제어가 된다고 생각할 수 있다.

하지만 로그아웃을 하고 다시 로그인을 하더라도 아래와 같은 에러가 발생한다.

> "Maximum sessions of 1 for this principal exceeded"

#### :heavy_check_mark: sessionRegistry 와 ServletListenerRegistrationBean

위와 같이 **SessionRegistry**와 **ServletListenerRegistrationBean**을 Bean으로 만든다.

SessionRegistry는 sessionManagement에 직접 붙여주고, ServletListenrRegistrationBean은 static Bean으로 등록한다.

#### :heavy_check_mark: UserDetails 구현체에 equals, hashcode 오버라이딩

아래는 Lombok을 사용한다는 가정하에 어노테이션으로 설정한 경우다.

username을 기준으로 equal과 hashcode를 구현한 것이다.

```java
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "username")
public class User implements Principal, UserDetails {
    @Id
    @Column
    @JsonIgnore
    private String username;
    // 생략
```

## Reference

- Session 관리 부분은 아래 블로그를 참조 :thumbsup:

[https://gompangs.tistory.com/entry/Spring-Boot-Spring-Security-maximumSessions-%EA%B4%80%EB%A0%A8](https://gompangs.tistory.com/entry/Spring-Boot-Spring-Security-maximumSessions-관련)

