import axiosClient from "./axiosClients";

const productsApi={
    getAll(params){
        const url= '/products';
        return axiosClient.get(url,{params})


    },
    getProductById(id){
        const url= `/products/${id}`;
        return axiosClient.get(url)

    },
    add(data){
        const url= '/products';
        return axiosClient.post(url, data)

    },
    update(data){
        const url= `/products/${data.id}`;
        return axiosClient.patch(url, data)

    },
    changeActive(id){
        const url= `/products/change-active/${id}`;
        return axiosClient.patch(url)
    }

};
export default productsApi;