import React, {Component} from 'react';
import {
	StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

export default class TextInputConpt extends Component{
	static propTypes = {
		labelCont: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        isPassword: React.PropTypes.bool,
        keyboardType:React.PropTypes.string,
        isShowClear: React.PropTypes.bool
    }

    constructor(props){
        super(props);
        this.state = {
        	txtValue: '',
            isSecure: true
        };

    }

    _isEmpty(text){
        if(text === null || text === undefined || text === ""){
            return true;
        }
        return false;
    }

    _toggleSecure(){
        this.setState({
            isSecure: !this.state.isSecure
        })
    }

    _clearValue(){
        this.setState({
            txtValue: ''
        })
    }

    render(){
    	var { labelCont, placeholder, isPassword, keyboardType, isShowClear, isHideBorder} = this.props;

        const clearBtn = <TouchableWithoutFeedback onPress={() => {this._clearValue()}}>
            <Image style={styles.inputRightBtn} source={require('../../res/images/clear.png')}></Image>
        </TouchableWithoutFeedback>;

        const hiddenPwdBtn = <TouchableWithoutFeedback onPress={() => {this._toggleSecure()}}>
            <Image style={styles.inputRightBtn} source={require('../../res/images/hidePwd.png')}></Image>
        </TouchableWithoutFeedback>;

        const showPwdBtn = <TouchableWithoutFeedback onPress={() => {this._toggleSecure()}}>
            <Image style={styles.inputRightBtn} source={require('../../res/images/showPwd.png')}></Image>
        </TouchableWithoutFeedback>;

        return (
			<View style={[styles.txtBorder,isHideBorder?null:{borderBottomWidth: 1,
                borderBottomColor: '#f1f1f1'}]}>
				<Text style={styles.txtLabel}>{labelCont}</Text>
				<TextInput
					underlineColorAndroid = {'transparent'}
                    style={styles.txtCont}
                    multiline={false}
                    placeholder={placeholder}
                    secureTextEntry={isPassword && this.state.isSecure}
                    onChangeText={(text) => {
	                    this.setState({
	                    	txtValue: text
	                    })
                    }}
                    keyboardType={keyboardType}
                    value={this.state.txtValue}
				/>
                {!isPassword && isShowClear && !this._isEmpty(this.state.txtValue)?clearBtn:null}
                {isPassword?(this.state.isSecure?showPwdBtn:hiddenPwdBtn):null}
			</View>
        );
    }

    getValue () {
        return this.state.txtValue
    }
}
const styles = StyleSheet.create({
	txtBorder: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
        color: '#898989',
        justifyContent: 'center',
	},
    inputRightBtn: {
        width: 15,
        height: 15,
        marginRight: 7
    }
});