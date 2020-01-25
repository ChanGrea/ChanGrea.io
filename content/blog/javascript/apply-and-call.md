---
title: apply() and call() function
date: 2020-01-21 07:01:45
category: javascript
---

## 들어가며

Javascript core에 대한 포스팅은 오랜만인 것 같다. **호이스팅**이나 **클로져** 포스팅 이후 거의 안 한 것 같은데, 이번 설까지 Javascript에 대해서 정리하고 <u>다른 시리즈로 포스팅을 할 예정</u>이다. (계획은 세워놓은 상태)

이번 포스팅 주제는 **apply()**와 **call()**에 대해서 정리하고자 한다.

## Apply()

### :point_right: Apply는 Javascript Function의 Method(내장함수)이다.

처음에 이 사실을 간과하고 여러 자료를 읽다가 이해가 잘 안됬었다.

**Apply**의 사전적 의미는 `신청`, `지원`, `적용` ... 여러가지 의미가 있지만 보통 여기서는 **"적용하다"**라는 의미로 쓰인 것으로 보인다.

> :exclamation: 그러면 무엇을 적용한다는 것인가?

방금 정리했던 **Function의 Method** 그리고 **"적용한다"**라는 두 가지를 믹스해본다면, 우리는 '**Function을 어디엔가에 적용한다**'라는 것을 생각할 수 있다.

### :point_right: 구문

<div style="background-color: palegreen; padding: 10px; border-left: 7px solid green; color: gray; font-style: italic; font-size: 0.8em;">
func.apply(thisArg, [argsArray])
</div>

#### :strawberry: thisArg

`this`를 지정해주는 것이다. 원래 this는 기본적으로 **Window 객체**를 참조한다. 이 첫번째 인자로 다른 것을 넣어줌으로써 **this를 지정**할 수 있다.

#### :strawberry: [argsArray]

func(함수)가 호출되어야 하는 인수를 지정하는 **유사 배열 객체**(배열의 메소드는 쓸 수 없음)다. func의 인수가 없을 경우에는 `null` 또는 `undefined`가 지정된다.

### :point_right: Example

#### :strawberry: Basic Example(?)

사실 `apply`의 목적은 기본적으로 Context를 바꿔가면서 함수를 재사용하는 데 있다. 아래 예제가 그 목적을 잘 보여준다.

```javascript
var myMethods = {
	getName: function() {
		return this.name;
	},
	getAge: function() {
		return this.age;
	},
};

var MY_INFO = {
	name: 'ChanGrea',
	age: 28,
	job: 'Programmer',
};

var MY_FRIEND = {
	name: 'Yerin',
	age: 23,
	height: '164cm',
};

myMethods.getName.apply(MY_INFO); // 'ChanGrea'
myMethods.getAge.apply(MY_FRIEND); // 23
```

#### :strawberry: 배열에 배열 붙이기

`push`를 이용하면 배열에 요소를 추가할 수 있다. 하지만 **배열A**에 **배열B**의 요소들을 추가하기 위해서 `push`를 사용하면 **배열B** 자체가 추가된다.

`concat`을 이용한다면 우리가 생각한 결과를 얻을 수 있지만, 이것은 새로운 배열을 반환한다.

기존 배열에 새로운 배열을 합치기 위해서는 아래처럼 `apply`를 이용하면 된다.

```javascript
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

## Call()

`Call`은 앞서 정리한 `Apply`와 거의 동일하다. 중요한 차이점 하나는 **`Call`은 인수 하나하나를 받는 반면에 `Apply`는 배열로 인수 목록을 받았다.**

### :point_right: 구문

<div style="background-color: palegreen; padding: 10px; border-left: 7px solid green; color: gray; font-style: italic; font-size: 0.8em;">
fun.call(thisArg[, arg1[, arg2[, ...]]])
</div>

#### :strawberry: thisArg

fun 호출에 제공되는 this의 값. 메소드가 non-strict mode 코드 내 함수인 경우, null 및 undefined는 전역 객체로 대체되고 원시값은 객체로 변환된다.

#### :strawberry: arg1, arg2, ...

객체를 위한 인수.

### :point_right: 예제

여러 예제가 있지만, `Apply`와 기능이 같다 보니 `Call`만의 예제를 찾다가 MDN에 있는 예제를 가져왔다.

#### :strawberry: 객체 생성자

Java를 경험해봤다면 알겠지만, 인스턴스를 생성할 때, 상속받은 경우에는 상위 클래스의 생성자를 한 번 호출하게 된다. 아래 예제도 비슷한 것 같다. 마치 **상속**의 효과를 적용하고 싶다면, 아래와 같이 `call`을 이용하여 한 번 호출해준다.

> :exclamation: 여기서 왜 `call`이라고 네이밍을 했는지 알 것 같다.<br/> **"다른 함수를 호출한다"**라고 생각하면 이해가 쉬울 것이다.

```javascript
function Product(name, price) {
	this.name = name;
	this.price = price;

	if (price < 0) {
		throw RangeError(
			'Cannot create product ' + this.name + ' with a negative price',
		);
	}
}

function Food(name, price) {
	Product.call(this, name, price);
	this.category = 'food';
}

function Toy(name, price) {
	Product.call(this, name, price);
	this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

#### :strawberry: 익명 함수 호출

익명함수 호출에도 `call`을 이용할 수 있다.

```javascript
var animals = [
	{ species: 'Lion', name: 'King' },
	{ species: 'Whale', name: 'Fail' },
];

for (var i = 0; i < animals.length; i++) {
	(function(i) {
		this.print = function() {
			console.log('#' + i + ' ' + this.species + ': ' + this.name);
		};
		this.print();
	}.call(animals[i], i));
}
```

```
#0 Lion: King
#1 Whale: Fail
```

> 만약 위 예제에서 `call`을 사용하지 않고 그냥 `i`를 전달한다면 어떻게 될까?

당연히 `this`는 **window**가 될 것이고, **window**에는 **species**와 **name**이 없기 때문에 undefined가 출력될 것이다.

결과는 아래와 같다.

```
#0 undefined:
#1 undefined:
```
