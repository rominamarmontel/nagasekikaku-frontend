import React from 'react';
import "./TopicCard.css"
import ConvertDate from '../Convertdate/Convertdate';

const TopicCard = (props) => {
  const topic = props.topic
  return (
    <div className="TopicCard">
      <picture>
        <img src={topic.image} alt={topic.title} />
      </picture>
      <div className='title-topic'>
        <p><ConvertDate convertDate={topic.updatedAt}></ConvertDate></p>
        <p>{topic.title}</p>
      </div>
    </div >
  )
}

export default TopicCard