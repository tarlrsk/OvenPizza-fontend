import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Stack,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import logo from './images/ovenPizzaIcon.png';
import './App.css';
import PizzaMenu from './components/PizzaMenu'
import Track from './components/Track'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


import React from "react";

function App() {

  return (
    <Router>
      <div className="nvbar color topBotomBordersOut">
        <div className="">
          <div className='logo'>
            <img src={logo} alt="Logo" style={{ float: "left", width: "35px", height: "auto", marginLeft:"15px"}} />
            <header className='headName' >OVEN PIZZA</header>
          </div>
          
          <a href="/">Home</a>
          <a href="/oven-pizza/pizza-menu">Pizza</a>
          <a href="/oven-pizza/track-order">Track Order</a>
        </div>
      </div>
      <Routes>
        <Route path="/oven-pizza/pizza-menu" element={<PizzaMenu />} />

        <Route path="/oven-pizza/track-order" element={<Track />} />
        <Route
          path="/"
          element={
            <Container >
              <div class= "hero-image">
                <div style={{padding: "40px"}}></div>
                <div class="hero-text">
                <h2 style={{color: "white"}}>Full stack blog web-application</h2>
                <h3 class = "text">OVEN PIZZA</h3>
                <h8 style={{color: "#646d84"}}>Our project called OvenPizza Application or Online Pizza ordering system is a web-based application that enables customers to order their pizzas online for home delivery.</h8>
                <div style={{padding: "10px"}}>  </div>
                  <a href="/oven-pizza/pizza-menu"  class="btn btn-primary btn-grad" role="button" aria-pressed="true">
                    Ordering me HERE 
                  </a>
                </div>
                </div>
            </Container>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;