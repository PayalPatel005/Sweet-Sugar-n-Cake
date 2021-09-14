import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import toCurrency from '../../../utils/FormatPrice'

function ProductInfo(props) {

    const [Product, setProduct] = useState({})
    let isAdmin = localStorage.getItem("isAdmin")

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> {Product.price?toCurrency(Product.price):'Loading...'}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            {isAdmin==0 ?
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                Add to Cart
                </Button>
                :''} 
            </div>
        </div>
    )
}

export default ProductInfo
