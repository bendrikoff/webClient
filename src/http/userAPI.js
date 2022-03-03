import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async(username,email,password) =>{
    const {data} = await $host.post('/api/auth/local/register', {username:username,email:email, password:password})
    console.log(data)
    localStorage.setItem('token',data.jwt)
    return data
}
export const login = async(email,password) =>{
    const {data} = await $host.post('/api/auth/local', {identifier:email, password:password})
    localStorage.setItem('token',data.jwt)
    return data
}
export const check = async() =>{
    const {data} =await $authHost.get('/api/users/me')
    return data
}


