import  Axios from 'axios';

const AxiosClient = Axios.create({
    baseURL : "https://danielapi.azurewebsites.net/api/"
});

export default AxiosClient;