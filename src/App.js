import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import CardExpiry from "./CardExpiry";

const App = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            currency: "",
            phone: "",
            expiry: "",
        },
    });

    console.log("errors = ", errors);

    const onSubmit = (data) => {
        console.log("data = ", data);
        console.log("data.phone.length = ", data.phone.length);
    };

    return (
        <>
            <section className="py-4">
                <Container>
                    <Row>
                        <Col md={8} className="mx-auto">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {/* name */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formName"
                                >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        {...register("name", {
                                            required: "Name is required.",
                                            validate: {
                                                maxLength: (v) =>
                                                    v.length <= 30 ||
                                                    "The name should have maximum 30 characters",
                                                matchPattern: (v) =>
                                                    /^[a-zA-Z0-9_]+$/.test(v) ||
                                                    "Name is invalid.",
                                            },
                                        })}
                                        type="text"
                                        placeholder="Enter name"
                                        className={`${
                                            errors.name
                                                ? "form-control-error"
                                                : ""
                                        }`}
                                    />
                                    {errors.name?.message && (
                                        <Form.Text
                                            as={Col}
                                            className="form-error"
                                        >
                                            {errors.name?.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* email */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formEmail"
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        {...register("email", {
                                            required: "Email is required.",
                                            validate: {
                                                maxLength: (v) =>
                                                    v.length <= 50 ||
                                                    "The email should have at most 50 characters.",
                                                matchPattern: (v) =>
                                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                                        v
                                                    ) ||
                                                    "Email address must be a valid address.",
                                            },
                                        })}
                                        type="email"
                                        placeholder="Enter email"
                                        className={`${
                                            errors.email
                                                ? "form-control-error"
                                                : ""
                                        }`}
                                    />
                                    {errors.email?.message && (
                                        <Form.Text
                                            as={Col}
                                            className="form-error"
                                        >
                                            {errors.email?.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* password */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formPassword"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        {...register("password", {
                                            required: "Password is required.",
                                            validate: {
                                                matchPattern: (v) =>
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(
                                                        v
                                                    ) ||
                                                    "Required at least 8 characters, with at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                                            },
                                        })}
                                        type="password"
                                        placeholder="Enter password"
                                        className={`${
                                            errors.password
                                                ? "form-control-error"
                                                : ""
                                        }`}
                                    />
                                    {errors.password?.message && (
                                        <Form.Text
                                            as={Col}
                                            className="form-error"
                                        >
                                            {errors.password?.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* currency */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formCurrency"
                                >
                                    <Form.Label>
                                        Currency (React number format)
                                    </Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "Currency is required.",
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <NumericFormat
                                                value={value}
                                                prefix="$"
                                                thousandSeparator
                                                customInput={Form.Control}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                placeholder="$##,###"
                                                className={`${
                                                    errors.password
                                                        ? "form-control-error"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                        name="currency"
                                    />
                                    {errors.currency?.message && (
                                        <Form.Text
                                            as={Col}
                                            className="form-error"
                                        >
                                            {errors.currency?.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* phone */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formPhone"
                                >
                                    <Form.Label>
                                        Phone (React number format)
                                    </Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "Phone is required.",
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <PatternFormat
                                                format="+91 (###) ###-####"
                                                mask="#"
                                                customInput={Form.Control}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                valueIsNumericString={true}
                                                placeholder="+91 (###) ###-####"
                                                className={`${
                                                    errors.phone
                                                        ? "form-control-error"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                        name="phone"
                                    />
                                    {errors.phone?.message && (
                                        <Form.Text
                                            as={Col}
                                            className="form-error"
                                        >
                                            {errors.phone?.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* card expiry */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formCardExpiry"
                                >
                                    <Form.Label>Card Expiry</Form.Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "Expiry is required.",
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <CardExpiry
                                                mask="_"
                                                allowEmptyFormatting
                                                customInput={Form.Control}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                className={`${
                                                    errors.phone
                                                        ? "form-control-error"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                        name="expiry"
                                    />
                                    {errors.expiry?.message && (
                                        <Form.Text
                                            as={Col}
                                            className="form-error"
                                        >
                                            {errors.expiry?.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* agree terms */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="formCheckbox"
                                >
                                    <Form.Check
                                        {...register("agree", {
                                            required: true,
                                        })}
                                        type="checkbox"
                                        id="default-checkbox"
                                        label="I agree to Terms and Conditions."
                                        className={`${
                                            errors.agree
                                                ? "form-control-error"
                                                : ""
                                        }`}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default App;
