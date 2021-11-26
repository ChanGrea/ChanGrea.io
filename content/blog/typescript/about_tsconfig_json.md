---
title: tsconfig.json에 대하여
date: 2021-11-26 21:11:95
category: typescript
---

> [지난 포스트](https://changrea.io/typescript/typescript_basic_and_config/#%EB%A7%88%EB%AC%B4%EB%A6%AC)에서도 언급했지만 `tsconfig.json`의 각 항목에 대해 정리해보려고 한다.



## boilerplate

정리하기에 앞서, 책에 나와있던 보일러플레이트로 사용하는 코드는 아래와 같다.

> :warning:  아래 코드는 `node 환경` 기준이다. 아래에 주석에도 있듯이, 웹 브라우저 환경에서는 module과 moduleResolution을 바꿔서 사용하자.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",				// 웹 브라우저 환경이라면 "amd" 사용
    "moduleResolution": "node",	// module이 amd라면 "classic" 사용
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    },
    "sourceMap": true,
    "outDir": "dist",
    "downlevelIteration": true,
    "esModuleInterop": true,
    "noImplicitAny": false
  },
  "include": ["src/**/*"]
}
```



## tsconfig.json 파일 살펴보기

### :banana: module

자바스크립트 모듈은 **웹 브라우저**에서는 `AMD(asynchronous module definition)` 방식으로 동작하고, **nodejs처럼 웹 브라우저가 아닌 환경**에서는 `CommonJS` 방식으로 동작한다.

그래서 이 module 항목은 **<u>동작 대상 플랫폼이 웹 브라우저인지 nodejs인지를 구분해 그에 맞는 모듈 방식으로 컴파일하려는 목적</u>**으로 설정한다.

<div style="padding: 10px; border: 1px solid gray;">
  웹 브라우저 :arrow_right: <span style="font-weight: bold">amd</span><br>
	nodejs :arrow_right: <span style="font-weight: bold">commonjs</span>
</div>

<br>

### :banana: moduleResolution

**module이 commonjs**이면 nodejs에서 동작하는 것이므로, moduleResolution은 `node`로 설정한다.

반면에, **module이 amd**면 moduleResolution은 `classic`으로 설정한다.

<br>

### :banana: target

target은 <u>**트랜스파일할 대상 자바스크립트의 버전**</u>을 설정한다. (대부분은 **es5**를 설정한다. 최신 버전의 nodejs를 사용한다면 es6을 설정할수도 있다.)

<br>

### :banana: baseUrl & outDir

**baseUrl**과 **outDir**은 트랜스파일된 ES5 자바스크립트 파일을 저장하는 디렉터리를 설정한다.

tsc는 tsconfig.json 파일이 있는 디렉터리에서 실행되기 때문에 현재 디렉터리를 의미하는 `"."`로 **baseUrl**을 설정하는 것이 보통이다.

**outDir**은 **baseUrl** 기준으로 했을 때 항위 디렉터리의 이름이고, <u>빌드된 결과를 이 곳에 저장</u>한다.

<br>

### :banana: paths

소스 파일의 **import 문에서 from 부분을 해석할 때 찾아야 하는 디렉터리**를 설정한다.

> :warning: 위 boilerplate에서는 찾아야 하는 디렉터리가 외부 패키지이면 node\_modules 디렉터리에서 찾아야 하므로 **node\_modules/\***도 포함하였다.

<br>

### :banana: esModuleInterop

오픈소스 자바스크립트 라이브러리 중에는 웹 브라우저에서 동작한다는 가정으로 만들어진 것이 있는데 CommonJS방식으로 동작하는 타입스크립트 코드에 혼란을 줄 수 있다. (ex. [chance](https://www.npmjs.com/package/chance))

따라서 이런 패키지가 잘 동작하기 위해서는 **esModuleInterop** 값을 반드시 **true**로 설정해야 한다.

<br>

### :banana: sourceMap

**sourceMap**이 **true**이면 트랜스파일 디렉터리에는 .js 파일 이외에 `.js.map 파일`이 만들어진다.

이 소스맵 파일은 변환된 자바스크립트 코드가 타입스크립트 코드의 어디에 해당하는지를 알려준다. 주로 **디버깅**할 때 사용된다.

<br>

### :banana: downlevelIteration

타입스크립트 구문 중 `Generator` 문법의 정상적인 동작을 위해서 이 값을 **true**로 셋팅해줘야 한다.

<br>

### :banana: noImplicitAny

타입스크립트 컴파일러는 기본적으로 **f(a, b)**처럼 매개변수 a, b에 타입을 명시하지 않은 코드일 경우 **f(a: any, b: any)**처럼 암시적으로 any 타입을 설정한 것으로 간주한다.

:arrow_right: 하지만 이것은 타입스크립트 언어의 장점을 사용하는 것이 아니므로 코드에 문제가 있다고 알려주게 된다.

이러한 용도로 쓰이지만, 타입스크립트를 처음 접한다면 혼란을 줄 수 있기 때문에 **false**로 셋팅해주었다.

> :exclamation: 이건 나중에 필요하다면, **true**로 셋팅하고 개발하자.
