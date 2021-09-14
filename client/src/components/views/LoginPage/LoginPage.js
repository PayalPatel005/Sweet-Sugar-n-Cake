import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const isAdminChecked = localStorage.getItem("isAdmin") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [isAdmin, setIsAdmin] = useState(isAdminChecked)

  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin)
  };

  const initialEmail = '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (isAdmin === true) {
                  window.localStorage.setItem('isAdmin', 1);
                  props.history.push("/admin");
                } else {
                  window.localStorage.setItem('isAdmin', 0);
                  props.history.push("/");
                }
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <div className="app">

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} className='upload-form' style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <Checkbox id="isAdmin" onChange={handleIsAdmin} checked={isAdmin} >Is admin!</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right', color:'yellow' }}>
                  Forgot Password
                </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%', marginTop: 8, marginBottom: 5 }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                  </Button>
                </div>
                Or <a href="/register" style={{color:'yellow'}}>Register Now!</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


