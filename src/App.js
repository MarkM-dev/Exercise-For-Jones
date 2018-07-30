import React from 'react';
import './App.css';
import { Formik } from 'formik';


const CONSTS = {
    VALIDATION_FIRST_NAME: "firstName",
    VALIDATION_LAST_NAME: "lastName",
    VALIDATION_EMAIL: "email",
    VALIDATION_PHONE_NUMBER: "phoneNumber",
    CONFIG_FIELD_MIN_CHARS: 2,
    CONFIG_FIELD_PHONE_NUMBER_ALLOWED_CHARS_COUNT: 10,
    FORM_TITLE: "Jones Form",
    LABEL_FIRST_NAME: "First Name: ",
    LABEL_LAST_NAME: "Last Name: ",
    LABEL_EMAIL: "Email: ",
    LABEL_PHONE_NUMBER: "Phone Number: ",
    SUBMIT_BTN: "Submit",
    SUBMIT_BTN_WORKING: "Sending..",
    ERR_EMPTY_FIELD: "This field is Required",
    ERR_MIN_2_CHARS: "Please enter at least 2 letters",
    ERR_CHARS_NOT_COMPLIANT_AZaz: "Please use only letters in English",
    ERR_CHARS_NOT_COMPLIANT_PHONE_NUMBER: "Please use only numbers",
    ERR_EMAIL_NOT_VALID: "Please enter a valid email address",
    ERR_PHONE_NUMBER_CHAR_NUM: "Please enter exactly 10 digits",
    EMAIL_SUBJECT: "New Lead",
    RECIPIENT_EMAIL_ADDRESS: "markm.dev@gmail.com",
    RECIPIENT_NAME: "Mark M",
    SENDER_EMAIL_ADDRESS: "leads@jones-app.com",
    SENDER_NAME: "Lead Bot",
    SUBMIT_SUCCESS: "Successfully submitted.",
    ERR_SUBMIT_FAILED: "Oops, something went wrong.",
};

let validator = {
    isFieldEmpty: function (value) {
        return !value;
    },
    isValueMinimumChars: function (value) {
        return value.length >= CONSTS.CONFIG_FIELD_MIN_CHARS;
    },
    isValueCharPatternCompliant: function (value, field) {
        switch (field) {
            case CONSTS.VALIDATION_FIRST_NAME:
                return /^[a-zA-Z]+$/.test(value);

            case CONSTS.VALIDATION_LAST_NAME:
                return /^[a-zA-Z]+$/.test(value);

            case CONSTS.VALIDATION_EMAIL:
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

            case CONSTS.VALIDATION_PHONE_NUMBER:
                return /^\d+$/.test(value);

            default:
                return true;
        }
    }
};

const Basic = () => (
    <div className="app" >

        <h1>{CONSTS.FORM_TITLE}</h1>

        <Formik
            initialValues = {{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            }}
            validate = {values => {
                let errors = {};

                let validateFieldAndSetErrors = function (value, field) {

                    if (validator.isFieldEmpty(value)) {
                        errors[field] = CONSTS.ERR_EMPTY_FIELD;
                        return;
                    }

                    switch(field) {
                        case CONSTS.VALIDATION_FIRST_NAME:
                            if (!validator.isValueMinimumChars(value)) {
                                errors[field] = CONSTS.ERR_MIN_2_CHARS;
                            } else {
                                if (!validator.isValueCharPatternCompliant(value, field)) {
                                    errors[field] = CONSTS.ERR_CHARS_NOT_COMPLIANT_AZaz;
                                }
                            }
                            break;

                        case CONSTS.VALIDATION_LAST_NAME:
                            if (!validator.isValueMinimumChars(value)) {
                                errors[field] = CONSTS.ERR_MIN_2_CHARS;
                            } else {
                                if (!validator.isValueCharPatternCompliant(value, field)) {
                                    errors[field] = CONSTS.ERR_CHARS_NOT_COMPLIANT_AZaz;
                                }
                            }
                            break;

                        case CONSTS.VALIDATION_EMAIL:
                            if (!validator.isValueCharPatternCompliant(values.email, CONSTS.VALIDATION_EMAIL)) (
                                errors.email = CONSTS.ERR_EMAIL_NOT_VALID
                            );
                            break;

                        case CONSTS.VALIDATION_PHONE_NUMBER:
                            if (!validator.isValueCharPatternCompliant(values.phoneNumber, CONSTS.VALIDATION_PHONE_NUMBER)) {
                                errors.phoneNumber = CONSTS.ERR_CHARS_NOT_COMPLIANT_PHONE_NUMBER
                            } else {
                                if (values.phoneNumber.length !== CONSTS.CONFIG_FIELD_PHONE_NUMBER_ALLOWED_CHARS_COUNT) {
                                    errors.phoneNumber = CONSTS.ERR_PHONE_NUMBER_CHAR_NUM
                                }
                            }
                            break;

                        default:
                            return true;
                    }
                };

                validateFieldAndSetErrors(values.firstName, CONSTS.VALIDATION_FIRST_NAME);
                validateFieldAndSetErrors(values.lastName, CONSTS.VALIDATION_LAST_NAME);
                validateFieldAndSetErrors(values.email, CONSTS.VALIDATION_EMAIL);
                validateFieldAndSetErrors(values.phoneNumber, CONSTS.VALIDATION_PHONE_NUMBER);

                return errors;
            }}
            onSubmit = {(values, {setSubmitting}) => {
                setSubmitting(true);

                let body = {
                    "personalizations": [
                        {
                            "to": [{
                                    "email": CONSTS.RECIPIENT_EMAIL_ADDRESS,
                                    "name": CONSTS.RECIPIENT_NAME
                                    }],
                            "subject": CONSTS.EMAIL_SUBJECT
                        }
                    ],
                    "from": {
                        "email": CONSTS.SENDER_EMAIL_ADDRESS,
                        "name": CONSTS.SENDER_NAME
                    },
                    "reply_to": {
                        "email": CONSTS.SENDER_EMAIL_ADDRESS,
                        "name": CONSTS.SENDER_NAME
                    },
                    "content": [{
                        type: "text/html",
                        value:
                        "<div>" + CONSTS.LABEL_FIRST_NAME + values.firstName + "</div>" +
                        "<div>" + CONSTS.LABEL_LAST_NAME + values.lastName + "</div>" +
                        "<div>" + CONSTS.LABEL_EMAIL + values.email + "</div>" +
                        "<div>" + CONSTS.LABEL_PHONE_NUMBER + values.phoneNumber + "</div>"
                    }]
                };

                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(body)
                };

                fetch('https://jonesmarkm.herokuapp.com/v3/mail/send', requestOptions).then(
                    function(response) {
                        if (response.status === 202) {
                            alert(CONSTS.SUBMIT_SUCCESS);
                        } else {
                            alert(CONSTS.ERR_SUBMIT_FAILED);
                        }
                    }
                ).finally(function () {
                    setSubmitting(false);
                });
            }}
            render = {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>

                    <div className="formInnerContainer" >

                        <div className="inputContainer" >
                            <label htmlFor="firstName" className="control-label">{CONSTS.LABEL_FIRST_NAME}</label>
                            <input type="text" name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
                        </div>
                        <div className="errContainer" >{touched.firstName && errors.firstName && <div>{errors.firstName}</div>}</div>

                        <div className="inputContainer" >
                            <label htmlFor="lastName" className="control-label">{CONSTS.LABEL_LAST_NAME}</label>
                            <input type="text" name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
                        </div>
                        <div className="errContainer" >{touched.lastName && errors.lastName && <div>{errors.lastName}</div>}</div>

                        <div className="inputContainer" >
                            <label htmlFor="email" className="control-label">{CONSTS.LABEL_EMAIL}</label>
                            <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                        </div>
                        <div className="errContainer" > {touched.email && errors.email && <div>{errors.email}</div>}</div>

                        <div className="inputContainer" >
                            <label htmlFor="phoneNumber" className="control-label">{CONSTS.LABEL_PHONE_NUMBER}</label>
                            <input type="text" name="phoneNumber" maxLength={CONSTS.CONFIG_FIELD_PHONE_NUMBER_ALLOWED_CHARS_COUNT} onChange={handleChange} onBlur={handleBlur} value={values.phoneNumber} />
                        </div>
                        <div className="errContainer" >{touched.phoneNumber && errors.phoneNumber && <div>{errors.phoneNumber}</div>}</div>

                    </div>

                    <br/>
                    <button type="submit" disabled={isSubmitting} >{isSubmitting ? CONSTS.SUBMIT_BTN_WORKING : CONSTS.SUBMIT_BTN}</button>

                </form>
            )}
        />
    </div>
);

export default Basic;