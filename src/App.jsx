import { useEffect, useState } from "react";
import Form from "./components/Form";
import Todos from "./components/Todos";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const App = () => {
  const [todos, setTodos] = useState(initialStateTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  const updateTodo = (id) => {
    const newArray = todos.map((todo) => {
      if (todo.id === id) {
        todo.state = !todo.state;
      }
      return todo;
    });
    setTodos(newArray);
  };

  const sortTodos = (arrayTodos) => {
    return arrayTodos.sort((a, b) => {
      return a.priority === b.priority ? 0 : a.priority ? -1 : 1;
    });
  };

  return (
    <div className="container m-4">
      <h1 className="mb-3">Tarea</h1>
      <Form addTodo={addTodo} />
      <Todos
        todos={sortTodos(todos)}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default App;
