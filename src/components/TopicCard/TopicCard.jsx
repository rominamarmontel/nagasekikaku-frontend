import React from 'react';
import "./TopicCard.css"
import ConvertDate from '../Convertdate/Convertdate';
import { Link } from 'react-router-dom'

const TopicCard = (props) => {
  const topic = props.topic
  return (
    <div className="TopicCard">
      <Link to={`/topics/${topic._id}`}>
        <picture>
          <img src={topic.image} alt={topic.title} />
        </picture>
        <div className='title-topic'>
          <div>
            <p className='topic-date'><ConvertDate convertDate={topic.updatedAt}></ConvertDate></p>
            <p className='categoryTopicEvent'>{topic.categoryTopic}</p>
          </div>
          <p className='topic-title'>{topic.title}</p>
        </div>
      </Link>
    </div >
  )
}

export default TopicCard