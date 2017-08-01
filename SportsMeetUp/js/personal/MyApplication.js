/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import ApplicationInfo from './ApplicationInfo';

const applications = [{
    "title": "5V5篮球赛",
    "location": "石油大学篮球场",
    "time": "2017/7/31 17:30 - 19:30",
    "apps": [{
        "applicant": "Frank",
        "time": "2017/7/30 17:10"
    },
        {
            "applicant": "Bob",
            "time": "2017/7/30 17:20"
        },
        {
            "applicant": "Will",
            "time": "2017/7/30 17:50"
        }]
},
    {
        "title": "11V11足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "time": "2017/7/31 17:30 - 19:30",
        "apps": [{
            "applicant": "Frank",
            "time": "2017/7/30 17:10"
        },
            {
                "applicant": "Bob",
                "time": "2017/7/30 17:20"
            }]
    }];

export default class MyApplication extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View>
                {
                    applications.map((result, i) => {
                        return <ApplicationInfo key={i} application={result}/>
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
