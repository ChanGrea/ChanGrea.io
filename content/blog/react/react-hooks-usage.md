---
title: React Hooks 간단한(?) 사용법
date: 2020-01-02 08:01:52
category: react
---

## 들어가며

[이전 포스팅](https://changrea.io/react/react-hooks-overview/)에서 <i>**React Hooks의 개요**</i>정도 정리했었다. 계획대로 이번 포스팅에서는 **Hooks의 종류**와 **Hooks의 간단할 수도 있는(?) 사용법**에 대해서 정리하고자 한다.

## Hooks의 종류와 사용법

우선, 대표적으로 사용하는 Hooks부터 나열해보자.

- 기본 Hook
  - [useState](./#usestate)
  - [useEffect](./#useeffect)
  - useContext
- 추가 Hooks
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImparativeHandle
  - useLayoutEffect
  - useDebugValue

이 중에서 기본 Hook의 `useState`, `useEffect`에 대해서 정리하고 나머지에 대해서는 나중에 정리하고자 한다.

### useState

#### :banana: 기존 Class형 컴포넌트에서의 state 관리

```javascript
class A extends pureComponent {
    state {
        ...
    }
    ...
}
```

기존에는 Class형 컴포넌트에서 `state` block 안에 상태 값을 넣어놓고 `setState`나 `state.~`같은 것으로 state를 관리했었다.

#### :banana: Function형 컴포넌트에서도 state 관리가 가능

```javascript
const [state, setState] = useState(initialState);
```

위와 같이 `useState`를 이용하면 함수형 컴포넌트에서도 state를 관리할 수 있다.

위의 **state**는 state 이름이다. 그 앞에 `set`이 붙은 **setState**는 접근자이다. 그리고 **initialState**는 초기값이다.(state의 type에 따라서 지정해주면 된다.)

#### :banana: Example

아래는 React 공식 문서에 나와있는 예제이다.

```javascript
function Counter({ initialCount }) {
	const [count, setCount] = useState(initialCount);
	return (
		<>
			Count: {count}
			<button onClick={() => setCount(initialCount)}>Reset</button>
			<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
			<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
		</>
	);
}
```

**state를 가져오고 셋팅하는 등**의 기본적인 사용법은 javascript와 React 개발을 했었다면 금방 익힐 수 있었을 것이다.

> :raised_hand: <i>그럼 이전의 상태값은 어떻게 알지??</i>

라고 궁금했던 부분이 위 코드에 나와있다.

`prev`라는 prefix가 붙은 state(위에서는 **prevCount**)로 이전 상태값을 가져온다.

#### :banana: 주의할 점

한 가지 주의할 점은 State를 업데이트 한다고 해서 **기존 State에 새로 추가된 State가 합쳐지지는 않는다**는 것이다.

따라서 아래처럼 **전개 연산자**를 통해 합쳐줘야 한다.

```javascript
setState(prevState => {
	// Object.assign would also work
	return { ...prevState, ...updatedValues };
});
```

### useEffect

기존에 Class형 컴포넌트에서 쓰던 라이프사이클 `ComponentDidMount`, `ComponentDidUpdate`, `ComponentWillUnMount`를 대체할 수 있는 것이 여기서 다룰 **useEffect**이다.

즉 state가 바뀌거나 DOM이 업데이트 될 때 등 수행할 로직을 정의할 필요가 있고 그것을 수행하는 함수가 **useEffect**이다.

Rendering이 일어날 때마다 Effect가 실행되고(`ComponentDidMount`, `ComponentDidUpdate`), 두 번째 파라미터인 Array 안에 특정 state를 셋팅함으로써, 해당 state의 변화가 있을 때만 실행하게 할 수 있다.

```javascript
import { useState, useEffect } from 'react';

export function Data() {
	const [data, setData] = useState(null);

	useEffect(() => {
		API.getData().then(response => {
			setData(response);
		});
	}, []); // '[]'로 셋팅 시, 초기 렌더링 시만 수행

	const isLoading = data == null;
	if (isLoading) {
		return 'Loading..';
	}
	return data;
}
```

그리고 **return 값을 지정**해줌으로써 다음 Effect를 실행하기 전에 수행하는 **cleanUp 함수**로 인식하고 `ComponentWillUnMount` 역할을 수행한다.

```javascript
useEffect(() => {
	const subscription = props.source.subscribe();
	return () => {
		// Clean up the subscription
		subscription.unsubscribe();
	};
});
```

## 정리 그리고 향후 계획

간단하게 **State Hook**과 **Effect Hook**에 대해서만 정리했다. 왜 **useContext**는 정리 안했냐면 기존에 React Context를 사용하지 않고, Container로 한 번 감싸서 Redux를 이용하는 방식으로 props를 전달하였다. (사실 이것도 좀 비효율적인 것 같긴 하다.)

아무래도 이렇게 글로 정리를 하는 것보다는 직접 사용하고 부딪혀 보면서 느끼는 것이 좋을 것 같다는 생각을 했다.

**일단은 프로젝트에 적용을 해보고 Hook에 대해서는 다시 수준 높은 글로 정리할 예정이다.**
