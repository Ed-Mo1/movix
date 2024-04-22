import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./pages/Details/Details";
import SearchResults from "./pages/SearchResults";
import Explore from "./pages/Explore";
import { useGetMoviesGenresQuery, useGetTvGenresQuery } from "./app/services/moviesApi";
const router = createBrowserRouter([
  {
    path: "/movix/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":mediaType/:id",
        element: <Details />,
      },
      {
        path: "search/:query",
        element: <SearchResults />,
      },
      {
        path: "explore/:mediaType",
        element: <Explore />,
      },
    ],
  },
]);
const App = () => {
  useGetMoviesGenresQuery();
  useGetTvGenresQuery();
  return <RouterProvider router={router} />;
};

export default App;
