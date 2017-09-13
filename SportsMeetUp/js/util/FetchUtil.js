/**
 * FetchUitl 网络请求的实现
 */
import React, {Component} from 'react';
import {
    NetInfo
} from 'react-native';

import ErrorMessage from '../../res/data/errorMessage.json';

const gateWay = "http://192.168.0.102:";
export default class FetchUitl {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */

    static _fetch(requestPromise, timeout = 30000) {
        let timeoutAction = null;
        const timerPromise = new Promise((resolve, reject) => {
            timeoutAction = () => {
                reject('请求超时');
            }
        });
        setTimeout(() => {
            timeoutAction()
        }, timeout);
        return Promise.race([requestPromise, timerPromise]);
    }

    static get(options) {
        if (options.params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(options.params).forEach(key => paramsArray.push(options.params[key]))
            options.url += '/' + paramsArray.join('/')
        }

        /*const myFetch = fetch(gateWay + options.url, {
            method: 'GET'
        });*/

        return new Promise((resolve, reject) => {
            // this._checkNet().then((res) => {
            fetch(gateWay + options.url, {
                method: 'GET'
            })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    let errorInfo = this._respHandle(responseData);
                    errorInfo ? reject(errorInfo) : resolve(responseData);
                })
                .catch(error => {
                    let errorInfo = this._errorHandle(error);
                    reject(errorInfo);
                });
        });
    }

    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(options, method = "POST") {

        /*const myFetch = fetch(gateWay + options.url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options.params),
        });*/

        return new Promise((resolve, reject) => {
            // this._checkNet().then((res) => {
            fetch(gateWay + options.url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options.params),
            })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    let errorInfo = this._respHandle(responseData);
                    errorInfo ? reject(errorInfo) : resolve(responseData);
                })
                .catch(error => {
                    let errorInfo = this._errorHandle(error);
                    reject(errorInfo);
                });
            //     }
            // ).catch(error => {
            //     let errorInfo = this._errorHandle(error);
            //     reject(errorInfo);
            // });

        });
    }

    static _checkNet() {
        return new Promise((resolve, reject) => {
            NetInfo.fetch().done((reach) => {
                if (reach === "none" || reach === "unknown") {
                    reject(reach)
                }
                resolve(reach);
            });
        });

    }

    static _respHandle(res) {
        if (res.responseCode !== "000") {
            return {
                'code': res.responseCode,
                'message': ErrorMessage[res.responseCode] ? ErrorMessage[res.responseCode] : ErrorMessage.default
            };
        }
        return;
    }

    static _errorHandle(error) {
        if (error.message) {
            return {
                'code': 'A001',
                'message': error.message
            }
        }

        return {
            'code': 'A001',
            'message': '系统错误'
        }
    }
}