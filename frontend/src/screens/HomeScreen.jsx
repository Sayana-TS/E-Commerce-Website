import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productApiSlice'
import { Row, Col } from 'react-bootstrap'

function HomeScreen() {

  const { userInfo } = useSelector((state) => state.auth)

  let { data: products, isLoading, error } = useGetProductsQuery()

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message}</Message>
      ) : (
        <>
          <Row>
            {products?.products?.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen