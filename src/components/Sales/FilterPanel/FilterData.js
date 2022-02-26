import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';

function FilterData({ onBrandChange }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = () => {
    ProductService.getBrands().then((response) => {
      setBrands(response.data);
      setSelectedBrands(response.data.map(brand => { return { selected: false, data: brand } }));
    });
  };

  const handleBrandChange = (value, selected) => {
    const selectedItemIndex = selectedBrands.map(b => b.data).indexOf(value);
    const newStateSelectedBrands = [...selectedBrands];
    newStateSelectedBrands[selectedItemIndex].selected = selected;
    setSelectedBrands(newStateSelectedBrands);
    onBrandChange(selectedBrands.filter(b => b.selected === true));
  }

  return (
    <>
      <div className="border-bottom border-5 border-danger mb-2 p-2 bg-dark text-white">
        <b>Brand</b>
      </div>
      <ul className="d-flex list-group">
        {brands.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1"
              type="checkbox"
              brand={value}
              id={`brandcheck-${value}`}
              defaultChecked={selectedBrands.filter(b => b.data === value)[0]?.selected}
              onChange={() => handleBrandChange(value, !selectedBrands.filter(b => b.data === value)[0]?.selected)} /> {value}
          </li>)}
      </ul>

      <br />

      <div className="border-bottom border-5 border-success mb-2 p-2 bg-dark text-white">
        <b>Processor</b>
      </div>
      {/* <ul className="d-flex list-group">
        {brands.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1"
              type="checkbox"
              brand={value}
              id={`brandcheck-${value}`}
              defaultChecked={selectedBrands.filter(b => b.data === value)[0]?.selected}
              onChange={() => handleBrandChange(value, !selectedBrands.filter(b => b.data === value)[0]?.selected)} /> {value}
          </li>)}
      </ul> */}
    </>
  )
}

export default FilterData;