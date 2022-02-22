import React, { useState, useEffect } from 'react';
import ProductService from '../../../services/ProductService';

function Products() {
    const [products, setProducts] = useState([]);

    const [masterChecked, setMasterChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
      getAllProducts();
    }, []);

    const getAllProducts = () => {
      ProductService.getProducts().then(response => setProducts(response.data));
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
    )
}

export default Products;