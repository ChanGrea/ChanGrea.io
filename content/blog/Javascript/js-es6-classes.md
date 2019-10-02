---
title: '[JS] ES6 - Classes'
date: 2019-10-02 22:10:59
category: javascript
---

## Class

자바스크립트는 `프로토타입 기반(prototype-based)` 객체지향 언어다.
프로토타입 기반으로 클래스를 만들 수도 있지만, `Class`를 이용하여 명료하게 클래스를 만들 수 있게 되었다.

보통 예전에 `Java`를 주 언어로 써왔던 나는 **Class**라고 하면

> 음.... 그냥 클래스 아닌가? :thinking:

라고 생각했었다.

#### :exclamation: 자바스크립트에서 Class는 `함수`이다.

자바스크립트에서 가장 중요하게 여겨지는 것 중에 하나는 바로 **함수** 다.

지금부터 자바스크립트에서 class는 함수라는 것을 기억하고 정리하겠다.

## Class 정의

Class를 정의하는 방법에는 Class를 선언하는 것과 Class 표현식을 이용하는 방법이 있다.

### :point_right: Class declarations

단순하게 `Class` 키워드와 이름을 선언해주면 된다.

```javascript
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

> :exclamation: 단, Class가 함수이긴 하지만, Hoisting은 불가능하기 때문에 반드시 먼저 선언하고 인스턴스를 생성해야 한다.

### :point_right: Class expressions

Class를 정의하는 다른 방법은 Variable과 함께 표현식으로 나타내는 것이다. 

아래와 같이 class 이름을 지정하는 방식(named)과 그렇지 않은 방식(unnamed) 모두 가능한데, named 같은 경우에 class 자체 `name` property를 할당 받기 때문에 아래와 같이 class 이름이 출력된다.

```javascript
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
```