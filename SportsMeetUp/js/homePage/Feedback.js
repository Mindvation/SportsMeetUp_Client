'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import CommonUtil from '../util/CommonUtil'

class Feedback extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        title:'',
        content:'',
      };
    }
    onPressSubmit() {
        if (CommonUtil.isEmpty(this.state.title)) {
            this.refs.toast.show('请输入问题');
            return;
        }
        if (CommonUtil.isEmpty(this.state.content)) {
            this.refs.toast.show('请输入问题描述');
            return;
        }

        // todo post to server
    }

  render() {
    return (
      <View style={{flex:1, alignItems:'stretch'}}>
        <View style={styles.title}>
            <Text>请输入问题</Text>
        </View>
        <TextInput 
            style={[styles.input, {height:40}]}
            value={this.state.title}
            onChangeText={(title)=>this.setState({title})}/>
        <View style={styles.title}>
            <Text>请输入问题描述</Text>
        </View>
        <TextInput 
            style={[styles.input, {height:120, textAlignVertical:'top'}]}
            placeholder="我们非常重视用户的提问，运营将会从提问中抽取10名优秀意见的用户，给予积分奖励"
            placeholderTextColor="#979797"
            multiline = {true}
            value={this.state.content}
            onChangeText={(content) => this.setState({content})}/>
        <Button style={{height:40, marginTop:45}}
            title="提交"
            onPress={() => this.onPressSubmit()}/>
        <Toast ref='toast'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:48,
        backgroundColor:"#ffffff"
    },
    titleText:{
        fontSize:18,
        color:'#000000'
    },
    input:{
        backgroundColor:'#ededed',
        fontSize:12,
    },
});


export default Feedback;flex:1