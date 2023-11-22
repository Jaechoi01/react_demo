import React from 'react';
import { BrowserRouter, Routes, Route , Link} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import {useEffect, useState, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import Home from './home';
import CsList from './cs/CS_list';
import ProtectedRoute from './routes/ProtectedRoute'

import { RecoilRoot ,atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

function App() {
   const [hello, setHello] = useState('')

   const { persistAtom } = recoilPersist();



    return (
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
          <Routes >
            <Route element={<ProtectedRoute/>}  >
              <Route path={"/"} element={<Home />}></Route>
              <Route path={"/cs/list"} element={<CsList />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
       
      </Suspense>
      
    );
}


export default App;
