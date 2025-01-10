import { useReducer } from "react";

const initialState = {
  description: "",
  quantity: 1,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload, error: "" };
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Form({ onAddItems }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    if (!state.description) {
      dispatch({ type: "SET_ERROR", payload: "Description is required" });
      return;
    }

    const newItem = {
      description: state.description,
      quantity: state.quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);
    onAddItems(newItem);
    dispatch({ type: "RESET" });
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      <select
        value={state.quantity}
        onChange={(e) =>
          dispatch({ type: "SET_QUANTITY", payload: Number(e.target.value) })
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={state.description}
        onChange={(e) =>
          dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
        }
      />
      <button>Add</button>
    </form>
  );
}
