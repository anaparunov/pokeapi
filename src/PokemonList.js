import React, { Component } from 'react'
import Pokemon from './Pokemon'

class PokemonList extends Component {
  render () {
    const { pokemons } = this.props
    return (
      <div className='pokemon-list'>
        <div className='row'>
          <div className='col-xs-12'>
            {pokemons.map((pokemon) => <Pokemon name={pokemon} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default PokemonList
