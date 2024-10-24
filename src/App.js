import { useState } from "react";

const initialItems = [
  { id: 1, description: " Passports", quantity: 2, packed: false },
  { id: 2, description: " Socks", quantity: 12, packed: false },
  { id: 2, description: " Charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>✨Far Away</h1>;
}
const Form = () => {
  const [description, setDescription] = useState("");
  const [select, setSelect] = useState();
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </div>
  );
};
function PackingList() {
  return (
    <div className="list" key="item.id">
      <li>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </li>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantity}
        {item.description}
      </span>
      <button>❌&times</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼You have X items on your list,and you already packed X(%X)</em>
    </footer>
  );
}
