/**
 * FetchUitl 网络请求的实现
 */

import AddUserRes from '../../res/stub/addUserResp.json';

const dummyRes = {
    "addUser": AddUserRes
};

const gateWay = "http://192.168.0.101:8888";
export default class FetchUitl {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static isDummy = false;

    static _fetch(requestPromise, timeout = 30000) {
        let timeoutAction = null;
        const timerPromise = new Promise((resolve, reject) => {
            timeoutAction = () => {
                reject('请求超时');
            }
        })
        setTimeout(() => {
            timeoutAction()
        }, timeout)
        return Promise.race([requestPromise, timerPromise]);
    }

    static get(options) {
        if (this.isDummy) {
            return new Promise((resolve) => {
                resolve(dummyRes.addUser)
            });
        } else {
            if (options.params) {
                let paramsArray = [];
                //拼接参数
                Object.keys(options.params).forEach(key => paramsArray.push(options.params[key]))
                    options.url += '/' + paramsArray.join('/')
            }

            const myFetch = fetch(gateWay + options.url, {
                method: 'GET'
            });

            return new Promise((resolve, reject) => {
                this._fetch(myFetch, 10000)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        resolve(responseData)
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }

    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(options) {
        if (this.isDummy) {
            return new Promise((resolve) => {
                resolve(dummyRes.addUser)
            });
        } else {
            const myFetch = fetch(gateWay + options.url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options.params),
            });

            return new Promise((resolve, reject) => {
                this._fetch(myFetch, 10000)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        resolve(responseData)
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}