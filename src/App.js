import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="App">
      <Logo />
      <Form setItems={setItems} />
      <PackingList items={items} setItems={setItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>✨Far Away</h1>;
}

const Form = ({ setItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setItems((prevItems) => [...prevItems, newItem]);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

function PackingList({ items, setItems }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <Item key={item.id} item={item} setItems={setItems} />
      ))}
    </ul>
  );
}

function Item({ item, setItems }) {
  function togglePacked() {
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === item.id ? { ...i, packed: !i.packed } : i))
    );
  }

  function removeItem() {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  }

  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={togglePacked}>
        {item.packed ? "📦 Unpack" : "✅ Pack"}
      </button>
      <button onClick={removeItem}>❌&times;</button>
    </li>
  );
}

function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const totalItems = items.length;
  const packedPercentage =
    totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        💼 You have {totalItems} items on your list, and you already packed{" "}
        {packedItems} ({packedPercentage}%)
      </em>
    </footer>
  );
}
