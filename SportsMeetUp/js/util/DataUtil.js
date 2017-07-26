/**
 * DataUtil
 * 本地存储、获取、删除数据
 * @Bob
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';

export default class DataUtil {

    static saveData(key, items, callback) {
        if (!items || !key) return;
        AsyncStorage.setItem(key, JSON.stringify(items), callback);
    }

    static getData(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    static removeData(key, callback) {
        AsyncStorage.removeItem(key, callback);
    }
}
