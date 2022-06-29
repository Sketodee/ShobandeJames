import React from 'react'
import { connect } from 'react-redux';
import { incItem, decItem } from '../redux/action';
import styled from 'styled-components';



class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div>
        {
          this.props.cartItem.map((item, index) => {
            return (
              <div key={index}>
                <hr />
                <Flex>
                  <FlexItem style={{ width: '50%' }}>
                    <h3> {item.brand} </h3>
                    <p> {item.name} </p>

                    {item.prices.map((price, index) => {
                      if (price.currency.label === this.props.defaultCurrency) {
                        return (
                          <div key={index}>
                            <p> PRICE:  <br />
                              <b> {price.currency.symbol}{price.amount * item.qty} </b>
                            </p>
                          </div>
                        )
                      }
                    })}


                    {item.attributes.map((detail, index) => {
                      return (
                        detail.id === "Color" ?

                          <div key={index}>
                            <p> <b> {detail.name}</b> </p>
                            {detail.items.map((item, index) => {
                              return (
                                <Item key={index}>
                                  <p style={{ background: `${item.value}`, width: 25, height: 25, }}> </p>
                                </Item>
                              )
                            })}
                          </div>

                          : <div key={index}>
                            <p> <b> {detail.name}</b> </p>
                            {detail.items.map((item, index) => {
                              return (
                                <Item primary key={index}>
                                  <p>{item.value} </p>
                                </Item>
                              )
                            })}
                          </div>
                      )
                    })}
                  </FlexItem>

                  <FlexItem style={{ alignSelf: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Button onClick={() => this.props.incItem(item.id)}> +</Button>
                      <p style={{ alignSelf: "center" }}> {item.qty} </p>
                      <Button onClick={() => this.props.decItem(item.id)}> - </Button>
                    </div>
                  </FlexItem>

                  <FlexItem style={{ width: '40%' }}>
                    {item.gallery.slice(0, 1).map((gallery, index) => {
                      return (
                        <div key={index}>
                          <img style={{ width: 300, height: 300 }} src={gallery} />
                        </div>
                      )
                    })}
                  </FlexItem>
                </Flex>
              </div>
            )
          })}
        <h4>TOTAL: </h4>
        <OrderButton> ORDER </OrderButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItem: state.cartItem
})

const mapDispatchToProps = (dispatch) => ({
  incItem: (payload) => dispatch(incItem(payload)),
  decItem: (payload) => dispatch(decItem(payload)),
})

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const FlexItem = styled.div`
  /* padding-bottom: 30px; */
  align-self: flex-start;
`

const Item = styled.div`
    display: inline-block;
    padding-right: 5px;
    line-height: 0.5;
    border: ${props => props.primary ? "1px solid black" : null};
    margin:${props => props.primary ? "0 4px" : null};
    padding: ${props => props.primary ? "3px 8px " : null};

    &:hover{
        background: ${props => props.primary ? "black" : null};
        color: ${props => props.primary ? "white" : null} ;
    }
`

const Button = styled.button`
  border: 1px solid black;
  padding: 5px; 
  background-color: white;
`

const OrderButton = styled.button`
    padding: 1em 2em;
    border: none;
background-color: #5ece7b;
color: white;
width: 15%; 
cursor: pointer;
`

export default connect(mapStateToProps, mapDispatchToProps)(Cart)