/**
 * @flow
 * {
 *    'name': string,
 *    'isRequired': bool,
 *    'isRegular': bool,
 *    'isRequireCheck': bool,
 *    'requiredMsg': string,
 *    'regularMsg': string,
 *    'value': string
 * }
 **/
'use strict'

export default function VrfFields(fieldsArray){
    const regularEx = {
        'phoneNumber': /^1[0-9]{10}$/,
        'vrfCode': /^[0-9]{4}$/,
        'passWord': /^\S{6,12}$/
    };
    const _isEmpty = function(text) {
        if (text === null || text === undefined || text === "") {
            return true;
        }
        return false;
    }

    const vrfField = function(field){
        if(field.isRequireCheck) {
            if (!field.value) {
                return field.requiredMsg;
            }else{
                return '';
            }
        }
        if(field.isRequired && _isEmpty(field.value)) {
            return field.requiredMsg;
        }
        if(field.isRegular && !regularEx[field.name].test(field.value)){
            return field.regularMsg;
        }
        return '';
    }

    const vrfFiledArray = function(items){
        let rtnMsg = '';
        for (var i = 0, len = items.length; i < len; i++) {
            rtnMsg = vrfField(items[i]);
            if(rtnMsg){
                return rtnMsg;
            }
        }
        return rtnMsg;
    }

    return vrfFiledArray(fieldsArray);

}