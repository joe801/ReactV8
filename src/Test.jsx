import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

const Test = () => {
//   const name = useRef();
//   name.current.innerHTML = "Uwagbale Joseph";

  const [age, dispatch] = useReducer(reducer, 20);
  return (
    <div>
      <h1>Test</h1>
      {/* <p ref={name}></p> */}
      <p>
        i am {age} years old
      </p>
      <button onClick={() => dispatch({type: 'add'})}>add age</button>
      <button onClick={() => dispatch({type: 'minus'})}>minus age</button>
    </div>
  );
};

export default Test;
