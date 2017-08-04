import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Radio extends Component {
    static propTypes = {
        options: React.PropTypes.array,
        initial: React.PropTypes.string,
        onPress: React.PropTypes.func,
        buttonColor: React.PropTypes.string,
        buttonSize: React.PropTypes.number,
        buttonInnerSize: React.PropTypes.number,
        textStyle: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.initial
        };
    }

    _toggleIndex(index) {
        this.setState({
            selectedIndex: index
        });

        if (this.props.onPress) {
            this.props.onPress(index);
        }
    }

    render() {
        const {options, buttonColor, buttonSize, buttonInnerSize, textStyle} = this.props;

        return (
            <View style={styles.mainCont}>

                {
                    options.map((result, i) => {
                        return <View key={i} style={styles.radioItem}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._toggleIndex(result.value);
                                }}
                                style={[this.state.selectedIndex === result.value ? styles.radioBtnOuter : styles.radioBtnUnSelectedOuter,
                                    this.state.selectedIndex === result.value && buttonColor ? {borderColor: buttonColor} : null,
                                    buttonSize ? {
                                        width: buttonSize,
                                        height: buttonSize,
                                        borderRadius: buttonSize / 2
                                    } : null
                                ]}
                            >
                                <View style={[this.state.selectedIndex === result.value ? styles.radioBtnInner : null,
                                    this.state.selectedIndex === result.value && buttonColor ? {backgroundColor: buttonColor} : null,
                                    buttonInnerSize ? {
                                        width: buttonInnerSize,
                                        height: buttonInnerSize,
                                        borderRadius: buttonInnerSize / 2
                                    } : null
                                ]}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._toggleIndex(result.value);
                                }}
                            >
                                <View>
                                    <Text
                                        style={[styles.radioLabel, textStyle ? textStyle : null]}>{result.label}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioBtnOuter: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#50C900',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioBtnInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#50C900'
    },
    radioLabel: {
        fontSize: 16,
        color: '#000000',
        marginLeft: 10
    },
    radioItem: {
        marginRight: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioBtnUnSelectedOuter: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#ababab',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    }
});