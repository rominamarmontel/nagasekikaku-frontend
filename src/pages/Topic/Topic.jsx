import React, { useState, useEffect, useContext } from "react";
import TopicCard from "../../components/TopicCard/TopicCard";
import { Link } from "react-router-dom";
import myApi from "../../service/service";
import "./Topic.css";
import { AuthContext } from "../../context/AuthContext";

const Topic = () => {
  const [topics, setTopics] = useState(null)
  const [createIsOn, setCreateIsOn] = useState(false);
  const isAdmin = true
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const url = `/topics`;
    myApi
      .get(url)
      .then((res) => setTopics(res.data))
      .catch((error) => console.error(error));
  }, []);

  if (!topics) {
    return <div className="Loading">Loading...</div>;
  }
  const handleInputChange = (event) => {
    setCreateIsOn(!createIsOn)
  };

  return (
    <>
      <div className="Topic">
        <div className="container">
          <div className="title">
            <div className="font">
              <h2>お知らせ</h2>
              <h5>Information from KANRAKU</h5>
            </div>
            <div className="SearchAndCreate">
              {true && <Link to={'/admin/topics/create'} className='btn-create'>Create</Link>}
              {/* {user && user.isAdmin && <Link to={'/admin/products/create'} className='btn-create'>Create</Link>} */}
            </div>
          </div>
          <div className="topicCard">
            {topics.map((topic) => {
              return <TopicCard key={topic._id} topic={topic} />;
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Topic