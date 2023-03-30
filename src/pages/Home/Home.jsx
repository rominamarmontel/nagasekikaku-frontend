import React, { useState, useEffect } from 'react'
import './Home.css'
import './main'
import ProductCard from '../../components/ProductCard/ProductCard'
import myApi from '../../service/service';
import TopicCard from '../../components/TopicCard/TopicCard';
import ConvertDate from '../../components/Convertdate/Convertdate';
import Spinner from '../../components/Spinner/Spinner'

const Home = () => {
  const [products, setProducts] = useState(null)
  const [topics, setTopics] = useState(null)

  useEffect(() => {
    const urlProduct = '/products'
    myApi.get(urlProduct)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e))
  }, [])
  useEffect(() => {
    const urlTopic = '/topics'
    myApi.get(urlTopic)
      .then((res) => setTopics(res.data))
      .catch((e) => console.error(e))
  }, [])

  if (!products || !topics) {
    return <Spinner />
  }
  // carousel image
  return (
    <>
      <div className='Home'>
        <section className="slider">
          <div className="slides">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />
            <input type="radio" name="radio-btn" id="radio4" />

            <div className="slide first">
              <img src="/images/chris-barbalis-LBnCbaWBeDI-unsplash.jpg" alt="picture1" />
            </div>
            <div className="slide">
              <img src="/images/s-tsuchiya-OHkUl23cmPI-unsplash.jpg" alt="picture2" />
            </div>
            <div className="slide">
              <img src="/images/jase-bloor-oCZHIa1D4EU-unsplash.jpg" alt="picture3" />
            </div>
            <div className="slide">
              <img src="/images/s-tsuchiya-OeCJupSiHjs-unsplash.jpg" alt="picture4" />
            </div>
            <div className="navigation-auto">
              <div className="auto-btn1"></div>
              <div className="auto-btn2"></div>
              <div className="auto-btn3"></div>
              <div className="auto-btn4"></div>
            </div>
          </div>
          <div className="navigation-manual">
            <label htmlFor="radio1" className="manual-btn"></label>
            <label htmlFor="radio2" className="manual-btn"></label>
            <label htmlFor="radio3" className="manual-btn"></label>
            <label htmlFor="radio4" className="manual-btn"></label>
          </div>
          <div className="slider-text">
            <h1>KANRAKU HOSAI</h1>
          </div>
        </section>
        <section className='home-contents'>
          <div className='new-topics'>
            <div className='container'>
              <h2>お知らせ</h2>
              <h5>Information & news</h5>
              <div className='scroll'>
                <div className='Home-topicCard'>
                  {/* {topics.map((topic) => {
                return <TopicCard key={topic._id} topic={topic} />
              })} */}
                  <div className='topic0'>
                    <picture>
                      <img src={topics[0].image} alt={topics[0].title} />
                    </picture>
                    <div>
                      <h3>{topics[0].title}</h3>
                      <p><ConvertDate convertDate={topics[0].updatedAt} /></p>
                    </div>
                    <p>{topics[0].description}</p>
                  </div>
                  <div className='topic-right'>
                    <div className='topic1'>
                      <picture>
                        <img src={topics[1].image} alt={topics[1].title} />
                      </picture>
                      <div>
                        <p className='date'><ConvertDate convertDate={topics[1].updatedAt} /></p>
                        <h3>{topics[1].title}</h3>
                        <p>{topics[1].description}</p>
                      </div>
                    </div>
                    <div className='topic2'>
                      <picture>
                        <img src={topics[2].image} alt={topics[1].title} />
                      </picture>
                      <div>
                        <p className='date'><ConvertDate convertDate={topics[1].updatedAt} /></p>
                        <h3>{topics[2].title}</h3>
                        <p>{topics[2].description}</p>
                      </div>
                    </div>
                    <div className='topic3'>
                      <picture>
                        <img src={topics[3].image} alt={topics[3].title} />
                      </picture>
                      <div>
                        <p className='date'><ConvertDate convertDate={topics[3].updatedAt} /></p>
                        <h3>{topics[3].title}</h3>
                        <p>{topics[3].description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='new-products'>
            <div className='container'>
              <h2>新着情報</h2>
              <h5>New Items</h5>
              <div className='scroll'>
                <div className='Home-productCard'>
                  {products.map((product) => {
                    return <ProductCard key={product._id} product={product} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <script src="./main.jsx"></script>
      </div>
    </>
  )
}

export default Home