---
title: CSS 설계 - BEM(Block Element Modifier)
date: 2020-05-09 15:05:51
category: css
---

## CSS 설계

여태까지 개발을 하면서 `class=" "` 안을 어떻게 채워넣어야 깔끔할까, CSS는 어떤 식으로 구성해야할까 생각은 해봤지만, **Bootstrap** 같은 CSS Framework를 주로 사용하면서 크게 고민하지 않았던 것 같다.

하지만 CSS에도 나름대로의 설계에 대한 고민과 그 방법론에 대한 내용들이 많다는 것을 얼마 전에 알게 되었다. :thinking:

- BEM
- CSS Modules
- [Atomic](https://github.com/nemophrost/atomic-css)
  - style을 작은 단위로 쪼개는 것
- [OOCSS(Object-Oriented CSS)](http://oocss.org/)
  - CSS 객체로 컨테이너와 컨텐츠를 분리
- [SMACSS](http://smacss.com/)
  - CSS를 5가지 카테고리(Base, Layout, Module, State, Theme)의 규칙으로 작성 
- [SUITCSS](http://suitcss.github.io/)
  - 구조화된 클래스 이름과 의미있는 하이픈(-)으로 구성

여러 가지가 있지만, 이 중에서 가장 유명한(?) **BEM**에 대해서 정리하려고 한다.



## BEM(Block Element Modifier)

### :white_check_mark: Reference Site

관련 사이트도 있다. [http://getbem.com/](http://getbem.com/)

위 사이트에 접속해보면,

BEM은 Front-end 개발에서 **재사용이 가능한 컴포넌트와 코드**를 만들도록 도와주는 방법론이라고 소개하고 있다.



### :bookmark: 정의

**BEM**은 **Block**, **Element**, **Modifier**를 줄여놓은 것이다.

위에서 나열했듯이 여러 CSS 설계 방법론이 있고 각각의 장점이 있지만, **BEM이 다른 것들보다 좋은 이유**는 "<u>심플</u>하면서도 명확한 용어로 OOCSS처럼 <u>좋은 구조를 제공</u>"한다는 점이다.



### :muscle: 장점

#### 1. Modularity

- 다른 요소에 종속적이지 않고 독립적이다.
- 새로운 것으로 교체하기 쉽다.

#### 2. Reusability

- 유지보수할 CSS의 양이 줄어든다.
- `Block`의 스타일 라이브러리를 만들 수 있다.

#### 3. Structure

- 이해하기 쉬운 구조화된 형태를 만들 수 있다.



### :question: 그래서 BEM이 뭔데?

정의했듯이 Block, Element와 Modifier로 구성하는 것이다.

#### Block

- 그 자체로 의미를 가지고 있는 독립적인 하나의 개체
- `header`, `container`, `menu`, `checkbox`, `input` ...

#### Element

- `Block`의 일부분
- 독립적인 의미를 가지진 않고, 의미상으로는 `Block`에 종속적이다.
- `menu item`, `list item`, `checkbox caption`, `header title` ...

#### Modifier

- `Block` 또는 `Element`에 붙는 플래그
- 외관 또는 상태를 바꾸는 데 사용
- `disabled`, `highlighted`, `checked`, `fixed`, `size big`, `color yellow` ...



#### Example

> HTML

```html
<button class="button">
	Normal button
</button>
<button class="button button--state-success">
	Success button
</button>
<button class="button button--state-danger">
	Danger button
</button>
```

> CSS

```css
.button {
	display: inline-block;
	border-radius: 3px;
	padding: 7px 12px;
	border: 1px solid #D5D5D5;
	background-image: linear-gradient(#EEE, #DDD);
	font: 700 13px/18px Helvetica, arial;
}
.button--state-success {
	color: #FFF;
	background: #569E3D linear-gradient(#79D858, #569E3D) repeat-x;
	border-color: #4A993E;
}
.button--state-danger {
	color: #900;
}
```

- 위 예제에서 `button`은 **Block**에 해당한다.
- `success`,  `danger`는 state가 있고, 이것은 **Modifier**에 해당한다.



### Naming Rule

#### Block

- 문자, 숫자, 하이픈(-)을 포함한 단어
- 네임스페이스를 대표할만한 단어로 짓는다.
- `.block`

#### Element

- 문자, 숫자, 하이픈(-), 언더바(_)를 포함한 단어
- **Block** 이름에 **언더바(_) 2개**를 붙이고 **Element**의 이름을 붙인다.
- `.block__elem`

#### Modifier

- 문자, 숫자, 하이픈(-), 언더바(_)를 포함한 단어
- **Block** 또는 **Element** 이름의 **2개의 하이픈(-)**을 붙인다.
- `.block--mod `, `.block__elem--mod `,  `.block--color-black `,  `.block--color-red`

