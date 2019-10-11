---
title: '[JS] ES6 - let과 const'
date: 2019-10-07 23:10:57
category: javascript
---

## var, let & const의 차이?

간단하게 말해서 **var**는 `function-scoped`이고, **let**과 **const**는 `block-scoped` 이다.

## Function-scoped? Block-scoped?

### :point_right: Function-scoped

#### :one: function과 var

```javascript
var hello = 'hello!';
function sayHello() {
	var hello = 'hello in function!';
	console.log(hello);
}

sayHello(); // hello in function!
console.log(hello); // hello!
```

function 밖과 안에 각각 `hello`라는 변수가 선언되어 있고, 함수호출 시 function 안 hello가 출력되고, hello 출력 시 function 밖 hello를 출력하는 것은 scope의 개념을 안다면 어렵지 않게 이해가 된다.

#### :two: function이 아닌 일반 lexical에서의 var

하지만 function이 아닌 범위 안에서는 어떻게 될까?

```javascript
var hello = 'hello';
if (true) {
	var hello = 'hello in if';
}

console.log(hello); // hello in if
```

'hello'가 아닌 'hello in if' 즉 if문 안의 hello를 출력한다.

:question: if문 안의 `hello`는 global로 **Hoisting**되기 때문에 밖에 있는 hello에 'hello in if'가 할당된다.

#### :three: IIFE에서도 될까?

```javascript
(function() {
	for (i = 0; i < 10; i++) {
		console.log('i', i);
	}
})();
console.log('after loop i is', i); // after loop i is 10
```

위에서 이해한 개념으로는 이 코드도 역시 function처럼 보이기 때문에 i는 `not defined`라는 에러가 발생되어야 한다. 하지만 결과는 10이 출력된다.

그렇다 **IIFE**에서는 function-scoped를 따르지 않고, Hoisting된다.

Hoisting을 막아주려면 ES5 문법 중 `use strict`를 사용해야 한다.

```javascript
(function() {
	'use strict';
	for (i = 0; i < 10; i++) {
		console.log('i', i);
	}
})();
console.log('after loop i is', i); // ReferenceError: i is not defined
```

#### :pencil: 정리

1. `var`는 **Function-scoped**이기 때문에 function 범위에서 유효하다! (다른 lexical에서는 Hoisting된다.)
2. 단 **IIFE**에서는 `use strict`를 써줘야 한다.

이처럼 `var`는 위에서 다룬 것 외에 사소하게 신경써줘야 할 부분이 많다. (변수 재선언, 재할당, Reference Error 무시...) 그래서 `let`과 `const`가 생겨난건가..?

`Block-scoped`를 따르는 `let`과 `const`를 보자 :rocket:

### :point_right: Block-scoped

간단하게 `const`를 가지고 예제를 보자

```javascript
var foo = 'This is String.';
if (typeof foo === 'string') {
	const result = true;
} else {
	const result = false;
}

console.log(result); // result : result is not defined
```

결과를 보면 알 수 있듯이, **lexcial 안**에서만 result가 유효하기 때문에 not defined 에러가 발생한다. (`let`도 마찬가지..!)

## 그렇다면 let과 const의 차이는?

`let`과 `const`은 `var`와 달리 **재선언이 불가능**하고 둘의 차이는 **immutable의 여부**이다.

`let`은 재할당이 가능하지만, `const`는 재할당이 불가능하고 선언과 동시에 값을 할당해줘야 한다.

### :point_right: let

block (function, for, if 등) 안에서 유효한 변수를 선언한다.

> `var` 키워드가 블록 범위를 무시하고 전역 변수나 함수 지역 변수로 선언되는 것과 다른 점이다.

### :point_right: const

- const는 수정 불가능한 불변성(immutable)을 말하는 것이 아니라 값 재할당이 불가능한 것이다.
- const를 사용하더라도, 배열과 오브젝트의 값을 변경하는 게 가능하다.

> 좀 더 자세히 설명하자면, const 변수에 할당된 배열과 오브젝트를 변경하는 것은 객체 자체를 바꾸는 것이 아닌 객체의 값을 바꾸는 것이다.

```javascript
const list = ['godori', 'irodog', 'roodig'];
list.push('dorigo');
console.log(list); // ["godori","irodog","roodig","dorigo"]

// 아래처럼 const 변수에 재할당 하는 것은 불가능하다.
list = ['new', 'array', '!']; // Uncaught TypeError: Assignment to constant variable.
```
