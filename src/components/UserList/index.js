import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Loading from 'components/Loading'
import * as actions from '../../actions'
import { API } from './config'

import './index.scss'

class UserList extends Component {
  componentDidMount () {
    const { recieveUsers } = this.props
    this.fetchUsers().then(data => recieveUsers(data))
  }

  handleFilterChange (event, key) {
    const filter = Object.assign({}, this.props.users.filter)
    filter[key] = event.target.value
    this.props.setUserFilter(filter)
  }

  handleFilterClick () {
    const { filter } = this.props.users
    const { recieveUsers } = this.props
    const paramStr = Object.entries(filter).map(([key, val]) => {
      if (val) { return `${key}=${val}` }
    }).join('&')
    this.fetchUsers(paramStr).then(data => recieveUsers(data))
  }

  render () {
    const { list, isLoading } = this.props.users
    return (
      <section className='list-wrap'>

        <h1 className='list-title'>People</h1>

        <section className='filter-user'>
          <div className='sec-input'>
            <b className='lable-input'>age</b>
            <input
              type='number'
              min='1'
              className='ui-input'
              name='age'
              onChange={event => this.handleFilterChange(event, 'age')} />
          </div>
          <div className='sec-input'>
            <b className='lable-input'>gender</b>
            <select
              className='ui-input'
              name='gender'
              onChange={event => this.handleFilterChange(event, 'gender')}>
              <option value=''>All</option>
              <option value='female'>female</option>
              <option value='male'>male</option>
            </select>
          </div>
          <button className='ui-btn ui-btn-primary' onClick={() => { this.handleFilterClick() }} >search</button>
        </section>

        <section className='table-user-wrap'>
          <table className='table-user'>
            <thead>
              <tr>
                <th>name</th>
                <th>age</th>
                <th>gender</th>
              </tr>
            </thead>
            <tbody>
              {
                list && list.map(user =>
                  <tr key={`user-list-item-${user._id}`}>
                    <td>{ user.name }</td>
                    <td>{ user.age }</td>
                    <td>{ user.gender }</td>
                  </tr>
                )
              }

              { !list || list.length === 0 ? (<tr><td colSpan={3}>no data....</td></tr>) : null}
            </tbody>
          </table>
        </section>

        <Loading visible={isLoading} />
      </section>
    )
  }

  async fetchUsers (paramStr) {
    const { toggleLoading } = this.props
    toggleLoading(true)
    const url = paramStr ? `${API.FETCH_USERS}?${paramStr}` : API.FETCH_USERS
    try {
      const response = await axios.get(url)
      toggleLoading(false)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(
  mapStateToProps,
  { ...actions }
)(UserList)
