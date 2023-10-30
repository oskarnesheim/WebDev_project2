import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon.tsx";
import Home from "./components/Home.tsx";
import MyTeam from "./components/MyTeam.tsx";
import "./main.css";
import About from "./components/About.tsx";

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
          path: "about",
          element: <About />,
        },
        {
          path: ":id/*",
          element: <Pokemon />,
        },
      ],
    },
  ],
  //   { basename: "/project1" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </RecoilRoot>
  </QueryClientProvider>,
);
