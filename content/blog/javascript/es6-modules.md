---
title: ES6 - Modules
date: 2019-11-16 23:11:64
category: javascript
---

## :point_right: 들어가기 전

이번에는 Javascript ES6 특징 중 하나인 `Module`에 대해서 정리하고자 한다.

그 전에 `Module`이란 무엇이며, ES6가 지원되기 전에는 어떻게 했을까에 대해서 먼저 정리한다.

### :strawberry: <span style="color: skyblue">Module</span> 이란 무엇인가?

Javascript에서 Module이란 자바스크립트의 중요한 새 기능, 또는 새 기능들의 통칭이다.

즉, 기능 단위로 쪼개서 모아놓은 것, 그렇게 함으로써 <i>**다른 코드와의 의존성**</i>을 낮추고 <i>**재활용성**</i>을 높이기 위함이다.

### :strawberry: 과거에는 어떻게?

ES6가 나오기 전 이미 과거에는 유저단계에서 구현된 많은 JS 모듈 시스템이 있었다.

대표적으로 Node.js의 `CommonJS`, `AMD` 또는 그 외의 것들:question:(더 최근에는 `Webpack`과 `Babel` 같은 모듈 기반 시스템)이 있다.

모두 "코드를 내보내고(export), 가져온다(import)"한다는 공통점이 있지만, 각각 방식이 다르기 때문에 어떤 것이 좋고, <u>무엇을 선택해야 할지 **표준**이 정해져 있지 않았다.</u>

### :strawberry: 모듈시스템의 표준화

그래서 ES6에서는 브라우저가 기본적으로 모듈 기능을 지원하기 시작했다. 브라우저에서 모듈의 로딩을 최적화 할 수 있기 때문에 라이브러리를 사용하는 것보다 더 효율적이고, 뭔가 라이브러리 사용시 추가적인 작업을 하는 것보다 효율적이게 된다.

## :point_right: ES6의 Modules

이미 모던 프론트엔드 개발을 경험해 봤던 개발자라면 `Module`을 봤고 사용해봤을 것이다.

나 역시도 Pure Javascript를 하기 전 프론트엔드 개발에 빠져서 이렇게 글을 쓰고 있기 때문에 사용법을 낱낱이 정리하는 것은 약간은 "Too Much"일 수도 있다는 생각을 한다.

그래서 MDN에 나와 있는 내용을 기반으로 그 동안 개인적으로 개발하면서 썼던 문법에 대해서 왜 이렇게 썼나 되짚어보려고 한다.

### :strawberry: 사용된 예제의 디렉토리 구조

아래에서 사용하는 코드들의 디렉토리 구조는 다음과 같다.

```bash
index.html
main.js
modules/
    canvas.js
    square.js
```

### :strawberry: Export & Import

#### :banana: Export

모듈을 사용하기 위해서는 사용하고자 하는 함수 또는 변수를 내보내야 한다. 여기서 `export` 키워드를 사용한다.

아래와 같이 각각의 변수 또는 함수 앞에 `export`를 붙여주면 된다.

```javascript
export const name = 'square';

export function draw(ctx, length, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, length, length);

	return {
		length: length,
		x: x,
		y: y,
		color: color,
	};
}
```

또는 아래와 같이 **파일 맨 아래**에 `export`를 사용해서 한 번에 내보내도 된다.

```javascript
export { name, draw, reportArea, reportPerimeter };
```

#### :banana: Import

다음으로 export된 모듈을 사용하기 위해서 `import` 키워드를 이용하여 가져온다.

```javascript
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';
```

### :strawberry: Default vs Named exports

사실 지금까지 위에서 사용한 export는 `Named exports`이다. 그 외에 `Default exports`라고 하는 것도 있다.

아마도 export를 사용하다가 `default` 키워드를 쓰는 경우도 있었고, `default as`도 봤을 것이다.

#### :banana: default [as]

```javascript
export default randomSquare;
```

`square.js` 파일에 randomSquare() 함수가 있고 위와 같이 `export default`로 쓰인 경우는 파일에서 기본값으로 randomSquare 함수를 export하려는 의미이다.

export한 모듈을 사용하려면 아래와 같이 쓰면 된다.

```javascript
import randomSquare from './modules/square.js';
```

> :exclamation:당연히 randomSquare로 쓰인 이름은 바꿔서 사용 가능하다.

위 구문은 아래 구문을 함축한 것이다.

```javascript
import { default as randomSquare } from './modules/square.js';
```

### :strawberry: 중복을 피하는 방법

각각 모듈 별로 당연히 중복되는 변수명이나 함수명이 있을 수 있다. 이럴 경우를 대비하여 우리는 `as`라는 키워드를 사용할 수 있다. (이미 위에서 본 것이랑 같다.)

위에서 본 것은 import 구문에서만 사용된 것인데, export 구문에서도 사용 가능하다.

```javascript
// inside module.js
export { function1 as newFunctionName, function2 as anotherNewFunctionName };

// inside main.js
import { newFunctionName, anotherNewFunctionName } from './modules/module.js';
```

```javascript
// inside module.js
export { function1, function2 };

// inside main.js
import {
	function1 as newFunctionName,
	function2 as anotherNewFunctionName,
} from './modules/module.js';
```

import에서 하든 export에서 하든 그것은 선택이고 취향이지만, <u>보통은 모듈 코드(export가 쓰인 곳)는 그대로 두고 **import**에서 `as` 키워드를 사용하는 것이 합리적이다.</u>

## :point_right: 마무리하며..

Module에 대해서 더 깊게 다룬다면 다룰 수는 있다. 하지만 ES6의 특징을 정리하는 포스팅이기 때문에 많은 부분을 다루지는 못한 것 같다.:hushed:

예전 회사의 Javascript로 짜여진 KT Map 코드를 봤었는데 Closure 개념을 활용하여 Design pattern 중 `module pattern`을 적용한 것 같았다. 여유가 된다면 Design Pattern도 다뤄야 할텐데...:question::scream:

어쨌든 화이팅:fire::muscle:
