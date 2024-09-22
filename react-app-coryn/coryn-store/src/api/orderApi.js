import axiosClient from "./axiosClients";

const orderApi={
    getAll(params){
        const url= '/products';
        return axiosClient.get(url,{params})
    },

    getOrderDefault(params){
        const url= '/get-order-default';
        return axiosClient.get(url,{params})
    },

    getOrderComfirm(params){
        const url= '/get-order-comfirm';
        return axiosClient.get(url,{params})
    },

    getOrderComfirmInvoice(id){
        const url= `/get-order-invoice/${id}`;
        return axiosClient.get(url)
    },

    getOrderDetail(id){
        const url= `/get-order-detail/${id}`;
        return axiosClient.get(url)
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
    addOrderByEmployee(data){
        const url= '/order/payment';
        return axiosClient.post(url, data)
    },
    updateActiveOrder(id){
        const url= `/comfirm-order/${id}`;
        return axiosClient.patch(url)
    },
    removeOrder(id){
        const url= `/delete-order/${id}`;
        return axiosClient.delete(url)
    }

};
export default orderApi;