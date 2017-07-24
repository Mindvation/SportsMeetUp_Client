import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    ListView,
    TouchableOpacity,
    Platform
} from 'react-native';

import makeCancelable from '../util/Cancelable';
import Toast, {DURATION} from 'react-native-easy-toast';
import ViewUtils from '../util/ViewUtils';
const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputKey: '',
            isLoading: false,
            showBottomButton: false,
            rightButtonText: 'Go',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    _selectOption = (option) => {
        const {navigator} = this.props;
        this.props.getSelect(option);
        if (navigator) {
            navigator.pop();
        }
    };

    onRightButtonClick() {
        if (this.state.rightButtonText === 'Go') {
            this.updateState({rightButtonText: 'Cancel'});
            this.loadData();
        } else {
            this.updateState({
                rightButtonText: 'Go',
                isLoading: false,
            });
            this.cancelable.cancel();
        }
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    onBackPress(e) {
        this.refs.input.blur();
        this.props.navigator.pop();
        return true;
    }

    genFetchUrl(category) {
        return API_URL + category + QUERY_STR;
    }

    loadData() {
        this.updateState({
            isLoading: true,
            showBottomButton: false,
        });
        this.cancelable = makeCancelable(fetch(this.genFetchUrl(this.state.inputKey)));
        this.cancelable.promise
            .then((response) => response.json())
            .then((responseData) => {
                if (!this || !responseData || !responseData.items || responseData.items.length === 0) {
                    this.refs.toast.show(this.state.inputKey + ' nothing found.', DURATION.LENGTH_SHORT);
                    this.updateState({isLoading: false, rightButtonText: 'Go',});
                    return;
                }
                this.items = responseData.items;
                this.flushFavoriteState();
            })
            .catch((error) => {
                this.updateState({
                    isLoading: false,
                    rightButtonText: 'Go',
                });
            });
    }

    flushFavoriteState() {//更新ProjectItem的Favorite状态
        let projectModels = this.items;
        this.updateState({
            isLoading: false,
            dataSource: this.getDataSource(projectModels),
            rightButtonText: 'Go',
        });
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    renderRow(projectModel, sectionID, rowID) {
        return (
            <View
                key={projectModel.id}>
                <TouchableOpacity
                    onPress={() => this._selectOption(projectModel.id)}>
                    <View style={styles.pickerItem}>
                        <View>
                            <Text style={styles.pickerText}>{projectModel.id}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderTitleBar() {
        let backButton = ViewUtils.getLeftButton(() => this.onBackPress());
        let titleView =
            <View style={styles.title_view}>
                <Text style={styles.title_text}>
                    {this.props.title}
                </Text>
            </View>
        return (
            <View style={{
                backgroundColor: '#00897b',
                height: 52,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {backButton}
                {titleView}
            </View>
        )
    }

    renderNavBar() {
        let inputView =
            <TextInput
                ref="input"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                underlineColorAndroid="transparent"
                placeholder="Search"
                placeholderTextColor="#00897b"
                clearTextOnFocus={true}
                clearButtonMode="while-editing"
                onChangeText={(inputKey) => this.setState({inputKey})}
            ></TextInput>;
        let rightButton =
            <TouchableOpacity
                onPress={() => {
                    this.refs.input.blur();
                    this.onRightButtonClick();
                }}
            >
                <View style={{alignItems: 'center', marginRight: 10}}>
                    <Text style={styles.title}>{this.state.rightButtonText}</Text>
                </View>
            </TouchableOpacity>;
        return (
            <View style={styles.searchBar}>
                {inputView}
                {rightButton}
            </View>
        )
    }

    render() {
        let indicatorView = this.state.isLoading ?
            <ActivityIndicator
                animating={this.state.isLoading}
                style={[styles.centering,]}
                size="large"
            /> : null;
        let listView = !this.state.isLoading ?
            <ListView
                ref="listView"
                style={styles.listView}
                renderRow={(e) => this.renderRow(e)}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
            /> : null;
        let resultView =
            <View style={{flex: 1}}>
                {indicatorView}
                {listView}
            </View>
        return (
            <View style={{flex: 1}}>
                {this.renderTitleBar()}
                {this.renderNavBar()}
                {resultView}
                <Toast ref="toast" position='bottom'/>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    title_view: {
        flexDirection: 'row',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00897b',
        marginRight: 42,
        flex: 1
    },
    title_text: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    },
    searchBar: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00897b',
        marginTop: 5
    },
    title: {
        fontSize: 18,
        color: '#00897b',
        fontWeight: '500',
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: 0,
        borderColor: 'white',
        alignSelf: 'center',
        paddingLeft: 5,
        marginLeft: 5,
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.7,
        color: '#000000'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        flex: 1,
    },
    pickerItem: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomColor: '#dedfe0',
        borderBottomWidth: 1,
        height: 50,
    },
    pickerText: {
        fontSize: 16,
        color: '#000000'
    }
})