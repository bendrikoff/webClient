import React, {useContext, useEffect, useState} from 'react';
import {Container, Image, Spinner} from "react-bootstrap";
import commentIcon from "../assets/comments.png"
import {Context} from "../index";
import {getNews} from "../http/newsAPI";
import {getSections, getTopics} from "../http/forumAPI";

const Forum = () => {
    const [loading,setLoading] = useState(true)

    const {forum} = useContext(Context)

    useEffect(()=>{
        getSections().then(data=>forum.setSections(data)).finally(()=>setLoading(false))
    },[])



    if(loading){
        return <Spinner animation="grow"/>
    }

    return (
        <Container>
            <div className="d-flex flex-column align-items-center mt-5">
                <h1>Форум</h1>
            </div>

            {forum.forumSection.map(sections=>
                <div key={sections.id} className="d-flex flex-row mt-3">
                    <Image src={commentIcon} width={70} className="m-1"></Image>
                    <div className="p-lg-2">
                        <strong><a href={'/forum/'+sections.id}>{sections.attributes.title}</a></strong>
                        <br></br>
                        Количество тем:{sections.attributes.forum_topics.data.length}
                    </div>
                </div>
            )}

        </Container>
    );
};

export default Forum;