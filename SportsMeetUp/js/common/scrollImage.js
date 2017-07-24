/**
* @Author: zhaoshuo
* @Description: 轮播图组件
*/

'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class ScrollImage extends Component{
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    render(){
      return(
        <Swiper style={styles.wrapper} height={200}
                autoplay={true}
                autoplayTimeout={3}
                onMomentumScrollEnd={(e, state, context) => {}}
                dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                paginationStyle={{
                    bottom: 23, left: 0, right: 10
                }} loop>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
        </Swiper>
      );
    }
} 

const styles = StyleSheet.create({
    wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
