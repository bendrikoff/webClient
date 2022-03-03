import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Image, ListGroup, Modal, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {createComment, getOneNew} from "../http/newsAPI";


const OneNewsPage = observer(() => {
    const [loading,setLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState('');
    const {user} = useContext(Context)
    const [oneNews,setNew] = useState()
    const {id} = useParams()
    const handleClose = () => setShow(false);
    const handleShow =()=>
    {
        if(user.isAuth) {
            setShow(true)
        }

    }

    useEffect(()=>{
        getOneNew(id).then(data=>setNew(data)).finally(()=>setLoading(false))
    },[])

    const validation=()=>{
        if(comment=='') {
            setValidated('Поле не может быть пустым')
            return false
        }
        return true
    }
    const onChangeComment=(text)=>{
        setComment(text)
        setValidated('')
    }

    if(loading){
        return <Spinner animation="grow"/>
    }

    const comments = oneNews.attributes.news_comments.data


    const sendComment = () =>{
            if (validation()&&user.isAuth) {
                console.log(user.user)
                createComment(comment, user.userReq, oneNews).catch(function (error) {
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
                handleClose();
                getOneNew(id).then(data => setNew(data));
            }


    }

    const coverUrl = process.env.REACT_APP_API_URL_FOR_FILES + oneNews.attributes.cover.data[0].attributes.url


    return (
        <Container>
            <div className="mt-3"><h1>{oneNews.attributes.title}</h1>
            <div style={{color:"gray"}}>{oneNews.attributes.createdAt.slice(0,10)}</div>
            </div>
            <Image src={coverUrl} height={400} className="m-3"></Image>
            <br/><div className="mt-3">{oneNews.attributes.text}</div>

            {user.isAuth?
                <Button className="mt-3" onClick={handleShow}>Оставить комментарий</Button>
                :<></>
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Оставить комментарий</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ваш комментарий</Form.Label>
                            <Form.Control onChange={e => onChangeComment(e.target.value)} as="textarea" rows={3} style={{maxHeight:100}}/>
                            {validated==''?
                                <></>
                                :
                                <div style={{visibility:"visible",color:"red"}}>{validated}</div>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={sendComment} >Оставить комментарий</Button>
                </Modal.Footer>
            </Modal>

            <ListGroup as="ol" className="pt-3">
            {comments.map(element=>
                <ListGroup.Item key={element.id}
                as="li"
                className="d-flex align-items-start"
                >
                <div className="ms-2 mx-5">
                <div className="fw-bold">{element.attributes.user.data.attributes.username}</div>
                <div>{element.attributes.publishedAt.slice(0,10)}</div>
                </div>
                <div className="ms-2 ">
            {element.attributes.comment}
                </div>
                </ListGroup.Item>
            )}
            </ListGroup>


        </Container>
    );
});

export default OneNewsPage;