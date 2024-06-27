import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Userpage from "../Components/Userpage";
import NotFound from "../Components/NotFound";
import Profile from "../Components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "userpage",
        element: <Userpage></Userpage>,
        children: [],
      },
      {
        path: "userpage/profile",
        element: <Profile />,
      },
    ],
    errorElement: <NotFound></NotFound>,
  },
]);
export default router;
