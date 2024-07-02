// import { useReducer } from "react";

import { useReducer } from "react";

// function reducer(state: { age: number }, action: { type: string }) {
//   if (action.type === "increment") {
//     return {
//       age: state.age + 1,
//     };
//   }
//   throw Error("Unknown action.");
// }

// export const UseReducerSample = () => {
//   const [state, dispatch] = useReducer(reducer, { age: 1 });
//   return (
//     <>
//       <button
//         onClick={() => {
//           dispatch({ type: "increment" });
//         }}
//       >
//         Click here
//       </button>
//       <span>Your age {state.age}</span>
//     </>
//   );
// };

function reducer(state: any, action: any) {
  switch (action.type) {
    case "increment": {
      return {
        ...state,
        age: state.age + 1,
      };
    }
    case "change_name": {
      return {
        ...state,
        name: state.nextName,
      };
    }
  }
  throw Error("Unknown action.");
}
const initialState = { name: "Taylor", age: 42 };
export const UseReducerSample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleButtonClick = () => {
    dispatch({ type: "increment" });
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    dispatch({ type: "change_name", nextName: e.target.value });
  };

  return (
    <>
      <input value={state.name} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Increment age</button>
      <p>
        Hello, {state.name}. You are {state.age}.
      </p>
    </>
  );
};
