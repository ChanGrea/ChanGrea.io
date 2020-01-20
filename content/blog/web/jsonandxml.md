---
title: JSON과 XML 정리
date: 2019-12-01 17:12:16
category: web
---

## 포스팅 계기

> :question: <i>JSON과 XML의 차이에 대해 설명하라.</i>

1년 전 지금 회사의 면접 때, Pre Test 문제 중 하나였다. 사실 그 때 뭐라고 적었고 면접 때도 그걸 설명하는데 뭐라고 말했는지도 기억난다. (조금 부끄러워진다.. :relaxed: ~~어떻게 합격했지:question:~~:thinking:)

그래서 이번에 자세하게는 못하더라도 누구에게 정확하게 설명할 수 있는 정도는 정리하려고 한다.

## 잠깐 그 때 대답했던 내용을 되짚어보자..

:full_moon_with_face: <span style="color: red;">JSON과 XML의 차이가 뭔가요?</span>

:baby_chick: 우선 `XML`은 안드로이드 개발을 하면서 봤습니다. 어떤 데이터를 표현하기 위한 목적이고, 계층화된 구조로 이루어져 있기 때문에 사람이 보기에 좋습니다! `JSON` 역시 데이터를 주고 받기 위한 목적이지만, 사람이 보기에는 `XML`에 비해 어렵다는 단점이 있습니다!

..:question:

뭔가 부족하다. (틀린 부분도 있는 것 같고..)

뭐.. 단지 이것 하나가 합격 여부를 좌우하진 않았다고 생각한다.

## 그래서 JSON, XML 그게 뭔데?

`JSON`은 **브라우저와 서버 간의 통신**을 위해 사용되는 표준 파일 포맷이며, **Language에 독립적**인 데이터 포맷이다. `XML`은 사람이 읽을 수 있는 문서를 기계가 읽을 수 있는 문서로 **인코딩을 도와주는 일종의 규칙**들이다.

좀 더 자세하게 역사적으로(?) 흘러 올라가보면, 컴퓨터가 데이터를 처리하기 위해서 로딩하는 과정 즉, CPU가 이것들을 메모리에 할당하고, 데이터의 의미를 해석하고, 숫자로 저장하는 과정들이 중요했다.

그런데 전세계에는 수많은 시스템과 네트워크가 존재하고, 각각 데이터를 해석하는 방식이 달랐다. 그래서 이것을 표준화하기 위한 방안이 필요했고, 그 방안으로 JSON과 XML이 표준으로 사용되기 시작했다.

## JSON (JavaScript Object Notation) vs XML (Extensible Markup Language)

### :strawberry: 1. Applicability

| JSON                                                                | XML                                                                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 데이터를 전송할 때, 이미 **사람이 해석할 수 있는 형태**로 전송한다. | 사용자가 메타데이터에 주석을 달 수 있게 사용하기 위한 **구조적인 형태**를 가지기 위해서는 스크립트를 파싱해야 한다. |

### :strawberry: 2. Code Representing Objects

JSON과 XML이 각각 객체를 표현하는 형태를 아래와 같다.

#### :banana: JSON

```json
{
	"Paragraphs": [
		{
			"align": "center",
			"content": [
				"Here",
				{
					"style": "bold",
					"content": ["is"]
				},
				"some text"
			]
		}
	]
}
```

#### :banana: XML

```xml
<Document>
    <Paragraph Align="center">
        Here <Bold> is </Bold> some text
    </Paragraph>
</Document>
```

### :strawberry: 3. Representation of Hierarchy Elements

JSON은 계층 구조보다는 **Key/Value** 형태이다.

#### :banana: JSON

```json
{
	"firstName": "Mr.",
	"lastName": "A",
	"details": ["Height", "Weight", "Color", "Age", "Sex", "Language"]
}
```

#### :banana: XML

XML은 **계층 구조**를 가진다.

```xml
        <Person>
<FirstName>Mr</FirstName>
<LastName>A</LastName>
        <Details>
<Details>Height</Details>
<Details>Weight</Details>
<Details>Color</Details>
<Details>Age</Details>
<Details>Sex</Details>
<Details>Language</Details>
```

### :strawberry: 4. Populrity Reason

<table >
    <thead>
        <tr>
            <th >JSON</th>
            <th >XML</th>
        </tr>
    </thead>
    <tr>
        <td >JSON은 간단하고 빠르다.</td>
        <td >XML은 의미를 설명하기 위해서 단어가 많다. 그래서 파싱이 좀 느리고 시간이 걸린다.</td>
    </tr>
    <tr>
        <td colspan="2">JSON은 XML에 비해 복잡도나 이해도 측면에서 더 쉽다.</td>
    </tr>
    <tr>
        <td colspan="2">JSON은 XML에 비해 <code class="language-text">human readable</code>이다.</td>
    </tr>
    <tr>
        <td colspan="2">JSON은 <code class="language-text">array</code>를 지원하지만, XML은 지원하지 않는다.</td>
    </tr>
    <tr>
        <td colspan="2">
            JSON은 XML에 비해 <b>안전하지 않다.</b>
        </td>
    </tr>
    <tr>
        <td colspan="2">
        </td>
    </tr>
</table>

### :strawberry: 5. Data Structure

| JSON                                                                                                      | XML                                                              |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| JSON의 데이터 구조는 `Map`이다. Key/Value 쌍의 형태로 되어 있기 때문에 해석이 쉽고, 의미를 예측하기 쉽다. | XML은 `Tree`다. 따라서 JSON에 비해 파싱하는 시간이 좀 더 걸린다. |

### :strawberry: 6. Data Information

| JSON                                                         | XML                                                                    |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| JSON은 서버와 브라우저간의 **데이터 교환**에 주 목적이 있다. | XML은 서버 사이드에서 **어떤 정보를 저장**한다는 목적으로 주로 쓰인다. |

### :strawberry: 7. `Browser` side `Server` side

| JSON                                          | XML                                    |
| --------------------------------------------- | -------------------------------------- |
| JSON은 **클라이언트 사이드**에서 주로 쓰인다. | XML은 **서버 사이드**에서 주로 쓰인다. |

### :strawberry: 8. Metadata Tagging

Metadata Tagging이라고 이해 안되는 단어가 나왔는데, 어떤 메타데이터(정보)를 나타내기 위한 방식에 대해서 비교한 부분으로 보면 된다.

| JSON                                                                                                       | XML                                                                                            |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| JSON에서 메타데이터를 나타내기 위해서는 객체를 만들고 그 안에 entity를 만들어야 하는 복잡한 과정을 가진다. | 반면에 XML은 어떤 만들어진 Tag에 attribute로써 추가만 해주면 되기 때문에 JSON에 비해 간단하다. |

### :strawberry: 9. Mixed Content

| JSON                                          | XML                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| JSON은 오직 **텍스트**와 **숫자**만 지원한다. | 반면에 XML은 **텍스트, 숫자, 이미지, 차트, 그래프 등등** 여러 데이터 타입을 지원한다. |

## 정리

인터넷을 찾아봐도 그렇고 보기에는 JSON이 XML에 비해 가진 장점이 많은 것 같고 최고인 것 같다. 하지만, 위에서 정리했듯이, 여전히 XML이 필요한 경우가 있다. 메타데이터를 표현해야 하거나 그래픽 파일이나 문서 등의 바이너리 파일(Binary)로 코딩된 파일은 XML이 더 적합하다.
