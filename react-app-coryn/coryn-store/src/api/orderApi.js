import axiosClient from "./axiosClients";

const orderApi={
    getAll(params){
        const url= '/products';
        return axiosClient.get(url,{params})


    },
    getCartByUserId(user_id){
        const url= `/cart/${user_id}`;
        return axiosClient.get(url)

    },
    getCountCartByUserId(user_id){
        const url= `/cart_count/${user_id}`;
        return axiosClient.get(url)

    },
    addOrderByCustomer(data){
        const url= '/order/create-order-customer';
        return axiosClient.post(url, data)
    },
    update(data){
        const url= `/products/${data.id}`;
        return axiosClient.patch(url, data)

    },
    removeCart(id){
        const url= `/cart/remove/${id}`;
        return axiosClient.delete(url)
    }

};
export default orderApi;