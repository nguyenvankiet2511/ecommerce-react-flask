import axiosClient from "./axiosClients";


const shipperApi={
    getAll(params){
        const url= '/shipper';
        return axiosClient.get(url,{params})
    },
    

};
export default shipperApi;