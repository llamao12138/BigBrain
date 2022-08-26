import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './style.module.css';
import logo from './logo.png';
import Register from './pages/Register';
import Login from './pages/Login';
import QuizNew from './pages/QuizNew';
import Dashboard from './pages/Dashboard';
import EditGame from './pages/EditGame';
import EditQuestion from './pages/EditQuestion';
import PlayerJoin from './pages/PlayerJoin';
import GameResults from './pages/GameResults';
import GameResult from './pages/GameResult';
import PlayGame from './pages/PlayGame';
import PlayerResult from './pages/PlayerResult';

import {
  BrowserRouter,
  Routes,
  Route,
  // useNavigate,
  Navigate,
  // Link,
} from 'react-router-dom';

function App () {
  return (
    <>
      <BrowserRouter>
        <div className={styles.outside}>
          <div className={styles.card}>
            <img src={logo} className={styles.logo} />
            {/*
          <nav>
            <Link to='/register'>Register</Link> |
            <Link to='/login'>Login</Link>
          </nav>
          */}
            <Routes>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/quiz/new' element={<QuizNew />}></Route>
              <Route path='/admin/quiz' element={<Dashboard />}></Route>
              <Route path='/editGame/:gameID' element={<EditGame />}></Route>
              <Route
                path='/editGame/:gameID/:questionID'
                element={<EditQuestion />}
              ></Route>
              <Route
                path='/play/join/:sessionID'
                element={<PlayerJoin />}
              ></Route>
              <Route path='/play/:playerID' element={<PlayGame />}></Route>
              <Route
                path='/admin/quiz/:sessionID'
                element={<GameResult />}
              ></Route>
              <Route
                path='/admin/quiz/:id/results'
                element={<GameResults />}
              ></Route>
              <Route
                path='/play/:playerID/results'
                element={<PlayerResult />}
              ></Route>
              <Route path='/' element={<Navigate replace to='/login' />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
