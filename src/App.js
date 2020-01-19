import "./App.css";

import React from "react";
// import { useSelector, useDispatch } from 'react-redux'

import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import Header from './components/Header'
import Home from './pages/Home';
import Profile from './pages/Profile';
import PostCreate from "./pages/PostCreate";
import PostView from "./pages/PostView";
import SignUp from './pages/SignUp';
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/post/create" component={PostCreate} />
        <Route path="/post/view" component={PostView} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={Search} />
        
        <div style = {{height:"20vh"}}> </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;