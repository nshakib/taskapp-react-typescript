import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Form from './Form';
import { TodoItem } from "./Model";
import { TodoList } from './TodoList';


export const Home: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<TodoItem>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    <div>
        <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h2 className="heading">Task App</h2>
        <Form todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
    </div>
  )
}
