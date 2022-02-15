import React, { useState } from 'react'
import { Button, Form, Row, Modal, FormControl } from "react-bootstrap"

function UpdateProduct(props) {
    const [willUpdateProduct, setWillUpdateProduct] = useState(
        props.willUpdateProduct || {
            brandName: "",
            proName: "",
            ram: 0,
            ssd: 0,
            price: 0,
            numOfStock: 0
        }
    );

    const [validated, setValidated] = useState(false);

    const handleUpdateChange = (name, value) => {
        setWillUpdateProduct({
            ...willUpdateProduct,
            [name]: value
        })
    }

    const handleUpdateSubmit = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            await props.onSubmit(willUpdateProduct);
        }

        setValidated(true);
    }

    return (
        <div>
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Form noValidate validated={validated} onSubmit={handleUpdateSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row className="mb-3">
                            <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label><b>Brand</b></Form.Label>
                                <FormControl
                                    type="text"
                                    required
                                    onChange={(e) => handleUpdateChange("brandName", e.target.value)}
                                    value={willUpdateProduct.brandName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom02">
                                <Form.Label><b>Processor</b></Form.Label>
                                <FormControl
                                    type="text"
                                    required
                                    onChange={(e) => handleUpdateChange("proName", e.target.value)}
                                    value={willUpdateProduct.proName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom03">
                                <Form.Label><b>RAM (GB)</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleUpdateChange("ram", e.target.value)}
                                    value={willUpdateProduct.ram}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom04">
                                <Form.Label><b>SSD (GB)</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleUpdateChange("ssd", e.target.value)}
                                    value={willUpdateProduct.ssd}
                                />
                                <Form.Control.Feedback>Good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom05">
                                <Form.Label><b>Price (TL)</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleUpdateChange("price", e.target.value)}
                                    value={willUpdateProduct.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationCustom06">
                                <Form.Label><b>Number of stock</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleUpdateChange("numOfStock", e.target.value)}
                                    value={willUpdateProduct.numOfStock}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateProduct;