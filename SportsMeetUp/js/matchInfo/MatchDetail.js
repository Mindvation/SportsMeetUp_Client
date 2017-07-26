import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import Arrangement from '../../res/data/arrangement.json';

const matchInfo = {
    "playAccount": 5,
    "teamALeft": 3,
    "teamBLeft": 0
}

export default class MatchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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

        const arrangeArray = arrangeInfo.arrange;
        return (<View style={styles.mainCont}>
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
        </View>)
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'red',
        height: 200
    },
    middleCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        backgroundColor: 'green',
        height: 200
    },
    middleText: {
        fontSize: 18,
        color: '#E8E8E8'
    },
    rightCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'red',
        height: 200
    },
    columnCont: {
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        height: 200,
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
    }
});