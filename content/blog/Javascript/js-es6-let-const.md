---
title: '[JS] ES6 - let과 const'
date: 2019-10-07 23:10:57
category: javascript
---

## let

block (function, for, if 등) 안에서 유효한 변수를 선언한다.

> `var` 키워드가 블록 범위를 무시하고 전역 변수나 함수 지역 변수로 선언되는 것과 다른 점이다.

## const

- const는 수정 불가능한 불변성(immutable)을 말하는 것이 아니라 값 재할당이 불가능한 것이다.
- const를 사용하더라도, 배열과 오브젝트의 값을 변경하는 게 가능하다.

```javascript
const list = ['godori', 'irodog', 'roodig'];
list.push('dorigo');
console.log(list); // ["godori","irodog","roodig","dorigo"]
```
