import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";

export const getFaqList = async() => {
    const {data} = (await $host.get('/api/faqs')).data
    return data
}
export const getOneFaq = async(id) => {
    const {data} = (await $host.get('/api/faqs/'+id)).data
    return data
}
export const createSupport = async(text,user) => {
    const {data} = (await $host.post('/api/user-supports/',{data:{text:text,user:user}}))
    return data
}



