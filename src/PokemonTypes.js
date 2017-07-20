import React, { Component } from 'react'
import axios from 'axios'

class PokemonTypes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemonTypes: [],
      activeType: null
    }
    this.changeType = this.changeType.bind(this)
  }

  loadTypes () {
    var _this = this
    axios.get('type/')
    .then(function (response) {
      _this.setState({
        pokemonTypes: response.data.results
      })
    })
  }

  changeType (type) {
    const newType = this.state.activeType === type ? null : type
    this.setState({
      activeType: newType
    })
    this.props.onTypeChange(newType)
  }

  componentDidMount () {
    this.loadTypes()
  }

  render () {
    const { pokemonTypes, activeType } = this.state
    return (
      <div>
        <h2 className='section-title'>
          Filter Pokemons <br /> by <span>type</span>
        </h2>
        <div className='filter__group'>
          <ul>
            {pokemonTypes.map((type, index) =>
              <li onClick={() => this.changeType(type.name)} className={activeType === type.name ? 'is--active' : ''}>
                {type.name}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PokemonTypes
