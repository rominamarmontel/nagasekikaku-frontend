import React from 'react';
import "./TopicCard.css"
import ConvertDate from '../Convertdate/Convertdate';

const TopicCard = (props) => {
  const topic = props.topic
  return (
    <div className="TopicCard">
      <div className='container'>
        <h3>{topic.title}</h3>
        <picture>
          <img src={topic.image} alt={topic.title} />
        </picture>
        <div>
          <p><ConvertDate convertDate={topic.updatedAt}></ConvertDate></p>
        </div>
        <div>
          <p className='description'>{topic.description}</p>
        </div>
      </div>
    </div >
  )
}

export default TopicCard