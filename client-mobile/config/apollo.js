import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://1559-110-138-83-43.ap.ngrok.io/",
  cache: new InMemoryCache(),
});

export default client;
