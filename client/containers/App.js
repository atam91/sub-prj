import React, { Component } from 'react'
import View from '../components/View'
import Header from './Header'
import Footer from './Footer'
import GameColumn from './GameColumn'
import ChatColumn from './ChatColumn'

export default class App extends Component {
  render() {
    return <div className="app">
      <Header />
      <View>
        <GameColumn />
        <ChatColumn />
      </View>
      <Footer />
    </div>
  }
}