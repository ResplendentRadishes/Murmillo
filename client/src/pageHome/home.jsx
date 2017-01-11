import React from 'react';
import { Link } from 'react-router';

const flexboxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh'
}

const Home = (props) => (
  <div style={flexboxStyle}>
    <div className='text-center'>
      <img src='./spqr-murmillo-2.jpg'/>
      <h1 style={{fontSize: '72px'}}>Murmillo</h1>
      <Link to='/signup' className='btn btn-info btn-lg'>Start</Link>
    </div>
  </div>
);

export default Home;
