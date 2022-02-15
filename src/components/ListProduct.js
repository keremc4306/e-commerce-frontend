import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import { replaceInArray } from '../utils/arrays/arrayUtils';

function ListProduct() {
    const [products, setProducts] = useState([]);

    const [masterChecked, setMasterChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [newRecordModalOnShow, setNewRecordModalOnShow] = useState(false);
    const [updateRecordModalOnShow, setUpdateRecordModalOnShow] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        ProductService.getProducts().then(response => setProducts(response.data));
    }

    const deleteProduct = (selectedProducts) => {
        ProductService.deleteProduct(selectedProducts).then(() => {
            getAllProducts();
        });
    }

    const addProduct = () => {
        setNewRecordModalOnShow(true);
    }

    const editProduct = () => {
        setUpdateRecordModalOnShow(true);
    }

    const onMasterCheck = (e) => {

        let tempProducts = products;
        tempProducts.map((product) => (product.selected = e.target.checked));

        setMasterChecked(e.target.checked);
        setProducts(tempProducts);
        setSelectedProducts(products.filter((e) => e.selected));
    }

    const onItemCheck = (e) => {
        let tempProducts = products;
        tempProducts.map((product) => {
            if (product.itemNo === parseInt(e.target.getAttribute('productitemno'))) {
                product.selected = e.target.checked;
            }
            return product;
        });

        const totalItems = products.length;
        const totalCheckedItems = tempProducts.filter((e) => e.selected).length;

        setMasterChecked(totalItems === totalCheckedItems);
        setProducts(products);
        setSelectedProducts(products.filter((e) => e.selected));
        return;
    }


    return (
        <div>
            <AddProduct isOpen={newRecordModalOnShow} onClose={() => setNewRecordModalOnShow(false)} onSubmit={handleAddProductSubmit} />
            {selectedProducts[0] && <UpdateProduct isOpen={updateRecordModalOnShow} onClose={() => setUpdateRecordModalOnShow(false)}
                onSubmit={handleUpdateProductSubmit} willUpdateProduct={selectedProducts[0]} />}

            <div className="col-md-8 mb-4">

                <br></br>
                <button className="btn btn-primary" onClick={() => addProduct()}>Add</button>

                <button style={{ marginLeft: "130px" }}
                    onClick={() => editProduct()} className="btn btn-info"
                    disabled={selectedProducts.length < 1 ? true : false}>Update</button>

                <button style={{ marginLeft: "160px" }}
                    onClick={() => deleteProduct(selectedProducts)} className="btn btn-danger"
                    disabled={selectedProducts.length < 1 ? true : false}>Delete</button>

                <br></br>
                <br></br>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th><input
                                type="checkbox"
                                className="form-check-input"
                                checked={masterChecked}
                                id="mastercheck"
                                onChange={() => onMasterCheck}></input></th>
                            <th>Item No</th>
                            <th>Brand</th>
                            <th>Processor</th>
                            <th>RAM (GB)</th>
                            <th>SSD (GB)</th>
                            <th>Price (TL)</th>
                            <th>Number of stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(
                                product =>
                                    <tr key={product.itemNo}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                productitemno={product.itemNo}
                                                id={`rowcheck${product.itemNo}`}
                                                name="checkItem"
                                                onChange={onItemCheck}
                                            />
                                        </td>
                                        <td> {product.itemNo}</td>
                                        <td> {product.brandName} </td>
                                        <td> {product.proName}</td>
                                        <td> {product.ram}</td>
                                        <td> {product.ssd}</td>
                                        <td> {product.price}</td>
                                        <td> {product.numOfStock}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );

    async function handleAddProductSubmit(product) {
        const { data: newProduct } = await ProductService.createProduct(product)
        setProducts([...products, newProduct])
        setNewRecordModalOnShow(false)
    }

    async function handleUpdateProductSubmit(product) {
        const { data: updatedProduct } = await ProductService.updateProduct(selectedProducts[0].itemNo, product)
        const targetProductIndex = products.findIndex((p) => p.itemNo === product.itemNo)
        const newProducts = replaceInArray(products, targetProductIndex, updatedProduct)
        setProducts(newProducts)
        setUpdateRecordModalOnShow(false)

    }
}

export default ListProduct;