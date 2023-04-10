// const spinner =
//   'https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-lists/spinner.gif'

import ReactLoading from 'react-loading';
import './Spinner.css'

function Spinner() {
  return (
    // <div className="Spinner">
    //   <ReactLoading type="spin" className='spin' color={'gray'} height={'1%'} width={'1%'}
    //     style={{ display: 'flex' }} />
    // </div>
    <div class="loader">Loading...</div>
  )
}

export default Spinner