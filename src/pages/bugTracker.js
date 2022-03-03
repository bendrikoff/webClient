import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, FloatingLabel, Form, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {LOGIN_ROUTE} from "../utils/consts";
import {useParams} from "react-router-dom";
import {getOneFaq} from "../http/supportAPI";
import {createBug, createBugWithImg, getBugsList, uploadFile} from "../http/bugsAPI";
import {createTopic, getTopics} from "../http/forumAPI";
import {observer} from "mobx-react-lite";

const BugTracker = observer(() => {
    const [loading,setLoading] = useState(true)
    const [file, setFile] = useState(null)
    const [text, setText] = useState('')

    const [textValidation, setTextValidation] = useState('')



    const {user} = useContext(Context)

    const {bugs} = useContext(Context)



    useEffect(()=>{
        getBugsList().then(data=>bugs.setBugs(data)).finally(()=>setLoading(false))
    },[])



    let userBugs = []
    try {
        bugs.bugs.forEach(function (item, i, arr) {
                if (item.attributes.user.data.id === user.id) {
                    userBugs.push(item)
                }
            }
        )
    }catch (e){
        console.log(e)
    }


    const selectFile = e => {
        setFile(e.target.files[0])
    }


    const sendFile = () =>{
        if (validation()&&user.isAuth) {
            const formData = new FormData()
            formData.append('files',file)
            if(file!=null) {
                uploadFile(formData).then(data =>
                    createBugWithImg(text, user.userReq, data).finally(getBugsList().then(data => bugs.setBugs(data)))
                ).catch(function (error) {
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
            }else{
                createBug(text, user.userReq).finally(getBugsList().then(data => bugs.setBugs(data)))
            }





        }
    }

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

    return (
        <Container>
            <div className="d-flex flex-column align-items-center mt-5">
                <h1>Баг-трекер</h1>
            </div>
            <div className="pt-3"> Если у вас возникали какие-либо ошибки или вылеты при эксплуатации приложения, напишите пожалуйста нам.<br></br>
                Постарайтесь описать, при каких обстоятельствах они возникли.
            </div>
            {user.isAuth?
                <Form className="pt-3">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <FloatingLabel controlId="floatingTextarea2" label="Сообщение">
                            <Form.Control
                                onChange={e => onChangeText(e.target.value)}
                                as="textarea"
                                style={{maxHeight: '150px', height: '150px'}}
                            />
                            {textValidation==''?
                                <></>
                                :
                                <div style={{visibility:"visible",color:"red"}}>{textValidation}</div>
                            }
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Control
                        onChange={selectFile}
                        type="file"
                        accept="image/*,image/jpeg"/>

                    <Button onClick={sendFile} className="mt-3" variant="primary">
                        Отправить
                    </Button>
                </Form>
                :
                <div>Чтобы отправить нам сообщение, <a href={LOGIN_ROUTE}>зарегистрируйтесь или авторизуйтесь на сайте.</a></div>
            }

            {user.isAuth?
                <div className="mt-3">
                    <h3>Ваши обращения:</h3>
                </div>
                    :
                    <></>

            }
                    {userBugs.map(bug=>
                        <Alert key={bug.id} variant={bugs.getType(bug.attributes.type)}
                               className="mt-3">
                            <p>
                                {bug.attributes.text}
                            </p>
                        </Alert>
                    )}


        </Container>
    );
});

export default BugTracker;