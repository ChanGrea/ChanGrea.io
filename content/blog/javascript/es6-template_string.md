---
title: 'ES6 - Template Strings(Template Literals)'
date: 2019-10-15 23:10:99
category: javascript
---

## Template Strings

Template Strings(ES6 부터는 `Template Literals`라 부름)는 문법적으로 더 편하게 string을 생성할 수 있게 함.

- 백틱(\`\`)([Grave Accent](https://en.wikipedia.org/wiki/Grave_accent)) 이용
- Perl, Python 등의 `문자열 보간`(string interpolation)과 유사
- Tagged template literals는 인젝션 공격 방어 혹은 문자열로부터 상위 데이터 구조체 재조립 등을 위해 string 생성을 커스터마이징 가능하게 함.
  > Tagged templat literals는 나중에 기회가 되면 다뤄보겠다. 여기서 다루는 Template Literals 내용만으로도 충분히 여러 곳에서 활용 가능하다고 생각한다.

### :point_right: 기본 형식

백틱 사이에 String을 넣어서 사용

> String 안에 포함된 `newline`은 그냥 String으로 인식된다. 따라서 Multiline을 입력하기 위해서는 백틱 안에서의 `Enter`가 newline 역할을 한다.

```javascript
`In JavaScript '\n' is a line-feed.``In JavaScript this is // Multiline strings
 not legal.`;
```

### :point_right: String interpolation

형식 안에서 변수를 끼워넣기 위해서는 `${ }` 형식을 이용한다.

#### :banana: 일반 문자열 삽입

```javascript
var name = 'Bob',
	time = 'today';
`Hello ${name}, how are you ${time}?`;
```

#### :banana: 수식 활용

기존에는 중간에 수식을 넣기 위해서 아래와 같이 `+` 연산을 여러번 사용했을 것이다. (**보기에도 가독성이 좋지 않다.**)

```javascript
var a = 5;
var b = 10;
console.log('Fifteen is ' + (a + b) + ' and\nnot ' + (2 * a + b) + '.');
// "Fifteen is 15 and
// not 20."
```

하지만 `Template literal`을 활용하면 아래와 같이 **깔끔한 문법**을 작성할 수 있다.

```javascript
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

### :point_right: HTTP Request

HTTP Request 형식으로도 사용할 수 있다.

```javascript
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

## 정리

너무 사용법 위주로만 정리를 한 느낌을 받을 수도 있다.

하지만 Template Literal 이라는 놈이 어떤 특정한 개념이라기보다는 하나의 문법이라고 생각한다면 사용법 위주로 알고 있으면 좋을 것 같다.
