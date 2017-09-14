import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';

import ModalConpt from '../common/ModalConpt';

const {width} = Dimensions.get('window');

export default class AcceptMatch extends Component {
    static propTypes = {
        modalVisible: React.PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    _closeAcceptDialog() {
        if (this.props.closeHandle) {
            this.props.closeHandle()
        }
    }

    render() {
        const {data} = this.props;
        const playerImg = <Image style={styles.playerImage} source={require('../../res/images/me/player.png')}/>;
        const localImg = <Image style={styles.playerImage} source={require('../../res/images/me/location.png')}/>;
        const calendarImg = <Image style={styles.playerImage} source={require('../../res/images/me/calendar.png')}/>;
        const clockImg = <Image style={styles.playerImage} source={require('../../res/images/me/clock.png')}/>;

        let ivt = [
            {
                "text": <Text>
                    <Text style={{color: '#ff8400', fontSize: 16}}>{data.joinedAmmount}</Text>
                    <Text style={{color: '#000000', fontSize: 16}}>/{data.totalNumber}</Text>
                </Text>,
                "image": playerImg
            },
            {
                "text": data.address,
                "image": localImg
            },
            {
                "text": data.date,
                "image": calendarImg
            },
            {
                "text": data.startTime + " - " + data.endTime,
                "image": clockImg
            }
        ];

        let modal = <View style={styles.acceptSucCont}>
            <View style={styles.titleCont}>
                <Image style={styles.titleImage} source={require('../../res/images/me/acptSuc.png')}/>
                <Text style={styles.shareTitleText}>加入成功</Text>
            </View>
            <View style={styles.matchInfoCont}>
                {
                    ivt.map((result, i) => {
                        return <View key={i} style={styles.playerCont}>
                            {result.image}
                            <Text style={styles.playerText}>{result.text}</Text>
                        </View>
                    })
                }
            </View>
            <TouchableOpacity
                onPress={() => {
                    this._closeAcceptDialog();
                }}
                style={styles.closeDialogBtn}
            >
                <Text style={styles.closeDialogText}>确 认</Text>
            </TouchableOpacity>
        </View>;

        return (
            <ModalConpt
                allowClose={false}
                modalCont={modal}
                modalVisible={this.props.modalVisible}
            />
        )
    }
}

const styles = StyleSheet.create({
    acceptSucCont: {
        backgroundColor: '#ffffff',
        width: width - 60,
        borderRadius: 5
    },
    titleCont: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 76,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    titleImage: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    shareTitleText: {
        fontSize: 20,
        color: '#000000'
    },
    matchInfoCont: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginBottom: 30
    },
    playerCont: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15
    },
    playerImage: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    playerText: {
        flex: 1,
        fontSize: 16
    },
    closeDialogBtn: {
        backgroundColor: '#df3939',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    closeDialogText: {
        fontSize: 18,
        color: '#ffffff'
    }
});