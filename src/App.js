import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddExpense = async () => {
    if (title && amount && category) {
      await addDoc(collection(db, "expenses"), {
        title,
        amount: parseFloat(amount),
        category,
      });
      setTitle("");
      setAmount("");
      setCategory("");
    }
  };

  const handleDeleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const totalExpense = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Category
          </option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div className="filter">
        <label>Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
      </div>

      <div className="expense-list">
        <h2>Expenses</h2>
        {filteredExpenses.length ? (
          <ul>
            {filteredExpenses.map((expense) => (
              <li key={expense.id}>
                <span>{expense.title}</span>
                <span>${expense.amount.toFixed(2)}</span>
                <span>{expense.category}</span>
                <button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses available.</p>
        )}
      </div>

      <h3>Total Expense: ${totalExpense.toFixed(2)}</h3>
    </div>
  );
}

export default App;

