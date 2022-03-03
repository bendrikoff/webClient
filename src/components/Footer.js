import React from 'react';
import {Container, Image} from "react-bootstrap";
import {BUGTRACKER_ROUTE, FORUM_ROUTE, MAIN_ROUTE, NEWS_ROUTE, SUPPORT_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const Footer = () => {
    const history = useHistory()
    return (
        <footer style={{height:200,backgroundColor:'#00324B'}} className="mt-5 flex-row">
            <Container className="d-flex flex-row justify-content-between" style={{color:"white"}}>
                <div className="mt-5">
                    <div onClick={()=>history.push(MAIN_ROUTE)}>Главная</div>
                    <div onClick={()=>history.push(NEWS_ROUTE)}>Новости</div>
                    <div onClick={()=>history.push(FORUM_ROUTE)}>Форум</div>

                </div>
                <div className="mt-5">
                    <div onClick={()=>history.push(SUPPORT_ROUTE)}>Поддержка</div>
                    <div onClick={()=>history.push(BUGTRACKER_ROUTE)}>Баг-трекер</div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;