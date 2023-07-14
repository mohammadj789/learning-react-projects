import React, { useState } from "react";
import "./ExpenseForm.css";
const ExpenseForm = (props) => {
  const [enteredTitle, setInteredTitle] = useState("");
  const [enteredAmount, setInteredAmount] = useState("");
  const [enteredDate, setInteredDate] = useState("");

  // const [userInput, setUserInput] = useState({
  //   enterdTitle: "",
  //   enterdAmount: "",
  //   enterdDate: "",
  // });

  const titleChangeHandler = (event) => {
    //best way for multiple state
    // setUserInput((prevState) => {
    //   return {
    //     ...prevState,
    //     enterdTitle: event.target.value,
    //   };
    // });
    //bad way of multiple state
    // setUserInput({
    //   ...userInput,
    //   enterdTitle: event.target.value,
    // });
    setInteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    // setUserInput({
    //   ...userInput,
    //   enterdAmount: event.target.value,
    // });
    setInteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    // setUserInput({
    //   ...userInput,
    //   enterdDate: event.target.value,
    // });
    setInteredDate(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const expenseDate = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseDate);
    setInteredTitle("");
    setInteredAmount("");
    setInteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            value={enteredAmount}
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            value={enteredDate}
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
