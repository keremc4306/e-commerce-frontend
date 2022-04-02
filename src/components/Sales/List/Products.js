import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ProductService from '../../../services/ProductService';
import FilterData from '../FilterPanel/FilterData';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    ProductService.getProducts().then(response => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
    
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



  const handleFilterChange = (selectedBrands, selectedProcessors, selectedRams, selectedSsds) => {  
    const filtered = (selectedBrands.length === 0 && selectedProcessors.length === 0) ? products :  products
    .filter(product => {
      return (selectedBrands.length === 0 || selectedBrands.map(b => b.data).includes(product.brandName)) &&
            (selectedProcessors.length === 0 || selectedProcessors.map(b => b.data).includes(product.proName)) &&
            (selectedRams.length === 0 || selectedRams.map(b => b.data).includes(product.ram)) &&
            (selectedSsds.length === 0 || selectedSsds.map(b => b.data).includes(product.ssd))
    });
    
    setFilteredProducts(filtered)

  }

  let navigateBasket = useNavigate();
    const basket = () => {
        let path = `/basket`;
        navigateBasket(path);
    }

  return (
    <div className="row">
      <div className="col-md-3">
        <FilterData onFilterChange={(brands, processors, rams, ssds) => handleFilterChange(brands,processors, rams, ssds)} />
      </div>
      <div className='col-md-9'>
      <button style={{ marginLeft: "90px" }} className="btn btn-info" onClick={() => basket()}
                disabled={selectedProducts.length < 1 ? true : false}>Add to basket</button>
        <hr />
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
              filteredProducts.map(
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
  )
}

export default Products;