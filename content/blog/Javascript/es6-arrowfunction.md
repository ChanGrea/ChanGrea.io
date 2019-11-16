---
title: 'ES6 - Arrow Function'
date: 2019-09-30 21:09:95
category: javascript
---

## Arrows

**ES6**에서는 익명함수를 화살표(`=>`)로 축약해 표현할 수 있다.

**Arrow Function Expression** 또는 **Fat Arrow Function** 이라고 부르며, 문법은 아래와 같다.

```javascript
param => expression

// or

([param][, param]) => {
  statements
}
```

- `param` : 매개변수, 컴마로 구분하고 괄호로 싸서 호출한다.<br/>(파라미터가 한 개인 경우 괄호를 생략해도 좋다.)
- `statements or expression` : 여러 구문은 중괄호(brace, { })로 감싸준다.<br/>(한 개의 표현식이라면 중괄호를 생략해도 된다.)

## Arrow Function Code Sample

#### :point_right: 한 줄짜리 표현식

```javascript
let square = x => x * x;
square(3); // 9
```

#### :point_right: 중괄호를 생략한 한 줄 표현식은 중괄호와 함께 리턴한 것과 동일하다.

```javascript
let square2 = x => {
	return x * x;
};

square2(3); // 9
```

#### :point_right: 파라미터로 전달하는 경우, 훨씬 간결하게 표현 가능

```javascript
setTimeout(() => {
	console.log('delayed');
}, 100);

let list = [1, 2, 3, 4];

list.filter(n => {
	return n % 2 === 0;
}); // [2, 4]

list.reduce((sum, n) => sum + n, 0); // 10
```

#### :point_right: `즉시실행함수`는 아래와 같이 표현할 수 있다.

```javascript
(() => {
	console.log('foo');
})();
```

#### :point_right: `=>`로 정의한 함수 내의 `this`는 현재 객체를 가리킨다.

```javascript
let obj = {
	getThis: function() {
		var getter = () => this;
		return getter();
	},
};
obj.getThis() === obj; //-> true
```

#### :point_right: lexical 범위 내의 `this`

`this`는 lexical 범위 내의 `this`를 가리키므로, 아래 코드처럼 객체의 메서드에서 `this`를 사용하면 객체 선언을 감싸고 있는 함수의 `this`를 가리키게 된다.

```javascript
(function() {
	this.name = 'outer';
	var inner = {
		name: 'inner',
		getName: () => {
			return this.name;
		},
	};
	inner.getName(); //-> 'outer'
})();
```

#### :point_right: Arrow와 `use strict`

Arrow Function 내에서 `use strict` 구문을 정의한 경우, strict mode 의 `this`는 무시된다.

```javascript
let obj = {
	getThis: function() {
		var getter = () => {
			'use strict';
			return this;
		};
		return getter();
	},

	getThis2: function() {
		var getter = function() {
			'use strict';
			return this;
		};
	},
};
obj.getThis() === obj; //-> true
obj.getThis2() === undefined; //-> true
```
