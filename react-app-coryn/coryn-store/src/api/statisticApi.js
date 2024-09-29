import axiosClient from "./axiosClients";


const statisticApi={
    getRevenueProduct(){
        const url= '/get-revenue-product';
        return axiosClient.get(url)
    },

    getInventory(){
        const url= '/get-inventory';
        return axiosClient.get(url)
    },

    getProductBestSeller(data){
        const url= '/get-product-best-seller';
        return axiosClient.post(url, data)
    },
    
    getTotalSold(data){
        const url= '/get-total-item-sold';
        return axiosClient.post(url, data)
    },

    getTotalRevenue(data){
        const url= '/get-revenue';
        return axiosClient.post(url, data)
    },

    getRevenueQuarter(data){
        const url= '/get-revenue-quarter';
        return axiosClient.post(url, data)
    },

    getRevenueCategory(data){
        const url= '/get-revenue-category';
        return axiosClient.post(url, data)
    },

    getRevenueProductPie(data){
        const url= '/get-revenue-product';
        return axiosClient.post(url, data)
    },

    getRevenueThreeYear(){
        const url= '/get-revenue-three-year';
        return axiosClient.get(url)
    },
    getRevenueTwoYear(data){
        const url= '/get-revenue-two-year';
        return axiosClient.post(url,data)
    },

};
export default statisticApi;