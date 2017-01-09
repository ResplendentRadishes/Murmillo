import React from 'react';
import { Link } from 'react-router';

const Home = (props) => (
  <div className='text-center'>
    <img src='./spqr-murmillo-2.jpg'/>
    <h1 style={{'font-size': '72px'}}>Murmillo</h1>
    <Link to='/signup' className='btn btn-info btn-lg'>Start</Link>
  </div>
);

export default Home;
