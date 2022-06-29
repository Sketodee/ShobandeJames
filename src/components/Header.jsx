import React from 'react'
import styled from 'styled-components'
import { BsCart3 } from 'react-icons/bs'
import { connect } from 'react-redux';
import CartHeader from './CartHeader';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';


class Header extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef()
    this.state={
        showcart: false
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);}

    handleClickOutside = (event) => {
      if (this.myRef && !this.myRef.current.contains(event.target)) {
        this.setState({showcart: false})
      }
    }
  
  toggleCart = () => {
    this.setState({showcart: !this.state.showcart})
  }

  render() {
    return (
      <>
        <Flex>
          <Ul>
            <List onClick={()=>this.props.filterData('all')}> ALL </List>
            <List onClick={()=>this.props.filterData('clothes')}> CLOTHES </List>
            <List onClick={()=>this.props.filterData('tech')}> TECH </List>
          </Ul>
          <Flex>
            <select onChange={this.props.currencyPicker} style={{ border: "none", marginRight: '10px' }}>
              <option value="USD">{'\u0024'} </option>
              <option value="GBP">{'\u00A3'} </option>
              <option value="JPY">{'\u00A5'} </option>
              <option value="AUD">{'\u20B3'} </option>
              <option value="RUB">{'\u20BD'} </option>
            </select>
            {/* <OutsideClickHandler onOutsideClick={()=> this.setState({showcart: false})}> */}
            <p> <BsCart3  onClick={()=> this.toggleCart()}/> ({this.props.cartItem.length})</p> 
            {/* </OutsideClickHandler> */}
          </Flex>
        </Flex>
        
        {this.state.showcart && 
      <SideCart ref={this.myRef} >
        {this.props.cartItem.length === 0 ?  

        <p> Cart is Empty, Add some item(s) </p> :

        <div> 
          <CartHeader cartItem={this.props.cartItem} defaultCurrency={this.props.defaultCurrency}/>
          <div style={{position: "absolute", top: "85vh", display: "flex", width: "100%",  justifyContent: "space-around"}}>
          <Link to="/Cart">  <Button  onClick={()=> this.toggleCart()} primary> VIEW BAG </Button> </Link>
          <Button> CHECKOUT </Button> 
            </div> 
         </div>
        }

      </SideCart>
        }
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  cartItem: state.cartItem
})


const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Ul = styled.ul`
list-style-type: none; 
padding: 0
`
const List = styled.li`
display: inline-block;
padding: 0 10px 5px 0;
cursor: pointer;

&:hover {
  border-bottom: 1px solid green;
  color: green
}

&:active {
  color: green
}
`
const SideCart = styled.div`
  height: 90vh; 
  width: 20%; 
  background: #f1f1ea;
  z-index: 1; 
  position: fixed; 
  left: 70%; 
  padding: 10px;
`
const Span = styled.span`
  color: white;
  background: black;
  padding: 5px; 
  border-radius: 100%;
`
const Button = styled.button`
    padding: 10px 20px;
    border: none;
background-color: #5ece7b;
color: white;
cursor: pointer;
background: ${props => props.primary ? "transparent" : null};
color: ${props => props.primary ? "black" : null};
border: ${props => props.primary ? "1px solid black" : null};
`


export default connect (mapStateToProps)(Header)