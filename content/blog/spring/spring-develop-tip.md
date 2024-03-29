---
title: 처음 스프링 개발을 하면서 알아뒀으면 좋았던 것들
date: 2020-06-12 00:06:70
category: spring
---

## Intro

이번에 회사에서 나름(?) 스프링을 이용한 웹 애플리케이션을 개발했었다. 물론 처음부터 하나하나 다 만들어서 진행했던 것은 아니다.

대부분 프로젝트가 그렇듯이, 기존에 개발된 것들을 활용하는 경우가 많을 것이다.

물론 백엔드도 처음이고 스프링 또한 처음이었기 때문에 미숙한 점이 많았다. 이미 고수였다면 좋았겠지만, 초보자 또는 입문자 입장에서 알고 진행했다면 좋았던 것들에 대해서 정리하려고 한다.



## 활용했던 기존 코드는 어떻게 되어 있었나?

### :wrench: 개발 환경

개발 환경은 아래와 같다. 언뜻 보기에는 그냥 흔히 사용하는 기술 셋들이다. 하지만 MyBatis로 인한 수많은 SQL 쿼리들, Angular가 아닌 Angular.js, 예전 node 버전 등 레거시 스타일이 나를 너무 힘들게 했다. :disappointed:

#### :arrow_right: Backend

- Spring Boot / Security / Batch
- MyBatis
- PostgreSQL

#### :arrow_right: Frontend

- Angular.js
- Bower
- Gulp
- node **v6.0.0**



## 새로 프로젝트에 개발할 때는?

모든 것을 최신 기술, 스타일로 바꾸는 것이 가장 베스트긴 하겠지만, 그러기엔 일정의 압박이 있었다.

### Frontend는 그대로.. :disappointed_relieved:

Frontend 개발을 주로 해오긴 했지만, Frontend에서 쓰인 Angular.js는 처음 접했다. (~~코드를 보니 더 가관..~~) :thinking:

내가 생각하는 SPA(Single Page Application)의 개념과는 다른 생각을 가지고 개발을 한 것 같았다. (HTML 파일 하나에 모든 코드가 있었다.)

이것을 모두 컴포넌트화하고 라우팅을 적용하고 그러기엔 너무 리소스가 많이 투자되는 느낌이었다.

### Backend에서 개선할 수 있는 부분에 집중하자

기존에 MyBatis로 인해 SQL 쿼리가 굉장히 많았고, 하나의 기능을 이해하기 위해 확인해야 하는 인터페이스, 구현 클래스, xml 파일들이 동떨어져 있었고 너무 많았다.

1. 모두 `JPA` 로 전환
2. 불필요한 xml, 인터페이스, 구현 클래스 파일들을 모두 제거
3. RESTful하게 API 설계 및 적용

이 세 가지에 집중하기로 결정했다.

이렇게 써놨지만, 좀 더 깔끔하고 클린하게 개발하고 싶었다.



## 알아뒀으면 좋았던 것들

앞에서 푸념 아닌 푸념을 늘어놨지만 그거는 누구든 겪는 것이라고 생각하고, 사실 지금부터 정리할 내용은 내가 개발을 하면서 놓쳤던 부분이나 아쉬웠던 부분들이다.



### :baby_chick: Lombok의 적극 활용

Lombok이라는 플러그인이 편리하고 코드를 많이 줄여준다는 것은 알고 있었지만, 사실 활용했던 것은 주로 Getter, Setter 뿐이었던 것 같다.

오랫동안 Java 개발을 안했고, spring 개발을 처음이었기 때문인지는 몰라도 Lombok에는 이것 외에도 정말 유용한 어노테이션이 많았는데, 이것을 활용하지 못했다는 점이 아쉽다.

예를 들어 아래와 같은 것들이다.

- @RequiredArgsConstructor
  - 선언된 모든 final 필드가 포함된 생성자를 생성해 준다.
  - final이 없는 필드는 생성자에 포함되지 않는다.
- @NoArgsConstructor
  - 기본 생성자를 생성해준다.
- @NonNull
- @ToString
  - toString() 메서드를 생성해준다.
- @EqualsAndHashCode
  - equals(), hashCode() 메서드를 생성해준다.
- @Data
  - Class에 정의된 모든 필드의 Getter, Setter와 toString, equals, hashCode, final 또는 @NonNull로 명시된 필드에 대한 생성자 코드를 생성해준다.
- @Log
  - 자동으로 Logging을 위한 필드인 **private static final Logger log**가 추가된다.
  - 이후 로그 기록이 필요한 곳에서 log.info(), log.error() 등의 형태로 사용
- @Builder



### :baby_chick: ​DAO와 DTO의 분리

사실 DAO와 DTO를 분리해야 한다는 개념은 알고 있었다. 그런데 막상 개발을 열심히 하다가 보니까 Entity 클래스를 그냥 그대로 사용하고 있었다..:sweat_smile:

요구사항은 언제든지 변경된다. 하지만 한 번 설계된 데이터베이스 테이블의 스키마는 쉽게 변경되지 않는다. 

실제 Controller에서 **결괏값으로 여러 테이블을 조인해서 줘야 할 경우**가 빈번하므로 Entity 클래스만으로 표현하기가 어려운 경우가 많다.



#### Example code

> DAO (Entity 클래스)

```java
@Getter
@NoArgsConstructor
@Entity
public class Posts {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(length = 500, nullable = false)
  private String title;
  
  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;
  
  private String author;
  
  @Builder
  public Posts(String title, String content, String author) {
    this.title = title;
    this.content = content;
    this.author = author;
  }
}
```

- Entity 클래스에서는 **Setter를 만들지 않는다.**
  - 클래스의 인스턴스 값들이 언제 어디서 변해야 하는지 코드상으로 명확하게 구분 불가능하기 때문

:arrow_right: 기본적인 구조는 **생성자를 통해** 최종값을 채운 후 DB에 삽입하는 구조

- 값 변경이 필요한 경우 **해당 이벤트에 맞는 public 메소드를 호출**하여 변경

```java
// 값 변경 메소드 예제
public class Order {
  public void cancelOrder(){
    this.status = false;
  }
}

public void 주문서비스의_취소이벤트 () {
  order.cancelOrder();
}
```



> Request DTO

```java
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
  private String title;
  private String content;
  private String author;
  
  @Builder
  public PostsSaveRequestDto(String title, String content, String author) {
    this.title = title;
    this.content = content;
    this.author = author;
  }
  
  public Posts toEntity() {
    return Posts.builder()
      .title(title)
      .content(content)
      .author(author)
      .build();
  }
}
```

- **toEntity()** 메소드를 보면 `Posts` 형태로 만들어서 리턴하는 모습을 볼 수 있다.
  - 실제 request가 들어오면 **DAO 형태**로 만들어서 바로 넣을 수 있게 한다.



> Response DTO

```java
@Getter
public class PostsResponseDto {
  
  private Long id;
  private String title;
  private String content;
  private String author;
  
  public PostsResponseDto(Posts entity) {
    this.id = entity.id;
    this.title = entity.title;
    this.content = entity.content;
    this.author = entity.author;
  }
}
```

- **Entity의 필드 중 일부만 사용**
  - Entity의 모든 필드를 사용하지 않기 때문



### :baby_chick: ​@Autowired의 남발:crying_cat_face:

Spring 개발을 해봤다면, Controller와 Service에서 @Autowired가 있는 것을 많이 봤을 것이다.

**<u>스프링에서 Bean을 주입받는 방식</u>**들에는 3가지가 있다.

- @Autowired
- Setter
- 생성자

이 중 가장 권장하는 방식이 **생성자로 주입**받는 방식이다. (**@Autowired는 권장하지 않는다.**)

생성자로 주입받는 방식은 아래와 같다.

```java
import lombok.RequiredArgsConstructor;
// ... 생략
  
@RequiredArgsConstructor
@Service
public class PostsService {
  private final PostsRepository postsRepository;
  
  @Transactional
  public Long save(PostsSaveRequestDto requestDto) {
    return postsRepository.save(requestDto.toEntity()).getId();
  }
}
```

- `@RequiredArgsConstructor`
  - **final이 선언된 모든 필드**를 인자값으로 하는 생성자를 대신 생성



### :baby_chick: ​JPA의 완벽한 이해와 활용

이번 프로젝트에는 **Spring Data JPA**를 사용했다. 간단한 CRUD의 경우에는 여기서 제공하는 쿼리 메소드를 활용해서 쉽게 개발할 수 있었다.

하지만, **통계 쿼리**의 경우에는 JPA를 완벽하게 이해하지 못해서 그런지 활용하기가 쉽지 않았다. 그래서 Native Query로 했고 이 부분이 너무 아쉽다.

JPA에 대해 좀 더 공부를 해야겠다.:frowning_face:



### :baby_chick: ​JPA Auditing으로 생성시간/수정시간 자동화

보통 Entity에는 해당 데이터의 생성시간과 수정시간을 포함한다. 하지만 매번 DB에 Insert할 때, Update할 때, 날짜 데이터를 등록/수정하는 코드가 여기저기 흩어져있다.

이것을 JPA Auditing을 이용해서 Entity들의 createdDate, modifiedDate를 자동으로 관리하도록 하는 것이다.



#### 1. Auditing 클래스 작성

```java
import lombok.Getter
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {
  
  @CreatedDate
  private LocalDateTime createdDate;
  
  @LastModifiedDate
  private LocalDateTime modifiedDate;
}
```

- `@MappedSuperclass`
  - JPA Entity 클래스들이 BaseTimeEntity을 상속할 경우 필드들(createdDate, modifiedDate)도 칼럼으로 인식하도록 함
- `@EntityListeners(AuditingEntityListener.class)`
  - BaseTimeEntity 클래스에 Auditing 기능을 포함



#### 2. JPA Auditing 클래스 상속

```java
...
public class Posts extends BaseTimeEntity {
	...
}
```



#### 3. JPA Auditing 활성화

```java
@EnableJpaAuditing	// JPA Auditing 활성화
@SpringBootApplication
public class Application {
  
  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
```





### :baby_chick: ​DDD 방식으로 폴더 구성 및 개발

DDD는 **D**omain **D**riven **D**esign의 약자이다. DDD 방식은 비즈니스 **<u>도메인</u>** 중심으로 Class나 Method, 변수를 정의하고 구성하여 개발하는 방식이다. 

> :question: 도메인(Domain)
>
> 게시글, 댓글, 회원, 결제 등 소프트웨어에 대한 요구사항 혹은 문제 영역

이번 프로젝트에서는 DDD 방식이 아닌 그냥 Entity, Repository, Service, Controller 4가지 Layer로 폴더를 구성하여 진행했다.

점점 코드가 늘어나면서, IDE의 도움을 받긴 했지만 그래도 흩어져 있는 Entity와 그 Repository 그리고 기능이 추가될 때마다 기계처럼 추가되는 Controller와 Service 코드들 때문에 어떤 클래스가 어떤 역할을 하는지 파악이 어려워지면서 디버깅, 추가/수정 등이 어려웠다.

DDD 방식으로 각각의 기능, 행위들 위주로 모아서 관리했다면 좀 더 깔끔하지 않았을까 하는 아쉬움이 든다.