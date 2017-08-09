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
    Dimensions,
    ScrollView
} from 'react-native';
import CommonUtil from '../util/CommonUtil';

import NearbyMatch from './NearbyMatch';

const {width} = Dimensions.get('window');
const matchs = [
    {
        "sponsor": "Darcy",
        "title": "11V11足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "date": "2017/08/09",
        "time": "17:30-19:30",
        "teamBlueLeft": 8,
        "teamRedLeft": 5,
        "total": 22,
        "distance": "31m"
    }, {
        "sponsor": "Frank",
        "title": "2V2足球赛",
        "location": "曲江圣卡纳1",
        "date": "2017/08/09",
        "time": "16:30-17:30",
        "teamBlueLeft": 1,
        "teamRedLeft": 0,
        "total": 4,
        "distance": "5.5km"
    }, {
        "sponsor": "Bob",
        "title": "4V4足球赛",
        "location": "曲江圣卡纳2",
        "date": "2017/08/11",
        "time": "20:30-22:30",
        "teamBlueLeft": 8,
        "teamRedLeft": 5,
        "total": 8,
        "distance": "3km"
    }, {
        "sponsor": "Frank",
        "title": "1V1乒乓球赛",
        "location": "曲江圣卡纳3",
        "date": "2017/08/09",
        "time": "17:30-19:30",
        "teamBlueLeft": 1,
        "teamRedLeft": 0,
        "total": 2,
        "distance": "5.5km"
    },
];

export default class MyInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyMatch: []
        };
    }

    componentDidMount() {
        this._filterMatchInfo();
    }

    _filterMatchInfo() {
        //TODO dummy data 之后日期改为当天
        let todayDate = new Date("2017/8/9");
        let firstDay = CommonUtil.dateFormat(new Date("2017/8/9"), "yyyy/MM/dd");
        let secondDay = CommonUtil.dateFormat(new Date(todayDate.setDate(todayDate.getDate() + 1)), "yyyy/MM/dd");
        let thirdDay = CommonUtil.dateFormat(new Date(todayDate.setDate(todayDate.getDate() + 1)), "yyyy/MM/dd");
        let matchArr = {
            [firstDay]: [],
            [secondDay]: [],
            [thirdDay]: []
        };
        matchs.map(match => {
            Object.keys(matchArr).map(day => {
                if (day === match.date) {
                    matchArr[day].push(match);
                }
            })
        });

        this.setState({
            dailyMatch: matchArr
        })
    }

    render() {
        return ( <View>
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {
                        Object.keys(this.state.dailyMatch).map((date, i) => {
                            return this.state.dailyMatch[date].length ?
                                (<View style={styles.itemCont} key={"date_" + i}>
                                        <Text style={styles.matchDate}>{date}</Text>
                                        {this.state.dailyMatch[date].map((match, j) => {
                                            return <NearbyMatch key={"match_" + j} match={match}/>
                                        })}
                                    </View>
                                ) : null
                        })
                    }

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemCont: {
        backgroundColor: '#ffffff',
        marginBottom: 15
    },
    matchDate: {
        backgroundColor: '#191919',
        paddingLeft: 15,
        color: '#dedede',
        height: 40,
        fontSize: 15,
        textAlignVertical: 'center'
    }
});
