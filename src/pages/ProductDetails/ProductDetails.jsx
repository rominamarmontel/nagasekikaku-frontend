import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailedCard from '../../components/ProductDetailedCard/ProductDetailedCard';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner'

const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const params = useParams()

  useEffect(() => {
    const url = `products/${params.id}`
    myApi.get(url)
      .then((res) => setProduct(res.data))
      .catch((e) => console.error(e))
  }, [])

  if (!product) {
    return <Spinner />
  }
  return (
    <>
      <ProductDetailedCard key={product._id} product={product} />
    </>
  )
}

export default ProductDetails