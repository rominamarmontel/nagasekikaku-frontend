import React from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const About = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "歓楽宝斎について", active: true },
  ];
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div>About</div>
    </>
  )
}

export default About