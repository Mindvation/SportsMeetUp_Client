'use strict';

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

const {height, width} = Dimensions.get('window');

let componentIndex = 0;

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    title: PropTypes.string,
    style: View.propTypes.style,
    titleStyle: View.propTypes.style,
    titleTextStyle: View.propTypes.style,
    selectStyle: View.propTypes.style,
    optionStyle: View.propTypes.style,
    selectedOptionStyle: View.propTypes.style,
    optionTextStyle: Text.propTypes.style,
    sectionStyle: View.propTypes.style,
    sectionTextStyle: Text.propTypes.style,
    cancelStyle: View.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    overlayStyle: View.propTypes.style,
    cancelText: PropTypes.string
};

const defaultProps = {
    data: [],
    onChange: () => {
    },
    initValue: 'Select me!',
    title: 'Please select',
    style: {},
    titleStyle: {},
    titleTextStyle: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel'
};

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = 350;

export default class ModalPicker extends Component {

    constructor() {

        super();
        this.onChange = this.onChange.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
            selected: 'please select'
        };
    }

    componentDidMount() {
        this.setState({selected: this.props.initValue});
        this.setState({cancelText: this.props.cancelText});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initValue !== this.props.initValue) {
            this.setState({selected: nextProps.initValue});
        }
    }

    onChange(item) {
        this.props.onChange(item);
        this.setState({selected: item.label});
        this.close();
    }

    close() {
        this.setState({
            modalVisible: false
        });
    }

    open() {
        this.setState({
            modalVisible: true
        });
    }

    renderSection(section) {
        return (
            <View key={section.key} style={[styles.sectionStyle, this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    }

    renderOption(option) {
        return (
            <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
                <View style={[styles.optionStyle, this.props.optionStyle,
                    option.key === this.props.initValue ? [styles.selectedOptionStyle, this.props.selectedOptionStyle] : '']}>
                    <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>{option.label}</Text>
                </View>
            </TouchableOpacity>)
    }

    renderOptionList() {
        let options = this.props.data.map((item) => {
            if (item.section) {
                return this.renderSection(item);
            } else {
                return this.renderOption(item);
            }
        });

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]} key={'modalPicker' + (componentIndex++)}>
                <View style={[styles.titleStyle, this.props.titleStyle]}>
                    <Text style={[styles.titleTextStyle, this.props.titleTextStyle]}>{this.props.title}</Text>
                </View>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View style={{paddingHorizontal: 10}}>
                            {options}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.close}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text
                                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>);
    }

    renderChildren() {

        if (this.props.children) {
            return this.props.children;
        }
        return (
            <View style={[styles.selectStyle, this.props.selectStyle]}>
                <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>{this.state.selected}</Text>
            </View>
        );
    }

    render() {

        const dp = (
            <Modal transparent={true} ref="modal" visible={this.state.modalVisible} onRequestClose={this.close}
                   animationType={this.state.animationType}>
                {this.renderOptionList()}
            </Modal>
        );

        return (
            <View style={this.props.style}>
                {dp}
                <TouchableOpacity onPress={this.open}>
                    {this.renderChildren()}
                </TouchableOpacity>
            </View>
        );
    }
}

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;

const styles = StyleSheet.create({
    overlayStyle: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },

    optionContainer: {
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        width: width * 0.8,
        height: OPTION_CONTAINER_HEIGHT,
        backgroundColor: '#ffffff',
        left: width * 0.1,
        top: (height - OPTION_CONTAINER_HEIGHT - 110) / 2 + 1
    },

    cancelContainer: {
        left: width * 0.1,
        width: width * 0.8,
        top: (height - OPTION_CONTAINER_HEIGHT - 110) / 2 + 10
    },

    titleStyle: {
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        left: width * 0.1,
        width: width * 0.8,
        height: 50,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        top: (height - OPTION_CONTAINER_HEIGHT - 110) / 2
    },

    titleTextStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: FONT_SIZE
    },

    selectStyle: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        borderRadius: BORDER_RADIUS
    },

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE
    },

    cancelStyle: {
        borderRadius: BORDER_RADIUS,
        width: width * 0.8,
        backgroundColor: '#ffffff',
        padding: PADDING
    },

    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE,
        paddingTop: 5,
        paddingBottom: 5
    },

    optionStyle: {
        padding: PADDING,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    selectedOptionStyle: {
        backgroundColor: '#e8e8e8'
    },

    optionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        color: HIGHLIGHT_COLOR,
        paddingTop: 5,
        paddingBottom: 5
    },

    sectionStyle: {
        padding: PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        color: '#000000'
    }
});