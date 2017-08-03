'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  TextInput,
  Button,
  Text,
} from 'react-native';

import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import Toast, {DURATION} from 'react-native-easy-toast'
import CommonUtil from '../util/CommonUtil'

const {
    width,
    height,
} = Dimensions.get('window');

const matchTypes = ['足球', '篮球', "羽毛", '台球', '保龄球', '网球', '乒乓球', '排球'];
const matchTypeValues = ['football', 'basketball', 'badminton', 'billiards', 'bowling', 'tennis', 'tabletennis', 'volleyball'];
const memberNums = ['1v1', '2v2', '3v3', '4v4', '5v5', '6v7', '7v7', '8v8', '11v11'];
const memberNumValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class NewMatchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: true,
            type:'',
            number:'',
            date:"",
            phone:'',
            description:'',
        };
    }

    visible(visible) {
        this.setState({
            modalVisible:visible,
        });
    }

    onClickSubmit() {
        if(CommonUtil.isEmpty(this.state.date)){
            this.refs.toast.show('请选择比赛日期');
            return;
        }

        if (CommonUtil.isEmpty(this.state.type)) {
            this.refs.toast.show('请选择比赛类型');
            return;
        }

        if (CommonUtil.isEmpty(this.state.number)) {
            this.refs.toast.show('请选择比赛人数');
            return;
        }

        if (CommonUtil.isEmpty(this.state.phone)) {
            this.refs.toast.show('请输入电话号码');
            return;
        }

        if (CommonUtil.isEmpty(this.state.description)) {
            this.refs.toast.show('请输入比赛备注信息');
            return;
        }

        this.props.newMatchCallback({
            date:this.state.date,
            type:this.state.type,
            number:this.state.number,
            phone:this.state.phone,
            description:this.state.description
        });
    }

    render() {
        let today = new Date();
        let endDay = new Date(new Date().setDate(new Date().getDate() + 10));
        console.log(endDay);
        return (
        <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => {}}>
            <View style={styles.modalBackground}>
                <View style={styles.modalBox}>
                    <View style={{paddingLeft:28, paddingRight:38,paddingTop:32}}>
                        <View style={styles.itemLine}>
                            <Text style={styles.text}>时间</Text>
                            <DatePicker style={styles.datePicker}
                                mode='datetime'
                                date={this.state.date}
                                placeholder='比赛日期'
                                format="YYYY-MM-DD HH:mm"
                                minDate={CommonUtil.dateFormat(today, 'YYYY-MM-DD HH:mm')}
                                maxDate={CommonUtil.dateFormat(endDay, 'YYYY-MM-DD HH:mm')}
                                showIcon={false}
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    dateInput:{
                                        height:24,
                                        borderBottomWidth:0.5,
                                        borderTopWidth:0,
                                        borderLeftWidth:0,
                                        borderRightWidth:0,
                                        borderColor:'#8b8b83',
                                    },
                                    dateTouchBody:{
                                        height:10,
                                        padding:0,
                                    },
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}/>
                        </View>
                        <View style={styles.itemLine}>
                            <Text style={styles.text}>比赛类型</Text>
                            <View style={styles.textInputBorder}>
                                <ModalDropdown style={styles.dropdownButton}
                                    textStyle={styles.dropdownText}
                                    dropdownStyle={styles.dropdownStyle}
                                    dropdownTextStyle={styles.dropdownTextStyle}
                                    defaultValue='请选择比赛类型'
                                    options={matchTypes}
                                    onSelect={(index) => this.setState({type:matchTypeValues[index]})}/>
                            </View>
                        </View>
                        <View style={styles.itemLine}>
                            <Text style={styles.text}>人数信息</Text>
                            <View style={styles.textInputBorder}>
                                <ModalDropdown style={styles.dropdownButton}
                                textStyle={styles.dropdownText}
                                dropdownStyle={styles.dropdownStyle}
                                dropdownTextStyle={styles.dropdownTextStyle}
                                defaultValue='请选择已有人数'
                                options={memberNums}
                                onSelect={(index) => this.setState({number:memberNumValues[index]})}/>
                            </View>
                        </View>
                        <View style={styles.itemLine}>
                            <Text style={styles.text}>电话号码</Text>
                            <View style={styles.textInputBorder}>
                                <TextInput style={styles.phoneNumberInput}
                                    placeholder='请输入电话号码'
                                    placeholderTextColor='#b5b2b2'
                                    maxLength={11}
                                    keyboardType='numeric'
                                    value={this.state.phone}
                                    onChangeText={(phone) => this.setState({phone})}/>
                            </View>
                        </View>
                        <Text style={styles.text}>备注</Text>
                        <TextInput style={styles.description}
                            placeholder='请输入比赛备注信息'
                            multiline={true}
                            lineOfNumber={3}
                            placeholderTextColor='#b5b2b2'
                            value={this.state.description}
                            onChangeText={(description) => this.setState({description})}/>
                    </View>
                    <Button
                        style={styles.button}
                        title='提交'
                        color='#df3939'
                        onPress={() => this.onClickSubmit()}/>
                </View>
                <Toast ref="toast"/>
            </View>
      </Modal>);
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBox: {
        width: width * 0.9,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        marginHorizontal: 24,
    },

    itemLine: {
        flexDirection: 'row',
        marginBottom:24,
    },

    text:{
        width:75,
        fontSize: 15,
    },

    datePicker:{
        flex:1,

    },

    dropdownButton: {
        flex: 1,
        // borderBottomWidth: 1,
        // borderTopWidth: 0,
        // borderLeftWidth: 0,
        // borderRightWidth: 0,
    },

    dropdownText: {
        width: 100,
        fontSize: 12,
        color: '#595959',
    },

    textInputBorder:{
        flex:1,
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor:'#8b8b83'
    },

    phoneNumberInput: {
        flex: 1,
        fontSize:12,
        color:'#595959',
    },

    description:{
        height:50,
        textAlignVertical:'top',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#8b8b83',
        fontSize:12,
        color:'#595959',
        padding:5,
        marginTop:12,
        marginBottom:40,
    }
});


export default NewMatchView;