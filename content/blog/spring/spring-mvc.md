---
title: Spring MVC의 간단한 개념(?)
date: 2020-03-31 23:03:37
category: spring
---

## 스프링 MVC

### MVC Pattern?

모델(Model), 뷰(View), 컨트롤러(Controller)와 같은 세 가지 역할의 컴포넌트로 구성되어 클라이언트의 요청을 처리

| 컴포넌트명 | 설명                                                         |
| ---------- | ------------------------------------------------------------ |
| 모델       | 애플리케이션 **상태(데이터)**나 **비즈니스 로직**을 제공하는 컴포넌트 |
| 뷰         | 모델이 보유한 애플리케이션 상태(데이터)를 참조하고 클라이언트에 반환할 응답 데이터를 생성하는 컴포넌트 |
| 컨트롤러   | 요청을 받아 모델과 뷰의 호출을 제어하는 컴포넌트로 컨트롤러라는 이름처럼 요청과 응답의 처리 흐름을 제어한다. |

### 웹 애플리케이션 개발의 특징

1. POJO(Plain Old Java Object) 구현
2. 애너테이션을 이용한 정의 정보 설정
3. 유연한 메서드 시그니처 정의
4. Servlet API 추상화
5. 뷰 구현 기술의 추상화
6. 스프링의 DI 컨테이너와의 연계

### MVC 프레임워크로서의 특징

1. 풍부한 확장 포인트 제공
2. 엔터프라이즈 애플리케이션에 필요한 기능 제공
3. 서드파티 라이브러리와의 연계 지원
   - Jackson(JSON/XML 처리)
   - Google Gson(JSON 처리)
   - Google Protocol Buffers(Protocol Buffers로 불리는 직렬화 형식 처리)
   - Apache Tiles(레이아웃 엔진)
   - FreeMarker(템플릿 엔진)
   - Rome(RSS/Feed 처리)
   - JasperReports(보고서 출력)
   - ApachePOI(엑셀 처리)
   - Hibernate Validator(빈 유효성 검증)
   - Joda-Time(날짜/시간 처리)
   - Thymeleaf(템플릿 엔진)
   - HDV(보안 강화)

## 프런트 컨트롤러 아키텍쳐

