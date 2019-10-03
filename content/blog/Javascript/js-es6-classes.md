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

## Class Body와 Method

### :point_right: Strict Mode

Class의 Body( { } )는 Strict Mode에서 실행된다.

### :point_right: Constructor

아마도 Java 개발을 해봤다면 익숙할 것이다.

Constructor Method는 객체가 생성될 때 `초기화` 역할을 한다.

Class에서 상위 Class의 Constructor를 호출할 때 `super` 키워드를 사용한다.

### :point_right: Prototype Method

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

위 코드에서 `get`이라는 키워드는 Class의 Getter 역할을 한다. 보통 일반 Method로 정의했다면 아래와 같이 함수 호출을 해야 할 것이다. 하지만 위에서는 마치 square 객체의 멤버 변수처럼 호출하고 있다.

```javascript
...
area() {
  return this.calcArea();
}
...
console.log(squrare.area());
```

### :point_right: Static Method

위에서는 class의 Method를 사용하기 위해서는 인스턴스화 해서 사용했다. 하지만, Class에서는 **인스턴스화를 하지 않고** Method를 사용할 수 있게 `static` 키워드를 제공한다.

하지만 `static Method`는 **인스턴스 객체에서는 사용할 수 없다**는 점에 주의하자.

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.distance; //undefined
p2.distance; //undefined

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```