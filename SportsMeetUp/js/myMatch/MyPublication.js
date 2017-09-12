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
    RefreshControl,
    ListView,
    ActivityIndicator
} from 'react-native';
import FetchUtil from '../util/FetchUtil';
import {matchTypeMapping, sportTypeMapping} from '../data/Mapping';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const pageSize = 6;

export default class MyPublication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            page: 0,
            matches: [],
            isShowBottomRefresh: false,
            isEnded: true
        };
    }

    componentDidMount() {
        this.getMyMatches('fresh');
    }

    getMyMatches(action) {
        let page = this.state.page;
        if (action === 'fresh') {
            page = 0;
            this.setState({
                isRefreshing: true
            })
        } else {
            this.setState({
                isShowBottomRefresh: true
            })
        }
        const options = {
            "url": '8086/sports-meetup-papi/matches/getMyOldMatches',
            "params": {
                "userId": globalUserInfo.userId,
                "pageAndSize": page + "," + pageSize,
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempMatch = action === 'fresh' ? [] : this.state.matches;
            if (res.responseBody && res.responseBody.length > 0) {
                tempMatch = tempMatch.concat(res.responseBody);
                console.info('Match Length === ' + tempMatch.length);
                page++;
                this.setState({
                    isRefreshing: false,
                    page: page,
                    matches: tempMatch,
                    isShowBottomRefresh: false
                });
            } else {
                this.setState({isRefreshing: false, isShowBottomRefresh: false});
            }

            if (res.responseBody) {
                if (res.responseBody.length < pageSize) {
                    this.setState({
                        isEnded: true
                    })
                } else {
                    this.setState({
                        isEnded: false
                    })
                }

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
        this.getMyMatches('load');
    }

    _renderFooter() {
        if (this.state && this.state.isShowBottomRefresh) {
            return (<View size="large">
                <ActivityIndicator/>
            </View>);
        }
        return <View/>;
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.borderLine}>
                <View style={styles.closeInviteCont}>
                    <View style={styles.invitePersonalCont}>
                        <Text
                            style={styles.appPersonalText}>{matchTypeMapping[rowData.matchType] + " " + sportTypeMapping[rowData.fieldType]}</Text>
                        <Text style={styles.appTimeText}>时间：{rowData.startTime}</Text>
                    </View>
                    <View style={styles.locationCont}>
                        <Text style={styles.locationText}>地点：{rowData.address}</Text>
                        <Text style={styles.titleText}>人数：{rowData.joinedAmmount + "/" + rowData.totalNumber}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderRowForNoData() {
        return <View style={styles.noDataCont}>
            <Text style={styles.noDataText}>没有比赛...</Text>
        </View>
    }

    render() {
        const {matches, isRefreshing} = this.state;
        return (
            <View style={styles.myMatchCont}>
                {!isRefreshing && (!matches || matches.length === 0) ?
                    <ListView
                        dataSource={ds.cloneWithRows(['noData'])}
                        renderRow={this._renderRowForNoData.bind(this)}
                        enableEmptySections={true}
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
                    /> :
                    <ListView
                        dataSource={ds.cloneWithRows(matches)}
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
                                onRefresh={() => this.getMyMatches('fresh')}
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
    myMatchCont: {
        flex: 1
    },
    locationCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    appPersonalText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10
    },
    appTimeText: {
        color: '#000000'
    },
    closeInviteCont: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15
    },
    locationText: {
        fontSize: 15,
        color: '#000000',
        flex: 1,
        marginRight: 10
    },
    timeText: {
        fontSize: 15,
        color: '#000000'
    },
    invitePersonalCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    titleText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold'
    },
    borderLine: {
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1
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
