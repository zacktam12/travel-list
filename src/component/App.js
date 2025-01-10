import { useReducer } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialState = [];

function itemsReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    case "TOGGLE_ITEM":
      return state.map((item) =>
        item.id === action.payload ? { ...item, packed: !item.packed } : item
      );
    case "CLEAR_LIST":
      return [];
    default:
      return state;
  }
}

export default function App() {
  const [items, dispatch] = useReducer(itemsReducer, initialState);

  function handleAddItems(item) {
    dispatch({ type: "ADD_ITEM", payload: item });
  }

  function handleDeleteItem(id) {
    dispatch({ type: "DELETE_ITEM", payload: id });
  }

  function handleToggleItems(id) {
    dispatch({ type: "TOGGLE_ITEM", payload: id });
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure to delete all items?");
    if (confirmed) dispatch({ type: "CLEAR_LIST" });
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
