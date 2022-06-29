import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { incItem, decItem } from '../redux/action';

class CartHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showcart: false
        }
    }

    render() {
        return (
            this.props.cartItem.slice(0, 2).map((item, index) => {
                return (
                    <div key={index}>
                        <p><b> My Bag </b> {this.props.cartItem.length} Items</p>
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
                                                            <p style={{ background: `${item.value}`, width: 20, height: 20, }}> </p>
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

                            <FlexItem style={{ width: '40%', alignSelf: "center" }}>
                                {item.gallery.slice(0, 1).map((gallery, index) => {
                                    return (
                                        <div key={index}>
                                            <img style={{ width: 100, height: 100 }} src={gallery} />
                                        </div>
                                    )
                                })}
                            </FlexItem>
                        </Flex>
                    </div>
                )
            })
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
  /* flex-wrap: wrap; */
  /* width: 100% */
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
    margin:${props => props.primary ? "0 3px" : null};
    padding: ${props => props.primary ? "2px 4px " : null};

    &:hover{
        background: ${props => props.primary ? "black" : null};
        color: ${props => props.primary ? "white" : null} ;
    }
`
const Button = styled.button`
  border: 1px solid black;
  padding: 5px; 
  background-color: #f1f1ea;
`

export default connect(mapStateToProps, mapDispatchToProps)(CartHeader)