import React, { useState } from "react";
import ReactDOM from "react-dom";

const ToDoList = ({ items, onAdd, onDelete }) => {
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("all");

  const styles = {
    backgroundColor: "#3f1a54",
    padding: "20px",
    borderRadius: "8px", 
    maxWidth: "400px",
    margin: "auto",
  };

  const headerStyles = {
    textAlign: "center",
    color: "#ff9a23",
    marginBottom: "15px",
    fontSize: "1.6em",
  };

  const buttonStyles = {
    margin: "5px",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ff9a23",
    color: "#fff",
    border: "none",
  };

  const inputStyles = {
    padding: "8px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const todoItemStyles = {
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    fontSize: "1.1em",
  };

  const todoTextStyles = {
    flex: 1,
    textDecoration: "none",
    color: "#ff9a23",
  };

  const handleAdd = () => {
    if (newItem.trim() === "") {
      return;
    }

    const item = {
      text: newItem,
      completed: false,
    };
    onAdd([...items, item]);
    setNewItem("");
  };

  const handleToggle = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    onAdd(updatedItems);
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    onAdd(updatedItems);
  };

  const handleFilter = (filter) => {
    setFilterCompleted(filter);
  };

  const filteredItems = items.filter((item) => {
    const textMatch = item.text.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterCompleted === "all") {
      return textMatch;
    } else if (filterCompleted === "completed") {
      return textMatch && item.completed;
    } else {
      return textMatch && !item.completed;
    }
  });

  return (
    <div style={styles}>
      <h1 style={headerStyles}>TODO LIST</h1>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyles}
      />
      <button onClick={() => handleFilter("all")} style={buttonStyles}>
        Tất cả
      </button>
      <button onClick={() => handleFilter("completed")} style={buttonStyles}>
        Đã làm
      </button>
      <button onClick={() => handleFilter("notCompleted")} style={buttonStyles}>
        Chưa làm
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredItems.map((item, index) => (
          <li key={index} style={todoItemStyles}>
            <span style={{ ...todoTextStyles, textDecoration: item.completed ? "line-through" : "none" }}>
              {item.text}
            </span>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(index)}
              style={{ margin: "0 5px" }}
            />
            <button onClick={() => handleDelete(index)} style={buttonStyles}>
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Thêm mục mới"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        style={inputStyles}
      />
      <button onClick={handleAdd} style={buttonStyles}>
        Thêm
      </button>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([
    {
      text: "Quét nhà",
      completed: true,
    },
    {
      text: "Nấu ăn",
      completed: false,
    },
    {
      text: "Làm bài tập",
      completed: false,
    },
  ]);

  const onAdd = (updatedItems) => {
    setItems(updatedItems);
  };

  return <ToDoList items={items} onAdd={onAdd} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
