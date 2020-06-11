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