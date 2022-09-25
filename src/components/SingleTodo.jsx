import React from "react";

export default function SingleTodo({ todo }) {
  return (
    <div className="card">
      <div className="card-header">{todo._id}</div>
      <div className="card-body">
        {todo.title} || Date : {todo.data.toString()}
      </div>
      <div className="card-footer">{todo.description}</div>
    </div>
  );
}
