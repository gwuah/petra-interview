import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

type Todo = {
  id: string;
  type: string;
};

const httpLink = createHttpLink({
  uri: "https://plp0mopxq.sse.codesandbox.io"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function findByIdAndReplace(oldArray: Todo[]) {
  return (newPayload: Todo) => {
    const { id } = newPayload;
    const newArray: Todo[] = oldArray.map(
      (todoItem: Todo): Todo => {
        if (todoItem.id === id) {
          return newPayload;
        }
        return todoItem;
      }
    );
    return newArray;
  };
}

export { client, httpLink, findByIdAndReplace };
