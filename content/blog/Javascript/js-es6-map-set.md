---
title: '[JS] ES6 - Map + Set (+ WeakMap, WeakSet)'
date: 2019-10-20 13:10:43
category: javascript
---

## Set

모두 아시다시피 `Set`은 **중복 없이 유일한 값들을 저장하는 자료구조**이다. Javascript의 `Set`은 아래와 같은 특성을 가진다.

- `Set` 내의 값은 **유일하다**.
- **추가된 순서대로 열거**(iterator) 할 수 있다.
- `NaN`과 `undefined`도 추가할 수 있다.

### :point_right: Example

```javascript
var mySet = new Set();

mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }
mySet.add(5); // Set { 1, 5 }
mySet.add('some text'); // Set { 1, 5, 'some text' }
var o = { a: 1, b: 2 };
mySet.add(o);
```

> :exclamation:아래 추가되는 객체는 o와 다른 객체를 참조

```javascript
mySet.add({ a: 1, b: 2 });
```

```javascript
mySet.has(1); // true
mySet.has(3); // false, 3은 set에 추가되지 않았음
mySet.has(5); // true
mySet.has(Math.sqrt(25)); // true
mySet.has('Some Text'.toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5); // set에서 5를 제거함
mySet.has(5); // false, 5가 제거되었음

mySet.size; // 4, 방금 값을 하나 제거했음
console.log(mySet); // Set {1, "some text", Object {a: 1, b: 2}, Object {a: 1, b: 2}}
```

### :point_right: Iteration

```javascript
// set 내 항목에 대해 반복
// 순서대로 항목을 (콘솔에) 기록: 1, "some text", {"a": 1, "b": 2}
for (let item of mySet) console.log(item);

// 순서대로 항목을 기록: 1, "some text", {"a": 1, "b": 2}
for (let item of mySet.keys()) console.log(item);

// 순서대로 항목을 기록: 1, "some text", {"a": 1, "b": 2}
for (let item of mySet.values()) console.log(item);

// 순서대로 항목을 기록: 1, "some text", {"a": 1, "b": 2}
// (여기서 key와 value는 같음)
for (let [key, value] of mySet.entries()) console.log(key);

// Set 객체를 배열 객체로 변환 (Array.from으로)
var myArr = Array.from(mySet); // [1, "some text", {"a": 1, "b": 2}]

// 다음도 HTML 문서에서 실행하는 경우 작동함
mySet.add(document.body);
mySet.has(document.querySelector('body')); // true

// Set과 Array 사이 변환
mySet2 = new Set([1, 2, 3, 4]);
mySet2.size; // 4
[...mySet2]; // [1, 2, 3, 4]

// 교집합은 다음으로 흉내(simulate)낼 수 있음
var intersection = new Set([...set1].filter(x => set2.has(x)));

// 차집합은 다음으로 흉내낼 수 있음
var difference = new Set([...set1].filter(x => !set2.has(x)));

// forEach로 set 항목 반복
mySet.forEach(function(value) {
	console.log(value);
});

// 1
// 2
// 3
// 4
```

## WeakSet

기본적으로 `Set`이기는 하지만 `WeakSet`은 **Key는 Object여야만 한다**는 특성이 있다. 이는 아래와 같은 특성을 가지기 때문이다.

- `Memory Leak`로부터 자유롭다.
  > Key가 Object이기 때문에 더이상 reference되지 않는 Object는 Garbage Collection의 대상이 된다.
- `WeakSet`은 **열거 불가능하다.**
- `Set`은 모든 자료형을 저장할 수 있지만, `WeakSet`은 **오직 Object만 저장 가능**하다.

### :point_right: Example

아래 예제를 보면 알겠지만 `WeakSet`은 `add`, `delete`, `has` 3가지 Method만 제공한다.

```javascript
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo); // false, foo가 집합에 추가되지 않았음

ws.delete(window); // 집합에서 window 제거함
ws.has(window); // false, window가 제거되었음
```

## Map

`Map`은 (key, value) 형태의 쌍을 저장하고 있는 자료구조이다.

## WeakMap
