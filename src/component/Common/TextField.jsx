import React from "react";
import PropTypes from "prop-types";
import { CONSTANTS } from "../../Config/Constants";
import _ from "lodash"

const TextField = ({labelTxt, elementId, type, onChangeCallBackFun, value, maxLengthVal}) => {

    const handleOnChangeEvent = (typeInfo) => event => {
       
        const {value} = event.target;
        if(CONSTANTS.REGEX_VALIDATOR[typeInfo].test(value) || _.isEmpty(value))
            return onChangeCallBackFun(value, elementId, typeInfo)
    }

    return <div className="sub-group ">
                <input className='inputfiled' type="text" id={elementId} onChange={handleOnChangeEvent(type)} value={value} maxLength={3}/>
                <label className="labelfiled" htmlFor={elementId}>{labelTxt}</label>
            </div>

}

export default TextField;

TextField.prototype = {
    labelTxt: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChangeCallBackFun: PropTypes.func,
    value:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxLengthVal: PropTypes.number
}