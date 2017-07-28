import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import ModalConpt from '../common/ModalConpt';

const {width} = Dimensions.get('window');

import Arrangement from '../../res/data/arrangement.json';

export default class MatchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareModalVisible: false
        };
    }

    _shareMatch() {
        this.setState({
            shareModalVisible: true
        })
    }

    render() {
        const matchInfo = this.props.matchInfo;
        let arrangeInfo = Arrangement[matchInfo.playAccount];
        let teamAAccount = 0;
        let teamBAccount = 0;
        const UniformRed = arrangeInfo.icon == 2 ?
            <Image style={styles.uniform2x}
                   source={require('../../res/images/matchInfo/uniform_red2x.png')}/> :
            <Image style={styles.uniform3x}
                   source={require('../../res/images/matchInfo/uniform_red3x.png')}/>;
        const UniformBlue = arrangeInfo.icon == 2 ? <Image style={styles.uniform2x}
                                                           source={require('../../res/images/matchInfo/uniform_blue2x.png')}/> :
            <Image style={styles.uniform3x}
                   source={require('../../res/images/matchInfo/uniform_blue3x.png')}/>;
        const UniformAdd = arrangeInfo.icon == 2 ? <Image style={styles.uniform2x}
                                                          source={require('../../res/images/matchInfo/uniform_add2x.png')}/> :
            <Image style={styles.uniform3x}
                   source={require('../../res/images/matchInfo/uniform_add3x.png')}/>;

        const shareModal = <View style={styles.shareTrdCont}>
            <View style={styles.shareImageCont}>
            <Image style={styles.shareImage}
                   source={require('../../res/images/share_weChat.png')}/>
                <Text style={styles.shareImageText}>微信</Text>
            </View>
            <View style={styles.shareImageCont}>
                <Image style={styles.shareImage}
                       source={require('../../res/images/share_weiBo.png')}/>
                <Text style={styles.shareImageText}>微博</Text>
            </View>
            <View style={styles.shareImageCont}>
                <Image style={styles.shareImage}
                       source={require('../../res/images/share_qq.png')}/>
                <Text style={styles.shareImageText}>QQ</Text>
            </View>
        </View>;
        const arrangeArray = arrangeInfo.arrange;
        const contHeight = arrangeInfo.contHeight;
        return (<View style={[styles.mainCont, {height: contHeight}]}>
            <Image source={require('../../res/images/matchInfo/backImg.png')}
                   style={styles.bgImage}/>
            <View style={styles.matchCont}>
                <View style={styles.matchTimeCont}>
                    <Image style={styles.matchTimeImg} source={require('../../res/images/matchInfo/time.png')}/>
                    <Text style={styles.matchTimeText}>
                        {"时间：" + matchInfo.startTime + "  -  " + matchInfo.endTime}
                    </Text>
                </View>
                <View style={styles.playerInfoCont}>
                    <View style={styles.leftCont}>
                        {arrangeArray.map((result, i) => {
                            return <View key={i} style={styles.columnCont}>
                                {result.map((innerRes, j) => {
                                    teamAAccount++;
                                    return (teamAAccount - 1 + matchInfo.teamALeft >= matchInfo.playAccount) ?
                                        <View key={j} style={styles.imageCont}>{UniformAdd}</View> :
                                        <View key={j} style={styles.imageCont}>{UniformRed}</View>;
                                })}
                            </View>
                        })}

                    </View>
                    <View style={styles.middleCont}>
                        <Text style={styles.middleText}>VS</Text>
                    </View>
                    <View style={styles.rightCont}>
                        {arrangeArray.map((result, i) => {
                            return <View key={i} style={styles.columnCont}>
                                {result.map((innerRes, j) => {
                                    teamBAccount++;
                                    return (teamBAccount - 1 + matchInfo.teamBLeft >= matchInfo.playAccount) ?
                                        <View key={j} style={styles.imageCont}>{UniformAdd}</View> :
                                        <View key={j} style={styles.imageCont}>{UniformBlue}</View>;
                                })}
                            </View>
                        }).reverse()}
                    </View>
                </View>
                <View style={styles.bottomCont}>
                    <View style={styles.shareCont}>
                        <TouchableOpacity onPress={this._shareMatch.bind(this)}>
                            <View style={styles.sharePressRange}>
                                <Image style={styles.shareImg}
                                       source={require('../../res/images/matchInfo/share.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.joinCont}>
                        <Text style={styles.joinText}>立即加入</Text>
                    </View>
                </View>
            </View>
            <ModalConpt
                allowClose={true}
                modalCont={shareModal}
                modalVisible={this.state.shareModalVisible}
                opacity={0}
                position="bottom"
                closeHandle={() => {
                    this.setState({
                        shareModalVisible: false
                    })
                }}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    matchCont: {
        flex: 1
    },
    matchTimeCont: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: 15
    },
    matchTimeImg: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    matchTimeText: {
        fontSize: 17,
        color: '#ffffff'
    },
    playerInfoCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30
    },
    leftCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bgImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch',
        width: null,
        height: null,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0
    },
    middleCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    middleText: {
        fontSize: 20,
        color: '#E8E8E8',
    },
    rightCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    columnCont: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCont: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    uniform2x: {
        width: 25,
        height: 25,
    },
    uniform3x: {
        width: 50,
        height: 50
    },
    bottomCont: {
        height: 40,
        backgroundColor: '#323232',
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    joinCont: {
        width: 170,
        backgroundColor: '#f12b2c',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareImg: {
        width: 25,
        height: 25
    },
    joinText: {
        fontSize: 24,
        color: '#E8E8E8',
        fontStyle: 'italic',
        fontWeight: "bold"
    },
    shareTrdCont: {
        width: width,
        height: 130,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 60,
        paddingRight: 60
    },
    shareImageCont:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareImage:{
        width: 45,
        height: 45
    },
    shareImageText:{
        marginTop: 15
    }
});