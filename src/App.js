import "./style.css";
import { createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// reducer 는 store 안에 있는 state 를 어떻게 바꿀 것인가를 정의
// currentState = 현재의 스테이트, action = 어떻게 바꿀 것인가 요청을 받음
function reducer(currentState, action) {
  // currentState 스테이트가 정의되지 않았으면 number 를 1로 함
  if (currentState === undefined) {
    // number 기본값 1
    return {
      number: 1
    };
  }

  // 새로운 스테이트는 과거의 스테이트를 복제
  // 이 복제본을 수정하면 불변성을 유지할 수 있음
  const newState = { ...currentState };
  if(action.type === 'PLUS') {
    newState.number++;
  }
  // 그렇게 변화시킨 스테이트를 리턴함.
  return newState;
}

// store 은 변경되면 안 되기 때문에 상수로 선언
// createStore 으로 store 를 생성
// createStore 를 생성할 때 반드시 reducer 를 인자로 받아야 함
const store = createStore(reducer);

export default function App() {
  return (
    <div className='container'>
      <h1>Root</h1>
      <div className='grid'>
        {/* 
        변경할 컨포넌트를 Provider 의 자식으로 둠 
        Provider 은 반드시 store 를 인자를 받아야 함.
        */}
        <Provider store={store}>
          <Left1 />
          <Right1 />
        </Provider>
      </div>
    </div>
  )
}

function Left1() {
  return (
    <div>
      <h1>Left1 : </h1>
      <Left2 />
    </div>
  )
}

function Left2() {
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3 />
    </div>
  )
}

function Left3() {
  const number = useSelector(state => state.number);
  // useSelector 는 함수를 인자로 받음
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  )
}

function Right1() {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 />
    </div>
  );
}

function Right2() {
  return (
    <div>
      <h1>Right2</h1>
      <Right3 />
    </div>
  );
}

function Right3() {
  // 스테이트 값을 변경할 때 사용 
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <button onClick={() => {
        dispatch({ type: 'PLUS' })
      }}>+</button>
    </div>
  );
}