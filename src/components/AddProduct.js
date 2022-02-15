import React, { useState } from 'react'
import { Button, Form, Row, Modal, FormControl } from "react-bootstrap"

function AddProduct(props) {
    const [willAddProduct, setWillAddProduct] = useState({
        brandName: "",
        proName: "",
        ram: 0,
        ssd: 0,
        price: 0,
        numOfStock: 0
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (name, value) => {
        setWillAddProduct({
            ...willAddProduct,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            event.preventDefault();
            event.stopPropagation();
            await props.onSubmit(willAddProduct);
        }

        setValidated(true);
    };

    return (
        <div>
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row className="mb-3">
                            <Form.Group md="4" controlId="validationBrand">
                                <Form.Label><b>Brand</b></Form.Label>
                                <FormControl
                                    type="text"
                                    required
                                    onChange={(e) => handleChange("brandName", e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationProcessor">
                                <Form.Label><b>Processor</b></Form.Label>
                                <FormControl
                                    type="text"
                                    required
                                    onChange={(e) => handleChange("proName", e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationRam">
                                <Form.Label><b>RAM (GB)</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleChange("ram", e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationSsd">
                                <Form.Label><b>SSD (GB)</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleChange("ssd", e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationPrice">
                                <Form.Label><b>Price (TL)</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleChange("price", e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the blank!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="validationStock">
                                <Form.Label><b>Number of stock</b></Form.Label>
                                <FormControl
                                    type="number"
                                    required
                                    onChange={(e) => handleChange("numOfStock", e.target.value)}
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

export default AddProduct;