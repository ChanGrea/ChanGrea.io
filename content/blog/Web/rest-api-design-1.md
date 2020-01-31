---
title: REST API와 설계원칙(2)
date: 2020-02-01 23:02:58
category: web
---

## Intro

이전 포스팅에서 **REST API**의 배경과 정의에 대해서 정리했었다.

이번 포스팅부터는 **REST API를 설게하는 원칙**에 대해서 정리하고자 한다.

사실 "설계 원칙"이라고 해서 완벽히 따라야 하는 표준은 아니다. [이 책](http://shop.oreilly.com/product/0636920021575.do)의 저자는 사실상 표준, **Defacto**라고 말하고 있기 때문이다.

많은 개발자들이 오랫동안 이런 식으로 설계하여 써왔었기 때문에 어느 정도(?) 검증된 것이라고 생각하면 된다.

이번 포스팅에서는 REST API의 **URI**와 **HTTP**에 대한 설계 원칙을 정리한다.

## URIs

### URL vs URI

먼저 URL? URI? 비슷하게 생겨서 혼용해서 쓰곤 했다.

#### URL (Uniform Resource Locator)

- 자원의 위치
- 웹 상에 서비스를 제공하는 각 서버들에 있는 **파일의 위치**를 표시하기 위한 것

#### URI (Uniform Resource Identifier)

- 통합 자원 식별자
- 인터넷에 있는 자원(Resource)을 나타내는 유일한 주소
  - 자원에 접근하기 위해 사용되는 절차
  - 어떤 자원을 가지고 있는 **특정한 컴퓨터**
  - 컴퓨터 상의 유니크한 자원의 이름(**파일명**)
- <span style="color: red;">URI 하위 개념에 URL 포함</span>

> 최근에 URL보다 URI라는 용어를 쓰는 이유는
>
> 서버 내 디렉터리 구조를 노출시키는 URL의 보안적 이슈와 관련하여, URI에 해당하는 Controller 즉 함수를 실행함으로써 결과를 받는다.

<img src="./img/restApiDesign1-uri-url.png" />

### URI Format

URI와 URL의 개념을 봤으니, 이제 URI에 대한 설계 원칙을 정리한다.

그 전에 URI의 형식은 아래와 같다.

<div style="background-color: #212121; color: #e0e0e0; padding: 1.2em; margin: 1.5em 0; overflow: auto; border-radius: 0.6em;">
URI = scheme "://" <span style="color: yellow;">authority</span> "/" <span style="color: green;">path</span> [ "?" <span style="color: red;">query</span> ] [ "#" fragment ]
</div>

#### scheme

- URI를 어떤 규칙에 따라 기술하고 자원(데이터)에 어떻게 접근하는지 지정
- http, ftp …

#### authority

- <u>서버명</u>과 <u>도메인명</u>으로 구성
- 서버명 – www …
- 도메인명 – test.co.kr

#### path

#### query

- <u>폴더명</u>과 <u>파일명</u>으로 구성
- 서버 내부 자원의 위치를 나타낸다.

### URI Format의 설계 원칙

그럼 위 URI를 어떻게 설계해야 할까? 다시 한번 말하지만 아래 나오는 Rule들은 무조건 따라야 한다는 아니다. 어디까지나 **"Defacto"**이기 때문에 "이렇게 쓰는 것이 좋다" 정도 참고하자.

#### :green_book: Rule: 앞에 붙는 슬래쉬(/)는 계층 과계를 나타내기 위해 사용되어야 한다.

#### :green_book: Rule: 뒤에 붙는 슬래쉬(/)는 URI에 포함되면 안된다.

#### :green_book: Rule: 하이픈(-)은 URI의 가독성을 향상시키기 위해 사용되어야 한다.

#### :green_book: Rule: 언더바(\_)는 URI에서 사용하면 안된다.

#### :green_book: Rule: URI path에서 소문자 사용을 권장한다.

#### :green_book: Rule: URI에서 파일 확장자는 포함되어서는 안된다.

### URI Authority의 설계 원칙

#### :green_book: Rule: API에는 일관된 서브 도메인 이름이 사용되어야 한다.

#### :green_book: Rule: 마찬가지로 개발자 포털에도 일관된 서브 도메인 이름이 사용되어야 한다.

### URI Resource Modeling
