import gql from "graphql-tag";
import { Todo } from "../types";

const GET_TODOS = gql`
  query {
    todos {
      id
      type
    }
  }
`;

const CREATE_TODO = (todo: string): any => {
  return gql`
    mutation Todo {
      addTodo(type: "${todo}") {
        id
        type
      }
    }
  `;
};

const UPDATE_TODO = (todo: Todo): any => {
  return gql`
    mutation Todo {
      updateTodo(id: "${todo.id}", type: "${todo.type}") {
        id
        type
      }
    }
  `;
};

export { GET_TODOS, CREATE_TODO, UPDATE_TODO };
