import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import {useState} from 'react';

import Landing from './components/Landing';
import Header from './components/Header';
import Overview from './components/Search';
import ShowLogin from './components/ShowLogin';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Squads from './components/Squads';
import UserProfile from './components/UserProfile';


import AuthContext from './contexts/authContext';

import useAuth from './hooks/useAuth';

import './components/Background.scss';


const App = () => {
  const auth = useAuth();

  console.log(auth)


  return (
    <div className="ui container">
      <BrowserRouter >
        <AuthContext.Provider value={auth}>
          <Header />
          <Route exact path="/" component={Landing} auth={auth} />
          <Route exact path="/squads" component={Squads} auth={auth} />
          {/* <Route path="/search" component={Overview} auth={auth} /> */}
          <Route path="/login" component={ShowLogin} auth={auth} />
          {/* <Route path="/create_event" component={ShowEventCreate} auth={auth} /> */}
          <Route path="/profile/:id" component={Profile} auth={auth} />
          <Route path="/profile" component={UserProfile} auth={auth} />
          <Footer />
        </AuthContext.Provider >
      </BrowserRouter>
    </div>
  );
}

export default App;
