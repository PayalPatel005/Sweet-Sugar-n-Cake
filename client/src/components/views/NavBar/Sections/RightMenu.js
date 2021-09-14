/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  const user = useSelector(state => state.user)
  let isAdmin = localStorage.getItem("isAdmin")

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login" style={{fontSize:16}}>Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register" style={{fontSize:16}}>Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

        <SubMenu title={
          <a href="/" style={{fontSize:16}}>Home</a>}>
        </SubMenu>

        {isAdmin==0 ?
        <Menu.Item key="mail">
          <a href="/contact" style={{fontSize:16}}>Contact Us</a>
        </Menu.Item>
        :<Menu.Item key="mail">
        </Menu.Item>} 

        {isAdmin==0 ?
        <Menu.Item key="history">
          <a href="/history" style={{fontSize:16}}>History</a>
        </Menu.Item>
        :<Menu.Item key="history">
        </Menu.Item>} 

        {isAdmin==1 ?  
          <Menu.Item key="upload">
          <a href="/product/upload" style={{fontSize:16}}>Upload</a>
        </Menu.Item>
         :<Menu.Item key="upload">
        </Menu.Item>} 

        {isAdmin==0 ?
        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <a href="/user/cart" style={{ marginRight: -22 , color:'#667777', fontSize:16}}>Cart</a>
          <Badge style={{marginLeft: 10, marginBottom: 20}} count={user.userData && user.userData.cart.length}>
          </Badge>
        </Menu.Item>
        :<Menu.Item key="cart">
        </Menu.Item>} 

        <Menu.Item key="logout">
          <a onClick={logoutHandler} style={{fontSize:16}}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

