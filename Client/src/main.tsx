import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon.tsx";
import Home from "./components/Home.tsx";
import MyTeam from "./components/MyTeam.tsx";
import "./main.css";
import Databasetest from "./components/Databasetest.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const queryClient = new QueryClient();
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "myteam",
          element: <MyTeam />,
        },
        {
          path: ":_id/*",
          element: <Pokemon />,
        },
        {
          path: "test",
          element: <Databasetest />,
        },
      ],
    },
  ],
  //   { basename: "/project1" }
);

const client = new ApolloClient({
  uri: "http://localhost:6969/graphql/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </ApolloProvider>,
);
