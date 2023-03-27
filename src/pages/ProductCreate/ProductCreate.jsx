import React, { useState } from 'react'
import Confetti from 'react-confetti'
import './ProductCreate.css'
import myApi from '../../service/service'
import { useNavigate } from 'react-router-dom'

const ProductCreate = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [imageFile, setImageFile] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData();

      formData.append("image", imageFile);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("countInStock", countInStock);
      formData.append("description", description);

      const productToCreate = { name, image, brand, category, description, price, countInStock }

      const response = await myApi.post('/products/create', formData)
      if (!productToCreate) {
        setMessage('Please enter product information')
      }
      if (response.status === 201) {
        setShowConfetti(true)

        setTimeout(() => {
          setShowConfetti(false)
          navigate('/store')
        }, 3000)
      }
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='ProductCreatePage'>
        <div className='container'>
          <div>
            <h2>ADMIN PAGE</h2>
            <h5>CREATE A PRODUCT</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='form-box'>
              <div>
                <label htmlFor="name">Name:</label>
                <div>
                  <input
                    type='text'
                    value={name}
                    name="name"
                    id="name"
                    onChange={(event) => setName(event.target.value)}
                  ></input>
                </div>

                <label htmlFor="brand">Brand: </label>
                <div>
                  <input
                    type='text'
                    value={brand}
                    name="brand"
                    id="brand"
                    onChange={(event) => setBrand(event.target.value)}
                  ></input>
                </div>
                <label htmlFor="category">Category: </label>
                <div>
                  <input
                    type='text'
                    value={category}
                    name="category"
                    id="category"
                    onChange={(event) => setCategory(event.target.value)}
                  ></input>
                </div>
                <label htmlFor="price">Price: </label>
                <div>
                  <input
                    type='number'
                    value={price}
                    name="price"
                    id="price"
                    min='1'
                    onChange={(event) => setPrice(event.target.value)}
                  ></input>
                </div>
                <label htmlFor="countInStock">Count in stock: </label>
                <div>
                  <input
                    type='number'
                    value={countInStock}
                    name="countInStock"
                    id="countInStock"
                    min='0'
                    onChange={(event) => setCountInStock(event.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <label htmlFor="edit-image">Image:</label>
                <div>
                  <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
                <label htmlFor="description">Description: </label>
                <div>
                  <textarea
                    type='text'
                    value={description}
                    name="description"
                    id="description"
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div>{message}</div>
            <button>Create</button>
            {showConfetti && <Confetti recycle={false} />}
          </form>
        </div>
      </div>
    </>
  )
}

export default ProductCreate