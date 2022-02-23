import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';

function FilterData({onBrandChange}) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // ProductService.getProducts().then(
    //   response => {
    //     setProducts(response.data);
    //   });
    getAllBrands();
  }, []);

  const getAllBrands = () => {
    ProductService.getBrands().then((response) => setBrands(response.data));
  };

  const handleBrandChange = (e) => {
    onBrandChange(e.target.getAttribute('brand'))
  }
  

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
            onChange={handleBrandChange}/> {value}
          </li>)}
      </ul>
    </div>
  )
}

export default FilterData;