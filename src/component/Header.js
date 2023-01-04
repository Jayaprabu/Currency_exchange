
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <Fragment>
     <h1 className='title'>Payconiq Currency Exchange</h1>
     <div className='header'>
        <Link to='/'>Currency Converter</Link>
        <Link to='/viewHistory'>View Converter History</Link>
    </div>
    </Fragment>
  )
}

export default Header;

