import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import ScriptState from './context/script/ScriptState';
import SceneState from './context/scenes/SceneState';
import ItemState from './context/item/ItemState';
import AdminState from './context/admin/AdminState';
import CategoryState from './context/category/CategoryState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Scene from './components/Scene/Scene'
import Item from './components/Item/Item';
import Category from './components/Category/Category';
import Login from './components/Login';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <>
      <AdminState>
      <ScriptState>
        <SceneState>
          <CategoryState>
            <ItemState>
              <BrowserRouter>
                <Navbar />
                <div className="container">
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/Login" element={<Login />} />
                    <Route exact path="/Admin" element={<Admin />} />
                    <Route   path="/:Script/Scene/:id" element={<Scene />} />
                    <Route exact path="/Category/:id" element={<Category />} />
                    <Route exact path="/Item/:id/:group" element={<Item />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </ItemState>
          </CategoryState>
        </SceneState>
      </ScriptState>
      </AdminState>
    </>


  );
}

export default App