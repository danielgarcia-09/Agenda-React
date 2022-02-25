import AxiosClient from "./axios";

const tokenAuth = token => {
    if( token ) {
        AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete AxiosClient.defaults.headers.common["Authorization"];
    }
}

export default tokenAuth;