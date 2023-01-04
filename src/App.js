import "./Styles/App.css"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from './component/Header'
import Home from './component/Home.jsx'
import React from 'react'
import ViewHistory from './component/ViewHistory'
import { ContextStoreProvider  } from "./Contexts"


const App = () => {
  return (
    
    <BrowserRouter>
      <ContextStoreProvider>      
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/viewHistory" element={ <ViewHistory/>}/>

        </Routes>
      </ContextStoreProvider>
    </BrowserRouter>
      
   
  )
}

export default App;

