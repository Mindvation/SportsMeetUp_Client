/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';

const {width} = Dimensions.get('window');

import ShareMatch from '../common/ShareMatch';
import {sportTypeMapping} from '../data/Mapping';

export default class FieldInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            modalVisible: false,
            modalCont: null,
            shareModalVisible: false,
            selectedIndex: null
        };
    }

    _shareMatch() {
        this.setState({
            shareModalVisible: true
        })
    }

    render() {
        const {field, rowId} = this.props;
        /* const test = {
             "fieldId": 2247,
             "creatorId": null,
             "fieldName": "凯跃桌球俱乐部",
             "address": "太乙宫正街东50米",
             "fieldType": "080113",
             "adminPhone": "13186139558",
             "picsOfField": "",
             "isApproved": null,
             "longitude": 109.006277,
             "latitude": 34.024003,
             "createdDate": null,
             "isFree": null,
             "hasMatch": null,
             "pricePerHour": null,
             "fieldDetail": null,
             "distance": 4.84
         }*/

        const icon = field.picsOfField ? {uri: field.picsOfField.split(",")[0]} : '';
        return ( <View>
                <View style={styles.borderLine} key={rowId}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            selected: !this.state.selected
                        })
                    }}>
                        <View style={styles.matchInfoCont}>
                            <Image source={icon ? icon : require('../../res/images/field_default.png')}
                                   style={styles.fieldImg}/>
                            <View style={styles.otherInfoCont}>
                                <Text style={styles.fieldName}>{field.fieldName}</Text>
                                <View style={styles.typeAndCost}>
                                    {
                                        field.pricePerHour ? <Text
                                            style={[styles.fieldType, {marginLeft: 15}]}>{field.pricePerHour}/小时</Text> : null
                                    }

                                </View>
                                {
                                    field.address ?
                                        <Text style={styles.fieldLocation}>{"地址:" + field.address}</Text> : null
                                }
                                {
                                    field.adminPhone ?
                                        <Text style={styles.fieldLocation}>{"电话:" + field.adminPhone}</Text> : null
                                }
                                <Text style={styles.fieldDistance}>{field.distance + 'km'}</Text>
                            </View>
                        </View>
                        {/*<Text style={styles.fieldOpenTime}>周内 {field.weekTime} 周末 {field.weekendTime}</Text>*/}
                    </TouchableOpacity>
                    <View
                        style={[styles.bottomCont, this.state.selected ? null : {display: 'none'}]}>
                        <View style={styles.shareCont}>
                            <TouchableOpacity onPress={() => this._shareMatch()}>
                                <View style={styles.sharePressRange}>
                                    <Image style={styles.shareImg}
                                           source={require('../../res/images/matchInfo/share.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.acceptCont}>
                            <TouchableOpacity onPress={() => {

                            }}>
                                <View>
                                    <Text style={styles.ignoreText}> 预约比赛 </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ShareMatch
                    closeHandle={() => {
                        this.setState({
                            shareModalVisible: false
                        })
                    }}
                    modalVisible={this.state.shareModalVisible}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fieldImg: {
        marginLeft: 15,
        marginTop: 22,
        marginRight: 22,
        marginBottom: 22,
        width: 120,
        height: 80
    },
    bottomCont: {
        height: 40,
        backgroundColor: '#323232',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    acceptCont: {
        width: 170,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f12b2c'
    },
    matchInfoCont: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    otherInfoCont: {
        flex: 1,
        marginTop: 18,
    },
    shareCont: {
        width: 120,
        backgroundColor: '#191919',
        height: 40,
    },
    sharePressRange: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareImg: {
        width: 25,
        height: 25
    },
    otherInfoText: {
        marginBottom: 10,
        paddingRight: 50
    },
    ignoreText: {
        fontSize: 24,
        color: '#E8E8E8',
        fontStyle: 'italic',
        fontWeight: "bold"
    },
    fieldLocation: {
        fontSize: 15,
        color: '#000000',
        paddingRight: 15,
        marginTop: 5
    },
    fieldType: {
        fontSize: 20,
        color: '#f39700',
        fontWeight: 'bold'
    },
    fieldName: {
        fontSize: 18,
        color: '#f39700',
        fontWeight: 'bold'
    },
    fieldDistance: {
        textAlign: 'right',
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 10
    },
    fieldOpenTime: {
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    borderLine: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    typeAndCost: {
        marginTop: 5,
        flexDirection: 'row',
    }
});
