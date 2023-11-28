import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Pokemon from "./components/pokemon/Pokemon.tsx";
import Home from "./components/home/Home.tsx";
import MyTeam from "./components/team/MyTeam.tsx";
import About from "./components/about/About.tsx";
import "./main.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ErrorElement from "./components/ErrorElement.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorElement />,
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
          path: "about",
          element: <About />,
        },
        {
          path: ":_id",
          element: <Pokemon />,
        },
      ],
    },
  ],
  { basename: "/project2" },
);

const client = new ApolloClient({
  uri: "http://it2810-08.idi.ntnu.no:6969/graphql/",
  // uri: "http://localhost:6969/graphql/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <RecoilRoot>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <RouterProvider router={router} />
    </RecoilRoot>
  </ApolloProvider>,
);
