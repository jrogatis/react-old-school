import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends Component {
  render() {
    return (
      <div className='col-md-6 col-md-offset-3' align='center'>
        <h2 align='center'>Welcome! You have successfully logged in.</h2>
          <Link
            className='btn btn-link btn-lg'
            to={{ pathname: '/', state: { toLogout: true } }}
        >
          Logout
        </Link>
      </div>
    );
  }
}
