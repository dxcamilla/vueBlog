import http from '../http'
export const user_tokenLogin = () => {
    const url = process.env.VUE_APP_serverURL + '/user/tokenLogin';
    return http.post(url)
}