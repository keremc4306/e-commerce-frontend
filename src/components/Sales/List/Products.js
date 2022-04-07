import React, { useState, useEffect } from 'react';
import ProductService from '../../../services/ProductService';
import FilterData from '../FilterPanel/FilterData';
import { useBasketContext } from "../../../context/basket/BasketContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { basketState, dispatchBasketStateAction } = useBasketContext();

  console.log(basketState, "BASKET STATE")

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

        if (e.target.checked) {
          dispatchBasketStateAction({ type: "ADD_ITEM", payload: product })
        }
        else {
          dispatchBasketStateAction({ type: "REMOVE_ITEM", payload: product.itemNo })
        }

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
    const filtered = (selectedBrands.length === 0 && selectedProcessors.length === 0) ? products : products
      .filter(product => {
        return (selectedBrands.length === 0 || selectedBrands.map(b => b.data).includes(product.brandName)) &&
          (selectedProcessors.length === 0 || selectedProcessors.map(b => b.data).includes(product.proName)) &&
          (selectedRams.length === 0 || selectedRams.map(b => b.data).includes(product.ram)) &&
          (selectedSsds.length === 0 || selectedSsds.map(b => b.data).includes(product.ssd))
      });

    setFilteredProducts(filtered)

  }

  function addSelectedProductToBasket(product) {
    dispatchBasketStateAction({ type: "ADD_ITEM", payload: product })
  }

  return (
    <div className="row">
      <div className="col-md-3">
        <FilterData onFilterChange={(brands, processors, rams, ssds) => handleFilterChange(brands, processors, rams, ssds)} />
      </div>
      <div className='col-md-9'>
        {/* <button style={{ marginLeft: "90px" }} className="btn btn-info" onClick={()=>addSelectedProductToBasket()}
          disabled={selectedProducts.length === 0}>Add to basket</button> */}
        <hr />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {/* <th><input
                type="checkbox"
                className="form-check-input"
                checked={masterChecked}
                id="mastercheck"
                onChange={() => onMasterCheck}></input></th> */}
              <th>Item No</th>
              <th>Brand</th>
              <th>Processor</th>
              <th>RAM (GB)</th>
              <th>SSD (GB)</th>
              <th>Price (TL)</th>
              <th>Number of stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredProducts.map(
                product =>
                  <tr key={product.itemNo}>
                    {/* <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        productitemno={product.itemNo}
                        id={`rowcheck${product.itemNo}`}
                        name="checkItem"
                        onChange={onItemCheck}
                      />
                    </td> */}
                    <td> {product.itemNo}</td>
                    <td> {product.brandName} </td>
                    <td> {product.proName}</td>
                    <td> {product.ram}</td>
                    <td> {product.ssd}</td>
                    <td> {product.price}</td>
                    <td> {product.numOfStock}</td>
                    <td><button className='btn btn-success' onClick={() => addSelectedProductToBasket(product)}>Add To Basket</button></td>
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