import React, {useContext} from 'react';
import {Button, Container, Image, Navbar} from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";
import logo from '../assets/logo.png'
import {BUGTRACKER_ROUTE, FORUM_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SUPPORT_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {NavLink, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token',null)
        window.location.reload()
    }
    return (

        <Navbar bg="white" variant="light">
            <Container className="me-auto">
                <Navbar.Brand onClick={()=> history.push(MAIN_ROUTE)} className="ml-3"><Image src={logo} height={25} width={80}></Image></Navbar.Brand>
                <Nav.Link style={{color:"#B1C0C8"}} onClick={()=> history.push(FORUM_ROUTE)} >Форум</Nav.Link>
                <Nav.Link style={{color:"#B1C0C8"}} onClick={()=> history.push(SUPPORT_ROUTE)} >Поддержка</Nav.Link>
                <Nav.Link style={{color:"#B1C0C8"}} onClick={()=> history.push(BUGTRACKER_ROUTE)} >Баг-трекер</Nav.Link>

                {user.isAuth ?
                            <Button variant={"success"}  onClick={()=>logOut()} className="ml-4" style={{borderRadius: 20,backgroundColor:'#45C14E',border:"none"}}>Выйти</Button>
                        :
                            <Button variant={"success"}  onClick={()=>history.push(LOGIN_ROUTE)} className="ml-4" style={{borderRadius: 20,backgroundColor:'#45C14E',border:"none"}}>Авторизация</Button>
                    }

            </Container>
        </Navbar>
    );
});

export default Header;