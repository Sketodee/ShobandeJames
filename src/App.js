import React, { useState, useEffect } from "react";
import storefront from "./apis/storefront";
import Header from "./components/Header";
import Home from "./components/Home"
import styled from 'styled-components'

import { Routes, Route } from 'react-router-dom';
import Product from "./components/Product";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        data: [],
        filtered: [],
        category: 'all',
        defaultCurrency: "USD"
    }
  }

  async componentDidMount() {
    const response = await storefront.post('', {
      query: `
      query {
        categories{
          name 
          products {
            id name inStock description category brand gallery
            attributes{
              id name type
              items {
                id displayValue value
              }
            }
            prices {
              amount
              currency{
                label symbol
              }
            }
          }
        }
      }`
    }
    )
    this.setState({data: response.data.data.categories, filtered: response.data.data.categories })
    // console.log('component mounted')
  }

  filterData =(cat) => {
    const filtered = this.state.data.filter((x) => x.name === cat )
    this.setState({filtered: filtered})
    this.setState({category:cat})
  }

  currencyPicker =  (e) => {
    this.setState({defaultCurrency: e.target.value})
  }

  render = () => {
    const dataBase = this.state.filtered.filter((x) => x.name === this.state.category)
    // console.log(dataBase)

    return(
      <Container>
      <Header  filterData={this.filterData} currencyPicker={this.currencyPicker} defaultCurrency={this.state.defaultCurrency}/>
      <Routes>
        <Route path="/" element={<Home data={dataBase} defaultCurrency={this.state.defaultCurrency} />}/>
        <Route path="/product/:id"  element={ <Product data={dataBase} defaultCurrency={this.state.defaultCurrency} />}/>
        <Route path="/cart" element={<Cart defaultCurrency={this.state.defaultCurrency}/>}/>
      </Routes>
      

  </Container>
    )
  }

}

const Container = styled.div`
margin: auto;
width: 80%;
/* background: black;
color: white; */
`

export default App;
