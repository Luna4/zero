import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class Loading extends Component {
  render () {
    const { visible } = this.props
    return visible ? (
      <div className='ui-loading'>
        <div className='ui-mask' />
        <div className='loading-spinner'>
          <div className='bounce1' />
          <div className='bounce2' />
          <div className='bounce3' />
        </div>
      </div>
    ) : null
  }
}

Loading.propTypes = {
  visible: PropTypes.bool
}

Loading.defaultProps = {
  visible: false
}

export default Loading
