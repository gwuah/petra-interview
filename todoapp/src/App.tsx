import * as React from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import * as api from "./api";
import * as utilities from "./utilities";
import { Todo } from "./types";
import Spinner from "./components/Spinner";
import "./App.css";

type ApplicationState = {
  todoValue: string;
  isLoadingTodos: boolean;
  isAddingTodo: boolean;
  isUpdatingTodo: boolean;
  todos: Todo[];
};

type ViewHandlerProps = {
  isLoadingTodos: boolean;
  todos: Todo[];
};

// const ViewHandler = ({ isLoadingTodos, todos }: ViewHandlerProps) => {
//   if (isLoadingTodos) {
//     return <h1>Loading Todos</h1>;
//   } else {
//     return todos.map((item, index) => {
//       return <TodoItem value={item} key={index} />;
//     });
//   }
// };

class App extends React.Component<{}, ApplicationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoValue: "",
      todos: [],
      isUpdatingTodo: false,
      isLoadingTodos: false,
      isAddingTodo: false
    };
    this.handleTodoInputChange = this.handleTodoInputChange.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  handleTodoInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ todoValue: e.target.value });
  }

  async addNewTodo(e: React.MouseEvent<HTMLElement>): Promise<any> {
    const { todoValue: todo, todos } = this.state;
    if (todo.length == 0) return;
    await this.setState({ isAddingTodo: true });
    try {
      const data: Todo = await api.createTodo(todo);
      await this.setState({
        isAddingTodo: false,
        todos: [...todos, data],
        todoValue: ""
      });
    } catch (error) {
      // ideally, call a notification library from here to alert user
      console.log("Failed to add todo because", error);
    }
  }

  async updateTodo(payload: Todo): Promise<any> {
    await this.setState({ isUpdatingTodo: true });
    try {
      const data = await api.updateTodo(payload);
      const { todos: oldTodos } = this.state;
      const updatedTodos = utilities.findByIdAndReplace(oldTodos)(data);
      await this.setState({
        isUpdatingTodo: false,
        todos: updatedTodos
      });
      return data;
    } catch (error) {
      // ideally, call a notification library from here to alert user

      console.log("Failed to update todo because", error);
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ isLoadingTodos: true });
      const todos: Todo[] = await api.getTodos();
      this.setState({ todos, isLoadingTodos: false });
    } catch (error) {
      // ideally, call a notification library from here to alert user

      console.log("Failed to fetch todos because", error);
    }
  }

  render() {
    const { todoValue, todos, isLoadingTodos, isUpdatingTodo } = this.state;

    return (
      <div id="Application-container">
        <TodoInput
          todoValue={todoValue}
          handleChange={this.handleTodoInputChange}
          handleClick={this.addNewTodo}
        />
        <div id="Todos-container">
          {isLoadingTodos ? (
            <Spinner />
          ) : (
            todos.map((item, index) => {
              return (
                <TodoItem
                  isUpdatingTodo={isUpdatingTodo}
                  handleUpdate={this.updateTodo}
                  value={item}
                  key={index}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default App;
