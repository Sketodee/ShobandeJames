import React from 'react'
import Products from './Products';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {
    return (
      <>
        {this.props.data.map((products, index)=> {
            return(
              <Products key={index} products={products} filterData={this.props.filterData}  defaultCurrency={this.props.defaultCurrency} />
            )
        })}
      </>
    )
  }
}


export default Home