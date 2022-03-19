import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';

function FilterData({ onFilterChange }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [selectedProcs, setSelectedProcs] = useState([]);
  const [rams, setRams] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);
  const [ssds, setSsds] = useState([]);
  const [selectedSsds, setSelectedSsds] = useState([]);

  useEffect(() => {
    getAllBrands();
    getAllProcs();
    getAllRams();
    getAllSsds();
  }, []);

  const getAllBrands = () => {
    ProductService.getBrands().then((response) => {
      setBrands(response.data);
      setSelectedBrands(response.data.map(brand => { return { selected: false, data: brand } }));
    });
  };

  const getAllProcs = () => {
    ProductService.getProcessors().then((response) => {
      setProcessors(response.data);
      setSelectedProcs(response.data.map(processor => { return { selected: false, data: processor } }));
    });
  };

  const getAllRams = () => {
    ProductService.getRams().then((response) => {
      setRams(response.data);
      setSelectedRams(response.data.map(ram => { return { selected: false, data: ram } }));
    });
  };

  const getAllSsds = () => {
    ProductService.getSsds().then((response) => {
      setSsds(response.data);
      setSelectedSsds(response.data.map(ssd => { return { selected: false, data: ssd } }));
    });
  };

  const handleFilterCheckBoxChange = (value, selected, type) => {
    let selectedItemIndex;
    let newStateSelected;

    switch(type) {
      case 'brand':
        selectedItemIndex = selectedBrands.map(b => b.data).indexOf(value);
        newStateSelected = [...selectedBrands];
        newStateSelected[selectedItemIndex].selected = selected;
        setSelectedBrands(newStateSelected);
        break;
        case 'processor':
          selectedItemIndex = selectedProcs.map(b => b.data).indexOf(value);
          newStateSelected = [...selectedProcs];
          newStateSelected[selectedItemIndex].selected = selected;
          setSelectedProcs(newStateSelected);
          break;  
      default:
        break;  
    }
    onFilterChange(
      selectedBrands.filter(b => b.selected === true),
      selectedProcs.filter(b => b.selected === true)
    );
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
              onChange={() => handleFilterCheckBoxChange(value, !selectedBrands.filter(b => b.data === value)[0]?.selected, 'brand')} /> {value}
          </li>)}
      </ul>

      <br />

      <div className="border-bottom border-5 border-success mb-2 p-2 bg-dark text-white">
        <b>Processor</b>
      </div>
      { <ul className="d-flex list-group">
        {processors.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1"
              type="checkbox"
              processor={value}
              id={`procheck-${value}`}
              defaultChecked={selectedProcs.filter(p => p.data === value)[0]?.selected}
              onChange={() => handleFilterCheckBoxChange(value, !selectedProcs.filter(p => p.data === value)[0]?.selected, 'processor')} /> {value}
          </li>)}
      </ul>}

      <br />

      <div className="border-bottom border-5 border-success mb-2 p-2 bg-dark text-white">
        <b>RAM (GB)</b>
      </div>
      { <ul className="d-flex list-group">
        {rams.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1"
              type="checkbox"
              ram={value}
              id={`ramcheck-${value}`}
              defaultChecked={selectedRams.filter(r => r.data === value)[0]?.selected}
              onChange={() => handleFilterCheckBoxChange(value, !selectedRams.filter(r => r.data === value)[0]?.selected, 'ram')} /> {value}
          </li>)}
      </ul>}

      <br />

      <div className="border-bottom border-5 border-success mb-2 p-2 bg-dark text-white">
        <b>SSD (GB)</b>
      </div>
      { <ul className="d-flex list-group">
        {ssds.map((value, index) =>
          <li className="list-group-item" key={index}>
            <input className="form-check-input me-1"
              type="checkbox"
              ssd={value}
              id={`ssdcheck-${value}`}
              defaultChecked={selectedSsds.filter(s => s.data === value)[0]?.selected}
              onChange={() => handleFilterCheckBoxChange(value, !selectedSsds.filter(s => s.data === value)[0]?.selected, 'ssd')} /> {value}
          </li>)}
      </ul>}
    </>
  )
}

export default FilterData;