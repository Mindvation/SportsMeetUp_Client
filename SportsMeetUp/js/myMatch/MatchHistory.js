/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    ListView,
    ActivityIndicator
} from 'react-native';
import FetchUtil from '../util/FetchUtil';
import {matchTypeMapping, sportTypeMapping} from '../data/Mapping';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const pageSize = 6;
export default class MatchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: "",
            isRefreshing: false,
            page: 0,
            matchHistory: [],
            isShowBottomRefresh: false,
            isEnded: true
        };
    }

    selectApplication(index) {
        this.setState({
            selectIndex: index
        })
    }

    componentDidMount() {
        this.getMatchHistory('fresh');
    }

    getMatchHistory(action) {
        let page = this.state.page;
        if (action === 'fresh') {
            page = 0;
            this.setState({
                isRefreshing: true,
                selectIndex: ""
            })
        } else {
            this.setState({
                isShowBottomRefresh: true
            })
        }
        const options = {
            "url": '8086/sports-meetup-papi/matches/getOldApplyMatches',
            "params": {
                "userId": globalUserInfo.userId,
                "pageAndSize": page + "," + pageSize,
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempMatch = action === 'fresh' ? [] : this.state.matchHistory;
            if (res.responseBody && res.responseBody.length > 0) {
                tempMatch = tempMatch.concat(res.responseBody);
                console.info('Match Length === ' + tempMatch.length);
                page++;
                this.setState({
                    isRefreshing: false,
                    page: page,
                    matchHistory: tempMatch,
                    isShowBottomRefresh: false
                });
            } else {
                this.setState({isRefreshing: false, isShowBottomRefresh: false});
            }

            if (res.responseBody && res.responseBody.length < pageSize) {
                this.setState({
                    isEnded: true
                })
            }
        }).catch((error) => {
            this.setState({
                isRefreshing: false,
                isShowBottomRefresh: false
            });
        })
    }

    onEndReached() {
        if (this.state.isRefreshing || this.state.isShowBottomRefresh || this.state.isEnded) return;
        console.info('onEndReached');
        this.getMatchHistory('load');
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
            <View style={styles.matchCont}>
                <View
                    style={[styles.borderLine, this.state.selectIndex === rowID ? {display: 'none'} : null]}>
                    <TouchableOpacity onPress={() => this.selectApplication(rowID)}>
                        <View style={styles.closeInviteCont}>
                            <Text
                                style={styles.closeHistoryText}>{rowData["startTime"]}</Text>
                            <Text
                                style={styles.closeHistoryText}>{matchTypeMapping[rowData["matchType"]] + " " + sportTypeMapping[rowData["fieldType"]]}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.borderLine, this.state.selectIndex === rowID ? null : {display: 'none'}]}>
                    <View style={styles.handleInviteCont}>
                        <View style={styles.invitePersonalCont}>
                            <Text
                                style={styles.appPersonalText}>{matchTypeMapping[rowData["matchType"]] + " " + sportTypeMapping[rowData["fieldType"]]}</Text>
                            <Text style={styles.appTimeText}>时间：{rowData["startTime"]}</Text>
                        </View>
                        <View style={styles.locationCont}>
                            <Text style={styles.locationText}>地点：{rowData["address"]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _renderRowForNoData() {
        return <View style={styles.noDataCont}>
            <Text style={styles.noDataText}>没有比赛记录...</Text>
        </View>
    }

    render() {
        const {matchHistory, isRefreshing} = this.state;
        return (
            <View style={styles.matchHistoryCont}>
                {!isRefreshing && (!matchHistory || matchHistory.length === 0) ?
                    <ListView
                        dataSource={ds.cloneWithRows(['noData'])}
                        renderRow={this._renderRowForNoData.bind(this)}
                        enableEmptySections={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={() => this.getMatchHistory('fresh')}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#fff"
                            />
                        }
                    /> : <ListView
                        dataSource={ds.cloneWithRows(matchHistory)}
                        renderRow={this._renderRow.bind(this)}
                        renderFooter={this._renderFooter.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={1}
                        enableEmptySections={true}
                        automaticallyAdjustContentInserts={false}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={() => this.getMatchHistory('fresh')}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#fff"
                            />
                        }
                    />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    matchHistoryCont: {
        flex: 1
    },
    matchCont: {
        backgroundColor: '#ffffff'
    },
    borderLine: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    handleInviteCont: {
        backgroundColor: '#272727',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15
    },
    closeInviteCont: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30,
        paddingBottom: 30
    },
    invitePersonalCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    appPersonalText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10
    },
    appTimeText: {
        color: '#E8E8E8'
    },
    locationText: {
        fontSize: 15,
        color: '#E8E8E8',
        flex: 1,
        marginRight: 10
    },
    locationCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    closeHistoryText: {
        fontSize: 18,
        color: '#000000'
    },
    noDataCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noDataText: {
        fontSize: 20,
        marginTop: 50
    }
});

