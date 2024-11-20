import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./routes/Dashboard";
import Notes from "./routes/Notes";
import Receive from "./routes/Receive";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-5xl font-semibold">Welcome to Dashboard</h1>
            </div>
          ),
        },
        {
          path: "notes",
          element: <Notes />,
        },
        {
          path: "receive",
          element: <Receive />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="main-container w-full h-screen flex flex-col justify-center items-center">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
