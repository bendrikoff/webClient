import React, {useContext, useEffect, useState} from 'react';
import {Container, Image, Pagination, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {COUNT_NEWS_ON_PAGE, NEWS_ROUTE} from "../utils/consts";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {getNews} from "../http/newsAPI";

const NewsPage = observer(() => {
    const [loading,setLoading] = useState(true)
    const {news} = useContext(Context)
    const {id} = useParams()
    let pagesCount

    useEffect(()=>{
        getNews().then(data=> {
                news.setNews(data)
            }
        ).finally(()=>setLoading(false))
    },[])

    if(loading){
        return <Spinner animation="grow"/>
    }



    return (
        <Container >
            <div>
                {news.news.map(oneNews=>
                    <a key={oneNews.id} href={NEWS_ROUTE+'/'+oneNews.id} style={{textDecoration:"none",color:"#012E45"}}>
                        <div className="pt-5 d-flex ">
                            <Image src={process.env.REACT_APP_API_URL_FOR_FILES+oneNews.attributes.cover.data[0].attributes.url}height={150} width={150} style={{borderRadius: 20}}></Image>
                            <div className="d-flex flex-column p-lg-4">
                                <h4>{oneNews.attributes.title}</h4>
                                <div>{oneNews.attributes.text} </div>
                            </div>

                        </div>
                    </a>
                )}
            </div>








        </Container>
    );
});

export default NewsPage;