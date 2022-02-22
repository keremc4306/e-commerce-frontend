import React from 'react'
import FilterData from '../../components/Sales/FilterPanel/FilterData';
import Products from '../../components/Sales/List/Products';
import '../../components/Sales/SalesScreen.css';

function SalesScreen() {
  return (
    <div className="home row">
    
      <div className="home_panelList-wrap">
      <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" >
                                        <span data-feather="file"></span>
                                        Orders
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" >
                                        <span data-feather="users"></span>
                                        Customers
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" >
                                        <span data-feather="bar-chart-2"></span>
                                        Reports
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        
        <div className="home_panel-wrap col-md-3 px-md-3">
          <FilterData />
        </div>
        
        <div className="home_list-wrap col-md-9">
          <Products />
        </div>

      </div>
    </div>
  )
}

export default SalesScreen;