import React from 'react'
import { InstagramOutlined, MailOutlined, FacebookOutlined} from '@ant-design/icons';
import './Footer.css';


function Footer() {
    return (
        <div className='footer'>
            <div className='foot-link'>
                <ul>
                    <li><a href="#">Web design</a></li>
                    <li><a href="#">Development</a></li>
                    <li><a href="#">Hosting</a></li>
                </ul>
            </div>

            <div className='foot-link'>
                <ul>
                    <li><a href="#">Company</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Legacy</a></li>
                </ul>
            </div>
           
           <div className="social-media">  
               <InstagramOutlined style={{ fontSize: '20px', color: '#08c' }}/>
               <MailOutlined style={{ fontSize: '20px', color: '#08c' }}/>
               <FacebookOutlined style={{ fontSize: '20px', color: '#08c' }}/>
           </div>
        </div>
    )
}

export default Footer
