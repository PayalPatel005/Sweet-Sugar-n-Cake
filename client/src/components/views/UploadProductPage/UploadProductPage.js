import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const cakes = [
    { key: 1, value: "Chocolate Chips"},
    { key: 2, value: "Black/White Forest"},
    { key: 3, value: "Rainbow Cake"},
    { key: 4, value: "Strawberry Cake"},
    { key: 5, value: "Fruit Cake"},
    { key: 6, value: "Cup Cake"},
    { key: 7, value: "Theme Cake"}
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState()
    const [CakeValue, setCakeValue] = useState(1)
    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCakesSelectChange = (event) => {
        setCakeValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {

        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !CakeValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            cakes: CakeValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/admin')
                } else {
                    alert('Failed to upload Product')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Cake </Title>
            </div>  
            <div className="upload-form">          
                <Form onSubmit={onSubmit} >

                    <FileUpload refreshFunction={updateImages} />

                    <br/><br/>
                    <label>Title</label>
                    <Input onChange={onTitleChange} value={TitleValue}/>

                    <br/><br/>
                    <label>Description</label>
                    <TextArea onChange={onDescriptionChange} value={DescriptionValue}/>

                    <br/><br/>
                    <label>Price(₹)</label>
                    <Input onChange={onPriceChange} value={PriceValue} type="number"/>

                    <br/><br/>
                    <label>Category</label>
                    <select className='ant-input' onChange={onCakesSelectChange} value={CakeValue}>
                        {cakes.map(item => (
                            <option key={item.key} value={item.key}>{item.value} </option>
                        ))}
                    </select>

                    <br/><br/>
                    <Button onClick={onSubmit}>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default UploadProductPage
