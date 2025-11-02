import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./home/Home";
import { GirviList } from "./girvi/GirviList";
import Inventory from "./inventory/Inventory";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/girvi",
    element: <GirviList />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  // {
  //   path: "/upload",
  //   element: <FileUpload />,
  // },
]);

export default router;
