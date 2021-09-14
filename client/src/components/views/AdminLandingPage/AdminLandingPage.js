import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { cakes, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import toCurrency from '../../utils/FormatPrice';
import Button from 'react-bootstrap/Button';

const { Meta } = Card;

function AdminLandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        cakes: [],
        price: []
    })

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)

    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <div>
                <a href={`/product/${product._id}`}>
                    <Card
                        hoverable={true}
                        cover={<ImageSlider images={product.images} />}>
                        <Meta
                            title={product.title}
                            description={`${toCurrency(product.price)}`}
                        />
                    </Card>
                </a>
                <button 
                    onClick={ (e) => {
                            console.log(`${product._id}`);
                            alert("Want to delete?");
                            Axios.delete('/api/product/'+product._id)
                            .then(response => { 
                                console.log(response.data)
                                window.location.reload();
                            });
                        }
                    } 
                    className="deletebtn">
                    Delete
                </button>
            </div>
        </Col>
    })

    const showFilteredResults = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filters
        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)
        getProducts(variables)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={cakes}
                        handleFilters={filters => handleFilters(filters, "cakes")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>

            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />
            </div>

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>
                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore} className="load-more-btn">Load More</button>
                </div>
            }
        </div>
    )
}

export default AdminLandingPage
