import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Color, Fonts, Strings, Dimension} from '../../theme';
import {favoriteProduct} from '../../axios/ServerRequest';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      count: this.props.count ? this.props.count : 0,
      cart: null,
      liked:this.props.item.user_is_favorite
    };
  }

  addToFavorite=(item)=>{
    this.setState({liked: !this.state.liked});
    favoriteProduct(item.id)
    .then(response => {
        console.log("Response Data==>", response.data);
    })
    .catch(error => {
        console.log(error);
    });
  }

  setCart = (item, id, value, price) => {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    this.setState(
      {
        cart: cart,
      },
      () => {
        this.props.addToCart(this.state.cart);
      },
    );
  };

  onItemClicked = item => {
    this.props.navi;
  };

  render() {
    const {item, count, navigation} = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={styles.innerContainer}>
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
              <Image
                style={styles.productImage}
                source={{
                  uri: item.images[0].image,
                }}
              />
              <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
              <View style={styles.price_option}>
              <Text style={styles.option}>
                {item.weight_value+''+item.weight + ' - ' + item.currency_type + item.retail_price}
              </Text>
              {item.retail_price <item.price?<Text style={styles.discount_price}>{item.price}</Text>:null}
              </View>
            </TouchableOpacity>
          </View>
          {count > 0 ? (
            <View style={styles.quantity}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.plusBtn}
                onPress={() => {
                  this.setState({
                    count: this.state.count - 1,
                  });
                  this.setCart(item, item.id, this.state.count - 1, item.retail_price);
                }}>
                <Icon name="minus" size={20} color={Color.red} />
              </TouchableOpacity>
              <Text style={styles.counter}>{count}</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.plusBtn}
                onPress={() => {
                  this.setState({
                    count: this.state.count + 1,
                  });
                  this.setCart(item, item.id, this.state.count + 1, item.retail_price);
                }}>
                <Icon name="plus" size={18} color={Color.colorPrimary} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.addToCart}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setState({count: this.state.count + 1});
                  this.setCart(item, item.id, this.state.count + 1, item.retail_price);
                }}>
                <Text style={styles.addToCartText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.box2}>
          <TouchableOpacity activeOpacity={1} style={styles.favoriteContainer} 
          onPress={() => {
                  this.addToFavorite(item)
                }}>
            {this.state.liked?<Icon name="heart" size={24} color={Color.colorPrimary} />:<Icon name="heart-o" size={24} color={Color.colorPrimary} />}
            
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ProductItem.propTypes = {
  addToCart: PropTypes.func,
  item: PropTypes.object,
  count: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: 220,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 2,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  box1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
   
  },
  counter: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
    textAlign: 'center',
    width: 30,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 1,
    marginBottom: 10,
  },
  
  discount_price: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 12,
    color: Color.black,
    textAlign: 'center',
    marginLeft: 5,
    marginBottom: 10,
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },

  productImage: {
    height: 120,
    width:120,
    marginLeft:10,
    marginRight:10,
    borderRadius: 7,
     
    
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Color.white,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    color: Color.white,
  },
  box2: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 30,
    height: 30,
  },
  plusBtn: {
    padding: 10,
  },
  price_option:{
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'row'

  }
});
export default ProductItem;
