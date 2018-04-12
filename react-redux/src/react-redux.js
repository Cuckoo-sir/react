import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
        super();
        this.state = {
            allProps:{}
        }
    }

    componentWillMount () {
        const { store } = this.context
        this._updateProps()
        store.subscribe(() => this._updateProps())
    }

    _updateProps () {
        const { store } = this.context
        let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入
        this.setState({
            allProps: { // 整合普通的props和从state生成的props
                ...stateProps,
                ...this.props
            }
        })
    }

    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
      return <WrappedComponent {...stateProps} />
    }
  }

  return Connect
}