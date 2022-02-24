import React from 'react'
import Products from '../../components/Sales/List/Products';

function SalesScreen() {
  return (

    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          
        </nav>
      </div>

      <div className="col-md-7">
        <Products />
      </div>

    </div>

  )
}

export default SalesScreen;