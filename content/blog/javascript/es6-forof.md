---
title: 'ES6 - For...Of'
date: 2019-10-19 22:10:98
category: javascript
---

## For...In (ES5)

기존 ES5에는 **Object**의 Property를 열거할 수 있는 `For...In`이 있다.

```javascript
var string1 = '';
var object1 = { a: 1, b: 2, c: 3 };

for (var property1 in object1) {
	string1 += object1[property1];
}

console.log(string1);
// expected output: "123"
```

그러나 위에 명시한 것처럼 `For...In`은 **Object**만 사용하기를 권장한다.(물론 Array도 되긴 된다.) 위 코드를 보면 알 수 있듯이 order(순서)를 보장하지 않고 index도 제공하지 않는다.

하지만 **Array**를 사용했다는 것은 <u>index를 이용해서 무언가를 하기 위한 목적</u>이 있다고 생각한다. 그래서 **Array**를 열거하기 위한 function으로 아래와 같이 `ForEach`를 제공한다.

```javascript
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
	console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

## For...Of (ES6)

앞서 본 것처럼 뭔가 **반복되는 특성**을 가진 객체는 `Object`, `Array` 외에도 `Map`, `Set` 등 여러가지가 있다.

`For...Of`는 이런 **Collection**에 대해서 열거할 수 있게 도와준다.

<br/>

> Collection?

<i>값을 담을 수 있는 컨테이너라고 생각하면 된다. `For...Of`는 `[Symbol.iterator]` 속성을 가진 객체에 대해서 반복한다.</i>

### :rocket: <i>Collection에서 쓰인 For...Of의 예시</i> :rocket:

#### :point_right: Array

```javascript
let iterable = [10, 20, 30];

for (let value of iterable) {
	console.log(value);
}
// 10
// 20
// 30
```

#### :point_right: String

```javascript
let iterable = 'boo';

for (let value of iterable) {
	console.log(value);
}
// "b"
// "o"
// "o"
```

#### :point_right: TypedArray

```javascript
let iterable = new Uint8Array([0x00, 0xff]);

for (let value of iterable) {
	console.log(value);
}
// 0
// 255
```

#### :point_right: Map

```javascript
let iterable = new Map([['a', 1], ['b', 2], ['c', 3]]);

for (let entry of iterable) {
	console.log(entry);
}
// [a, 1]
// [b, 2]
// [c, 3]

for (let [key, value] of iterable) {
	console.log(value);
}
// 1
// 2
// 3
```

#### :point_right: Set

```javascript
let iterable = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable) {
	console.log(value);
}
// 1
// 2
// 3
```

## Iterator + For...Of

위에서 잠깐 언급되었는데, "`For...Of`는 `[Symbol.iterator]` 속성을 가진 객체에 대해서 반복한다"고 했었다.

> 그렇다면 객체에 `[Symbol.iterator]`를 직접 정의해주면 `For...Of`를 사용할 수 있지 않을까?

가능하다! 바로 아래와 같이...

> Fibonacci를 출력하는 함수

```javascript
let fibonacci = {
	[Symbol.iterator]() {
		let pre = 0,
			cur = 1;
		return {
			next() {
				[pre, cur] = [cur, pre + cur];
				return { done: false, value: cur };
			},
		};
	},
};

for (var n of fibonacci) {
	// truncate the sequence at 1000
	if (n > 1000) break;
	console.log(n); // 1, 2, 3, 5, 8, ...987
}
```
