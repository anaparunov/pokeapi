import React, { Component } from 'react'
import './style/App.css'
import axios from 'axios'
import shuffle from 'lodash/shuffle'
import PokemonTypes from './PokemonTypes'
import PokemonList from './PokemonList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemons: [],
      activeType: null
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.setPokemons = this.setPokemons.bind(this)
    this.loadPokemons = this.loadPokemons.bind(this)
  }

  setPokemons (pokemons) {
    this.setState({
      pokemons: pokemons
    })
  }

  loadPokemons () {
    if (!this.state.activeType) {
      this.getAllPokemons().then(this.setPokemons)
    } else {
      this.getPokemonsByType(this.state.activeType).then(this.setPokemons)
    }
  }

  handleTypeChange (type) {
    this.setState({
      activeType: type,
      pokemons: []
    }, this.loadPokemons)
    // console.log('I am a main component and I got type', type)
  }

  getAllPokemons () {
    return axios.get('pokemon/?limit=8')
    .then(function (response) {
      return response.data.results
    })
    .then(function (pokemons) {
      return pokemons.map((pokemon) => pokemon.name)
    })
    .then(function (pokemons) {
      return shuffle(pokemons)
    })
  }

  getPokemonsByType (type) {
    return axios.get(`/type/${type}`)
    .then(function (response) {
      return response.data.pokemon
    })
    .then(function (pokemons) {
      return pokemons.map((pokemon) => pokemon.pokemon.name).slice(0, 8)
    })
  }

  componentDidMount () {
    this.loadPokemons()
  }

  render () {
    const { pokemons } = this.state

    return (
      <div className='App'>
        <div className='wrapper'>
          <div className='row'>
            <div className='col-xs-12 col-sm-4'>
              <div className='site-header'>
                <h1 className='logo'>POKEAPI</h1>
                </div>
              <div className='site-sidebar'>
                <PokemonTypes onTypeChange={this.handleTypeChange} />
              </div>
            </div>
            <div className='col-xs-12 col-sm-8'>
              <div className='row'>
                <div className='col-xs-12'>
                  <PokemonList pokemons={pokemons} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
