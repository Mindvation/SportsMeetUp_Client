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

const species = [
    {
        "key": "basketBall",
        "value": "篮球"
    }, {
        "key": "footBall",
        "value": "足球"
    }, {
        "key": "tennis",
        "value": "网球"
    }, {
        "key": "badminton",
        "value": "羽毛球"
    }, {
        "key": "volleyball",
        "value": "排球"
    }, {
        "key": "billiard",
        "value": "台球"
    }, {
        "key": "pingPang",
        "value": "乒乓球"
    }, {
        "key": "bowling",
        "value": "保龄球"
    }
];

const isMultiple = true;

export default class Filter extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this._toggle = this._toggle.bind(this);
        this.state = {
            visible: false
        };
    }

    _toggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    _updateSpecies(key) {

    }

    _returnSpecies(key) {
        this.setState({
            visible: false
        })
    }

    render() {
        const multiple =
            <View style={styles.multiple}>
                {species.map((result, i) => {
                    return <TouchableOpacity
                        activeOpacity={1}
                        style={styles.multipleItemCont} key={i}
                        onPress={() => this._updateSpecies(result.key)}>
                        <Text style={styles.itemText}>{result.value}</Text>
                    </TouchableOpacity>;
                })}
            </View>;
        const single =
            <View style={styles.single}>
                {species.map((result, i) => {
                    return <TouchableOpacity
                        activeOpacity={1}
                        style={styles.singleItemCont} key={i}
                        onPress={() => this._returnSpecies(result.key)}>
                        <Text style={styles.itemText}>{result.value}</Text>
                    </TouchableOpacity>;
                })}
            </View>;

        const filterCont =
            <View style={styles.filterCont}>
                <Animated.View style={styles.mask}>
                    <TouchableWithoutFeedback onPress={this._toggle}>
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
            <View style={styles.title}>
                <TouchableOpacity
                    onPress={this._toggle}
                >
                    <Text style={styles.titleText}>球类筛选</Text>
                </TouchableOpacity>
            </View>
            {this.state.visible ? filterCont : null}
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
        zIndex: 2
    },
    title: {
        height: 40,
        backgroundColor: '#323232',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 30
    },
    titleText: {
        color: '#ffffff',
        fontSize: 15
    },
    filterCont: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 0
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
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    multiple: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 15,
        backgroundColor: '#ffffff'
    },
    single: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingBottom: 15,
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
    }
});