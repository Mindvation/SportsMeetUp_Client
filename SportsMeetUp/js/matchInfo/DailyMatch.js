import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';

import MatchDetail from './MatchDetail';

let interval;

export default class DailyMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            matchInfo: []
        };
    }

    componentDidMount() {
        this._getMatchInfo();
    }

    //get match info from server
    _getMatchInfo() {
        this.setState({isRefreshing: true});
        interval = setInterval(() => {
            this.setState({
                isRefreshing: false,
                matchInfo: [{
                    "matchId": 1,
                    "playAccount": 11,
                    "teamALeft": 3,
                    "teamBLeft": 0,
                    "startTime": '8:00',
                    "endTime": '12:00'
                }, {
                    "matchId": 2,
                    "playAccount": 2,
                    "teamALeft": 2,
                    "teamBLeft": 1,
                    "startTime": '14:00',
                    "endTime": '16:00'
                }, {
                    "matchId": 3,
                    "playAccount": 1,
                    "teamALeft": 1,
                    "teamBLeft": 0,
                    "startTime": '17:00',
                    "endTime": '18:00'
                }]
            });
            interval && clearInterval(interval);
        }, 2000)
    }

    refreshDate() {
        this.setState({isRefreshing: true});
        interval = setInterval(() => {
            this.setState({
                isRefreshing: false,
                matchInfo: [{
                    "matchId": 1,
                    "playAccount": 4,
                    "teamALeft": 3,
                    "teamBLeft": 0,
                    "startTime": '8:00',
                    "endTime": '12:00'
                }, {
                    "matchId": 2,
                    "playAccount": 6,
                    "teamALeft": 2,
                    "teamBLeft": 4,
                    "startTime": '14:00',
                    "endTime": '16:00'
                }, {
                    "matchId": 3,
                    "playAccount": 3,
                    "teamALeft": 1,
                    "teamBLeft": 0,
                    "startTime": '17:00',
                    "endTime": '18:00'
                }]
            });
            interval && clearInterval(interval);
        }, 2000)
    }

    render() {
        const rows = this.state.matchInfo.map((result, i) => {
            return <MatchDetail key={i} matchInfo={result}/>;
        });

        return (<View style={styles.mainCont}>
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => {
                            this.refreshDate()
                        }}
                        tintColor="#ff0000"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffffff"
                    />
                }>
                {rows}
            </ScrollView>
        </View>)
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#272727'
    },
    scrollview: {
        flex: 1,
    }
});