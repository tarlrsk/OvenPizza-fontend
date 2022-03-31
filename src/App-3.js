import logo from './images/ovenPizzaIcon.png';
import './App.css';
import PizzaMenu from './components/PizzaMenu'
import Track from './components/Track'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function App() {

  return (
    <Router>
      <div className="nvbar color topBotomBordersOut">
        <div className="">
          <div className='logo'>
            <img src={logo} alt="Logo" style={{ float: "left", width: "35px", height: "auto", marginLeft:"15px"}} />
            <header className='headName'>OVEN PIZZA</header>
          </div>
          
          <a href="/pizza-menu">Pizza</a>
          <a href="/track-order">Track Order</a>
        </div>
      </div>
      <Routes>
        <Route path="/pizza-menu" element={<PizzaMenu />} />

        <Route path="/track-order" element={<Track />} />
      </Routes>
    </Router>

  );
}

export default App;
