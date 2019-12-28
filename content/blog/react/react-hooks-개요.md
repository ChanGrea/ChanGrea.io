---
title: React Hooks 개요
date: 2019-12-28 19:12:07
category: react
---

## 포스팅 계기

최근(?) 아니 예전부터 `Hooks`가 나왔다는 사실은 여러 블로그, 페이스북 게시물 등을 통해서 알고는 있었다.

하지만 이런저런 이유 때문에 계속 공부와 실제 적용해보지는 못했다. 최근에서야 기존에 진행하던 프로젝트 중 React로 전환하는 것이 있었는데, 도중에 Hooks가 나오는 바람에 전부 Hooks로 바꿔야 하나 말아야 하는 고민하던 중, 이번에 [Atomic Design](https://brunch.co.kr/@ultra0034/63)을 적용하면서 바꾸자고 결심했다.

> 이 포스팅에서는 Hooks의 자세한 사용법, 예제까지는 다루지 않고, Hooks의 개념, 어떤 장점이 있고, 왜 써야하는지에 대해서 다루고, 다음 포스팅에서 Hooks의 예제에 대해서 다루고자 한다.

## Hooks가 무엇인가?

`React Hooks`는 지난 [ReactConf 2018](https://conf.reactjs.org/)에서 발표된, **class없이 state를 사용할 수 있는 새로운 기능**이다.

## Hooks가 나오기 전에는..

Hooks가 나오기 전에는 **state를 활용하고 싶을 때** 흔히 `Container`라고 불리는 **class**형 컴포넌트에 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`에 state의 변경이 일어날 때마다 수행하는 로직을 짜서 개발을 했을 것이다.

여기서 크게 두 가지의 짜증나는 점을 경험했을 것이라고 생각한다.

1. 컴포넌트를 재활용하기 위해 구조를 재정의하고, UI(`dumb component`)와 로직(`container component`) 컴포넌트를 분리하여 `render props` 방식을 사용하거나, 경우에 따라 `HOC(Higher Order Component)` 방식을 사용했을 것이다. 하지만 컴포넌트 양이 늘어나면서 우리는 흔히 말하는 `Wrapper Hell`을 경험하게 된다.

2. 역시 컴포넌트 양이 늘어나면서, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`를 수정하다 보면 `Side Effect`가 생기고, 테스트 및 디버깅이 너무 어려워진다.

위 문제점 때문에 React에서는 Hooks라는 대안을 제시했다.

## Hooks가 가져다주는 장점?

#### :strawberry: 기존 Class 코드

```javascript
import React from 'react';
import Row from './row';
import { ThemeContext, LocaleContext } from './context';

export default class Greeting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Mary',
			surname: 'Poppins',
			width: window.innerWidth,
		};
	}

	componentDidMount() {
		document.title = this.state.name + ' ' + this.state.surname;
		window.addEventListener('resize', this.handleResize);
	}

	componentDidUpdate() {
		document.title = this.state.name + ' ' + this.state.surname;
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleNameChange = e => {
		this.setState({ name: e.target.value });
	};

	handleSurnameChange = e => {
		this.setState({ surname: e.target.value });
	};

	handleResize = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		return (
			<ThemeContext.Consumer>
				{theme => (
					<section className={theme}>
						<Row label="Name">
							<input value={this.state.name} onChange={this.handleNameChange} />
						</Row>
						<Row label="Surname">
							<input
								value={this.state.surname}
								onChange={this.handleSurnameChange}
							/>
						</Row>
						<LocaleContext.Consumer>
							{locale => <Row label="Language">{locale}</Row>}
						</LocaleContext.Consumer>
						<Row label="Width">{this.state.width}</Row>
					</section>
				)}
			</ThemeContext.Consumer>
		);
	}
}
```

#### :strawberry: Hooks 이용 코드

```javascript
import React, { useState, useContext, useEffect } from 'react';
import Row from './row';
import { ThemeContext, LocaleContext } from './context';

export default function Greeting(props) {
	const name = useFormInput('Mary');
	const surname = useFormInput('Poppins');
	const theme = useContext(ThemeContext);
	const locale = useContext(LocaleContext);
	const width = useWindowWidth();

	useDocumentTitle(name.value + ' ' + surname.value);

	return (
		<section className={theme}>
			<Row label="Name">
				<input {...name} />
			</Row>
			<Row label="Surname">
				<input {...surname} />
			</Row>
			<Row label="Language">{locale}</Row>
			<Row label="Width">{width}</Row>
		</section>
	);
}

function useFormInput(initialValue) {
	const [value, setValue] = useState(initialValue);
	function handleChange(e) {
		setValue(e.target.value);
	}
	return { value, onChange: handleChange };
}

function useDocumentTitle(title) {
	useEffect(() => {
		document.title = title;
	});
}

function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
}
```

### 1. 코드의 간결화

위 예시 코드들을 보면 알 수 있듯이, 딱 봐도 코드가 간결해졌음을 볼 수 있다.

기존에 state를 사용하기 위해서는 `class` 문법을 사용해야 했지만 이제는 function에서 state를 다룰 수 있게 되었다.

뿐만 아니라, 여러 `lifecycle`에서 처리하던 로직을 이후에 다루게 될 `hooks api`를 사용함으로써 간결해졌음을 볼 수 있다. 따라서 hooks 하나만 수정하면 되기에 기존보다 수정이 간결해졌다.

### 2. Wrapper Hell 방지

위에서 Hooks를 이용한 코드를 보면 모두 function으로 되어 있는 것을 볼 수 있다. 이것은 즉, 공통적인 부분을 함수를 뽑아내서 재활용할 수 있다는 뜻으로 볼 수 있다.

기존에는 비슷한 기능을 하는 컴포넌트여도 결국은 새로운 컴포넌트를 만들고, Wrapper로 감싸주고.. 이런 작업들을 해야만 했다. 하지만, Custom Hooks를 이용하게 되면 이러한 Wrapper Hell을 방지할 수 있다고 한다.

## 그럼 왜 Hooks를 쓰려고 하는가?

일단 Hooks를 쓰려고 하는 것은 **개인의 선택**인 것 같다. React 팀에서도 기존에 Class 형태의 컴포넌트를 없애지 않고, Hooks로 모두 바꾸라고 강요하지도 않는다고 했다.

하지만 내가 Hooks를 쓰려고 하는 이유는 지금 내가 하고 있는 프로젝트에 **지도** 모듈이 적용되어 있는 부분이 있는데, 실제 이 곳에서 수많은 상태 변화가 생긴다. 점점 기능을 추가하다보니, 코드 양도 방대해지고, 위에서 언급한 lifecycle의 혼돈, 디버깅의 어려움 등에 직면하여 모든 class 문법을 Hooks로 바꿀 수는 없겠지만, 필요한 부분에 대해서는 좀 더 코드를 보기 쉽게 만들 필요가 있다고 판단하였다.
