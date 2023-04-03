import React from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const Contact = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "お問合せ", active: true },
  ];
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div>Contact</div>
    </>
  )
}

export default Contact