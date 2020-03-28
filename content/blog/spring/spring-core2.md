---
title: Spring Core (AOP)
date: 2020-03-28 00:03:80
category: spring
---

## Intro

이번 포스팅에서는 Spring Core 중 **AOP**에 대해서 정리할 것이다.

사실 [이전 포스팅(Spring Core DI 부분)](https://changrea.io/spring/spring-core/)에서도 적었지만, Spring Core에는 DI와 AOP가 전부는 아니다. 다만, 스프링을 말했을 때 특징으로 가장 많이 언급하는 것이기 때문에 이것들에 대해서는 꼭 정리하려고 하는 것이다.

## AOP

### 횡단 관심사(Cross-Cutting Concern)

비즈니스 로직과는 다소 거리가 있으나 여러 모듈에 걸쳐 공통적이고 반복적으로 필요로 하는 처리 내용을 **횡단 관심사(Cross-Cutting Concern)**이라고 한다. 아래 나열한 것들이 대표적인 횡단 관심사이다.

- 보안
- 로깅
- 트랜젝션 관리
- 모니터링
- 캐시 처리
- 예외 처리

이것들을 분리해서 한 곳으로 모으는 것을 **"횡단 관심사의 분리(Separation Of Cross-Cutting Concerns)"**라고 한다.

### AOP 개요

**AOP**는 관점 지향 프로그래밍(**Aspect Oriented Programming**)을 의미하는 약자, 여러 클래스에 흩어져 있는 횡단 관심사를 중심으로 설계와 구현을 하는 프로그래밍 기법이다.

### AOP 개념

#### 애스펙트(Aspect)

- AOP의 단위가 되는 **횡단 관심사**에 해당
  - '로그를 출력한다', '예외를 처리한다', '트랜잭션을 관리한다' 등등..

#### 조인 포인트(Join Point)

- 횡단 관심사가 실행될 지점이나 시점
- 스프링 프레임워크에서의 AOP에서는 메서드 단위로 조인포인트를 잡는다.

#### 어드바이스(Advice)

- 특정 조인 포인트에서 실행되는 코드
- Around, Before, After 등의 여러 유형이 있다.

#### 포인트컷(Pointcut)

- 수많은 조인 포인트 중에서 실제로 어드바이스를 적용할 곳을 선별하기 위한 표현식(expression)
- 조인포인트의 그룹
- XML 기반 설정 방식 or 애너테이션 기반 설정 방식

#### 위빙(Weaving)

- 애플리케이션 코드의 적절한 지점에 애스펙트를 적용하는 것
- 컴파일 시점, 클래스 로딩 시점, 실행 시점 등 (스프링 AOP는 기본적으로 실행 시점)

#### 타깃(Target)

- AOP 처리에 의해 처리 흐름에 변화가 생긴 객체
- Advised Object라고도 함

