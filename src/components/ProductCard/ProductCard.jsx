import React from 'react';
import { Link } from 'react-router-dom'
import './ProductCard.css'
import { useInView } from 'react-intersection-observer';

const ProductCard = (props) => {
  const product = props.product;
  const [productImageRef, isInView] = useInView({
    threshold: 0.5, // 画像が50%表示された時に検知する
    triggerOnce: true // 1回だけイベントを発火する
  });

  return (
    <div className="ProductCard">
      <div className='container'>
        <Link to={`/products/${product._id}`} >
          <picture ref={productImageRef}>
            <img src={product.image} alt={product.name} style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.5s ease' }} />
          </picture>
          <div>
            <p className='name'>{product.name}</p>
          </div>
        </Link>
        <div>
          <p className='price'>{product.price.toLocaleString()} 円</p>
        </div>
      </div>
    </div >
  )
}

export default ProductCard