import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import myApi from "../../service/service";
import "./Store.css";
import { AuthContext } from "../../context/AuthContext";
import Spinner from '../../components/Spinner/Spinner'
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Store = () => {
  const [products, setProducts] = useState(null)
  const [createIsOn, setCreateIsOn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('')
  // const [filteredList, setFilteredList] = useState('')
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const url = '/products'
    myApi
      .get(url)
      .then((res) => { setProducts(res.data) })
      .catch((error) => console.error(error));
  }, [searchKeyword]);

  if (!products) {
    return <Spinner />
  }
  const handleInputChange = (event) => {
    event.preventDefault();
    setCreateIsOn(!createIsOn)
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    setSearchKeyword('');
  }

  const filteredList = products.filter((item) => {
    return item.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const items = [
    { label: "HOME", link: "/" },
    { label: "オンラインストア", link: "/store", active: true },
  ];
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className="Store">
        <div className="container">
          <div className="title">
            <div>
              <h2>オンラインストア</h2>
              <h5>Kanraku Selection</h5>
            </div>
            <div>
              {user && user.isAdmin && <Link to={'/admin/products/create'} className='btn-product-create'>新規作成</Link>}
            </div>
            <div>
              <Search handleInputChange={handleInputChange} handleSearch={handleSearch} />
            </div>
          </div>
          <div className="productCard">
            {filteredList.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
