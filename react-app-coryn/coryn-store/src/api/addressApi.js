import axiosClient from "./axiosClients";

const addressApi = {
    getAll(params){
        const url= '/categories';
        return axiosClient.get(url,{params})


    },
    getAddressById(id){
        const url= `/address/${id}`;
        return axiosClient.get(url)

    },
    getProductsByCategoryId(id){
        const url= `/categories/${id}`;
        return axiosClient.get(url)
    },
    addAddress(data){
        const url= '/address/add';
        return axiosClient.post(url, data)
    }

};

export default addressApi;
