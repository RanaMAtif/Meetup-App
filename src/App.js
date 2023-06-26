import React from "react";
import NewLayout from "./components/layout/NewLayout";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  console.log("Inside App component");

  return (
    <>
      <AuthProvider>
        <NewLayout />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
