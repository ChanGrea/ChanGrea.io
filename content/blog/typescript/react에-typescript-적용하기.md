---
title: React에 typescript 적용하기
date: 2022-03-08 17:03:79
category: typescript
---

> [이전 포스팅](https://changrea.io/typescript/typescript_basic_and_config/#%EB%A7%88%EB%AC%B4%EB%A6%AC)에서 Typescript 기반의 React 개발 환경 구성에 대해 포스팅을 하겠다고 해서, 이번 포스팅에서 다뤄보려고 한다.

## 프로젝트 생성

### 프로젝트 생성

```bash
$ mkdir react-ts
```

### 프로젝트 구조

```markdown
.
├── .babelrc
├── .eslintrc
├── .gitignore
├── .prettierrc
├── README.md
├── index.html
├── package.json
├── src
│   ├── components
│   │   └── Header.tsx
│   ├── index.css
│   └── index.tsx
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## Typescript 설정

### npm init

```bash
$ npm init
```

`npm init` 을 통해 **package.json**을 생성해준다.

### Typescript와 React 관련 package 설치

```bash
$ yarn add react react-dom
$ yarn add -D typescript @types/react @types/react-dom
```

- **react** : React를 사용하기 위한 package (UI를 만들기 위한 자바스크립트 라이브러리)
- **react-dom** : DOM에 대한 Entry Point 역할을 하는 package
- **typescript** : Typescript 언어 사용을 위한 package
- **@types/react** : react에 대한 Typescript 정의
- **@types/react-dom** : react(react-dom)에 대한 Typescript 정의

## webpack 설정

### package 설치

```bash
$ yarn add -D webpack webpack-cli webpack-dev-server css-loader html-webpack-plugin mini-css-extract-plugin ts-loader
```

- **webpack** : 모듈 번들러
- **webpack-cli** : Webpack의 공식적인 CLI 툴
- **webpack-dev-server** : Live Loading 기능을 제공하여 development 서버 역할을 하는 webpack
- **css-loader** : webpack이 css를 해석하기 위한 로더 (ex. `@import`, `url()`, `import/require()` 등의 문법을 해석)
- **html-webpack-plugin** : webpack 번들의 결과로 HTML 파일을 생성하기 위해 사용되는 플러그인
- **Mini-css-extract-plugin** : css 파일을 여러개의 파일로 추출하는 플러그인
- **ts-loader** : webpack이 typescript를 해석하기 위한 로더

### webpack.config.js

```javascript
const prod = process.env.NODE_ENV === 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
}
```

#### :bookmark: webpack에서 타입스크립트를 읽을 수 있는 Loader

1. babel-loader + @babel/preset-typescript
   - 타입 체킹을 하지 않는다. :arrow_right: 컴파일 속도가 빠르다.
   - 폴리필 환경 설정이 가능
2. ts-loader
   - 타입 체킹을 기본적으로 진행하기 때문에 컴파일 속도가 느리다.
     - transplieOnly 옵션을 통해 컴파일 속도를 증가시킬 수 있다.
   - [HMR (hot module reloading)](https://github.com/TypeStrong/ts-loader#hot-module-replacement) 사용이 불가능하다.
   - 폴리필 환경 설정을 하려면, 추가적으로 babel 설정이 필요하다.

> 타입 체킹을 하지 않을 경우, webpack-dev-server, 빌드 환경 등에서 type error 를 잡아 낼 수 없다.

## babel 설정

> `Babel`은 Javascript의 최신 문법을 브라우저가 이해할 수 있는 문법으로 변환해주는 컴파일러 역할을 한다. 그런데 babel이 무엇을 하게 하려면 `plugin`을 설치해야 한다. (실제 동작하는 것은 babel plugin이다.)

### package 설치

```bash
$ yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime
```

- **@babel/core** : babel 컴파일러 코어 라이브러리
- Preset
  - **@babel/preset-env**
  - **@babel/preset-react**
  - **@babel/preset-typescript**
- **@babel/plugin-transform-runtime** : global을 오염시키지 않고 폴리필을 추가할 수 있다.

### .babelrc

```json
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}
```

## 마무리

코드 작성을 제외한 환경 구성은 여기까지 해서 마무리 할 수 있다. 실제 Typescript 기반 React 코드 작성은 [Github repository](https://github.com/ChanGrea/react-ts) 를 참고하면 좋을 듯 하다.
