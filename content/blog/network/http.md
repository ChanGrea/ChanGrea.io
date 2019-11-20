---
title: HTTP
date: 2019-11-20 20:11:42
category: network
---

## :point_right: 포스팅 계기(?)

나는 프론트엔드 개발을 좋아하지만, 지금 회사에서의 나의 포지션은 **서버개발**팀이다..:frowning::frowning: (~~그냥 써봤어요..~~)

최근에 <u>결과를 내려주는 Response Type의 종류를 추가</u>하는 개발을 했었다.

그래서 일단 `Rest API`에 대해서도 잘 몰라서 궁금하기도 했고, 그 전에도 `Request Header`에 어떤 것을 넣어서 요청할 수 있을까..? 뭐 이런것들..(?)이 궁금하긴 했었다.

제목은 HTTP라고 했지만 내용이 이것저것 들어갈 것 같아서 그냥 퉁쳐서 HTTP라고 했다.

프론트엔드 개발자도 HTTP에 대해서 알아야 하지만 백엔드 개발자~~는 모르면 뛰어내려야 한다.~~도 알아야 한다.

## :point_right: HTTP 많이 들어보긴 했는데 무엇인가?

`HTTP`는 <u>**Server**와 **Client**가 서로 정보를 주고 받을 수 있는 프로토콜</u>이라는 것 정도는 대부분 다 알고 있을 것이다.

그 외에 `80`번 Port를 사용하고 **상태를 유지 하지 않는 `stateless`** 특성을 가지고, **통신하기 위한 메소드로 `GET`, `POST`, `PUT` 등을 제공**한다. (이것을 **`REST API`**라고 부른다.)

> stateless:question:<br/>
> '상태가 없다'는 의미인데, 데이터를 주고받는 요청/응답이 각각 독립적이다 즉, 이전의 요청과 이후의 요청이 서로 아무 영향을 주지 않는다는 의미 정도로 보면 될 것 같다.

## :point_right: REST API의 메소드와 형식

위에서 잠깐 나왔는데 HTTP 통신은 `REST API 메소드`를 통해서 이루어진다.

### :strawberry: REST API가 무엇인가?

#### :banana: 정의

- REST API(<u>**Re**</u>presentational <u>**S**</u>tate <u>**T**</u>ransfer **API**)
- 웹 애플리케이션이 제공하는 각각의 데이터를 **리소스, 즉 자원**으로 간주하고 각각의 자원에 고유한 **URI(Uniform Resource Identifier)**를 할당함으로써 이를 표현하는 API를 정의하기 위한 소프트웨어 아키텍처 스타일
- 해당 URI에 요청하기 위한 **메소드** 존재

#### :banana: 요청 메소드?

자주 쓰이는 것은 `GET`, `POST`, `PUT`, `DELETE`가 있고 기타 몇 가지 더 있다.

|   Method    | Send Form                                                                                                                                       | Description                                                                                                |
| :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
|   **GET**   | **GET** [request-uri]?query_string HTTP/1.1 Host:[Hostname] 혹은 [IP]                                                                           | 존재하는 자원 **요청(획득)**                                                                               |
|  **POST**   | **POST** [request-uri] HTTP/1.1<br/>Host:[Hostname] 혹은 [IP]<br/>Content-Lenght:[Length in Bytes]<br/>Content-Type:[Content Type]<br/>[데이터] | 새로운 자원 **생성**                                                                                       |
|   **PUT**   | **PUT** [request-uri] HTTP/1.1<br/>Host:[Hostname] 혹은 [IP]<br/>Content-Lenght:[Length in Bytes]<br/>Content-Type:[Content Type]<br/>[데이터]  | 존재하는 자원 **수정**                                                                                     |
| **DELETE**  | **DELETE** [request-uri] HTTP/1.1 Host:[Hostname] 혹은 [IP]                                                                                     | 존재하는 자원 **삭제**                                                                                     |
|             |                                                                                                                                                 |                                                                                                            |
|  **HEAD**   | **HEAD** [request-uri] HTTP/1.1 Host:[Hostname] 혹은 [IP]                                                                                       | **헤더 정보** 획득 (Response Body는 받지 않는다.)                                                          |
| **OPTIONS** | **OPTIONS** [request-uri] HTTP/ 1.1 Host: [Hostname] 혹은 [IP]                                                                                  | **서버의 옵션** 정보를 획득                                                                                |
|  **TRACE**  | **TRACE** [request-uri] HTTP/ 1.1 Host: [Hostname] 혹은 [IP]                                                                                    | **경로 조사** <br/>(Web 서버에 접속해서 자신에게 통신을 되돌려 받는 loop-back 발생)                        |
| **CONNECT** | **CONNECT** [request-uri] HTTP/1.1 Host:[Hostname] 혹은 [IP]                                                                                    | **프록시에 터널링 요구** <br/>(프록시에 터널 접속 확립을 요함으로써, TCP 통신을 터널링 시키기 위해서 사용) |

사실 이렇게 많긴 하지만 `GET`이랑 `POST`가 자주 쓰이는 것 같다.

## :point_right: 응답 코드에 대해서..

위의 `REST API`로 요청을 하면 서버에서 Response와 함께 `응답 코드`를 함께 준다.

`200 OK`, `404 Not Found` 등등 이런 메세지를 많이 봤을 것이다.

이 숫자가 바로 `응답 코드`이다. 이 코드가 의미하는 것에 따라서 통신이 잘 이루어졌는지, 어떤 문제인지 알 수 있기 때문에 대표적으로 쓰이는 몇 개 정도는 알고 있는 게 좋다.

<table style="font-size: 0.8em;">
    <thead style="font-weight: bold;">
        <td>Code</td>
        <td>Message</td>
        <td>Description</td>
    </thead>
    <tbody>
        <tr style="background: lightyellow">
            <td>1XX</td>
            <td>Informational<br/>(정보)</td>
            <td>정보 교환.</td>
        </tr>
        <tr style="background: lightyellow">
            <td>2XX</td>
            <td>Success(성공)</td>
            <td>데이터 전송이 성공적으로 이루어졌거나, 이해되었거나, 수락되었음.</td>
        </tr>
        <tr>
            <td>200</td>
            <td>OK</td>
            <td>오류 없이 전송 성공.</td>
        </tr>
        <tr>
            <td>204</td>
            <td>Non Content</td>
            <td>클라이언트의 요구를 처리했으나 전송할 데이터가 없음.</td>
        </tr>
        <tr style="background: lightyellow">
            <td>3XX</td>
            <td>Redirection<br/>(방향 바꿈)</td>
            <td>자료의 위치가 바뀌었음.</td>
        </tr>
        <tr>
            <td>304</td>
            <td>Not modified</td>
            <td>클라이언트의 캐시에 이 문서가 저장되었고 선택적인 요청에 의해 수행됨<br/>(보통 지정된 날짜보다 더 나중의 문서만을 보여주도록 하는 If-Modified-Since 헤더의 경우).</td>
        </tr>
        <tr style="background: lightyellow">
            <td>4XX</td>
            <td>Client Error<br/>(클라이언트 오류)</td>
            <td>클라이언트 측의 오류. 주소를 잘못 입력하였거나 요청이 잘못 되었음.</td>
        </tr>
        <tr>
            <td>400</td>
            <td>Bad Request</td>
            <td>요청 실패. 문법상 오류가 있어서 서버가 요청사항을 이해하지 못함</td>
        </tr>
        <tr>
            <td>404</td>
            <td>Not Found</td>
            <td>문서를 찾을 수 없음. 서버가 요청한 파일이나 스크립트를 찾지 못함.</td>
        </tr>
        <tr>
            <td>405</td>
            <td>Method not allowed</td>
            <td>메서드 허용 안됨. 요청 내용에 명시된 메서드를 수행하기 위해 해당 자원의 이용이 허용되지 않음.</td>
        </tr>
        <tr>
            <td>406</td>
            <td>Not Acceptable</td>
            <td>받아들일 수 없음.</td>
        </tr>
        <tr style="background: lightyellow">
            <td>5XX</td>
            <td>Server Error<br/>(서버 오류)</td>
            <td>서버 측의 오류로 올바른 요청을 처리할 수 없음.</td>
        </tr>
        <tr>
            <td>502</td>
            <td>Bad gateway</td>
            <td>게이트웨이 상태 나쁨.</td>
        </tr>
        <tr>
            <td>503</td>
            <td>Service Unavailable</td>
            <td>외부 서비스가 죽었거나 현재 멈춘 상태 또는 이용할 수 없는 서비스.</td>
        </tr>
    </tbody>
</table>

정말로 여태까지 개발하면서 많이 봤던 것들 위주로만 정리했다. 더 많은 상태 코드를 보고 싶다면 [여기](https://ko.wikipedia.org/wiki/HTTP#%EC%9D%91%EB%8B%B5_%EC%BD%94%EB%93%9C)를 참고.
