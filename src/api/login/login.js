import http from '../http'
export const api_login = () => {
    const url = process.env.VUE_APP_serverURL + '/api/user/tokenLogin';
    return http.post(url)
}