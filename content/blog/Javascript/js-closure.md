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
