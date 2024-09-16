import logo from "./logo.svg";
import "./App.css";
import {CartProvider} from "./components/context/CartContext";
import Header from "./components/layout/Header";
import Section from "./components/layout/Section";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>

        <Header />
        <Section />
        <Footer />
    </>
  );
}

export default App;
