import { useRoutes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";

function App() {
  const routes = [
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/reset-password", element: <Reset /> },
  ];

  const element = useRoutes(routes);
  return element;
}

export default App;
