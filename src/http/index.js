import axios from "axios";

const $host = axios.create({
    baseURL: '51.250.99.246:1337'
})

const $authHost = axios.create({
    baseURL: '51.250.99.246:1337'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
