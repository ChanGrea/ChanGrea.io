---
title: apply() and call() function
date: 2020-01-21 07:01:45
category: javascript
---

## 들어가며

Javascript core에 대한 포스팅은 오랜만인 것 같다. **호이스팅**이나 **클로져** 포스팅 이후 거의 안 한 것 같은데, 이번 설까지 Javascript에 대해서 정리하고 <u>다른 시리즈로 포스팅을 할 예정</u>이다. (계획은 세워놓은 상태)

이번 포스팅 주제는 **apply()**와 **call()**에 대해서 정리하고자 한다.

## Apply()

### Apply는 Javascript Function의 Method(내장함수)이다.

처음에 이 사실을 간과하고 여러 자료를 읽다가 이해가 잘 안됬었다.

**Apply**의 사전적 의미는 `신청`, `지원`, `적용` ... 여러가지 의미가 있지만 보통 여기서는 **"적용하다"**라는 의미로 쓰인 것으로 보인다.

> :exclamation: 그러면 무엇을 적용한다는 것인가?

방금 정리했던 **Function의 Method** 그리고 **"적용한다"**라는 두 가지를 믹스해본다면, 우리는 'Function을 어디엔가에 적용한다'라는 것을 생각할 수 있다.

### 구문

```
fun.apply(thisArg, [argsArray])
```

#### thisArg

`this`를 지정해주는 것이다. 원래 this는 기본적으로 **Window 객체**를 참조한다. 이 첫번째 인자로 다른 것을 넣어줌으로써 **this를 지정**할 수 있다.

#### [argsArray]

### 예제

## Call()
