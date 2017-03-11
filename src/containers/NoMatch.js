import React, { Component } from 'react'

class NoMatch extends Component {
  render() {
    return (
      <div className="container">
        <div style={{
          padding: '8em 0'
        }}>
          <h3>404</h3>
          <p>Not Found.</p>
        </div>
      </div>
    )
  }
}

export default NoMatch