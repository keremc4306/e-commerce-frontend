import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import ProductService from '../../../services/ProductService';

function FilterData() {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filterBrandList, setFilterBrandList] = useState([]);
    const [activeFilter, setActiveFilter] = useState([]);

    useEffect(() => {
      // ProductService.getProducts().then(
      //   response => {
      //     setProducts(response.data);
      //   });
      getAllProducts();
      getAllBrands();
    }, [products, brands]);

    const getAllProducts = () => {
      ProductService.getProducts().then(response => setProducts(response.data));
    }

    const getAllBrands = (brands) => {
      ProductService.getBrands(brands).then(response => setBrands(response.data));
    }

    /* let filterB = [...products];
    const handleToggle = (e) => {
      if (true) {
        filterB = filterB.filter(itemNo => itemNo.brandName === e.target.value)
        console.log(filterB)
      } 
      
    } */

    const onFilterChange = (filter) => {
      if (filter === "ALL") {
        if (activeFilter.length === filterBrandList.length) {
          setFilterBrandList({activeFilter: []});
        } else {
          setFilterBrandList({activeFilter: filterBrandList.map(filter => filter.value)});
        }
      } else {
        if (activeFilter.includes(filter)) {
          const filterIndex = activeFilter.indexOf(filter);
          const newFilter = [...activeFilter];
          newFilter.splice(filterIndex, 1);
          setActiveFilter({ activeFilter: newFilter });
        } else {
          setActiveFilter({ activeFilter: [...activeFilter, filter] });
        }
      }
    }
    

    return (
      <div>
        <ul className="list-group">
          {brands.map((value, index) =>
            <li className="list-group-item" key={index}>
              <Checkbox
                onChange={onFilterChange}
                value = {value}
                 /> {value}
            </li>

          )}
        </ul>
      </div>
    )
}

export default FilterData;