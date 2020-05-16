---
title: Spring Security Start
date: 2020-05-16 09:05:09
category: spring
---

## Intro

스프링 프레임워크 프로젝트에는 여러 가지가 있는데, 그 중 **Security** 부분에 대해서 정리를 하고자 한다.

웹 개발을 하면서 기능적인 요소도 중요하지만, 무엇보다 중요한 것이 **보안**이 아닐까 생각이 든다.

**스프링 시큐리티**는 보안 기능을 구현할 때 사용하는 프레임워크이다.

- **스프링 시큐리티, 설정, 아키텍처**
- 인증 / 인가
- CSRF 방지
- 세션 관리

이번 포스팅에서는 **스프링 시큐리티의 특징과 설정 방법, 아키텍처**에 대해서 정리할 것이다.



## 스프링 시큐리티란?

### :banana: 스프링 시큐리티의 특징

#### :heavy_check_mark: 다양한 옵션을 제공

- 기본 구현 클래스의 동작 방식을 **커스터마이징**할 수 있는 <u>다양한 옵션</u> 제공

> 기본 옵션 값을 변경한다는 것을 의미

#### :heavy_check_mark: 다양한 확장점을 제공

- 동작 방식을 커스터마이징할 수 있는 <u>다양한 확장점</u> 제공

> 확장 클래스를 만드는 방법을 제공한다는 의미



### :banana: ​기본적인 보안 기능

스프링 시큐리티는 기본적인 보안 기능으로 `인증`과 `인가 `두 가지 기능을 제공한다.

> :question: 인증과 인가의 차이점?
>
> 간단하게 말해 `인증` 은 Who?  `인가` Can I?
>
> **인증**은 이 앱의 사용자가 맞는지를 검증하는 것이고,
>
> **인가**는 그 사용자가 리소스나 처리에 대해 접근을 할 수 있는지를 검증하는 것이다.



### :banana: 강화된 보안 기능

인증/인가 외에 보안 강화를 위한 추가 기능을 제공한다.

| 기능                          | 설명                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| 세션 관리                     | Session Hijacking(세션 하이재킹) 또는 Session Fixation(세션 고정) 공격으로부터 보호, 세션의 라이프 사이클(생성 파기, 타임아웃) 제어 |
| CSRF 방지                     | 크로스 사이트 요청 변조(Cross-Site Request Forgery: CSRF) 공격으로부터 보호 |
| 브라우저의 보안 기능과의 연계 | 브라우저 기능을 악용한 공격에서 보호할 수 있는 보안 헤더 출력 |

이 외에도 많은 기능을 제공한다.



## 스프링 시큐리티의 설정

### :wrench: 라이브러리의 설정

- spring-security-web
- spring-security-config



> pom.xml

```xml
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-config</artifactId>
</dependency>
```



### :pencil2: 스프링 시큐리티의 빈 정의

#### 설정 클래스 작성

- 자바 기반 설정 방식이다. (XML 기반 설정 방식은 정리하지  않는다.)

```java
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  public void configure(WebSecurity web) {
    web.ignoring().antMatchers("/resources/**");	//js나 css는 보안 기능이 필요없으므로 제외
  }
}
```

- @Configuration
  - 책에서는 따로 web.xml에 작성한 클래스를 지정하였지만, 나 같은 경우는 이 어노테이션을 사용하여 web.xml 설정을 대신하였다.
- @EnableSebSecurity
  - 스프링 시큐리티가 제공하는 설정 클래스가 임포트되고 스프링 시큐리티를 이용할 때 필요한 컴포넌트의 빈이 자동으로 정의된다.



## 스프링 시큐리티의 아키텍처

### :banana: 스프링 시큐리티의 모듈 구성

| 모듈명                  | 설명                                                         |
| ----------------------- | ------------------------------------------------------------ |
| spring-security-core    | **인증과 인가 기능**을 구현하기 위한 핵심적인 컴포넌트로 구성됨 |
| spring-security-web     | **웹 애플리케이션**의 보안 기능을 구현하기 위한 컴포넌트로 구성됨 |
| spring-security-config  | 각 모듈에서 제공하는 컴포넌트의 **설정**을 지원하기 위한 컴포넌트로 구성됨 |
| spring-security-taglibs | 인증 정보나 인가 정보를 사요하기 위한 JSP 태그 라이브러리로 구성됨 |

추가적으로 아래와 같은 모듈도 제공

- 일반적인 인증 방법(LDAP, OpenID, CAS 등)을 지원하기 위한 모듈
- ACL(Access Control List)을 사용한 도메인 객체의 인가를 제어하는 모듈
- 스프링의 웹소켓 기능에 보안 기능을 구현하기 위한 모듈
- 스프링 시큐리티를 활용한 코드를 테스트하기 위한 모듈



### :banana: 프레임워크 아키텍처

프레임워크에서 주요 기능을 처리하는 컴포넌트는 다음과 같다.

#### :o: FilterChainProxy

- 프레임워크의 진입점 역할을 하는 서블릿 필터 클래스
- 프레임워크에서 처리되는 전체 흐름 제어
- 보안 기능과 같은 추가 기능을 필터에 위임하는 방식으로 동작



#### :o: HttpFirewall

- HttpServletRequest와 HttpServletResponse에 대한 방화벽 기능을 추가하기 위한 인터페이스
- 기본적으로 DefaultHttpFirewall 클래스 사용
- 디렉터리 탐색 공격이나 인가되지 않은 요청을 차단하는 역할



#### :o: SecurityFilterChain

- FilterChainProxy가 받은 요청에 적용할 보안 필터 목록을 관리하기 위한 인터페이스

- 기본적으로 DefaultSecurityFilterChain 클래스 사용

- 요청 패턴 별로 보안 필터 목록을 관리

  ```java
  @EnableWebSecurity
  public class WebSecurityConfig {
    @Configuration
    @Order(1)
    public static class UiWebSecurityConfig extends WebSecurityConfigurerAdapter {
      @Override
      protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/ui/**");
        // 생략
      }
    }
    
    @Configuration
    @Order(2)
    public static class ApiWebSecurityConfig extends WebSecurityConfigurerAdapter {
      @Override
      protect void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/api/**");
        // 생략
      }
    }
  }
  ```



#### :o: 보안 필터(Security Filter)

- 보안 기능을 제공하는 서블릿 필터 클래스
- 보안 필터를 체인 형태로 연결

> 인증과 인가 기능을 구현하는 데 필요한 핵심 클래스

| 클래스명                             | 설명                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| SecurityContextPersistenceFilter     | 인증 정보를 요청 처리 과정 전반에서 공유할 수 있게 만든다. 기본 구현에서는 HttpSession에 인증 정보를 저장해서 공유하는 방식을 쓴다. |
| UsernamePasswordAuthenticationFilter | 요청 파라미터에서 지정한 사용자명과 패스워드를 사용해 인증을 처리한다. 폼 인증을 수행할 때 사용한다. |
| LogoutFilter                         | 로그아웃 처리를 한다.                                        |
| FilterSecurityInterceptor            | HTTP 요청(HttpServletRequest)의 인가를 처리한다.             |
| ExceptionTranslationFilter           | FilterSecurityInterceptor에서 발생한 예외를 처리하고 클라이언트에 반환할 응답을 만든다.<br />기본적인 구현 방식에서는 인증되지 않은 사용자는 인증을 하도록 유도하고, 이미 인증된 사용자라면 인가 오류가 발생했다는 것을 알려준다. |

