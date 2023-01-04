import React from 'react';
import _ from "lodash"
import SectionTitle from '../Common/SectionTitle';
import { CONSTANTS } from '../../Config/Constants';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import Button from '@mui/material/Button';
import TextField from '../Common/TextField';
import { ContextStore } from '../../Contexts';
import {ServiceInfo } from "../../Service"
import ConvertInfo from './ConvertInfo';
import { Utility } from '../../Config/Utility';
import { useEffect } from 'react';

const Convert = () => { 

    const {state, dispatch} = React.useContext(ContextStore)

    const handleOnChangeEventText = (stateValue, stateName, type) => {
        dispatch({
            type: CONSTANTS.DISPATCH.UPDATE_TEXT,
            stateField: stateName,
            stateValue: stateValue
        });
    }
    
    const handleOnClickConvertBtn = () => {
        const url = CONSTANTS.URL.GET_CONVERT_URL +"?from="+state.fromCurrency+"&to="+state.toCurrency+"&amount="+state.amount
        ServiceInfo.ServiceCall(url, handleConvertServiceSuccess, handleConvertServiceError)
    }

    const handleConvertServiceSuccess = (res) =>  {
        if(!state.isDirectionFrom){
            Utility.setStorageConvertAmount(state.amount, state.fromCurrency, state.toCurrency);
        }
        getToCurrencyRate(res)
        
    }

    const getToCurrencyRate = (res) => {
        const url = CONSTANTS.URL.GET_CONVERT_URL +"?from="+state.toCurrency+"&to="+state.fromCurrency
        ServiceInfo.ServiceCall(url, handleConvertServiceToCurrencySuccess(res), handleConvertServiceError)
    }

    const handleConvertServiceToCurrencySuccess = (res) => (respon) => {
        return dispatch({
            type: CONSTANTS.DISPATCH.CONVERT_AMOUNT,
            toConvertAmount: _.get(res, "result"),
            toCurrencyRate: _.get(res, "info.rate"),
            fromCurrencyRate: _.get(respon, "info.rate")
         });
    }

    const handleConvertServiceError = () => {
        Utility.handleServiceError();
    }

    const isValidateCurrency =() => {
        return !state.fromCurrencyValidation && !state.toCurrencyValidation;
    }

    const handleOnButtonDisable = () => {        
        if (isValidateCurrency())
            return false;
        else
            return true;
    }

    const handleOnCompareArrowOnClick = () => {
        dispatch({
            type: CONSTANTS.DISPATCH.SWITCH_CURRENCY
        });
    }  
    
    useEffect( () => {
        if(state.isDirectionFrom){
            document.getElementById("primaryButton").click();
        }
      },[]);
    // {handleOnButtonDisable() && <p className='warn'>{CONSTANTS.LABEL.WARNING_MSG}</p> }

    return  <>
                <SectionTitle title={CONSTANTS.LABEL.CONVERT_TITLE}  classInfo="title-bold"/>
                {state.fromCurrencyIsKeyEntry && state.fromCurrencyValidation && <p className='warn'>{CONSTANTS.LABEL.WARNING_MSG}</p>}<br/>
                {state.toCurrencyIsKeyEntry && state.toCurrencyValidation && <p className='warn'>{CONSTANTS.LABEL.WARNING_TO_MSG}</p>}
                <div className='group'>
                    <TextField labelTxt={CONSTANTS.LABEL.AMOUNT_LABEL} 
                        elementId="amount" type={"NUMBER"} 
                        onChangeCallBackFun={(stateValue, stateName, type) => handleOnChangeEventText(stateValue, stateName, type)}
                        value={state.amount}/>
                    <TextField labelTxt={CONSTANTS.LABEL.FROM_LABEL} 
                        elementId="fromCurrency" type={"ALPHABET"}
                        onChangeCallBackFun={(stateValue, stateName, type) => handleOnChangeEventText(stateValue, stateName, type)}
                        value={state.fromCurrency}/>
                
                    <CompareArrowsOutlinedIcon fontSize="large" color="primary"  className="borderInfo" 
                        onClick= {handleOnCompareArrowOnClick}/>
                    <TextField labelTxt={CONSTANTS.LABEL.TO_LABEL} 
                        elementId="toCurrency" type="ALPHABET"
                        onChangeCallBackFun={(stateValue, stateName, type) => handleOnChangeEventText(stateValue, stateName, type)}
                        value={state.toCurrency}/>                
                    <Button variant="contained" id="primaryButton" className='primaryButton' disabled={handleOnButtonDisable()} onClick={handleOnClickConvertBtn}>{CONSTANTS.LABEL.CONVERT_BUTTON}</Button>
              
                </div>
                {state.isConvertSuccess && <ConvertInfo/>}
            </>

}

export default Convert;