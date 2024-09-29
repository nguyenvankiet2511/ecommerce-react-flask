import axiosClient from "./axiosClients";

const categoriesApi={
    getAll(params){
        const url= '/categories';
        return axiosClient.get(url,{params})


    },
    get(id){
        const url= `/categories-info/${id}`;
        return axiosClient.get(url)
    },
    getProductsByCategoryId(id){
        const url= `/categories/${id}`;
        return axiosClient.get(url)
    },
    add(data){
        const url= '/categories/create';
        return axiosClient.post(url, data)

    },
    update(data){
        const url= `/categories/${data.id}`;
        return axiosClient.patch(url, data)

    },
    remove(id){
        const url= `/categories/delete/${id}`;
        return axiosClient.delete(url)
    }

};
export default categoriesApi;