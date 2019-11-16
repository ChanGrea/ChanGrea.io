---
title: 'ES6 - Map + Set (+ WeakMap, WeakSet)'
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
  > :exclamation:Key가 Object이기 때문에 더이상 reference되지 않는 Object는 Garbage Collection의 대상이 된다.
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

`Map`은 (key, value) 형태의 쌍을 저장하고 있는 자료구조이다. 아래와 같읕 특징을 갖는다.

- 각 쌍의 **삽입 순서를 기억**한다.
- key, value에 <u>**아무거나**</u> 사용 가능하다.
  > :question:아무거나 : <u>Object</u>, <u>string</u>, <u>number</u>, <u>boolean</u>, <u>null</u>, <u>undefined</u>, <u>symbol</u>

### :point_right: Object vs Map

`object`는 value에 key를 할당할 수 있고, 그 key로 value를 얻을 수 있으며 key를 삭제할 수 있으며 어떤 key에 value가 존재하는지 확인할 수 있다는 점에서 `Map`과 유사하다.

그래서 `Object`를 `Map`대신에 사용하기도 하지만, 어떤 상황에서는 `Map`이 필요할 경우가 있다.

#### :strawberry: 사용되는 자료형

`Object`의 key에는 <u>string</u>과 <u>Symbol</u>을 사용하지만, `Map`은 function, Object, 원시형 자료형 등 어떤 값도 사용할 수 있다.

#### :strawberry: 정렬

`Map`의 Key는 삽입 순으로 정렬되지만, `Object`의 Key는 그렇지 않다. 그래서 `Map`을 순회하면 Key를 삽입한 순서대로 반환한다.

#### :strawberry: `size` 속성

`Map`의 크기는 `size` 속성으로 쉽게 얻을 수 있다. 하지만 `Object`의 Property 수를 가져오는 방법은 따로 구현해야 한다.

#### :strawberry: Iterable

`Map`은 바로 **순회**할 수 있지만, `Object`를 순회하려면 Key 배열을 얻고 순회해야 한다.

#### :strawberry: Prototype

`Object`는 Prototype을 가지므로 주의하지 않으면 키가 충돌할 수 있다.

#### :strawberry: 잦은 Key의 추가/제거 시의 성능

잦은 Key의 추가/제거가 필요한 경우에는 `Map`이 더 빠르다.

### :point_right: Example

#### :strawberry: basic

```javascript
var myMap = new Map();

var keyString = '어떤 문자열',
	keyObj = {},
	keyFunc = function() {};

// 값 저장하기
myMap.set(keyString, "'어떤 문자열'과 연결된 값");
myMap.set(keyObj, 'keyObj와 연결된 값');
myMap.set(keyFunc, 'keyFunc와 연결된 값');

myMap.size; // 3

// 값 불러오기
myMap.get(keyString); // "'어떤 문자열'과 연결된 값"
myMap.get(keyObj); // "keyObj와 연결된 값"
myMap.get(keyFunc); // "keyFunc와 연결된 값"

myMap.get('어떤 문자열'); // "'어떤 문자열'과 연결된 값" (왜냐면 keyString === '어떤 문자열')
myMap.get({}); // undefined, keyObj !== {}
myMap.get(function() {}); // undefined, keyFunc !== function () {}
```

#### :strawberry: Map의 Key로 `NaN` 사용하기

`NaN`도 key로 사용할 수 있다. <u>`NaN !== NaN`이지만, `NaN`을 구분할 수도 없기 때문에</u>

> :question: 이게 무슨 말이냐면, `NaN !== NaN`에 대해서는 모든 `NaN`은 각각 다른 존재라는 의미라고 쉽게 이해할 수 있을 것이다.
> <br/>
> 하지만 그 모든 `NaN`에 대해서 각각이 어떤 `NaN`인지는 모른다는 의미다.
> <br/>
> :exclamation: 일란성 쌍둥이를 예를 들자면 각자 다른 인격체지만 우리는 구별하기 힘들다 정도로 보면 될 것 같다.

아래 예제도 잘 동작한다.

그래서 Key로 사용된 `NaN`은 그냥 `NaN`이라고 간주하고 Value를 뱉어내는 것이다.

```javascript
var myMap = new Map();
myMap.set(NaN, 'not a number');

myMap.get(NaN); // "not a number"

var otherNaN = Number('foo');
myMap.get(otherNaN); // "not a number"
```

#### :strawberry: `for..of`로 `Map` 순회

```javascript
var myMap = new Map();
myMap.set(0, 'zero');
myMap.set(1, 'one');
for (var [key, value] of myMap) {
	console.log(key + ' = ' + value);
}
// 0 = zero
// 1 = one

for (var key of myMap.keys()) {
	console.log(key);
}
// 0
// 1

for (var value of myMap.values()) {
	console.log(value);
}
// zero
// one

for (var [key, value] of myMap.entries()) {
	console.log(key + ' = ' + value);
}
// 0 = zero
// 1 = one
```

#### :strawberry: `forEach()`로 `Map` 순회

```javascript
myMap.forEach(function(value, key) {
	console.log(key + ' = ' + value);
});
// 2개의 로그를 출력한다; 첫 번째는 "0 = zero"이며 두 번째는 "1 = one"이다
```

#### :question: `for..in` vs `for..of` vs `forEach`

정리하다가 위 세 가지에 대해서 궁금해졌다. [여기](https://jsdev.kr/t/for-in-vs-for-of/2938)에 간단하게 정리되어 있는데, 기회가 되면 나중에 따로 포스팅할 예정이다.

## WeakMap

`WeakMap`은 key가 약하게 참조되는 (key, value) 쌍의 Collection이다. <u>key는 `Object`여야만 한다.</u>

`WeakMap`도 `WeakSet`과 비슷하게 아래와 같은 특징을 갖는다.

- `Memory Leak`로부터 자유롭다.
  > :exclamation:Key가 Object이기 때문에 더이상 reference되지 않는 Object는 Garbage Collection의 대상이 된다.
- `WeakMap`은 **열거 불가능하다.**
- `Map`은 모든 자료형을 key로 저장할 수 있지만, `WeakMap`은 **오직 Object만 저장 가능**하다.

### :point_right: Example

`WeakMap`은 `delete`, `get`, `set`, `has` 4가지 메서드를 갖는다.

```javascript
var wm1 = new WeakMap(),
	wm2 = new WeakMap(),
	wm3 = new WeakMap();
var o1 = {},
	o2 = function() {},
	o3 = window;

wm1.set(o1, 37);
wm1.set(o2, 'azerty');
wm2.set(o1, o2); // 값은 무엇이든 될 수 있음, 객체 또는 함수 포함
wm2.set(o3, undefined);
wm2.set(wm1, wm2); // 키와 값은 어떤 객체든 될 수 있음. 심지어 WeakMap도!

wm1.get(o2); // "azerty"
wm2.get(o2); // undefined, wm2에 o2에 대한 키가 없기에
wm2.get(o3); // undefined, 이게 설정값이기에

wm1.has(o2); // true
wm2.has(o2); // false
wm2.has(o3); // true (값 자체가 'undefined'이더라도)

wm3.set(o1, 37);
wm3.get(o1); // 37

wm1.has(o1); // true
wm1.delete(o1);
wm1.has(o1); // false
```
