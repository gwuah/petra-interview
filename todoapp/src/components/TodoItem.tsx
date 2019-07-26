import * as React from "react";
import NormalTodoView from "./NormalTodoView";
import EditingTodoView from "./EditingTodoView";
import { Todo } from "../types";

type TodoItemState = {
  editing: boolean;
  checked: boolean;
  value: {
    id: string;
    type: string | "";
  };
};

type TodoItemProps = {
  handleUpdate: (payload: Todo) => Promise<any>;
  isUpdatingTodo: boolean;
  value: {
    id: string;
    type: string | "";
  };
};

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editing: false,
      value: { id: "", type: "" },
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleEditView = this.toggleEditView.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = this.state;
    this.setState({
      value: {
        id: value.id,
        type: e.target.value
      }
    });
  }

  updateTodoItem(e: React.MouseEvent<HTMLElement>) {
    const { value } = this.state;
    this.props.handleUpdate(value).then(updatedValue => {
      this.setState({ value: updatedValue, editing: false });
    });
  }

  toggleEditView(e: React.MouseEvent<HTMLElement>) {
    const newStatus = !this.state.editing;
    this.setState({ editing: newStatus });
  }

  toggleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ checked: e.target.checked });
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  render() {
    const { editing, value, checked } = this.state;
    const { isUpdatingTodo } = this.props;

    if (editing) {
      return (
        <EditingTodoView
          handleChange={this.handleChange}
          handleUpdate={this.updateTodoItem}
          isUpdatingTodo={isUpdatingTodo}
          value={value}
        />
      );
    } else {
      return (
        <NormalTodoView
          handleClick={this.toggleEditView}
          toggleCheck={this.toggleChecked}
          checked={checked}
          value={value}
        />
      );
    }
  }
}

export default TodoItem;
