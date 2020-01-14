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
