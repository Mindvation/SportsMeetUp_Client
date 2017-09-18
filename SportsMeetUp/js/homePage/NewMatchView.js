'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Dimensions,
    View,
    Modal,
    TextInput,
    Button,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import Toast, {DURATION} from 'react-native-easy-toast'
import CommonUtil from '../util/CommonUtil'
import FetchUtil from '../util/FetchUtil'
import {matchTypeMapping} from '../data/Mapping'
import ModalPicker from '../common/Picker';

const {
    width,
    height,
} = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');

const matchTypeMappingData = [
    {key: '', section: true, label: '请选择比赛类型'}
];

class NewMatchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            matchDate: null,
            startTime: null,
            endTime: null,
            type: '',
            number: '',
            phone: '',
            description: '',
        };
    }

    componentDidMount() {
        Object.keys(matchTypeMapping).map((mapKey) => {
            matchTypeMappingData.push({key: mapKey, label: matchTypeMapping[mapKey]})
        });
    }

    visible(visible) {
        this.setState({
            modalVisible: visible,
        });
    }

    onClickSubmit() {
        dismissKeyboard();
        if (CommonUtil.isEmpty(this.state.matchDate)) {
            this.refs.toast.show('请选择比赛日期');
            return;
        }

        if (CommonUtil.isEmpty(this.state.startTime)) {
            this.refs.toast.show('请选择比赛开始时间');
            return;
        }

        if (CommonUtil.isEmpty(this.state.endTime)) {
            this.refs.toast.show('请选择比赛结束时间');
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

        // if (CommonUtil.isEmpty(this.state.description)) {
        //     this.refs.toast.show('请输入比赛备注信息');
        //     return;
        // }

        /*console.log(this.state);
        console.log(new Date().getFullYear() + "-" + this.state.matchDate + " " + this.state.startTime + ":00");
        console.log(new Date().getFullYear() + "-" + this.state.matchDate + " " + this.state.endTime + ":00");*/
        let options = {
            "url": '8086/sports-meetup-papi/matches/initialMatch',
            "params": {
                "match": {
                    "creatorId": globalUserInfo.userId,
                    "fieldId": this.props.field.fieldId,
                    "date": new Date().getFullYear() + "-" + this.state.matchDate,
                    "startTime": new Date().getFullYear() + "-" + this.state.matchDate + " " + this.state.startTime + ":00",
                    "endTime": new Date().getFullYear() + "-" + this.state.matchDate + " " + this.state.endTime + ":00",
                    "matchType": this.state.type,
                    "joinedAmount": parseInt(this.state.number),
                    "creatorPhone": this.state.phone,
                    "remarks": this.state.description
                }
            }
        };

        FetchUtil.post(options).then((result) => {
            this.refs.toast.show('成功发起比赛');
            this.visible(false);
        }).catch((error) => {
            this.refs.toast.show('操作失败，请重试');
        });
    }

    // 关闭时清除界面上的数据。
    onModalClose = () => {
        this.setState({
            matchDate: null,
            startTime: null,
            endTime: null,
            type: '',
            number: '',
            phone: '',
            description: '',
        });
    };

    render() {
        let today = new Date();
        let endDay = new Date(new Date().setDate(new Date().getDate() + 10));
        //console.log(endDay);
        return (
            <Modal
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={this.onModalClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 14, marginTop: 14}}
                                          onPress={() => this.visible(false)}>
                            <Image source={require('../../res/images/close.png')}/>
                        </TouchableOpacity>
                        <View style={{paddingLeft: 28, paddingRight: 38, paddingTop: 9}}>
                            <View style={[styles.itemLine, {alignItems: 'center'}]}>
                                <Text style={styles.text}>日期</Text>
                                <DatePicker style={[styles.datePicker, {marginRight: 8}]}
                                            mode='date'
                                            date={this.state.matchDate}
                                            placeholder=' '
                                            format="MM-DD"
                                            minDate={today}
                                            maxDate={endDay}
                                            showIcon={false}
                                            confirmBtnText="确定"
                                            cancelBtnText="取消"
                                            customStyles={{
                                                dateInput: {
                                                    height: 24,
                                                    borderBottomWidth: 0.5,
                                                    borderTopWidth: 0,
                                                    borderLeftWidth: 0,
                                                    borderRightWidth: 0,
                                                    borderColor: '#8b8b83',
                                                    padding: 0
                                                },
                                                dateTouchBody: {
                                                    padding: 0,
                                                    height: 30,
                                                },
                                            }}
                                            onDateChange={(matchDate) => {
                                                this.setState({matchDate: matchDate})
                                            }}/>
                                <Text style={styles.text}>起</Text>
                                <DatePicker style={[styles.datePicker, {marginRight: 8}]}
                                            mode='time'
                                            date={this.state.startTime}
                                            placeholder=' '
                                            format="HH:mm"
                                            showIcon={false}
                                            confirmBtnText="确定"
                                            cancelBtnText="取消"
                                            customStyles={{
                                                dateInput: {
                                                    height: 24,
                                                    borderBottomWidth: 0.5,
                                                    borderTopWidth: 0,
                                                    borderLeftWidth: 0,
                                                    borderRightWidth: 0,
                                                    borderColor: '#8b8b83',
                                                    padding: 0
                                                },
                                                dateTouchBody: {
                                                    padding: 0,
                                                    height: 30,
                                                },
                                            }}
                                            onDateChange={(startTime) => {
                                                this.setState({startTime: startTime})
                                            }}/>
                                <Text style={styles.text}>止</Text>
                                <DatePicker style={[styles.datePicker, {marginLeft: 0}]}
                                            mode='time'
                                            date={this.state.endTime}
                                            placeholder=' '
                                            format="HH:mm"
                                            showIcon={false}
                                            confirmBtnText="确定"
                                            cancelBtnText="取消"
                                            customStyles={{
                                                dateInput: {
                                                    height: 24,
                                                    borderBottomWidth: 0.5,
                                                    borderTopWidth: 0,
                                                    borderLeftWidth: 0,
                                                    borderRightWidth: 0,
                                                    borderColor: '#8b8b83',
                                                    padding: 0
                                                },
                                                dateTouchBody: {
                                                    padding: 0,
                                                    height: 30,
                                                },
                                            }}
                                            onDateChange={(endTime) => {
                                                this.setState({endTime: endTime})
                                            }}/>
                            </View>
                            <View style={styles.itemLine}>
                                <Text style={styles.text}>比赛类型</Text>
                                {/*<View style={styles.textInputBorder}>
                                    <ModalDropdown style={styles.dropdownButton}
                                                   textStyle={styles.dropdownText}
                                                   dropdownStyle={styles.dropdownStyle}
                                                   dropdownTextStyle={styles.dropdownTextStyle}
                                                   defaultValue='请选择比赛类型'
                                                   options={Object.values(matchTypeMapping)}
                                                   onSelect={(index) => this.setState({type: Object.keys(matchTypeMapping)[index]})}/>

                                </View>*/}
                                <ModalPicker
                                    data={matchTypeMappingData}
                                    onChange={(option) => {
                                        this.setState({type: option.key})
                                    }}
                                    cancelText="取消"
                                >
                                    <Text
                                        style={{
                                            fontSize: 14
                                        }}>
                                        {this.state.type ? matchTypeMapping[this.state.type] : "请选择场地类型"}
                                    </Text>
                                </ModalPicker>
                            </View>
                            <View style={styles.itemLine}>
                                <Text style={styles.text}>人数信息</Text>
                                <View style={styles.textInputBorder}>
                                    <TextInput style={styles.phoneNumberInput}
                                               placeholder='请输入已有人数'
                                               placeholderTextColor='#b5b2b2'
                                               underlineColorAndroid='transparent'
                                               maxLength={2}
                                               keyboardType='numeric'
                                               value={this.state.number}
                                               onChangeText={(number) => this.setState({number})}/>
                                </View>
                            </View>
                            <View style={styles.itemLine}>
                                <Text style={styles.text}>电话号码</Text>
                                <View style={styles.textInputBorder}>
                                    <TextInput style={styles.phoneNumberInput}
                                               placeholder='请输入电话号码'
                                               placeholderTextColor='#b5b2b2'
                                               underlineColorAndroid='transparent'
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
                                       underlineColorAndroid='transparent'
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
        marginBottom: 24,
    },

    text: {
        marginRight: 8,
        fontSize: 15,
    },

    datePicker: {
        flex: 1,
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

    textInputBorder: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#8b8b83'
    },

    phoneNumberInput: {
        flex: 1,
        fontSize: 12,
        color: '#595959',
        padding: 0,
    },

    description: {
        height: 50,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#8b8b83',
        fontSize: 12,
        color: '#595959',
        padding: 5,
        marginTop: 12,
        marginBottom: 40,
    }
});


export default NewMatchView;