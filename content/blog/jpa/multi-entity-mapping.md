---
title: Entity의 다양한 연관관계 맵핑
date: 2020-04-25 15:04:13
category: jpa
---

## Intro

이전에 [Entity Mapping](https://changrea.io/jpa/entity-mapping/)에 대해 정리했었다. 간단하게 Entity와 Table을 맵핑하는 방법에 대해서만 정리했었는데, 데이터베이스 개념적 모델링에 대해 들어봤다면, `1:1`, `1:N`, `N:M` ... 여러 테이블 간 관계에 대해서 다뤄봤을 것이다.

이번 포스팅에서 이런 연관관계에 대해서 JPA에서는 어떻게 처리하는지에 대해 정리할 것이다.

## 다대일 (N:1)

### 다대일 단방향

#### 회원 엔티티(N)

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  
  private String username;
  
  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team;
  
  // Getter, Setter ...
  ...
}
```

#### 팀 엔티티(1)

```java
@Entity
public class Team {
	
  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;
  
  private String name;
  
  // Getter, Setter ...
  ...
}
```

- 회원(Member) 엔티티에서 팀(Team) 엔티티 참조 가능
  - `@ManyToOne`
- `@JoinColumn`
  - 'TEAM_ID' 라는 외래 키와 매핑

### 다대일 양방향 (N:1, 1:N)

#### 회원 엔티티

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  
  private String username;
  
  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team;
  
  public void setTeam(Team team) {
    this.team = team;
    
    //무한루프에 빠지지 않도록 체크
    if(!team.getMembers().contains(this)) {
      team.getMembers().add(this);
    }
  }
}
```

#### 팀 엔티티

```java
@Entity
public class Team {
	
  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;
  
  private String name;
  
  @OneToMany(mappedBy = "team")
  private List<Member> members = new ArrayList<Member>();
  
  public void addMember(Member member) {
    this.members.add(member);
    if (member.getTeam() != this) {	//무한루프에 빠지지 않도록 체크
      member.setTeam(this);
    }
  }
}
```

- 양방향은 외래키가 있는 쪽이 연관관계의 주인
  - Member :point_right: Member.team
- 양방향 연관관계는 항상 서로를 참조해야 한다.
  - **편의 메소드** 작성
  - 회원 엔티티의 setTeam(), 팀 엔티티의 addMember()
  - 양쪽에 다 작성 가능하나, 무한루프에 빠지지 않도록 주의(**위 예제는 모두 작성했으므로 하나만 사용**)

## 일대다 (1:N)

### 일대다 단방향 (1:N)

- JPA 2.0 :arrow_up:
- 외래키 관리를 **1**:N에서 '1' 쪽에서 관리
  - N쪽에 맵핑할 수 있는 참조 필드가 없기 때문

#### 팀 엔티티

```java
@Entity
public class Team {
  
  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;
  
  private String name;
  
  @OneToMany
  @JoinColumn(name = "TEAM_ID")	//Member 테이블의 TEAM_ID (FK)
  List<Member> members = new ArrayList<Member>();
  
  // Getter, Setter,
}
```

- `JoinColumn` 명시
  - 생략 시, 연결 테이블을 중간에 두고 연관관계 관리하는 **조인 테이블(JoinTable)** 전략 기본 사용

#### 회원 엔티티

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  
  private String username;
  
  // Getter, Setter
}
```

#### 일대다 단방향 매핑의 단점

- 매핑한 객체가 관리하는 **외래 키가 다른 테이블에 있다**는 점
  - 엔티티 저장을 위해서는 INSERT와 UPDATE 쿼리를 함께 수행해야 한다.

> :exclamation: 일대다 단방향 매핑보다는 <u>**다대일 양방향 매핑**</u>을 사용 권장

### 일대다 양방향

- 일대다 양방향 매핑은 존재하지 않는다
  - **다대일 양방향 매핑** 사용
- RDB 특성상 일대다, 다대일 관계에서 항상 **"다"** 쪽에 외래키 존재
  - @OneToMany, @ManyToOne 중 연관관계의 주인은 항상 다 쪽인 **@ManyToOne**을 사용한 곳

> :exclamation: 일대다 양방향 매핑 반대편에 같은 외래 키를 사용하는 <u>**다대일 단방향 매핑을 읽기 전용**</u>으로 하나 추가

#### 팀 엔티티

```java
@Entity
public class Team {
  
  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;
  
  private String name;
  
  @OneToMany
  @JoinColumn(name = "TEAM_ID")
  private List<Member> members = new ArrayList<Member>();
  
  // Getter, Setter
}
```

#### 회원 엔티티

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  private String username;
  
  @ManyToOne
  @JoinColumn(name = "TEAM_ID", insertable = false, updatable = false)
  private Team team;
  
  // Getter, Setter
}
```

- 일대다 단방향 매핑 반대편에 다대일 단방향 매핑을 읽기 전용으로 추가해서 일대다 양방향처럼 보이도록 한 것
- 일대다 단방향 매핑이 가지는 단점을 그대로 가진다.

## 일대일 (1:1)

일대일 관계는 그 반대쪽도 일대일 관계이기 때문에 **주 테이블과 대상 테이블 중 어느 쪽에서 외래키를 관리할지** 결정해야 한다.

- 주 테이블에 외래 키
  - 주 객체가 대상 객체를 참조
  - 외래 키를 객체 참조와 비슷하게 사용할 수 있어 객체지향 개발자들이 선호
- 대상 테이블에 외래 키
  - 전통적인 데이터베이스 개발자들이 선호
  - 테이블 관계를 일대일에서 일대다로 변경할 때 테이블 구조를 그대로 유지 가능

### 주 테이블에 외래 키

#### 단방향

- `@OneToOne` 과 `@JoinColumn` 을 주 엔티티에 사용

```java
@Entity
public class Member {
  // 생략
  
  @OneToOne
  @JoinColumn(name = "LOCKER_ID")
  private Locker locker;
  ...
}

@Entity
public class Locker {
  // 생략
}
```

#### 양방향

- 주 엔티티에 `@OneToOne` 과 `@JoinColumn`, 대상 엔티티에 `@OneToOne` 을 사용
- 대상 엔티티 @OneToOne에는  **mappedBy** 지정

```java
@Entity
public class Member {
  // 생략
  
  @OneToOne
  @JoinColumn(name = "LOCKER_ID")
  private Locker locker;
  ...
}

@Entity
public class Locker {
  // 생략
  
  @OneToOne(mappedBy = "locker")
  private Member member;
  ...
}
```

### 대상 테이블에 외래 키

#### 단방향

- JPA에서 미 지원
- **단방향 관계의 방향을 수정** or **양방향 관계로 만들고 주인 변경**으로 대체

#### 양방향

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  
  private String username;
  
  @OneToOne(mappedBy = "member")
  private Locker locker;
  ...
}

@Entity
public class Locker {
  
  @Id @GeneratedValue
  @Column(name = "LOCKER_ID")
  private Long id;
  
  private String name;
  
  @OneToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;
  ...
}
```



## 다대다 (N:M)

RDB는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없다. 그래서 보통 다대다 관계를 일대다, 다대일 관계로 풀어내는 **연결 테이블**을 사용

객체는 @ManyToMany를 사용하면 다대다 관계를 편리하게 매핑 가능하다.

### 다대다 단방향

```java
@Entity
public class Member {
  
  @Id @Column(name = "MEMBER_ID")
  private String id;
  
  private String username;
  
  @ManyToMany
  @JoinTable(name = "MEMBER_PRODUCT",
            joinColumns = @JoinColumn(name = "MEMBER_ID"),
            inverseJoinColumn = @JoinColumn(name = "PRODUCT_ID"))
  private List<Product> products = new ArrayList<Product>();
}

@Entity
public class Product {
  
  @Id @Column(name = "PRODUCT_ID")
  private String id;
  
  private String name;
  ...
}
```

- @JoinTable.name
  - 연결 테이블 지정
- @JoinTable.joinColumns
  - **현재 방향**인 회원과 매핑할 조인 컬럼 정보를 지정
- @JoinTable.inverseJoinColumns
  - **반대 방향**인 상품과 매핑할 조인 컬럼 정보를 지정

### 다대다 양방향

#### 역방향 추가

```java
@Entity
public class Product {
  
  @Id
  private String id;
  
  @ManyToMany(mappedBy = "products")	//역방향 추가
  private List<Member> members;
  ...
}
```

#### 연관관계 편의 메소드 추가

```java
@Entity
public class Member {
  // ... 생략
  
  public voide addProduct(Product product) {
    ...
    products.add(product);
    product.getMembers().add(this);
  }
}
```

#### 다대다 매핑의 한계와 극복, 연결 엔티티 사용

- @ManyToMany를 실무에서 사용하기에는 한계
  - 연결 테이블에 컬럼이 추가되는 경우에 더이상 사용할 수 없다.
- 따라서 아래와 같이 한다.
  - 매핑하는 연결 엔티티 생성
  - 다대다에서 일대다, 다대일 관계로 전환

```java
@Entity
public class Member {
  
  @Id @Column(name = "MEMBER_ID")
  private String id;
  
  // 역방향
  @OneToMany(mappedBy = "member")
  private List<MemberProduct> memberProducts;
  
  ...
}

@Entity
public class Product {
  
  @Id @Column(name = "PRODUCT_ID")
  private String id;
  
  private String name;
  ...
}

@Entity
@IdClass(MemberProductId.class)
public class MemberProduct {
  
  @Id
  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;	// MemberProductId.member와 연결
  
  @Id
  @ManyToOne
  @JoinColumn(name = "PRODUCT_ID")
  private Product product;	//MemberProductId.product와 연결
  
  private int orderAmount;
  ...
}
```

- `@Id` 와 `@JoinColumn`을 동시에 사용해서 <u>기본 키 + 외래 키</u>를 한번에 매핑
- `@IdClass` 를 사용해서 **복합 기본 키**를 매핑

> :thinking: 그럼 <u>@IdClass</u>에 쓰여진 클래스는 뭘까?
>
> JPA에서 복합 키를 사용하려면 별도의 식별자 클래스를 만들어야 한다. 그러고 나서 @IdClass를 사용해서 식별자 클래스를 지정한다.

<u>복합 키를 위한 식별자 클래스</u>는 다음과 같은 특징이 있다.

- 복합 키는 별도의 식별자 클래스로 만들어야 한다.
- **Serializable을** 구현해야 한다.
- **equals와** hashCode 메소드를 구현해야 한다.
- **기본 생성자**가 있어야 한다.
- 식별자 클래스는 **public**이어야 한다.
- @IdClass를 사용하는 방법 외에 @EmbeddedId를 사용하는 방법도 있다.

아래는 위 코드에서 쓰인 식별자 클래스이다.

```java
public class MemberProductId implements Serializable {
  
  private String member;	// MemberProduct.member와 연결
  private String product;	// MemberProduct.product와 연결
  
  // hashCode and equals
  
  @Override
  public boolean equals(Object o) {...}
  
  @Override
  public int hashCode() {...}
}
```

#### 다대다 새로운 기본 키 사용

- 추천하는 방법은 데이터베이스에서 자동으로 생성해주는 대리 키를 Long 값으로 사용하는 것
  - 간편하고 거의 영구히 쓸 수 있다.
  - 비즈니스에 의존하지 않는다.
  - **ORM 매핑 시에 복합 키를 만들지 않아도 된다.**

