import axios from "axios";

export const apiDashboard = axios.create({
  baseURL: 'https://api-acionaone.dsb.gl/v1/dashboard/'
})
export const apiAuth = axios.create({
  baseURL: 'https://mv0csoqlbk.execute-api.us-east-2.amazonaws.com/dev/authenticate/'
})