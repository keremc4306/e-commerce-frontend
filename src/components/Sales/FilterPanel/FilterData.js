import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';

function FilterData({ onBrandChange }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = () => {
    ProductService.getBrands().then((response) => setBrands(response.data));
  };

  const handleBrandChange = (e) => {
    onBrandChange(e.target.getAttribute('brand'))
  }

  return (
    <div className = "col-md-3">
      <ul className="d-flex p-4 list-group">
        {brands.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1"
              type="checkbox"
              brand={value}
              id={`brandcheck-${value}`}
              onChange={handleBrandChange} /> {value}
          </li>)}
      </ul>
    </div>
  )
}

export default FilterData;