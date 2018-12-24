const http = require('@/api/http.js');
export default function login () {
    http.post(url, data)
        .then(res => {

        }).catch(err => {
            console.log('登录失败')
        })
}