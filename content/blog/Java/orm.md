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



