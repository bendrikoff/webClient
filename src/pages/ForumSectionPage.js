import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Modal, Navbar, Spinner, Table} from "react-bootstrap";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import {createTopic, getSections, getTopics} from "../http/forumAPI";
import {observer} from "mobx-react-lite";

const ForumSectionPage = observer(() => {
    const [loading,setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const [textValidation, setTextValidation] = useState('')
    const [titleValidation, setTitleValidation] = useState('')



    const {forum} = useContext(Context)
    const {id} = useParams();
    const {user} = useContext(Context)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow =()=>
    {
        if(user.isAuth) {
            setShow(true)
        }

    }

    useEffect(()=>{
        getTopics(id).then(data=>forum.setSection(data)).finally(()=>setLoading(false))
    },[])

    const validation=()=>{
        if(title=='') {
            setTitleValidation('Поле не может быть пустым')
            return false
        }
        if(text=='') {
            setTextValidation('Поле не может быть пустым')
            return false
        }
        return true
    }
    const onChangeTitle=(text)=>{
        setTitle(text)
        setTitleValidation('')
    }

    const onChangeText=(text)=>{
        setText(text)
        setTextValidation('')
    }

    if(loading){
        return <Spinner animation="grow"/>
    }

    const sendTopic = () =>{
        if (validation()&&user.isAuth) {
            console.log(user.user)
            createTopic(title,text,user.userReq,forum.forumSection).catch(function (error) {
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
            setText('')
            setTitle('')
            handleClose();
            getTopics(id).then(data=>forum.setSection(data))

        }
    }

    const topics = forum.forumSection.attributes.forum_topics.data

    return (
        <Container>

            <div className="d-flex flex-column align-items-center mt-5">
                <h1>{forum.forumSection.attributes.title}</h1>
            </div>

            {user.isAuth ?
                <Button variant={"success"} className="ml-4"
                        style={{borderRadius: 20, backgroundColor: '#45C14E', border: "none"}}
                        onClick={()=>handleShow()}
                >Создать тему</Button>
                :<div></div>
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Создать тему</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Заголовок</Form.Label>
                            <Form.Control onChange={e => onChangeTitle(e.target.value)} type="text" placeholder="Заголовок" />
                            {titleValidation==''?
                                <></>
                                :
                                <div style={{visibility:"visible",color:"red"}}>{titleValidation}</div>
                            }
                            <br />
                            <Form.Label>Ваш текст</Form.Label>
                            <Form.Control onChange={e => onChangeText(e.target.value)} as="textarea" rows={3} style={{maxHeight:100}}/>
                            {textValidation==''?
                                <></>
                                :
                                <div style={{visibility:"visible",color:"red"}}>{textValidation}</div>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={sendTopic}>Создать тему</Button>
                </Modal.Footer>
            </Modal>



            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>Заголовок</th>
                    <th>Дата создания</th>
                    <th>Ответов</th>
                </tr>
                </thead>
                <tbody>
                {topics.map(topic=>
                    <tr key={topic.id}>
                        <td><a href={'/forum/'+id+'/'+topic.id}><strong>{topic.attributes.title}</strong></a><p>
                            {topic.attributes.text}</p>
                        </td>
                        <td>{topic.attributes.publishedAt.slice(0,10)}</td>
                        <td>{topic.attributes.forum_comments.data.length}</td>
                    </tr>

                )}

                </tbody>
            </Table>
        </Container>
    );
});

export default ForumSectionPage;