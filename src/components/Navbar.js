import React from 'react';

import { useBasketContext } from "../context/basket/BasketContext";
import { Badge, Dropdown } from "react-bootstrap";

function Navbar() {
    const { basketState: { items } } = useBasketContext();
    return (
        <div>
            <header className="navbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Stock Tracking and Sales</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <Dropdown style={{marginRight:30}}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {`${items.length} item(s)`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {items.length > 0 ? items.map(basketItem => 
                            <Dropdown.Item key={basketItem.item.itemNo}>
                                {basketItem.item.itemNo} - {basketItem.item.brandName +' '+ basketItem.item.proName} 
                                <Badge bg={basketItem.count === 1 ? "danger" : "success"} style={{marginLeft: 10}}>{basketItem.count}</Badge>
                                {/* <Badge bg={basketItem.count === 1 ? 'warning' : "info"} style={{marginLeft: 10}}>X</Badge */}
                            </Dropdown.Item>
                        )
                        : <Dropdown.Item>Basket is empty</Dropdown.Item>}
                        {
                           items.length> 0 ? 
                            <>
                            <Dropdown.Divider />
                            <Dropdown.Item active>Basket Detail</Dropdown.Item>
                            </> : null
                        }
                        
                    </Dropdown.Menu>
                </Dropdown>
            </header>
            <br></br>


        </div>
    )
}

export default Navbar;