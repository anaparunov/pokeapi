import React, { Component } from 'react'
import axios from 'axios'
import loader from './media/loader.svg'

class Pokemon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: null
    }
  }

  loadData () {
    const _this = this
    const name = this.props.name
    axios.get(`pokemon/${name}`)
    .then(function (response) {
      _this.setState({
        pokemon: response.data
      })
    })
  }

  componentDidMount () {
    this.loadData()
  }

  render () {
    const { pokemon } = this.state
    if (!pokemon) {
      return (
        <div className='pokemon'>
          <div className='row center-xs middle-xs'>
            <div className='col-xs-12'>
              <img className='loader' src={loader} alt='loader' />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='pokemon'>
          <div className='row top-xs'>
            <div className='col-xs-12 col-sm-4'>
              <h3>{pokemon.name}</h3>
            </div>
            <div className='col-xs-12 col-sm-8'>
              <dl>
                <dt>Weight: </dt>
                <dd>{pokemon.weight}</dd>
                <dt>Height: </dt>
                <dd>{pokemon.height}</dd>
                <dt>Base experience: </dt>
                <dd>{pokemon.base_experience}</dd>
              </dl>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Pokemon
