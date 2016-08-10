import React, { Component } from 'react'
import View from '../components/View'
import Header from './Header'
import Footer from './Footer'
import GameColumn from './GameColumn'
import ChatColumn from './ChatColumn'

export default class App extends Component {
  render() {
    return <div id="app">
      <div className="column-area">
        <Header />
        <View>
          <GameColumn />
          <ChatColumn />
        </View>
      </div>
      <Footer />
    </div>;
  }
}