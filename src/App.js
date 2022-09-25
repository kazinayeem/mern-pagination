import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <AddTodo />
      <Todo />
    </>
  );
} 

export default App;
