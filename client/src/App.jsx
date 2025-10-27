import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { useRoutes } from "react-router";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <PlaceOrder />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/myorders",
    element: <MyOrders />,
  },
];

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  const routeElements = useRoutes(routes);

  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
      <div className="app">
        <NavBar setShowLogin={setShowLogin}/>
        {routeElements}
      </div>
      <Footer />
    </>
  );
}

export default App;
