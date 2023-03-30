import React from 'react';
import "./TopicCard.css"
import ConvertDate from '../Convertdate/Convertdate';

const TopicCard = (props) => {
  const topic = props.topic
  return (
    <div className="TopicCard">
      <div className='title-topic'>
        <p><ConvertDate convertDate={topic.updatedAt}></ConvertDate></p>
        <h2>{topic.title}</h2>
      </div>
      <picture>
        <img src={topic.image} alt={topic.title} />
      </picture>
      <div>
        <p className='description'>{topic.description}</p>
      </div>
    </div >
  )
}

export default TopicCard