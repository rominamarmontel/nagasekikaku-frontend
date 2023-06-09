import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy } from 'react'
import Layout from "./pages/Layout/Layout";
// import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import Topic from "./pages/Topic/Topic";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import IsLoggedOut from "./pages/Navigation/IsLoggedOut";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import ProtectedRoute from "./pages/Navigation/ProtectedRoute";

import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FormEditProfile from "./pages/ProfilePage/Forms/FormEditProfile";
import FormEditAddress from "./pages/ProfilePage/Forms/FormEditAddress";
import FormAddAddress from "./pages/ProfilePage/Forms/FormAddAddress";

import ProductCreate from './pages/ProductCreate/ProductCreate'
import TopicCreate from './pages/TopicCreate/TopicCreate'
import TopicDetails from "./pages/TopicDetails/TopicDetails";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import Cart from "./pages/Cart/Cart";
import CheckOut from './pages/CheckOut/CheckOut'
import Orders from "./pages/Orders/Orders";
import AdminTop from "./pages/AdminTop/AdminTop";
import Error from "./pages/Error/Error";

const Home = lazy(() => import('./pages/Home/Home'))
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/topics/:id" element={<TopicDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<IsLoggedOut />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit-informations" element={<FormEditProfile />} />
            <Route path="/profile/edit-address" element={<FormEditAddress />} />
            <Route path="/profile/add-address" element={<FormAddAddress />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin/top" element={<AdminTop />} />
            <Route path="/admin/products/create" element={<ProductCreate />} />
            <Route path="/admin/topics/create" element={<TopicCreate />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
