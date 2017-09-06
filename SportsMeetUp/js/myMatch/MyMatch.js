/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ListView,
    RefreshControl,
    Text,
    ActivityIndicator
} from 'react-native';
import FetchUtil from '../util/FetchUtil';

import MyMatchInfo from './MyMatchInfo';
import MyApplication from './MyApplication';

const matches = [
    {
        "title": "5V5篮球赛",
        "date": "2017/7/31",
        "location": "石油大学篮球场",
        "time": "17:30 - 19:30"
    },
    {
        "title": "1V1乒乓球赛",
        "date": "2017/7/31",
        "location": "北京大学乒乓球场",
        "time": "17:30 - 19:30"
    },
    {
        "title": "11V11足球赛",
        "date": "2017/7/31",
        "location": "陕西省体育场",
        "time": "17:30 - 19:30"
    },
];

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class MyMatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false,
            page: 0,
            matches: [],
            isShowBottomRefresh: false
        };
    }

    componentWillMount() {
        this.getMyMatches();
    }

    getMyMatches(action = 'fresh') {
        action === 'fresh' ? this.setState({
            page: 0,
            isRefreshing: true
        }) : this.setState({
            isShowBottomRefresh: true
        });
        const options = {
            "url": '8086/sports-meetup-papi/matches/getApplyMatches',
            "params": {
                "userId": globalUserInfo.userId,
                "pageAndSize": this.state.page + "," + 6,
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempPage = action === 'fresh' ? 0 : this.state.page + 1;
            let tempMatch = action === 'fresh' ? [] : this.state.matches;
            this.isFirstTime = true;
            if (res.responseBody && res.responseBody.length > 0) {
                tempMatch = tempMatch.concat(res.responseBody);
                this.setState({
                    isRefreshing: false,
                    page: tempPage,
                    matches: tempMatch,
                    dataSource: ds.cloneWithRows(tempMatch),
                    isShowBottomRefresh: false
                });
            } else {
                this.setState({isRefreshing: false, isShowBottomRefresh: false});
            }
        }).catch((error) => {
            this.isFirstTime = true;
            this.setState({
                isRefreshing: false,
                isShowBottomRefresh: false
            });
        })
    }

    onEndReached() {
        if (this.isFirstTime) {
            if (!this.state.isShowBottomRefresh) {
                this.isFirstTime = false;
            }
            return;
        }

        this.isFirstTime = true;
        this.setState({isShowBottomRefresh: true});
        this.getMyMatches('load');
    }

    _renderFooter() {
        if (this.state && this.state.isShowBottomRefresh) {
            return (<View style={{marginVertical: 10}}>
                <ActivityIndicator/>
            </View>);
        }
        return <View style={{marginVertical: 10}}/>;
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <MyMatchInfo match={rowData}/>
        );
    }

    render() {
        const {dataSource, isRefreshing} = this.state;
        return (
            <View style={styles.myMatchCont}>
                {/*<ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() => {
                                this.getMyMatches()
                            }}
                            tintColor="#ff0000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <MyMatchInfo matches={matches}/>
                    <MyApplication/>

                </ScrollView>*/}
                <ListView
                    dataSource={dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={100}
                    enableEmptySections={true}
                    automaticallyAdjustContentInserts={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() => this.getMyMatches('fresh')}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    myMatchCont: {
        flex: 1
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
