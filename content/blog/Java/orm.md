---
title: ORM(Object Relational Mapping)
date: 2020-03-03 22:03:66
category: Java
---

## Intro

본격적으로 백엔드(서버) 개발을 직접 해본 적은 아직가지 없다. 조금씩 공부하고 있지만 그동안 느낀 것은 백엔드는 결국 **CRUD(Create, Read, Update, Delete)**가 가장 기본이면서도 중요하다는 것이다.

우리가 뒷 단에 서버를 두는 이유는 클라이언트에서 하던 것을 서버가 빠르게 처리해주고, 기능이 추가되거나 변경되었을 때의 빠른 배포 등 여러가지가 있다.

그러기 위해서 서버는 여러 곳에서 사용하는 **데이터**를 저장하고, 필요에 따라 꺼내서 가공하고, 수정/삭제하면서 소위 데이터를 갖고 놀게 된다.

그만큼 서버 쪽 코드를 보면 **데이터 관련 코드**가 많다. 오늘은 그런 데이터베이스 관련 코드를 어떻게 관리하는지에 대한 내용인 **ORM**에 대해서 정리하고자 한다.

## 데이터베이스에 데이터를 저장하는 방법?

### :banana: 데이터베이스는 동시에 여러 요청을 받는다.

<img src="./img/orm-data-save.png" />

사용자가 데이터베이스에 접근하기 위해서는 어떻게 할까? 만약 위와 같이 사용자가 데이터베이스에 직접 접근하는 형태라면 어떤 문제가 있을까?

> :exclamation: 여러 사용자가 데이터베이스에 동시에 접근한다고 생각해보자.

<img src="./img/orm-data-modify.png" />

위와 같은 명령이 동시에 일어났다면(물론 같은 시간일 수는 없다.), 저 데이터의 상태는 B일까? 아니면 C일까?

**알 수 없다**​ :disappointed:

### :banana: DBMS(DataBase Management System)

위와 같은 문제(?) 때문에 사용자는 데이터베이스에 직접 접근하는 것이 아니라 DBMS를 이용한다.

**DBMS(DataBase Management System)**은 다수의 사용자들이 데이터베이스 내의 데이터를 접근할 수 있도록 해주는 소프트웨어 도구이다.

<img src="./img/orm-dbms.png" />

#### :strawberry:DMBS를 쓰지 않는다면?

- 다수의 사람이 데이터를 공유하기 어렵다
  - 위와 같은 경우이다.
- 대량의 데이터를 다루기 어렵다 (txt, xls 등)
- 읽기/쓰기를 자동화하려면 프로그래밍 기술이 필요하다
- 만일의 사고에 대응하기 어렵다 (보안, 백업)

#### :strawberry: DBMS의 종류

한번 쯤은 들어보고 써봤을 것들이다. 유명한 것들만 나열하지만, 이 외에도 여러 가지가 있다.

- MySQL
- ORACLE
- Postgres

## RDB(Relational DataBase)







## 영속성(Persistence)

데이터를 저장하고 프로그램이 종료되더라도 데이터가 사라지지 않는 특성, 이것을 **영속성(Persistence)**이라고 한다.

이 영속성을 부여하는 방법은 **파일에 저장** 혹은 **데이터베이스에 저장**하는 방법이 있다.

### 데이터베이스에 데이터를 저장하는 방법(Java 기준)

- JDBC
- Spring JDBC 
  - ex) JdbcTemplate
- Persistence Framework
  - ex) JPA, Hibernate, Mybatis 등

### Persistence Layer

- 데이터에 영속성을 부여해주는 계층
- 

### Persistence Framework



## ORM(Object Relational Mapping)

### 정의

**ORM**은 객체 지향 프로그래밍에서 객체(Object)와 관계형 데이터베이스의 데이터(Table)을 맵핑시켜주는 개념이다.



