import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, ListGroup, Modal, Spinner, Table} from "react-bootstrap";
import {Context} from "../index";
import {createComment, createTopic, getComments, getTopics} from "../http/forumAPI";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

const ForumTopic = observer(() => {
    const [loading,setLoading] = useState(true)
    const [comment, setComment] = useState('')

    const [commentValidation, setCommentValidation] = useState('')

    const {user} = useContext(Context)
    const [show, setShow] = useState(false);
    const {id} = useParams();
    const {subId} = useParams();
    const {forum} = useContext(Context)


    const handleClose = () => setShow(false);
    const handleShow =()=>
    {
        if(user.isAuth) {
            setShow(true)
        }

    }

    useEffect(()=>{
        getComments(id).then(data=>forum.setComment(data)).finally(()=>setLoading(false))
    },[])

    const validation=()=>{
        if(comment=='') {
            setCommentValidation('Поле не может быть пустым')
            return false
        }
        return true
    }
    const onChangeComment=(text)=>{
        setComment(text)
        setCommentValidation('')
    }



    if(loading){
        return <Spinner animation="grow"/>
    }

    const sendComment = () =>{
        if (validation()&&user.isAuth) {
            console.log(user.user)
            createComment(comment,user.userReq,forum.forumComments).catch(function (error) {
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
            setComment('')
            getComments(id).then(data=>forum.setComment(data)).finally(()=>setLoading(false))

        }
    }
    const comments  = forum.forumComments.attributes.forum_comments.data



    return (
        <Container>
            <div className="d-flex flex-column align-items-start mt-5">
                <h1>{forum.forumComments.attributes.title}</h1>
                {user.isAuth ?
                    <Button variant={"success"} className="ml-4"
                            style={{borderRadius: 20, backgroundColor: '#45C14E', border: "none"}}
                            onClick={handleShow}
                    >Добавить ответ</Button>
                    :<div></div>
                }
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
                            <Form.Label>Ваш комментарий</Form.Label>
                            <Form.Control onChange={e => onChangeComment(e.target.value)} as="textarea" rows={3} style={{maxHeight:100}}/>
                            {commentValidation==''?
                                <></>
                                :
                                <div style={{visibility:"visible",color:"red"}}>{commentValidation}</div>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={sendComment}>Добавить ответ</Button>
                </Modal.Footer>
            </Modal>

            <ListGroup as="ol" className="pt-3">


                <ListGroup.Item
                    as="li"
                    className="d-flex align-items-start"
                >
                    <div className="ms-2 mx-5">
                        <div className="fw-bold">{forum.forumComments.attributes.user.data.attributes.username}</div>
                        <div>{forum.forumComments.attributes.publishedAt.slice(0,10)}</div>
                    </div>
                    <div className="ms-2 ">
                        {forum.forumComments.attributes.text}
                    </div>
                </ListGroup.Item>

                {comments.map(comment=>

                    <ListGroup.Item key={comment.id}
                        as="li"
                        className="d-flex align-items-start"
                    >
                        <div className="ms-2 mx-5">
                            <div className="fw-bold">{comment.attributes.users_permissions_user.data.attributes.username}</div>
                            <div>{comment.attributes.publishedAt.slice(0,10)}</div>
                        </div>
                        <div className="ms-2 ">
                            {comment.attributes.text}
                        </div>
                    </ListGroup.Item>
                )}



            </ListGroup>
        </Container>
    );
});

export default ForumTopic;