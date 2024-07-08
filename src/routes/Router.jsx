import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import AddStudent from "../Pages/AddStudent";
import ManageStudent from "../Pages/ManageStudent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Login></Login>,
            },
            {
                path: '/addStudent',
                element: <AddStudent></AddStudent>,
            },
            {
                path: '/manageStudent',
                element: <ManageStudent></ManageStudent>,
                loader:()=>fetch('https://student-management-server-sigma.vercel.app/students')
            },

        ]
    },
  ]);
  export default router;