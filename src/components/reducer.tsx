// import { useReducer } from "react";

import { useReducer, useRef } from "react";

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

// function reducer(state: any, action: any) {
//   switch (action.type) {
//     case "increment": {
//       return {
//         ...state,
//         age: state.age + 1,
//       };
//     }
//     case "change_name": {
//       return {
//         ...state,
//         name: state.nextName,
//       };
//     }
//   }
//   throw Error("Unknown action.");
// }
// const initialState = { name: "Taylor", age: 42 };
// export const UseReducerSample = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleButtonClick = () => {
//     dispatch({ type: "increment" });
//   };

//   const handleInputChange = (e: { target: { value: any } }) => {
//     dispatch({ type: "change_name", nextName: e.target.value });
//   };

//   return (
//     <>
//       <input value={state.name} onChange={handleInputChange} />
//       <button onClick={handleButtonClick}>Increment age</button>
//       <p>
//         Hello, {state.name}. You are {state.age}.
//       </p>
//     </>
//   );
// };

const initialCartState = {
  items: [],
  total: 0,
};

function cartReducer(
  state: { items: any[]; total: number },
  action: { type: any; item: { price: any }; id: any }
) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.item],
        total: state.total + action.item.price,
      };

    case "REMOVE_ITEM":
      const updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log("updatedItems", updatedItems);
      const removedItem = state.items.find((item) => item.id === action.id);
      console.log("removedItem", removedItem);
      return {
        ...state,
        items: updatedItems,
        total: state.total - (removedItem ? removedItem.price : 0),
      };
    default:
      return state;
  }
}

export default function UseReducerSample() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  function addItem(item: { id: number; name: string; price: number }) {
    dispatch({
      type: "ADD_ITEM",
      item,
      id: undefined,
    });
  }
  function removeItem(id: any) {
    dispatch({
      type: "REMOVE_ITEM",
      id,
      item: {
        price: undefined,
      },
    });
  }
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${state.total}</p>
      <button
        onClick={() =>
          addItem({ id: new Date().getTime(), name: "Product 1", price: 10 })
        }
      >
        Add Item 1
      </button>
      <button
        onClick={() =>
          addItem({ id: new Date().getTime(), name: "Product 2", price: 15 })
        }
      >
        Add Item 2
      </button>
      <button
        onClick={() =>
          addItem({ id: new Date().getTime(), name: "Product 3", price: 25 })
        }
      >
        Add Item 3
      </button>
    </div>
  );
}
