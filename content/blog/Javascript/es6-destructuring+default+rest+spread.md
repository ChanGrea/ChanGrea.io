---
title: 'ES6 - Destructuring + Default + Rest + Spread'
date: 2019-10-12 16:10:48
category: javascript
---

## Destructuring

Destructuring는 배열과 객체에 패턴 매칭을 통한 데이터 바인딩을 제공한다. 말이 너무 어려운데.. 쉽게 말하면 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 기능이다.

- Desturcturing는 할당 실패에 유연 :point_right: 실패 시 undefined 값이 자동 할당
- foo["bar"]와 같이 객체의 속성 값도 자동으로 검색하여 바인딩

### :bomb: List matching

#### :banana: 기본 변수 할당

```javascript
var foo = ['one', 'two', 'three'];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

#### :banana: 일부 반환 값 무시

다음과 같이 필요하지 않은 반환 값은 무시할 수 있다.

```javascript
var [a, , b] = [1, 2, 3]; // a: 1(number), b: 3(number)
```

#### :banana: Swap

원래는 변수의 값을 교환(Swap)하기 위해서는 임시 변수가 필요하다.

하지만 Destructuring을 통해 값을 교환할 수 있다.

```javascript
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

#### :banana: 변수에 배열의 나머지 할당

```javascript
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```

> :exclamation:하지만 맨 뒤에 `,(쉼표)`가 있으면 안된다.

```javascript
var [a, ...b,] = [1, 2, 3];
// SyntaxError: rest element may not have a trailing comma
```

### :bomb: Object matching

#### :banana: 기본 할당

```javascript
var o = { p: 42, q: true };
var { p, q } = o;

console.log(p); // 42
console.log(q); // true
```

#### :banana: 새로운 변수 이름으로 할당

```javascript
var o = { p: 42, q: true };
var { p: foo, q: bar } = o;

console.log(foo); // 42
console.log(bar); // true
```

#### :banana: default value + 새로운 변수 이름

```javascript
var { a: aa = 10, b: bb = 5 } = { a: 3 };

console.log(aa); // 3
console.log(bb); // 5
```

### :bomb: Parameter에서도 사용 가능

```javascript
function g({ name: x }) {
	console.log(x);
}
g({ name: 5 });
```

### :bomb: Fail-soft destructuring

매칭에 실패했을 때, `undefined`가 할당된다.

```javascript
var [a] = [];
a === undefined; // true
```

### :bomb: Fail-soft destructuring with defaults

매칭에 실패했을 경우를 대비하여 `default value`를 설정할 수도 있다.

```javascript
var [a = 1] = [];
a === 1; // true
```

## Default + Rest + Spread

### :bomb: Default

Parameter에 **기본 값**을 설정 가능하다.

```javascript
function f(x, y = 12) {
	// y is 12 if not passed (or passed as undefined)
	return x + y;
}
f(3); // 15
```

### :bomb: Rest Parameter

가변인자를 사용가능하며 배열로 바꿔준다.

> Rest parameters는 일반 arguments보다 직관성을 제공

```javascript
function f(x, ...y) {
    // y is an Array ["hello", true]
    return x \* y.length;
}
f(3, "hello", true) // 6
```

### :bomb: Spread

함수 호출 시 **배열을 일련의 인자에 나누어 주입**한다.

```javascript
function f(x, y, z) {
	return x + y + z;
}

// Pass each elem of array as argument
f(...[1, 2, 3]); // 6
```
