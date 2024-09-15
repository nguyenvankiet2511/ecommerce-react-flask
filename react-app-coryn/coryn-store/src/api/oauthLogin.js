import axiosClient from "./axiosClients";

const oauthLoginApi={
    getOauthLogin(){
        const url= '/oauth-login';
        return axiosClient.get(url)


    },
    getCallback(){
        const url= `/callback`;
        return axiosClient.get(url)

    }
    
};
export default oauthLoginApi;