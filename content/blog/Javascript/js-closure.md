---
title: '[JS] Closure(클로저)'
date: 2019-09-20 19:09:36
category: javascript
---

## 들어가며

사실 전에 클로저에 대해 포스팅을 한 적이 있었다.(아주 예전에..:thinking:)

지금 와서 그 포스팅을 보는데 너무 부끄러웠다. 과연 클로저를 반의 반이라도 이해하고 쓴 것일까?

그래서 다시 정리한다.

## 클로저의 개념

우선 아래 코드를 보자.

```javascript
function outerFunc() {
	var x = 10;
	var innerFunc = function() {
		console.log(x);
	};
	return innerFunc;
}

var inner = outerFunc();
inner(); // 10
```

`inner`라는 변수에 outerFunc()를 실행함으로써 return되는 `innerFunc 함수`를 할당하였다.
그러고 나서 inner 함수(innerFunc)를 실행하였고, 결과 값으로 10이 찍힌다.

분명 **inner 변수에 innerFunc 함수가 할당될 때** 즉, outerFunc()가 실행될 때, **outerFunc()의 실행은 끝난 것이다.(생명을 다 했다 :wink:)**

그럼에도 불구하고 inner()를 실행하였고, outerFunc의 local variable인 x의 값 10이 찍혔다.

### :point_right: 정의

이처럼 **`클로저`**를 조금 쉽게 풀어서 설명하자면 다음과 같다.

> **이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수**

### :point_right: 클로저 용어

- `자유 변수(Free variable)` : 클로저로 참조되는 외부 변수 즉, **outterFunc의 x**와 같은 변수

- `클로저(Closure)` : 자유 변수에 엮여있는 함수 즉, **innerFunc와** 같은 함수

### :point_right: 단점은 없을까?

위에서 outterFunc가 실행되면서 생성되는 객체가 스코프 체인에 들어가게 되고, 이 스코프는 innerFunc의 스코프 체인으로 참조된다.

즉, outterFunc가 종료되더라도, 내부 함수(innerFunc())에 의해 참조되므로 가비지 컬렉션의 대상이 되지 않는다. **여전히 메모리에 남아 있다는 뜻이다.**

그렇기 때문에 클로저는 아래와 같은 **단점**이 있다.

1. 클로저를 사용한 코드는 `메모리 부담`이 많아진다.

2. 클로저에서는 스코프 체인 뒤쪽에 있는 객체에 자주 접근하므로 `성능 저하`가 있을 수 있다.

## 클로저의 활용

앞서 봤듯이, 클로저는 성능적인 면과 자원적인 면에서 약간 손해를 볼 수 있기 때문에 무차별적으로 사용해서는 안 된다.

하지만 **immutable**을 지향하는 `함수형 프로그래밍`같이 **side effect를 방지**하고 프로그램의 안정성을 최대화하기 위해서 클로저를 적극적으로 사용한다.

### :point_right: 특정 함수에 사용자가 정의한 객체의 메서드 연결

```javascript
function HelloFunc(func) {
	this.greeting = 'hello';
}

HelloFunc.prototype.call -
	function(func) {
		func ? func(this.greeting) : this.func(this.greeting);
	};

var userFunc = function(greeting) {
	console.log(greeting);
};

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call(); // "hello"
```

위 코드에서 `HelloFunc()`는 greeting만을 인자로 넣어 사용자가 인자로 넘긴 함수를 실행시킨다. 그래서 사용자가 정의한 함수도 한 개의 인자를 받는 함수를 정의할 수밖에 없다.

여기서 사용자가 원하는 인자를 더 넣어서 HelloFunc()를 이용하여 호출하려면 다음과 같이 수정한다.

```javascript
function saySomething(obj, methodName, name) {
	return function(greeting) {
		return obj[methodName](greeting, name);
	};
}

function newObj(obj, name) {
	obj.func = saySomething(this, 'who', name);
	return obj;
}

newObj.prototype.who = function(greeting, name) {
	console.log(greeting + ' ' + (name || 'everyone'));
};

var obj1 = new newObj(objHello, "ChanGrea"):
obj1.call();	// "hello ChanGrea"
```

### :point_right: 함수의 캡슐화

다음과 같은 함수를 작성한다고 가정해보자.

> "I am XXX. I live in XXX. I'am XX years old" 라는 문장을 출력하는데, XX 부분은 사용자에게 인자로 입력 받아 값을 출력하는 함수

보통 아래처럼 템플릿을 만들어서 전역 변수에 저장하고, 사용자의 입력을 받은 후, 이 전역 변수에 접근하여 출력하는 방식으로 함수를 작성할 것이다.

```javascript
var buffAr = ['I am ', '', '. I live in ', '', ". I'am", '', ' years old.'];

function getCompletedStr(name, city, age) {
	buffAr[1] = name;
	buffAr[3] = city;
	buffAr[5] = age;

	return buffAr.join('');
}

var str = getCompletedStr('ChanGrea', 'Ansan', 27);
console.log(str);
```

#### :exclamation:위 코드의 문제점

1. 다른 함수에서 이 배열에 쉽게 접근하여 값을 바꿀 수 있다.

2. 실수로 같은 이름의 변수를 만들어서 버그가 생길 수도 있다.

클로저를 활용하여 buffAr을 추가적인 스코프에 넣고 사용하게 하면, 이 문제를 해결할 수 있다.

```javascript
var getCompletedStr = (function() {
	var buffAr = ['I am ', '', '. I live in ', '', ". I'am", '', ' years old.'];

	return function(name, city, age) {
		buffAr[1] = name;
		buffAr[3] = city;
		buffAr[5] = age;

		return buffAr.join('');
	};
})();

var str = getCompletedStr('ChanGrea', 'Ansan', 27);
console.log(str);
```

이 외에도 클로저는 다양하게 활용된다. 한 예로 Design Pattern 중 [Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)도 클로저를 활용한다.

## 클로저를 활용할 때 주의사항

다음은 클로저에서 사용자가 쉽게 간과할 수 있는 부분이다.

### :point_right: 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의해야 한다.

```javascript
function outerFunc(argNum) {
	var num = argNum;
	return function(x) {
		num += x;
		console.log('num: ' + num);
	};
}

var exam = outerFunc(40);
exam(5);
exam(-10);
```

위와 같이 `exam`을 호출할 때마다 `자유변수 num`의 값은 계속 변경된다.

### :point_right: 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다.

```javascript
function func() {
	var x = 1;
	return {
		func1: function() {
			console.log(++x);
		},
		func2: function() {
			console.log(--x);
		},
	};
}

var exam = func();
exam.func1();
exam.func2();
```

위와 같이 **func가 반환하는 객체 안의 두 함수**는 모두 `자유 변수 x`를 참조한다. 그리고 각각의 함수가 호출될 때마다 x 값이 변하므로 주의해야 한다.

### :point_right: 루프 안에서 클로저를 활용할 때는 주의하자.

이 예제는 클로저에서 정말 자주 언급되는 예제이다.

```javascript
function countSeconds(howMany) {
	for (var i = 1; i <= howMany; i++) {
		setTimeout(function() {
			console.log(i);
		}, i * 1000);
	}
}
countSeconds(3);
```

원래 위 코드는 1, 2, 3을 1초 간격으로 출력하는 의도로 만들었다.

_하지만 결과는 4가 연속 3번 1초 간격으로 출력된다._

#### why?

> setTimeout 함수의 인자로 들어가는 함수는 자유 변수 i를 참조한다. 하지만 이 함수가 실행되는 시점은 countSecondes() 함수의 실행이 종료된 이후이고 i는 이미 4가 된 상태이다.

의도했던 대로 출력을 원한다면 아래와 같이 i 값을 currentI에 복사해서 사용해야 한다.

```javascript
function countSeconds(howMany) {
	for (var i = 1; i <= howMany; i++) {
		(function(currentI) {
			setTimeout(function() {
				console.log(currentI);
			}, currentI * 1000);
		})(i);
	}
}

countSecounds(3);
```
