import axios from "axios";
axios.defaults.baseURL = '51.250.99.246:1337';

const $host = axios.create({

})

const $authHost = axios.create({

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
