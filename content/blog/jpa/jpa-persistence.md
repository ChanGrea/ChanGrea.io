---
title: JPA 영속성에 대해
date: 2020-04-07 23:04:90
category: jpa

---

## 영속성 컨텍스트(Persistence Context)

**"엔티티를 영구 저장하는 환경**"이라는 뜻

```java
em.persiste(member);
```

위 코드는 단순하게 "회원 엔티티를 저장한다"라고 할 수 있다.

하지만 정확히 말하자면, "**엔티티 매니저를 사용해서 회원 엔티티를 영속성 컨텍스트에 저장한다**"라고 할 수 있다.

> :exclamation: 영속성 컨텍스트 != 데이터베이스
>
> 영속성 컨텍스트에 저장했다는 의미는 데이터베이스에 저장했다는 의미와 같지 않다.

## 엔티티의 생명주기

엔티티에는 아래와 같이 4가지 상태가 존재

- **비영속**(new/transient): 영속성 컨텍스트와 전혀 관계가 없는 상태
- **영속**(managed): 영속성 컨텍스트에 저장된 상태
- **준영속**(detached): 영속성 컨텍스트에 저장되었다가 분리된 상태
- **삭제**(removed): 삭제된 상태

### 비영속

- 객체를 생성한 상태이고, 아직 저장하지 않은 상태

```java
// 객체를 생성한 상태 (비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");
```

### 영속

- 엔티티 매니저를 통해서 영속성 컨텍스트에 저장
- **영속성 컨텍스트가 관리하는 엔티티**

```java
// 객체를 저장한 상태 (영속)
em.persist(member);
```

- em.find()나 JPQL을 사용해서 조회한 엔티티도 영속성 컨텍스트가 관리하는 영속 상태다.

### 준영속

- 영속성 컨텍스트가 관리하던 영속 상태의 엔티티를 영속성 컨텍스트가 관리하지 않으면 준영속 상태가 된다.
- `em.detach()` `em.close()` `em.clear()` 중 하나를 호출하면 준영속 상태가 된다.

```java
// 회원 엔티티를 영속성 컨텍스트에서 분리, 준영속 상태
em.detach(member);
```

### 삭제

엔티티를 영속성 컨텍스트와 데이터베이스에서 삭제한다.

```java
// 객체를 삭제한 상태 (삭제)
em.remove(member);
```

## 영속성 컨텍스트의 특징

- 영속성 컨텍스트는 엔티티를 **식별자 값** (@Id로 테이블의 기본키와 매핑한 값)으로 구분한다.
- JPA는 트랜잭션을 커밋하는 순간 영속성 컨텍스트에 새로 저장된 엔티티를 데이터베이스에 반영한다. *(이것을 `플러시(flush)`라고 한다.)*
- 장점
  - 1차 캐시
  - 동일성 보장
  - 트랜잭션을 지원하는 쓰기 지연
  - 변경 감지
  - 지연 로딩

### :rocket: 엔티티 조회 과정

#### :star: 1차 캐시에서 조회

`em.find()` 를 호출하면 우선 1차 캐시에서 식별자 값으로 엔티티를 찾는다. 찾는 엔티티가 있으면 데이터베이스를 조회하지 않고 **메모리에 있는 1차 캐시에서 엔티티를 조회**한다.

#### :star: 데이터베이스에서 조회

1차 캐시에 없으면 엔티티 매니저는 **데이터베이스를 조회해서 엔티티를 생성**한다.

이후에 **1차 캐시에 저장**한 후에 **영속 상태의 엔티티를 반환**한다.

### :rocket: 엔티티 등록 과정

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
// 엔티티 매니저는 데이터 변경 시 트랜잭션을 시작해야 한다.
transaction.begin(); // [트랜잭션] 시작

em.persist(memberA);
em.persist(memberB);
// 여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

// 커밋하는 순간 데이터베이스에 INSERT SQL을 보낸다.
transaction.commit(); // [트랜잭션] 커밋
```

#### :star: 쓰기 지연 저장소에 저장했다가 커밋

엔티티 매니저는 트랜잭션을 **커밋**하기 직전까지 데이터베이스에 엔티티를 저장하지 않는다.

대신 영속 컨텍스트 내부 쿼리 저장소에 INSERT SQL을 모아둔다.

그리고 트랜잭션을 커밋할 때 모아둔 쿼리를 데이터베이스에 보낸다.<br>(이것을 `쓰기 지연`(transactional write-behind)라고 한다.)

### :rocket: 엔티티 수정 과정

#### SQL 수정 쿼리의 문제점

SQL을 사용하면 수정 쿼리를 직접 작성해야 한다. 프로젝트 규모가 커지고 요구사항이 늘어나면서 작성해아 하는 쿼리도 많아지고, 실수가 발생할 여지가 많다.

또한 개발하면서 SQL을 계속 확인해가면서 진행해야 한다. 결국 비즈니스 로직이 SQL에 의존하게 되는 상황이 생기게 된다.

#### 변경 감지

일반적인 상황에서 수정을 할 때의 과정은 아래와 같다.

```java
// 영속 엔티티 조회
Member memberA = em.find(Member.class, "memberA");

// 영속 엔티티 데이터 수정
memberA.setUsername("hi");
memberA.setAge(10);

// em.update(member) 보통 이런 코드가 있을 것이다.
```

하지만 JPA에서는 위의 `em.update(member)` 코드가 없다.

엔티티의 변경사항을 데이터베이스에 자동으로 반영하는 기능을 가지고 있는데, 이것을 `변경 감지`(dirty checking)라고 한다.

### :rocket: 엔티티 삭제 과정

엔티티를 삭제하려면 먼저 삭제 대상 엔티티를 조회해야 한다.

```java
Member memberA = em.find(Member.class, "memberA"); // 삭제 대상 엔티티 조회
em.remove(memberA); // 엔티티 삭제
```

엔티티 등록과 비슷하게 **삭제 쿼리를 쓰기 지연 SQL 저장소에 등록**하고, 이후 트랜잭션을 **커밋해서 플러시를 호출**하면 데이터베이스에 삭제 쿼리를 전달한다.

(이후에 해당 엔티티는 영속성 컨텍스트에서 제거된다.)

## 플러시(flush)

**플러시(flush())는 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영한다.**

플러시 실행 시 다음과 같은 일이 일어난다.

1. **변경 감지**가 동작해서 영속성 컨텍스트에 있는 모든 엔티티를 **스냅샷과 비교**해서 수정된 엔티티를 찾는다. 이후 수정 쿼리를 만들어 쓰기 지연 SQL 저장소에 등록
2. 쓰기 지연 SQL 저장소의 쿼리를 데이터베이스에 전송 (등록, 수정, 삭제)

### 영속성 컨텍스트를 플러시하는 방법

#### em.flush()직접 호출

강제로 플러시하는 방법. 테스트나 다른 프레임워크와 JPA를 함께 사용할 때를 제외하고 거의 사용하지 않는다.

#### 트랜잭션 커밋 시 플러시 자동 호출

데이터베이스에 변경 내용을 SQL로 전달하지 않고 트랜잭션만 커밋하면 어떤 데이터도 데이터베이스에 반영되지 않는다.

커밋하기 전에 반드시 플러시를 호출해서 변경 내용을 데이터베이스에 반영해야 한다.

JPA는 트랜잭션 커밋 시 자동으로 플러시를 호출한다.

#### JPQL 쿼리 실행 시 플러시 자동 호출

```java
em.persist(memberA);
em.persist(memberB);
em.persist(memberC);

//중간에 JPQL 실행
query = em.createQuery("select m from Member m", Member.class);
List<Member> members= query.getResultList();
```

위 코드에서 em.persist를 통해 memberA, memberB, memberC를 영속 상태로 만들었다. 하지만 데이터베이스에 반영되지 않은 상태에서 JPQL을 실행한다면 이 엔티티는 조회되지 않는다.

따라서 JPQL을 실행하기 전에 플러시해야 이전 영속 상태의 엔티티가 반영된다.

## 준영속

영속성 컨텍스트가 관리하는 영속 상태의 엔티티가 영속성 컨텍스트에서 분리된(detached) 것을 준영속 상태라고 한다.

>  :exclamation: 준영속 상태가 되면 영속성 컨텍스트 기능을 사용할 수 없다.

준영속 상태로 만드는 방법은 크게 3가지다.

1. em.detach(entity)
2. em.clear()
3. em.close()

### 엔티티를 준영속 상태로 전환: detach()

```java
public void testDetacched() {
  ...
  // 회원 엔티티 생성, 비영속 상태
  Member member = new Member();
  member.setId("memberA");
  member.setUsername("회원A");
  
  // 회원 엔티티 영속 상태
  em.persist(member);
  
  // 회원 엔티티를 영속성 컨텍스트에서 분리, 준영속 상태
  em.detach(member);
  
  transaction.ccommit(); // 트랜잭션 커밋
}
```

`em.detach()` 를 호출하는 순간 1차 캐시부터 쓰기 지연 SQL 저장소까지 해당 엔티티를 관리하기 위한 모든 정보가 제거된다.



### 영속성 컨텍스트 초기화: clear()

`em.clear()` 는 **영속성 컨텍스트 자체를 초기화**해서 모든 엔티티를 준영속 상태로 만든다.

### 영속성 컨텍스트 종료: close()

영속성 컨텍스트를 종료하면 해당 영속성 컨텍스트가 관리하던 영속 상태의 엔티티가 모두 준영속 상태가 된다.

> :exclamation: 영속 상태의 엔티티는 주로 영속성 컨텍스트가 종료되면서 준영속 상태가 된다. 개발자가 직접 준영속 상태로 만드는 일은 드물다.

### 준영속 상태의 특징

준영속 상태가 되면 어떻게 될까?

#### 거의 비영속 상태에 가깝다.

1차 캐시, 쓰기 지연, 변경 감지, 지연 로딩을 포함한 영속성 컨텍스트의 기능을 사용할 수 없다.

#### 식별자 값을 가지고 있다.

비영속 상태와 다르게 이미 영속 상태였으므로 반드시 식별자 값을 가지고 있다.

#### 지연 로딩을 할 수 없다.

지연 로딩은 실제 객체 대신 프록시 객체를 로딩해두고 해당 객체를 실제 사용할 때 영속성 컨텍스트를 통해 데이터를 불러오는 방법이다.

### 병합: merge()

준영속 상태의 엔티티를 다시 영속 상태로 변경하는 방법이다.

`merge()` 메소드는 준영속 상태 엔티티를 받아서 **"새로운" 영속 상태의 엔티티**를 반환한다.

## 정리

텍스트와 코드 위주로 정리했다. 그림도 추가되면 이해가 좋을 것 같아서 이 부분은 이후에 시간이 나면 그림을 추가할 예정이다.

