import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Image, ListGroup, Modal, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {getOneFaq} from "../http/supportAPI";

const FAQpage = observer(() => {

    const [loading,setLoading] = useState(true)

    const {id} = useParams()

    const {support} = useContext(Context)

    useEffect(()=>{
        getOneFaq(id).then(data=>support.setFaq(data)).finally(()=>setLoading(false))
    },[])


    if(loading){
        return <Spinner animation="grow"/>
    }
    console.log(support.faq)

    return (
        <Container>
            <div className="mt-3"><h1>{support.faq.attributes.title}</h1>
            </div>
            <br/><div className="mt-3">{support.faq.attributes.text}</div>
        </Container>
    );
});

export default FAQpage;