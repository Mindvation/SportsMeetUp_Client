import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

export default class TextInputConpt extends Component {
    static propTypes = {
        labelCont: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        isPassword: React.PropTypes.bool,
        keyboardType: React.PropTypes.string,
        isShowClear: React.PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            txtValue: props.value,
            isSecure: true
        };

    }

    _isEmpty(text) {
        if (text === null || text === undefined || text === "") {
            return true;
        }
        return false;
    }

    _toggleSecure() {
        this.setState({
            isSecure: !this.state.isSecure
        })
    }

    _clearValue() {
        this.props.onChange ? this.props.onChange('') : null;
        this.setState({
            txtValue: ''
        })
    }

    _textValueChange(text) {
        this.props.onChange ? this.props.onChange(text) : null;
        this.setState({
            txtValue: text
        })
    }

    render() {
        const {
            labelCont, placeholder, isPassword, keyboardType, isShowClear,
            isHideBorder, style, contStyle, multiLine
        } = this.props;

        const clearBtn = <TouchableOpacity onPress={() => {
            this._clearValue()
        }}>
            <Image style={styles.inputRightBtn} source={require('../../res/images/clear.png')}></Image>
        </TouchableOpacity>;

        const hiddenPwdBtn = <TouchableOpacity onPress={() => {
            this._toggleSecure()
        }}>
            <Image style={styles.inputRightBtn} source={require('../../res/images/hidePwd.png')}></Image>
        </TouchableOpacity>;

        const showPwdBtn = <TouchableOpacity onPress={() => {
            this._toggleSecure()
        }}>
            <Image style={styles.inputRightBtn} source={require('../../res/images/showPwd.png')}></Image>
        </TouchableOpacity>;

        return (
            <View style={[styles.inputCont, isHideBorder ? null : {
                borderBottomWidth: 1,
                borderBottomColor: '#f1f1f1'
            }, multiLine ? null : {height: 55}]}>
                <View style={[styles.txtBorder, contStyle ? contStyle : null]}>
                    <Text style={styles.txtLabel}>{labelCont}</Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={[styles.txtCont, style ? style : null, multiLine ? {
                            minHeight: 200,
                            textAlignVertical: 'top'
                        } : null]}
                        multiline={multiLine}
                        placeholder={placeholder}
                        secureTextEntry={isPassword && this.state.isSecure}
                        onChangeText={(text) => {
                            this._textValueChange(text);
                        }}
                        keyboardType={keyboardType}
                        value={this.state.txtValue}
                        numberOfLines={multiLine ? 4 : 1}
                    />
                    {!isPassword && isShowClear && !this._isEmpty(this.state.txtValue) ? clearBtn : null}
                    {isPassword ? (this.state.isSecure ? showPwdBtn : hiddenPwdBtn) : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
    msgCont: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
        left: 15
    },
    msgImage: {
        width: 15,
        height: 15,
    },
    msgText: {
        fontSize: 11
    },
    txtBorder: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    txtLabel: {
        fontSize: 17,
        color: '#393939',
    },
    txtCont: {
        flex: 1,
        fontSize: 12,
        marginLeft: 17,
        color: '#898989'
    },
    inputRightBtn: {
        width: 15,
        height: 15,
        paddingRight: 7
    }
});