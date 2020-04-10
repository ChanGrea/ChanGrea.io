---
title: Entity Mapping
date: 2020-04-10 23:04:36
category: jpa
---

## Intro

드디어 JPA를 사용하는 방법을 정리한다. 그 중 가장 기본적인 **"객체와 테이블을 매핑"**하는 과정에 대해서 정리하고자 한다.

객체와 테이블을 매핑하는 데 어노테이션을 사용할 것이다.(XML 방식도 있지만, 어노테이션이 쉽고 직관적이다.) 대표적인 어노테이션은 아래와 같다.

| function           | Annotation              |
| ------------------ | ----------------------- |
| 객체와 테이블 매핑 | @Entity, @table         |
| 기본 키 매핑       | @Id                     |
| 필드와 컬럼 매핑   | @Column                 |
| 연관관계 매핑      | @ManyToOne, @JoinColumn |

## @Entity

JPA를 사용해서 **테이블과 매핑할 클래스**는 `@Entity` 어노테이션을 붙인다.

[이전 포스팅(JPA의 영속성에 대해)](https://changrea.io/Java/jpa-persistence/) 을 봤다면 알겠지만 **영속성 컨텍스트의 엔티티**가 이 엔티티다.

### :bookmark: 속성

| 속성 | 기능                                                         | 기본값      |
| ---- | ------------------------------------------------------------ | ----------- |
| name | JPA에서 사용할 엔티티 이름을 지정, 다른 패키지에 이름이 같은 엔티티 클래스가 있다면 이름을 지정해야 한다. | 클래스 이름 |

### :bulb: 주의사항

- 기본 생성자는 필수 (파라미터가 없는 public 또는 protected)
- final 클래스, enum, interface, inner 클래스에는 사용 불가
- 저장할 필드에 final 사용 불가
- 기본 생성자는 자동으로 생성 but, 생성자를 하나 이상 만들면 기본 생성자도 정의해야 한다.

```java
public Member() {}	// 직접 만든 기본 생성자

// 임의의 생성자
public Member(String name) {
  this.name = name;
}
```

## @Table

**엔티티와 매핑할 테이블**을 지정한다.

### :bookmark: 속성

| 속성                   | 기능                                                         | 기본값      |
| ---------------------- | ------------------------------------------------------------ | ----------- |
| name                   | 매핑할 테이블 이름                                           | 엔티티 이름 |
| catalog                | catalog 기능이 있는 데이터베이스에서 catalog를 매핑한다.     |             |
| schema                 | schema 기능이 있는 데이터베이스에서 schema를 매핑한다.       |             |
| uniqueConstraints(DDL) | DDL 생성 시 유니크 제약조건을 만든다.<br />(*참고로 스키마 자동 생성기능을 사용해서 DDL을 만들 때만 사용*) |             |

## 다양한 매핑 사용 (예제)

```java
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="MEMBER")
public class Member {
  
  @Id
  @Column(name = "ID")
  private String id;
  
  @Column(name = "NAME")
  private String username;
  
  private Integer age;
  
  //==추가==
  @Enumerated(EnumType.STRING)
  private RoleType roleType;
  
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdDate;
  
  @Temporal(TemporalType.TIMESTAMP)
  private date lastModifiedDate;
  
  @Lob
  private String description;
  
  //Getter, Setter
  ...
}

public enum RoleType {
  ADMIN, USER
}
```

- roleType
  - `enum` 을 사용해서 타입을 구분
  - `@Enumerated` 어노테이션으로 매핑
- createdDate, lastModifiedDate
  - 자바의 날짜 타입은 `@Temporal` 사용해서 매핑
- description
  - 길이 제한이 없는 항목
  - VARCHAR 타입 대신에 **CLOB** 타입으로 저장
  - `@Lob` 사용

## 데이터베이스 스키마 자동 생성

JPA는 데이터베이스 스키마를 자동으로 생성하는 기능을 지원한다.

### :wrench: 설정

persistence.xml 파일에 다음 속성을 추가한다.

```xml
<property name="hibernate.hbm2ddl.auto" value="create" />
<property name="hibernate.show_sql" value="true" />
```

- 첫번째는 **애플리케이션 실행 시점에 데이터베이스 테이블을 자동으로 생성**한다.
- 두번째는 콘솔에 실행되는 **테이블 생성 DDL(Date Definition Language)을 출력**할 수 있다.

### :bookmark: hibernate.hbm2ddl.auto 속성

| 옵션        | 설명                                                         |
| ----------- | ------------------------------------------------------------ |
| create      | 기존 테이블을 삭제하고 새로 생성. **DROP+CREATE**            |
| create-drop | create 속성에 추가로 애플리케이션을 종료할 때 생성한 DDL 제거<br />**DROP+CREATE+DROP** |
| update      | 테이블과 엔티티 매핑 정보만 비교하여 변경 사항만 수정        |
| validate    | 테이블과 엔티티 매핑 정보를 비교해서 차이가 있으면 경고를 남기고 애플리케이션을 실행하지 않는다. |
| none        | 자동 생성 기능을 사용하지 않는다.                            |

> 개발환경에 따른 전략은 아래와 같다.
>
> :tada: 개발 초기 단계는 create 또는 update
>
> :construction: 초기화 상태로 자동화된 테스트를 진행하는 개발자 환경과 CI 서버는 create 또는 create-drop
>
> :hammer: 테스트 서버는 update 또는 validate
>
> :rocket: 스테이징과 운영 서버는 validate 또는 none

## DDL 생성 기능

### 유니크 제약조건

```java
@Entity(name="Member")
@Table(name="MEMBER", uniqueConstraints = {@UniqueConstraint(
	name = "NAME_AGE_UNIQUE",
  columnNames = {"NAME", "AGE"} )})
public class Member {
  
  @Id
  @Column(name = "id")
  private String id;
  
  @Column(name = "name")
  private String usernmae;
  
  private Intenger age;
  ...
}
```

> 생성된 DDL

```sql
ALTER TABLE MEMBER
	ADD CONSTRAINT NAME_AGE_UNIQUE UNIQUE (NAME, AGE)
```

이런 기능들은 단지 DDL을 자동 생성할 때만 사용되고 JPA의 실행 로직에는 영향을 주지 않는다.