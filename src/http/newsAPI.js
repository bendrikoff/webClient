import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";
import {COUNT_NEWS_ON_PAGE} from "../utils/consts";

export const getNews = async(id) =>{
    const {data} = (await $host.get('/api/news?populate=cover'))
    return data.data
}

export const getOneNew = async(id) =>{
    const {data} = (await $host.get('/api/news/'+id+'?populate[news_comments][populate][user][data]=*&populate[cover]=*')).data
    return data
}
export const getOneNewComments = async(id) =>{
    const {data} =(await $host.get('/api/news/'+id+'?populate=*')).data
    return data
}
export const createComment = async(comment,user,oneNews) =>{
    const {data} =(await $host.post('/api/news-comments',{data:{comment:comment,user: user,"new":oneNews }}))
    return data
}


