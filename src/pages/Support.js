import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, FloatingLabel, Form, Modal, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {createSupport, getFaqList} from "../http/supportAPI";
import {LOGIN_ROUTE} from "../utils/consts";


const Support = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('')
    const handleClose = () => setShow(false);

    const [textValidation, setTextValidation] = useState('')


    const handleShow =()=>
    {
        if(user.isAuth) {
            setShow(true)
        }

    }


    const [loading,setLoading] = useState(true)

    const {id} = useParams()

    const {support} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(()=>{
        getFaqList().then(data=>support.setFaq(data)).finally(()=>setLoading(false))
    },[])


    const validation=()=>{
        if(text=='') {
            setTextValidation('Поле не может быть пустым')
            return false
        }
        return true
    }
    const onChangeText=(text)=>{
        setText(text)
        setTextValidation('')
    }

    if(loading){
        return <Spinner animation="grow"/>
    }


    const sendSupport = () =>{
        if (validation()&&user.isAuth) {
            console.log(user.user)
            createSupport(text,user.userReq).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            handleShow();
            setText('');
        }
    }

    return (
        <Container>
            <div className="d-flex flex-column align-items-center mt-5">
                <h1>База знаний</h1>
            </div>

            <div className="d-flex flex-column align-items-start mt-5 pb-5">
                {support.faq.map(oneFaq=>
                    <h2 key={oneFaq.id} className="mt-2"><a href={'/support/'+oneFaq.id}>{oneFaq.attributes.title}</a></h2>
                )}
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить ответ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Сообщение отправлено, ответ придет вам на email</Form.Label>
                        </Form.Group>
                        <Button variant="primary" onClick={handleClose}>Ок</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className="d-flex flex-column align-items-center mt-5">
                <h1>Обратная связь</h1>
            </div>

            <div className="d-flex flex-column align-items-start mt-3 pb-5">
                    Если у вас возникли какие-то вопросы или предложения, напишите нам, и мы постараемся решить вашу проблему.

                {user.isAuth?
                    <Form className="d-flex flex-column align-items-start mt-3">

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Сообщение</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2" label="Сообщение">
                                <Form.Control
                                    onChange={e => onChangeText(e.target.value)}
                                    as="textarea"
                                    style={{ maxHeight: '150px',height:'150px' }}
                                />
                                {textValidation==''?
                                    <></>
                                    :
                                    <div style={{visibility:"visible",color:"red"}}>{textValidation}</div>
                                }
                            </FloatingLabel>
                        </Form.Group>
                        <Button onClick={sendSupport} variant="primary">
                            Отправить
                        </Button>
                    </Form>
                    :
                    <div>Чтобы отправить нам сообщение, <a href={LOGIN_ROUTE}>зарегистрируйтесь или авторизуйтесь на сайте.</a></div>
                }
            </div>

        </Container>
    );
};

export default Support;