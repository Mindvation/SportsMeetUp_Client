import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    ScrollView
} from 'react-native';

const {width} = Dimensions.get('window');

export default class Filter extends Component {
    static propTypes = {
        isMultiple: React.PropTypes.bool,
        data: React.PropTypes.array,
        onSubmit: React.PropTypes.func,
        visible: React.PropTypes.bool,
        onClose: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this._submit = this._submit.bind(this);
        this._clear = this._clear.bind(this);
        this.state = {
            multipleValue: []
        };
    }

    _updateSpecies(key) {
        let species = this.state.multipleValue;
        let index = species.indexOf(key);
        index > -1 ? species.splice(index, 1) : species.push(key);
        this.setState({
            multipleValue: species
        })
    }

    _returnSingleValue(key) {
        if (this.props.onSubmit) {
            this.props.onSubmit(key);
        }
    }

    _submit() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.multipleValue);
        }
    }

    _clear() {
        this.setState({
            multipleValue: []
        })
    }

    render() {
        const {isMultiple, data, visible, onClose} = this.props;
        const multiple =
            <View style={styles.multipleCont}>
                <View style={styles.multiple}>
                    {data.map((result, i) => {
                        return <TouchableOpacity
                            style={[styles.multipleItemCont,
                                this.state.multipleValue.indexOf(result.key) > -1 ?
                                    {backgroundColor: '#f39700'} : {backgroundColor: '#ffffff'}]}
                            key={i}
                            onPress={() => this._updateSpecies(result.key)}>
                            <Text style={styles.itemText}>{result.value}</Text>
                        </TouchableOpacity>;
                    })}
                </View>
                <View style={styles.multipleBottom}>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={this._submit}>
                        <Text style={styles.itemText}>完成</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={this._clear}>
                        <Text style={styles.itemText}>清空</Text>
                    </TouchableOpacity>
                </View>
            </View>;
        const single =
            <View style={styles.single}>
                {data.map((result, i) => {
                    return <TouchableOpacity
                        style={styles.singleItemCont} key={i}
                        onPress={() => this._returnSingleValue(result.key)}>
                        <Text style={styles.itemText}>{result.value}</Text>
                    </TouchableOpacity>;
                })}
            </View>;

        const filterCont =
            <View style={styles.filterCont}>
                <Animated.View style={styles.mask}>
                    <TouchableWithoutFeedback onPress={() => onClose()}>
                        <View style={styles.maskView}/>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Animated.View style={styles.modalBackground}>
                    <ScrollView>
                        {isMultiple ? multiple : single}
                    </ScrollView>
                </Animated.View>
            </View>;
        return <View style={styles.mainCont}>
            {visible ? filterCont : null}
        </View>
    }
}

const styles = StyleSheet.create({
    mainCont: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    mask: {
        position: 'absolute',
        backgroundColor: "#000000",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5
    },
    maskView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    modalBackground: {
        justifyContent: "flex-start",
        alignItems: "center"
    },
    multipleItemCont: {
        minWidth: (width - 30 - 60) / 4,
        borderWidth: 1,
        borderColor: '#aaaaaa',
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 21,
        borderRadius: 5
    },
    multiple: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 15,
    },
    multipleCont: {
        backgroundColor: '#ffffff',
        paddingBottom: 15
    },
    single: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingBottom: 15,
        backgroundColor: '#ffffff'
    },
    singleItemCont: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        width: width,
        backgroundColor: '#ffffff'
    },
    itemText: {
        fontSize: 15
    },
    multipleBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15
    },
    bottomButton: {
        minWidth: (width - 30 - 60) / 4,
        borderWidth: 1,
        borderColor: '#aaaaaa',
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    filterCont: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 0
    },
});