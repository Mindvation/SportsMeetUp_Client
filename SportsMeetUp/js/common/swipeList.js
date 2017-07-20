import React, {Component} from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import OTApplyMain from '../otApply/otApplyMain';

export default class SwipeList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listViewData: Array(3).fill('').map((_,i)=>`item #${i}`)
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }

    render() {
        return (
            <View style={styles.container}>
                    <SwipeListView
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={ data => (
                            <TouchableHighlight
                                onPress={ _ => console.log('You touched me') }
                                style={styles.rowFront}
                                underlayColor={'#AAA'}
                            >
                                <View >
                                    <Text style={styles.msgText}>There is a meeting will be hold on 11:00~12:00</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenRow={ (data, secId, rowId, rowMap) => (
                            <View style={styles.hiddenRow}>
                                <TouchableOpacity style={[styles.backRightBtnRight,styles.backRightBtn]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        disableLeftSwipe={true}

                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding:6
    },
    msgText:{
        color: '#00897B',
        fontSize: 16
    },
    rowFront: {
        borderWidth:1,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        height: 40,
        marginTop:3,
        paddingLeft: 10,
        borderColor:'#00897B'
    },
    hiddenRow: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:40,
        marginTop:3,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    deleteText: {
        color: '#ffffff',
        fontSize: 16
    },
    backRightBtnRight: {
        backgroundColor: '#00897B',
    },

});