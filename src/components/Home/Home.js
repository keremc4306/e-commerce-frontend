import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Row, Modal } from "react-bootstrap"

function Home() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("")

    const [loginModalOnShow, setLoginModalOnShow] = useState(false);

    const [validated, setValidated] = useState(false);

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const loginStockScreen = () => {
        setLoginModalOnShow(true);
    }

    const closeLogin = () => {
        setLoginModalOnShow(false);
    }

    let navigateStList = useNavigate();
    const goStockScreen = () => {
        if (user.email === "mkc@mail.com" && user.password === "mkc222") {
            let path = `/stock-list`;
            navigateStList(path);
        } else {
            setError("Email or password incorrect");
        }
    }

    let navigateSales = useNavigate();
    const enterSalesScreen = () => {
        let path = `/sales`;
        navigateSales(path);
    }

    return (

        <div className="position-absolute bottom-50 bottom-left-20">
            <Modal show={loginModalOnShow} onHide={setLoginModalOnShow}>
                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>)}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    type="email"
                                    required
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={(e) => handleChange("email", e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Oops!
                                </Form.Control.Feedback>
                                <br></br>
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    type="password"
                                    required
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={(e) => handleChange("password", e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Oops!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeLogin}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" onClick={goStockScreen}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <button style={{ marginLeft: "130px" }} className="btn btn-info" onClick={() => loginStockScreen()}>Stock Screen</button>
            <button style={{ marginLeft: "360px" }} className="btn btn-success" onClick={() => enterSalesScreen()}>Sales Screen</button>
        </div>

    )
}

export default Home;