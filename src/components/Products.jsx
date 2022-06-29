import React from 'react'
import styled from 'styled-components'
import { Link} from 'react-router-dom'


class Products extends React.Component {
  constructor(props){
    super(props);
    this.state={
        price: '',
    }
  }

  test =(product) => {
    console.log(product.id)
  }


  render() {
    return (
      <>
        <h3 style={{textTransform: "upperCase"}}> {this.props.products.name} </h3>
        <Flex > 
        {this.props.products.products.map((product) => {
          return (
        <FlexItem key={product.id}> 
        <Link to={`/product/${product.id}`} style={{textDecoration: "none", color: "black" }}> 
        {product.gallery.slice(0,1).map((gallery, index) => {
          return (
            <img key={index} style={{width: 250, height: 250, padding:10}}  src={gallery}/>
          )
        })}
          <p>{product.name}</p>
          {product.prices.map((price, index) => {
            if (price.currency.label === this.props.defaultCurrency) {
              return(
                <p key={index}><b> {price.currency.symbol}{price.amount} </b> </p>
              )
            }
          })}
             {/* <button> <Link to={`/product/${product.id}`}> Take me there </Link> </button>  */}
             </Link>
          </FlexItem>
          )
        })}
        </Flex>
      </>
    )
  }
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* width: 100% */
`
const FlexItem = styled.div`
  width: 30%;
  padding-bottom: 30px;
`
export default Products