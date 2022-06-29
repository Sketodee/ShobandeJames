import React from 'react'
import { connect } from 'react-redux';
import { addCart, testAction } from '../redux/action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            product: [],
        }
    }

    componentDidMount() {
        const { id } = this.props.params;
        // console.log(this.props.data)
        const product = this.props.data.map((products) => products.products.filter((product) => product.id === id))
        this.setState({ id: id, product: product })
    }



    render() {
        // const id = this.state.id
        const product = this.state.product
        return (
            <>
                {product.map((item) => item.map((itemDetail, index) => {
                    return (
                        <div key={index}>
                            <Flex>
                                <FlexItem style={{}}>
                                    {itemDetail.gallery.slice(0, 3).map((gallery, index) => {
                                        return (
                                            <div key={index}>
                                                <img style={{ width: 100, height: 100 }} src={gallery} />
                                            </div>
                                        )
                                    })}
                                </FlexItem>

                                <FlexItem style={{ width: '40%' }}>
                                    {itemDetail.gallery.slice(0, 1).map((gallery, index) => {
                                        return (
                                            <div key={index}>
                                                <img style={{ width: 400, height: 400 }} src={gallery} />
                                            </div>
                                        )
                                    })}
                                </FlexItem>

                                <FlexItem style={{ width: '20%' }}>
                                    <h3> {itemDetail.brand}</h3>
                                    <h5>{itemDetail.name}</h5>

                                    {itemDetail.attributes.map((detail, index) => {
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

                                    {itemDetail.prices.map((price, index) => {
                                        if (price.currency.label === this.props.defaultCurrency) {
                                            return (
                                                <div key={index}>
                                                    <p> PRICE:  <br />
                                                        <b> {price.currency.symbol}{price.amount} </b>
                                                    </p>
                                                </div>
                                            )
                                        }
                                    })}

                                    <p> <span dangerouslySetInnerHTML={{ __html: itemDetail.description }}></span></p>
                            
                                        <Button onClick={() => this.props.addCart(itemDetail)}> ADD TO CART </Button>
                                
                                </FlexItem>
                            </Flex>
                        </div>
                    )

                }))}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    counter: state.counter
});


const mapDispatchToProps = (dispatch) => ({
    addCart: (payload) => dispatch(addCart(payload))
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
    margin:${props => props.primary ? "0 4px" : null};
    padding: ${props => props.primary ? "3px 8px " : null};

    &:hover{
        background: ${props => props.primary ? "black" : null};
        color: ${props => props.primary ? "white" : null} ;
    }
`

const Button = styled.button`
    padding: 1em 2em;
    border: none;
background-color: #5ece7b;
color: white;
width: 100%; 
cursor: pointer;
`
// style={{border: "1px solid red", margin: "0 4px", padding: "4px"}}

export default connect(mapStateToProps, mapDispatchToProps)((props) => (
    <Product {...props} params={useParams()} />
    // connect(mapDispatchToProps)(Product)
))