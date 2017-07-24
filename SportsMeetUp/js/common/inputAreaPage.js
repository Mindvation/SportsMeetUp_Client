import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableHighlight
} from 'react-native';
const dismissKeyboard = require('dismissKeyboard');

export default class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    componentDidMount() {
        this.setState({
            content: this.props.content,
        });
    }

    responseContent = () => {
        dismissKeyboard();
        const {navigator} = this.props;
        this.props.getContent(this.state.content);
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
                <ScrollView ref={(scrollView) => {
                    _scrollView = scrollView;
                }}>
                    <TextInput
                        style={styles.inputarea}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(content) => this.setState({content})}
                        value={this.state.content}
                        numberOfLines = {4}
                    />
                </ScrollView>
                <TouchableHighlight
                    onPress={() => {
                        this.responseContent();
                    }}
                    activeOpacity={0.7}
                    style={styles.button}
                    underlayColor='#008080'
                >
                    <Text style={styles.logonButtonText}>OK</Text>
                </TouchableHighlight>
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
    inputarea: {
        minHeight: 200,
        borderColor: '#00897b',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    button: {
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00897b',
        height: 52
    },
    logonButtonText: {
        fontSize: 20,
        color: 'white'
    },
});