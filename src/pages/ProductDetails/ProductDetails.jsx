import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailedCard from '../../components/ProductDetailedCard/ProductDetailedCard';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const params = useParams()
  const items = [
    { label: "Home", link: "/" },
    { label: "オンラインストア", link: "/store" },
    { label: "商品の詳細", active: true },
  ];

  useEffect(() => {
    const url = `products/${params.id}`
    myApi.get(url)
      .then((res) => setProduct(res.data))
      .catch((error) => console.error(error))
  }, [])

  if (!product) {
    return <Spinner />
  }
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <ProductDetailedCard key={product._id} product={product} />
    </>
  )
}

export default ProductDetails