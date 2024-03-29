---
title: Spring Core (DI)
date: 2020-03-23 21:03:07
category: spring
---

## Intro

이번 포스팅에서는 스프링 프로젝트의 중심, 스프링 프레임워크의 핵심인 스프링 코어(Spring Core)에 대해서 정리한다.

그 중에서 **DI(Dependency Injection)**에 대해서 정리할 것이고,

이후에 *AOP(Aspect Oriented Programming), 데이터 바인딩, 형 변환, 프로퍼티 관리, 스프링 표현 언어(SpEL), 리소스 추상화, 메시지 관리* 에 대해서 차차 정리할 예정이다.

## DI가 필요하게 된 배경

### *클래스 간의 결합도가 높다?*

```java
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  
  public UserServiceImpl(javax.sql.DataSource dataSource) {
    // 데이터베이스 방식으로 사용자 정보를 관리하는 구현 클래스
    this.userRepository = new JdbcUserRepository(dataSource);
    
    // Bccrypt 알고리즘으로 해시화하는 구현 클래스
    this.passwordEncoder = new BCryptPasswordEncdoer();
  }
  
  public void register(User user, String rawPassword) {
    if (this.userRepository.countByUsername(user.getUsername()) > 0) {
      // 같은 사용자 계정의 사용자가 있다면 예외를 발생시킨다.
      throw new UserAlreayRegisteredException();
    }
    
    // 입력된 원본 패스워드를 해시화한 후, 사용자 정보로 설정한다.
    user.setPassword(this.passwordEncoder.encode(rawPassword));
    this.userRepository.save(user);
  }
}
```

위 코드를 보면, 생성자에서 userRepository와 passwordEncoder를 초기화하기 위해 UserRepository와 PasswordEncoder의 구현 클래스를 <u>직접 생성해서 할당</u>한다.

- UserServiceImpl를 개발하는 단계에서는 의존하는 컴포넌트의 클래스가 이미 완성되어 있어야 한다.
- 이미 생성된 UserRepository나 PasswordEncoder의 구현 클래스를 교체하는 것이 사실상 어렵다.

이런 방식은 위 두 가지 문제점을 가지고 있다.

이러한 클래스 간의 관계를 두고 **"클래스 간의 결합도가 높다"**라고 말한다.

### *클래스의 결합도를 낮추러면?*

생성자 안에서 구현 클래스를 직접 생성하는 대신, **생성자의 인수로 받아서 할당**하는 방법이 있다.

```java
public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
  this.userRepository = userRepository;
  this.passwordEncoder = passwordEncoder;
}
```

하지만 이 경우에도 UserServiceImpl이 의존하는 각 컴포넌트는 개발자가 직접 생성해서 주입해야 하기 때문에 변경이 발생하는 경우의 재작업은 피할 수 없다.

여기서 본 것처럼 어떤 클래스가 필요로 하는 컴포넌트를 외부에서 생성한 후, 내부에서 사용 가능하게 만들어 주는 과정을 '**의존성을 주입(DI)한다**' 또는 **'인젝션(Injection)한다**'라고 말한다.

## DI 개요

### IoC

DI는 의존성 주입이라고도 하며, `IoC`라고 하는 소프트웨어 디자인 패턴 중 하나다.

IoC는 인스턴스를 제어하는 주도권이 역전된다는 의미이고, 인스턴스 생성과 의존 관계의 연결을 소스코드에서 하는 것이 아니고, DI 컨테이너에서 대신해준다.

### DI 컨테이너의 장점

- 인스턴스의 스코프 제어
- 인스턴스의 생명 주기 제어
- AOP방식으로 공통 기능을 집어넣을 수 있다.
- 의존하는 컴포넌트 간의 결합도를 낮춰 단위 테스트하기 쉽게 만든다.

## ApplicationContext와 빈 정의

스프링 프레임워크에서는 ApplicationContext가 DI 컨테이너의 역할을 한다.

### DI 컨테이너에서 인스턴스 꺼내기

```java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
UserService userService = ccontext.getBean(UserService.class);
```

위 코드에서 **AppConfig** 클래스는 <u>설정 파일 역할</u>을 한다. (DI 컨테이너에 빈을 정의하는 역할)

DI 컨테이너에 등록하는 컴포넌트를 **빈**이라고 하고, 이 빈에 대한 설정 정보를 '**빈 정의**'라고 한다.

또한 DI 컨테이너에서 빈을 찾아오는 행위를 '**룩업(lookup)**'이라고 한다.

## 빈 설정

빈을 정의 즉, 빈을 설정하는 방식에는 세 가지가 있다.

### 1. 자바 기반 설정 방식

`@Configuration`, `@Bean` 어노테이션 사용

```java
import ...;

@Configuration
public class AppConfig {
  @Bean
  UserRepository userRepository() {
    return new UserRepositoryImpl();
  }
  
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
  
  @Bean
  UserService userService() {
    return new UserServiceImpl(userRepository(), passwordEncoder());
  }
}
```

메서드에 매개변수를 추가하는 방법으로 다른 컴포넌트의 의존성을 주입할 수 있다. (단, 인수로 전달될 인스턴스에 대한 빈은 별도로 정의돼 있어야 한다.) :point_right: userService()

### 2. XML 기반 설정 방식

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans
       xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/beans
                      http://www.springframework.org/schema/beans/spring-beans.xsd
                      http://www.springframework.org/schema/context
                      http://www.springframework.org/schema/context/spring-context-4.3.xsd">
	<bean id="userRepository" class="com.example.demo.UserRepositoryImpl" />
  <bean id="passwordEncoder" class="com.example.demo.BCryptPasswordEncoder" />
  <bean id="userService" class="com.example.demo.UserServiceImpl">
  	<constructor-arg ref="userRepository" />
    <constructor-arg ref="passwordEncoder" />
  </bean>
</beans>
```

이 방식도 자바 기반 설정 방식과 마찬가지로 모든 컴포넌트의 빈을 정의해야 하는 번거로움이 있다. 그래서 두 방식 모두 보통은 **애너테이션 기반 설정 방식과 조합해서 사용**하는 것이 일반적이다.

### 3. 애너테이션 기반 설정 방식

DI 컨테이너에 관리할 빈을 빈 설정 파일에 정의하는 대신 빈을 정의하는 애너테이션을 빈의 클래스에 부여하는 방식 사용

이후에 이 애너테이션이 붙은 클래스를 탐색해서 DI 컨테이너에 자동으로 등록하는데 이러한 탐색 과정을 **컴포넌트 스캔(Component Scan)**이라고 한다.

또한 의존성 주입도 애너테이션이 붙어 있으면 DI 컨테이너가 자동으로 필요로 하는 의존 컴포넌트를 주입하게 한다. 이러한 주입 과정을 **오토와이어링(Auto Wiring)**이라 한다.

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    // 생략
  }
}
```

#### 컴포넌트 스캔 범위 지정

컴포넌트 스캔을 수행할 때 스캔할 범위를 지정해야 한다. (**자바 기반 설저 방식** or **XML 기반 설정 방식**)

1. 자바 기반 설정 방식

   ```java
   import org.springframework.context.annotation.ComponentScan;
   // 기타 임포트 문은 생략
   
   @Configuration
   @ComponentScan("com.example.demo")
   public class AppConfig {
     // 생략
   }
   ```

   - com.example.demo 패키지 이하의 범위에서 클래스 스캔(생략 할 경우 설정 클래스가 들어있는 패키지 이하 스캔)

     <br/>

2. XML 기반 설정 방식

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans
          xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd
                         http://www.springframework.org/schema/context
                         http://www.springframework.org/schema/context/spring-context-4.3.xsd">
     <context:component-scan base-package="com.example.demo" />
   </beans>
   ```

## 의존성 주입

### 설정자 기반 의존성 주입 방식 (*세터 인젝션*)

#### UserServiceImpl에 설정자 메서드 구현

```java
public class UserServiceImpl implements UserService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;
  
  // 기본 생성자(생략 가능)
  public UserServiceImpl() {}
  
  public void setUserRepository(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }
  // 생략
}
```

#### 세터 인젝션을 <u>자바</u> 기반 설정 방식으로 표현한 예

```java
@Bean
UserService userService() {
  UserServiceImpl userService = new UserServiceImpl();
  userService.setUserRepository(userRepository());
  userService.setPasswordEncoder(passwordEncoder());
  return userService;
}
```

- 프로그램에서 인스턴스를 직접 생성하는 코드처럼 보이기 때문에 빈을 정의한 설정인지 체감이 되지 않음

#### 세터 인젝션을 <u>XML</u> 기반 설정 방식으로 표현한 예

```xml
<bean id="userService" class="com.example.demo.UserServiceImpl">
	<property name="userRepository" ref="userRepository" />
  <property name="passwordEncoder" ref="passwordEncoder" />
</bean>
```

- name에 주입할 대상의 이름을 지정
- 이름이 'xyz'라면, 설정자(setter)와 접근자(getter) 메서드는 setXyz, getXyz가 된다.

#### 세터 인젝션을 <u>애너테이션</u> 기반 설정 방식으로 표현한 예

```java
@Component
public class UserServiceImpl implements UserService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;
  
  @Autowired
  public void setUserRepository(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  @Autowired
  public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }
  
  // 생략
}
```

- 설정자 메서드(Setter)에 @Autowired만 달아주면 된다.

### 생성자 기반 의존성 주입 방식 (*컨스트럭션 인젝션*)

- 생성자의 인수를 사용해 의존성 주입

#### 컨스트럭터 인젝션을 XML 기반 설정 방식으로 표현한 예(인덱스 사용)

```xml
<bean id="userSerivce" class="com.example.demo.UserServiceImpl">
	<constructor-arg index="0" ref="userRepository" />
  <constructor-arg index="1" ref="passwordEncoder" />
</bean>

<!-- 아래와 같이 name 속성으로 네이밍 가능 -->
<bean id="userSerivce" class="com.example.demo.UserServiceImpl">
	<constructor-arg name="userRepository" ref="userRepository" />
  <constructor-arg name="passwordEncoder" ref="passwordEncoder" />
</bean>
```

- index를 사용하여 가독성 향상, 실수 방지
- name 속성을 이용하는 경우에는 컴파일 과정에서 없어지기 때문에 javac 명령과 함께 디버깅 정보를 전달할 수 있는 -g 옵션을 사용해야 한다. (JDK8 이후부터 매개변수의 메타 정보를 생성할 수 있는 -parameters 옵션 사용)
  - 대신 아래와 같이 애너테이션 기반 설정으로 대체 가능

#### 컨스트럭터 인젝션을 애너테이션 기반 설정으로 표현한 예

```java
@ConstructorProperties({"userRepository", "passwordEncoder"})
public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
  //생략
}
```

- 필드를 final로 선언해서 생성 후에 변경되지 않게 만든다.

### 필드 기반 의존성 주입 방식 (*필드 인젝션*)

- DI 컨테이너의 힘을 빌려 의존성 주입
- 필드에 `@Autowired` 애너테이션을 달아준다.
- Getter나 Setter를 굳이 만들 필요가 없어서 간결해 보인다.

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  UserRepository userRepository;
  
  @Autowired
  PasswordEncoder passwordEncoder;
  
  // 생략
}
```

- :exclamation: DI 컨테이너 없이 사용되는 독립형 라이브러리는 필드 인젝션을 사용하지 않는다.

## 오토와이어링

### 타입으로 오토와이어링하기

- 지금까지 했던 @Autowired 애너테이션은 타입으로 오토와이어링 하는 방식
- 기본적으로 의존성 주입이 반드시 **성공**한다고 가정
  - 찾지 못하면 NoSuchBeanDefinitionException 발생
  - 만약 이런 필수 조건을 완화하고 싶다면 @Autowired 애너테이션에 **required 속성에 false**를 설정 ( **@Autowired(required = false)** )
  - Java SE 8부터 java.util.Optional 사용 가능

```java
@Autowired
Optional<PasswordEncoder> passwordEncoder;

public void createUser(User user, String rawPassword) {
  String encodedPassword = passwordEncoder.map(x -> x.encode(rawPassword))
    												.orElse(rawPassword);
}
```

#### *만약 같은 타입의 빈이 여러 개 정의된 경우라면?*

- `@Qualifier` 애너테이션을 추가하면서 빈 이름을 지정하면 같은 타입의 빈 중에서 원하는 빈만 선택할 수 있다.

```java
// 두 개의 PasswordEncoder를 자바 기반 설정 방식으로 정의한 예
@Configuration
@ComponentScan
public class AppConfig {
  @Bean
  PasswordEncoder sha256PasswordEncoder() {
    return new Sha256PasswordEncoder();
  }
  
  @Bean
  PasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
  
  // 생략
}
```

```java
// @Qualifier를 사용해 빈 이름 명시
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  @Qualifier("sha256PasswordEncoder")
  PasswordEncoder passwordEncoder;
  // 생략
}
```

@Qualifier 대신에 Bean에 **@Primary 애너테이션**을 붙여서 기본으로 선택하게 할 수도 있다.

### 이름으로 오토와이어링하기

- `@Resource` 애너테이션 활용

#### @Resource 애너테이션을 활용해 필드 인젝션을 하는 예

```java
@Component
public class UserServiceImpl implements UserService {
  @Resource(name = "sha256PasswordEncoder")
  PasswordEncoder passwordEncoder;
  // 생략
}
```

#### name 속성 생략

- name 속성은 생략이 가능하다.
- 이런 경우에는 필드 이름 또는 프로퍼티 이름과 같은 빈이 선택된다.

```java
@Component
public class UserServiceImpl implements UserService {
  @Resource
  PasswordEncoder sha256PasswordEncoder;
  // 생략
}
```

```java
@Component
public class UserServiceImpl implements UserService {
	private PasswordEncoder passwordEncoder;
  
  @Resource
  public void setSha256PasswordEncoder(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }
  
  // 생략
}
```

- 위의 어느 경우에 해당되지 않으면 타입으로 오토와이어링 시도