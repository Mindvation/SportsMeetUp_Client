import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default class PickerPage extends Component {
    constructor(props) {
        super(props);
    }

    _selectOption = (option) => {
        const {navigator} = this.props;
        this.props.getSelect(option);
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_view}>
                    <Text style={styles.title_text}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={styles.pickerCont}>
                    <ScrollView ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}>
                        {this.props.options.map((aOption) =>
                            <TouchableOpacity key={aOption.value}
                                                      onPress={() => this._selectOption(aOption.value)}>
                                <View style={[styles.pickerItem, {
                                    backgroundColor: aOption.value == this.props.selectedOption ? '#dedfe0' : '#ffffff'
                                }]}>
                                    <View>
                                        <Text style={styles.pickerText}>{aOption.label}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title_view: {
        flexDirection: 'row',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00897b',
    },
    title_text: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    },
    pickerCont: {},
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
});