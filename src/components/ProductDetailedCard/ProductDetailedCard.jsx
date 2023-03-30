import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetailedCard.css";
import myApi from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import ProductEditForm from "../ProductEditForm/ProductEditForm";
import Accordion from 'react-bootstrap/Accordion';

const ProductDetailedCard = () => {
  const [editIsOn, setEditIsOn] = useState(false);
  const [deleteIsOn, setDeleteIsOn] = useState(false);
  const [qty, setQty] = useState(0);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  //Click Cart button
  const addToCartHandler = async () => {
    if (!user) {
      return navigate("/login");
    }
    if (qty === 0) {
      setMessage('数量を指定してください')
    } else {
      await myApi.post(`/cart/add`, { product: product._id, qty });
      navigate("/cart");
    }
  };

  useEffect(() => {
    const url = `/products/${productId}`;
    myApi
      .get(url)
      .then((res) => {
        setProduct(res.data.oneProduct);
        setName(res.data.oneProduct.name);
        setImage(res.data.oneProduct.image);
        setBrand(res.data.oneProduct.brand);
        setCategory(res.data.oneProduct.category);
        setPrice(res.data.oneProduct.price);
        setCountInStock(res.data.oneProduct.countInStock);
        setDescription(res.data.oneProduct.description);
      })
      .catch((e) => console.error(e));
  }, []);

  const editHandler = async (event) => {
    event.preventDefault();
    setEditIsOn(!editIsOn);
  }
  //Click to delete a product
  const deleteHandler = async (event) => {
    event.preventDefault;
    setDeleteIsOn(!deleteIsOn);
    const url = `/products/${productId}/`;
    try {
      await myApi.delete(url);
      setDeleteIsOn(!deleteIsOn);
      navigate("/store");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ProductDetailedCard">
      <div className="container">
        {user && user.isAdmin && (
          <button className="btn-block" type="button" onClick={editHandler}>
            編集する
          </button>
        )}
        {user && user.isAdmin && (
          <button className="btn-block" type="button" onClick={deleteHandler}>
            削除する
          </button>
        )}
        {editIsOn ? (
          <ProductEditForm />
        ) : (
          <>
            <div className="product-details">
              <picture>
                <img src={product.image} alt={product.name} />
              </picture>
              <div className="product-details-right">
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <h2 className="h2">{product.name}</h2>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <h5 className="h5">{product.category}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <p className="price">{product.price} 円<small>(税込)</small></p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="brand"><h4>ブランド名：</h4></label>
                        </td>
                        <td>
                          <p className="brand">{product.brand}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}<h4>
                            {product.countInStock > 0
                              ? `在庫：`
                              : `在庫なし：`}</h4>
                        </td>
                        <td>
                          <p className="countInStock">
                            {" "}
                            {product.countInStock > 0
                              ? `${product.countInStock}`
                              : "0"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="qty"><h4>数量：</h4></label>
                        </td>
                        <td className="countInstock">
                          <input
                            type="number"
                            name="qty"
                            min="0"
                            max={product.countInStock}
                            value={qty}
                            onChange={({ target }) =>
                              setQty(Number(target.value))
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ color: '#FF0000' }}>{message}</div>
                  <button
                    onClick={addToCartHandler}
                    className="btn-cart"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    購入する
                  </button>
                  <div className="description">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailedCard;