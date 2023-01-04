import React from "react";
import PropTypes from "prop-types"
import { CONSTANTS } from "../Config/Constants";
import _ from "lodash";
import { Utility } from "../Config/Utility";


const initalState = {
    isCurrency: true,
    isCurrencyServiceCall: false,
    currencyType: "EUR",
    amount: 50,
    fromCurrency: "",
    fromCurrencyValidation: true, 
    fromCurrencyIsKeyEntry: false,    
    toCurrency: "",
    toCurrencyValidation: true,
    toCurrencyIsKeyEntry: false,
    latestCurrencyList: [],
    toConvertAmount: "",
    toCurrencyRate: "",
    currencyHistory: [],
    lowertConertRate: "-",
    highConertRate:  "-",
    averageConertRate: "-",
    isConvertSuccess: false,
    fromCurrencyRate: "",
    isDirectionFrom:false,
    isKeyEntry: false
}

function reducer(state, action){
    
    switch (action.type){
        
        case CONSTANTS.DISPATCH.UPDATE_TEXT:
            let stateFieldObj = {}
            stateFieldObj[action['stateField']] = action.stateValue;
            stateFieldObj[action['stateField']+"Validation"] =  true;
            if(action.stateValue.length === 3 && (action['stateField'] === "fromCurrency" || action['stateField'] === "toCurrency" )){
                stateFieldObj[action['stateField']+"Validation"] = !state.latestCurrencyList.hasOwnProperty(action.stateValue)                
            }
            if(action['stateField'] === "fromCurrency" || action['stateField'] === "toCurrency" ){
                stateFieldObj[action['stateField']+"IsKeyEntry"] = true;
            }      
            return {
                ...state,
                ...stateFieldObj,
                isConvertSuccess: false,
                
            }
        case CONSTANTS.DISPATCH.SWITCH_CURRENCY:
            return {
                ...state,
                fromCurrency: state.toCurrency,
                fromCurrencyValidation: state.toCurrencyValidation,    
                toCurrency: state.fromCurrency,
                toCurrencyValidation: state.fromCurrencyValidation,
                isConvertSuccess: false
            }        
        case CONSTANTS.DISPATCH.ALL_CURRENCY:
            return {
                ...state,
                latestCurrencyList:  action.allRates   
            }
        case CONSTANTS.DISPATCH.CONVERT_AMOUNT:
            return {
                ...state,
                toConvertAmount: action.toConvertAmount,
                toCurrencyRate: action.toCurrencyRate,
                fromCurrencyRate: action.fromCurrencyRate,
                isConvertSuccess: true,
                isDirectionFrom: false
            }
        case CONSTANTS.DISPATCH.UPDATE_CURRENCY_HISTORY:
            let currencyHistoryValue = []
            _.forEach( action.currencyHistory, (value, key )=> {
                currencyHistoryValue.push({
                    date:key,
                    rate: value[state.toCurrency]
                })
            })
            return {
                ...state,
                currencyHistory: _.reverse(currencyHistoryValue),
                lowertConertRate: _.get(_.sortBy(currencyHistoryValue, "rate")[0], "rate"),
                highConertRate:  _.get(_.sortBy(currencyHistoryValue, "rate")[currencyHistoryValue.length -1], "rate"),
                averageConertRate: Utility.getAverageConertRate(currencyHistoryValue)
            }
        case  CONSTANTS.DISPATCH.VIEW_HISTORY_DETAILS:
            
            return {
                ...state,
                isDirectionFrom: true,
                fromCurrencyValidation: false,
                toCurrencyValidation: false,
                amount: action.amount,
                fromCurrency: action.fromCurrency,
                toCurrency: action.toCurrency
            }
        default:
            return state;
    }
}

export const ContextStore = React.createContext(initalState);

export function ContextStoreProvider(props){
    const [state, dispatch] = React.useReducer(reducer, initalState);
    const value = {state, dispatch};
    return ( <ContextStore.Provider value={value}>
        {props.children}
    </ContextStore.Provider>)
}

ContextStoreProvider.prototype = {
    children: PropTypes.node
}