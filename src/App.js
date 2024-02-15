
import './App.css';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Header from './components/Navbar/Navbar';
import Home from './components/home/Home';
import { Toaster } from 'react-hot-toast';
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {/* <Home /> */}
      <Toaster />
    </div>
    </BrowserRouter>
  );
}

export default App;
