import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image} from "react-bootstrap";
import sliderIllustration from '../assets/sliderIllustration.png'
import bookIcon from '../assets/book.png'
import Icon2 from '../assets/002-learning.png'
import Icon3 from '../assets/003-graduation.png'
import newsImage from '../assets/photo_2022-02-02_16-09-28.jpg'
import {Context} from "../index";
import {FORUM_ROUTE, NEWS_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import {getNews} from "../http/newsAPI";
import {observer} from "mobx-react-lite";


const Main = observer(() => {
    const {news} = useContext(Context)

    const history = useHistory()

    useEffect(()=>{
        getNews().then(data=>news.setNews(data))
    },[])


    return (

        <div>
                <Container className={"d-flex mt-5"}>
                    <div style={{paddingTop:150, flexDirection:"row"}}>
                        <h1 style={{color:'#002C43'}}>Изучайте геометрию с интересом </h1>
                        <h5 style={{color:'#002C43'}}>
                            Приложение, которое позволяет изучать
                            геометрические фигуры в дополненной реальности
                        </h5>
                        <Button variant={"success"} style={{borderRadius: 20,backgroundColor:'#45C14E',border:"none"}} className="mt-5">Скачать приложение</Button>
                    </div>
                    <div style={{background:`url(${sliderIllustration}) no-repeat center center`,width:500,height:500}} >
                    </div>
                    <></>
                </Container>

                <div style={{backgroundColor:"#DFF8EB",paddingBottom:50}} className="me-auto d-flex flex-column"  >
                    <h3  style={{color:'#012D44',paddingTop:50,margin:"auto"} } >Дополненная реальность для лучшего обучения</h3>
                    <div className="d-flex flex-row align-items-center justify-content-around mt-5">
                        <div>
                            <Image src={bookIcon} style={{maxHeight:180,maxWidth:180}} ></Image>
                            <div className="mt-2" style={{color:'#012D44'}}>
                                <br></br>
                                Использование 3D фигур
                                <br></br>
                                для лучшей наглядности
                            </div>
                        </div>
                        <div>
                            <Image src={Icon2} style={{maxHeight:180,maxWidth:180}}></Image>
                            <div className="mt-2 " style={{color:'#012D44'}}>
                                <br></br>
                                Использование современных
                                <br></br>
                                технологий для обучения
                            </div>
                        </div>
                        <div>
                            <Image src={Icon3} style={{maxHeight:180,maxWidth:180}}></Image>
                            <div className="mt-2" style={{color:'#012D44'}}>
                                <br></br>
                                Использование 3D фигур
                                <br></br>
                                для лучшей наглядности
                            </div>
                        </div>
                    </div>
                </div>

                <Container className="d-flex flex-column align-items-center mt-5" style={{color:"#012E45"}}>
                    <h1>Новости</h1>


                    {news.news.slice(news.news.length-3,news.news.length).map(oneNews=>
                        <a key={oneNews.id} href={NEWS_ROUTE+'/'+oneNews.id} style={{textDecoration:"none",color:"#012E45"}}>
                                <div className="pt-5 d-flex ">
                                    <Image src={process.env.REACT_APP_API_URL_FOR_FILES+oneNews.attributes.cover.data[0].attributes.url} height={150} width={150} style={{borderRadius: 20,marginRight:10}}></Image>
                                    <div className="d-flex flex-column p-lg-4">
                                        <h4>{oneNews.attributes.title}</h4>
                                        <div>{oneNews.attributes.text} </div>
                                    </div>

                                </div>
                        </a>
                        )}


                    <Button onClick={()=>history.push(NEWS_ROUTE+'/page/1')} variant="success" className="mt-5" style={{borderRadius: 20,backgroundColor:'#45C14E',border:"none"}} >Читать далее</Button>
                </Container>

                <div style={{backgroundColor:"#DFF8EB",color:"#012E45",paddingBottom:50,paddingTop:50,marginTop:50}}>
                    <Container>
                        <h2>A: Какие требования для установки приложения?</h2>
                        <h2>B: Для приложения необходимо иметь телефон под
                            управлением системы Android с камерой</h2>
                        <br></br>
                        <h2>A: Где можно найти найти приложение?</h2>
                        <h2>B: Приложение можно скачать на сайте по <a href={"/"}>этой ссылке</a></h2>
                        <br></br>
                        <h2>A: Подходит ли приложение для всех учебников?</h2>
                        <h2>B: Пока приложение подходит только для учебника</h2>
                    </Container>
                </div>

        </div>
    );
});

export default Main;