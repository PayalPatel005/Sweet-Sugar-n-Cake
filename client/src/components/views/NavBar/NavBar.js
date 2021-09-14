import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import {RightOutlined} from '@ant-design/icons';

function NavBar() {
  
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ zIndex: 5, width: '100%' }}>

      <div className="menu__logo">
        <a href="/" style={{fontSize:24, color:'black', fontWeight:'bold'}}>
          Sweet Sugar n' Cake
        </a>
      </div>
      <div className="menu__container">
        
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
        
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <RightOutlined />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar