import React from 'react';

const Contact = () => {
    return (
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <h2>Contact Information</h2>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Adress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>Payal Patel</td>
                      <td>+91 XXXX XXX XXX</td>
                      <td>Ahmedabad, India</td>
                    </tr>
                    <tr>
                      <td>Shruti Shah</td>
                      <td>+91 XXXX XXX XXX</td>
                      <td>Delhi, India</td>
                    </tr>
                    <tr>
                      <td>Harsh Singh</td>
                      <td>+91 XXXX XXX XXX</td>
                      <td>Mumbai, India</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
};

export default Contact;


