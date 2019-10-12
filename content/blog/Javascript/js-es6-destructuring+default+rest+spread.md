---
title: '[JS] ES6 - Destructuring + Default + Rest + Spread'
date: 2019-10-12 16:10:48
category: javascript
---

## Destructuring

Destructuring는 배열과 객체에 패턴 매칭을 통한 데이터 바인딩을 제공한다. 말이 너무 어려운데.. 쉽게 말하면 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 기능이다.

- Desturcturing는 할당 실패에 유연 :point_right: 실패 시 undefined 값이 자동 할당
- foo["bar"]와 같이 객체의 속성 값도 자동으로 검색하여 바인딩

```javascript
// list matching
var [a, , b] = [1, 2, 3]; // a: 1(number), b: 3(number)

// object matching
var {
	op: a,
	lhs: { op: b },
	rhs: c,
} = getASTNode();

// object matching 단축 표기
// binds `op`, `lhs` and `rhs` in scope
var { op, lhs, rhs } = getASTNode();

// parameter에서도 사용 가능
function g({ name: x }) {
	console.log(x);
}
g({ name: 5 });

// Fail-soft destructuring
var [a] = [];
a === undefined; // true

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1; // true
```

## Default + Rest + Spread

### :point_right: Default

Parameter에 **기본 값**을 설정 가능하다.

```javascript
function f(x, y = 12) {
	// y is 12 if not passed (or passed as undefined)
	return x + y;
}
f(3); // 15
```

### :point_right: Rest Parameter

가변인자를 사용가능하며 배열로 바꿔준다.

> Rest parameters는 일반 arguments보다 직관성을 제공

```javascript
function f(x, ...y) {
    // y is an Array ["hello", true]
    return x \* y.length;
}
f(3, "hello", true) // 6
```

### :point_right: Spread

함수 호출 시 **배열을 일련의 인자에 나누어 주입**한다.

```javascript
function f(x, y, z) {
	return x + y + z;
}

// Pass each elem of array as argument
f(...[1, 2, 3]); // 6
```
