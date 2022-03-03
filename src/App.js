import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";

function App() {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                user.setId(data.id)
            }).finally(() => setLoading(false))

    }, [])



    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
