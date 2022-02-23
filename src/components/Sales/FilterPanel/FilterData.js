import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';

function FilterData() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  useEffect(() => {
    // ProductService.getProducts().then(
    //   response => {
    //     setProducts(response.data);
    //   });
    getAllProducts();
    getAllBrands();
  }, []);

  const getAllProducts = () => {
    ProductService.getProducts().then((response) => setProducts(response.data));
  };

  const getAllBrands = () => {
    ProductService.getBrands().then((response) => setBrands(response.data));
  };

  let fb = [...products];
  const onBrandChange = (e) => {
    let name = e.target.getAttribute("brand");
    if (true) {
      fb = fb.filter((itemNo) => itemNo.brandName === name);
    }
    brandFilter.includes(name)
      ? setBrandFilter(brandFilter.filter((products) => products !== name))
      : setBrandFilter([...brandFilter, name]);
    console.log(fb);
  };

  return (
    <div>
      <ul className="list-group">
        {brands.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1" 
            type="checkbox" 
            aria-label="..." 
            brand={value}
            id={`brandcheck-${value}`}
            onChange={onBrandChange}/> {value}
          </li>)}
      </ul>
    </div>
  )
}

export default FilterData;