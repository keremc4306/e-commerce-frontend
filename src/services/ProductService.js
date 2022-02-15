import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products";

class ProductService {

    getProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    createProduct(product) {
        return axios.post(PRODUCT_API_BASE_URL + '/add', product);
    }

    getProductByItemNo(itemNo) {
        return axios.get(PRODUCT_API_BASE_URL + '/' + itemNo);
    }

    updateProduct(itemNo, product) {
        return axios.put(`${PRODUCT_API_BASE_URL}/${itemNo}`, product);
    }

    deleteProduct(products) {
        return axios.post(PRODUCT_API_BASE_URL + '/delete', products);
    }
}

export default new ProductService()