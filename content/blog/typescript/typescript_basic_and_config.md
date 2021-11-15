---
title: TypeScript의 개념과 개발환경 설정
date: 2021-11-11 21:11:56
category: typescript
---

> 그동안 미루고 미뤄왔던 **타입스크립트**에 대해서 공부하고 사용을 해보려고 한다. 이번에는 타입스크립트가 무엇인지 그리고 개발환경은 어떻게 구성하는지에 대해 정리하려고 한다.
>
> ([Do it, 타입스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791163031482)이라는 책을 참고)



## 타입스크립트란 무엇인가?

### :banana: 자바스크립트는 현재 세 가지 종류가 있다.

1. **ES5** : 웹 브라우저에서 동작하는 표준 자바스크립트, `ECMAScript 5`라고 불린다.
2. **ESNext** : 2015년부터 매년 새로운 버전을 발표하는 자바스크립트
3. **TypeScript** : ESNext에 `타입(type)` 기능을 추가한 것

이 중 공부하고자 하는 TypeScript는 **마이크로소프트**가 개발하고 유지하고 있는 오픈소스 프로그래밍 언어로 2012년 말 처음 발표되었다.

**앵귤러 버전 2**에서 타입스크립트를 채택한 이후로 널리 알려졌는데, 현재는 **리액트(React.js)**와 **뷰(Vue.js)**도 타입스크립트를 이용하여 개발을 많이 하는 편이다.

<br>

### :banana: 자바스크립트에 타입 기능이 있으면 좋은 이유?

위에서 언급했듯이 ESNext에 타입 기능을 추가한 것이 타입스크립트다. 그러면 타입 기능이 있으면 어떤 점이 좋을까?



#### :strawberry: 타입 없이 협업을 할 때의 문제 상황..

A개발자가 다음과 같은 코드를 만들어다고 가정하자.

```javascript
function makePerson(name, age) {}
```

B개발자가 이 코드를 사용하는데 다음과 같이 파라미터를 넘겼고, 오류가 발생하지만 오류의 원인이 무엇인지 찾기가 어렵다.

```javascript
makePerson(32, "jack")
```

#### :thinking: name, age면 당연히 String과 Number로 사용하는거 아닌가요?

물론 이 예제는 변수명만으로 어떤 타입을 써야할 지 쉽게 예상을 할 수 있지만, 커뮤니케이션이 실패한 경우에는 다른 의도로 받아들여 잘못 사용할 경우가 있다.

또한 위 코드는 런타임(Runtime) 시에 오류를 발견할 수 있는 반면에 <u>타입스크립트를 사용하면 **컴파일(Compile)** 시에 오류를 발견할 수 있다.</u>



#### :notebook: 트랜스파일(Transpile)과 컴파일(Compile)

> 결론부터 말하자면, **트랜스파일**은 <u>소스코드 :arrow_right: 소스코드</u>, **컴파일**은 <u>소스코드 :arrow_right: 바이너리 코드</u>로 바꾸는 작업이다.

- ESNext 자바스크립트 소스코드는 `바벨(Babel)`이라는 트랜스파일러(transpiler)를 거치면 ES5 자바스크립트 코드로 변환된다.
- 타입스크립트 소스코드는 `TSC(TypeScript compiler)`라는 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환된다.

:arrow_right: 여기서 **트랜스파일**이란 <u>어떤 프로그래밍 언어로 작성된 소스코드를 또 다른 프로그래밍 언어로 된 소스코드로</u> 바꿔주는 작업을 말한다.

<u>텍스트로 된 소스코드를 바이너리 코드로</u> 바꿔주는 **컴파일(Compile)**과 구분하기 위해 생긴 용어이다.



## 타입스크립트 개발 환경 구성

### :banana: 준비물

프론트엔드 개발을 한다면  이정도는 다 갖추고 있을거라고 생각하여 간단하게 리스트만 적는다.

- 텍스트 에디터 (**VSCode**)
- 브라우저(Google **Chrome**)
- **Node**



### :banana: 타입스크립트 컴파일러 설치

```shell
> npm i -g typescript
> tsc --version
```

타입스크립트를 **전역**으로 설치하고, 설치가 되었는지 확인하는 명령어다.

`typescript` 패키지는 **서버**와 **클라이언트**로 동작하는 두 개의 프로그램을 포함한다. 따라서 컴파일을 하는 명령어는 `tsc`이고, 이는 타입스크립트 **컴파일러(typescript compiler) + 클라이언트(client)**의 의미가 있다.



### :banana: 컴파일과 실행을 동시에

**tsc**는 타입스크립트 코드를 ES5 형식의 자바스크립트 코드로 변환만 할 뿐이다.

변환과 실행을 동시에 하려면 `ts-node`라는 프로그램을 설치해야 한다.

```shell
> npm i -g ts-node

# example
> ts-node hello.ts
```



타입스크립트로 코드를 짜기 위한 준비는 끝났지만, 개발을 위한 준비는 이제 시작이다.



## 타입스크립트 프로젝트 생성 및 관리

### :banana: 프로젝트 생성 및 패키지 설치

```shell
> mkdir ts-example
> cd ts-example
> npm init --y
```

위와 같이 프로젝트를 위한 폴더를 생성하고 node.js 프로젝트 시작을 위해 npm init을 실행한다.



```shell
> npm i -D typescript ts-node
```

기존에는 typescript를 설치할 때 전역으로 설치했지만, 프로젝트를 진행할 때는 다른 개발자 pc에는 typescript가 설치되지 않았을 수 있기 때문에 -D 옵션으로 설치해 package.json에 등록해 준다.

> 참고로 책에는 위에처럼 나와있지만, 실제 tsc 명령어를 사용하기 위해서는 **node_modules/typescript/bin/tsc** 로 명령어를 사용해야 하는 불편함이 있었다. (전역으로 설치하는 것이 좋아보일 듯 하다.)

```shell
> npm i -D @types/node
```

타입스크립트는 자바스크립트로 개발된 라이브러리를 사용할 때 문법에 맞게 사용했는지 검증하기가 어렵다. 따라서 라이브러리들은 추가로 타입 라이브러리들을 제공해야 한다.

타입스크립트는 또한 웹 브라우저나 Node.js가 기본으로제공하는 타입들의 존재도 그냥은 알지 못한다. 예를 들어, Promise와 같은 타입을 사용하려면 위와 같이 @types/node라는 패키지를 설치해야 한다.



### :banana: tsconfig.json

```shell
> tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

위 명령어를 통해 타입스크립트 컴파일러의 설정 파일인 tsconfig.json 파일이 생성된다. 하지만 생성된 파일에는 기본적인 설정만 되어 있고, 많은 것들이 주석 처리 되어 있을 것이다.



#### :strawberry: tsconfig.json boilerplate 

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

각 옵션에 대한 설명은 나중에 정리할 것이다. 우선 보일러플레이트로 이 파일로 사용하도록 하자



### :banana: package.json 수정

위세어 npm init으로 생성한 pakcage.json 또한 기본 구성만 되어 있을 것이다. 개발을 위해서 타입스크립트 소스코드를 ES5로 변환해 node로 실행할 수 있도록 아래와 같이 script와 main을 수정하도록 한다.

```json
{
  "name": "ts-example",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "dev" : "ts-node src",
    "build" : "tsc && node dist"
  },
  ...생략
}
```



## 마무리

간단하게 타입스크립트의 개념과 개발환경을 구성해봤다.

`tsconfig.json` 각 항목에 대한 설명이 좀 더 필요할 것 같아서 좀 더 자세히 추가할 예정이고, `React 개발`을 할 때 어떻게 환경 설정을 하는지도 포스팅할 예정이다.
