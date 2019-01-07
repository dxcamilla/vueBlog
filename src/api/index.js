import http from './http';
export const api_new_content = () => {
  const url = process.env.VUE_APP_serverURL + "/api";
  return http.get(url)
}