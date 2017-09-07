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

export default class FieldInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: "",
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

        return ( <View>
                <View style={styles.borderLine} key={rowId}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            selectedIndex: rowId
                        })
                    }}>
                        <View style={styles.matchInfoCont}>
                            <Image source={require('../../res/images/field_default.png')}
                                   style={styles.fieldImg}/>
                            <View style={styles.otherInfoCont}>
                                <Text style={styles.fieldLocation}>{field.location}</Text>
                                <View style={styles.typeAndCost}>
                                    <Text style={styles.fieldType}>{field.type}</Text>
                                    {
                                        field.cost ? <Text
                                            style={[styles.fieldType, {marginLeft: 15}]}>{field.cost}/小时</Text> : null
                                    }
                                </View>
                                <Text style={styles.fieldDistance}>{field.distance}</Text>
                            </View>
                        </View>
                        <Text style={styles.fieldOpenTime}>周内 {field.weekTime} 周末 {field.weekendTime}</Text>
                    </TouchableOpacity>
                    <View
                        style={[styles.bottomCont, this.state.selectedIndex === rowId ? null : {display: 'none'}]}>
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
        marginBottom: 22
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
        paddingRight: 30
    },
    fieldType: {
        fontSize: 20,
        color: '#f39700',
        marginTop: 5,
        fontWeight: 'bold'
    },
    fieldDistance: {
        textAlign: 'right',
        paddingRight: 15
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
        flexDirection: 'row',
    }
});
