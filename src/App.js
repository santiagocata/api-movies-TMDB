import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import React from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Detail from "./components/Detail";

import { UserContextProvider } from "./contexts/UserContext";
import { MoviesContextProvider } from "./contexts/MoviesContext";




/* 
Lista de funcionalidades/bugs por realizar:

**Alertar si un usuario no existe / datos incorrectos
**Alertar si se desea ingresar un correo que ya existe
**Redireccionar a not found si se ingresan rutas solo para users de manera manual en el navegador
**Ver otros usuarios y sus favoritos
**Trabajar en el diseño front end para indicarle al usuario en que sección de la página se encuentra. 

*/

const App = function () {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <MoviesContextProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/myfavorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<Detail />} />
          </Routes>
        </MoviesContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
};

export default App;
