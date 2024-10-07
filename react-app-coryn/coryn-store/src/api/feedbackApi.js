import axiosClient from "./axiosClients";

const feedbackApi = {
    getFeedbackProduct(product_id){
        const url= `/get-feedback-product/${product_id}`;
        return axiosClient.get(url)
    },

    addFeedbackProduct(data){
        const url= `/add-feedback-product`;
        return axiosClient.post(url, data)
    },

};

export default feedbackApi;