import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class CheckBoxConpt extends Component {
    static propTypes = {
        isChecked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked
        };
    }

    _toggleCheckBox() {
        if (this.props.onChange) {
            this.props.onChange(!this.state.isChecked)
        }
        this.setState({
            isChecked: !this.state.isChecked
        })

    }

    render() {
        const checkedImg = <Image style={styles.checkBoxImg} source={require('../../res/images/checkedBox.png')}/>

        const uncheckedImg = <Image style={styles.checkBoxImg} source={require('../../res/images/uncheckedBox.png')}/>

        return (
            <View style={styles.mainCont}>
                {this.props.labelCont}
                <View style={styles.checkBoxCont}>
                    <TouchableOpacity
                        onPress={() => {
                            this._toggleCheckBox();
                        }}
                    >
                        {this.state.isChecked ? checkedImg : uncheckedImg}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 27,
        marginLeft: 15
    },
    checkBoxCont: {
        marginLeft: 15
    },
    checkBoxImg: {
        width: 15,
        height: 15
    }
});