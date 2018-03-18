import React, { Component } from 'react'

import UserList from '../components/UserList/index'
import '../assets/css/reset.scss'

class App extends Component {
  render () {
    return (
      <div className='page-container'>
        <UserList />
      </div>
    )
  }
}

export default App
