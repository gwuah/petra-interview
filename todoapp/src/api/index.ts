import { client } from "../utilities";
import * as queries from "../queries";

type Todo = {
  id: string;
  type: string;
};

const getTodos = (): Promise<any> => {
  return new Promise((res, rej) => {
    client
      .query({
        query: queries.GET_TODOS
      })
      .then(response => res(response.data.todos));
  });
};

const createTodo = (type: string): Promise<any> => {
  return new Promise((res, rej) => {
    client
      .mutate({
        mutation: queries.CREATE_TODO(type)
      })
      .then(response => res(response.data.addTodo));
  });
};

const updateTodo = (todo: Todo): Promise<any> => {
  return new Promise((res, rej) => {
    client
      .mutate({
        mutation: queries.UPDATE_TODO(todo)
      })
      .then(response => res(response.data.updateTodo));
  });
};

export { getTodos, createTodo, updateTodo };
