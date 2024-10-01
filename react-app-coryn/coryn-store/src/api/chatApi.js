import axiosClient from "./axiosClients";

const chatApi = {
    getMessages(user_id){
        const url= `/get-messages/${user_id}`;
        return axiosClient.get(url)


    },

    sendMessages(data){
        const url= `/send-messages`;
        return axiosClient.post(url, data)


    },

};

export default chatApi;