import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";

export const getSections = async() => {
    const {data} = (await $host.get('/api/forum-sections?populate=*')).data
    return data
}
export const getTopics = async(sectionId) =>{
    const {data} = (await $host.get('/api/forum-sections/'+sectionId+'/?populate[forum_topics][populate]=*')).data
    return data
}
export const getComments = async(topicId) =>{
    const {data} = (await $host.get('/api/forum-topics/'+topicId+'/?populate[forum_comments][populate]=*&populate[user]=*')).data
    return data
}
export const createTopic = async(title,text,user,section) =>{
    const {data} =await $host.post('/api/forum-topics',{data:{title:title,text: text,user:user,forum_section:section }})
    return data
}
export const createComment = async(text,user,topic) =>{
    const {data} =await $host.post('/api/forum-comments',{data:{text:text,users_permissions_user:user,forum_topic:topic }})
    return data
}

