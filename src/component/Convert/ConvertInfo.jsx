import React, {useContext} from "react";
import { ContextStore } from '../../Contexts';

const ConvertInfo = () => {

    const {state} = useContext(ContextStore)

    return <>
        
        <div className="convertInfo">
            <p>
                <span>{state.amount}</span>
                <span className="pad-r2">{state.fromCurrency}</span>&nbsp;=&nbsp;
                <span className="accentColor pad-r2"><span>{state.toConvertAmount}</span>
                <span className="pad-r2">{state.toCurrency}</span> </span>
            </p>
            
        </div>
        <div className="convertInfoSub">
            <p>
                1&nbsp;
                <span className="pad-r2">{state.fromCurrency}</span>
                &nbsp;=&nbsp;
                <span className="pad-r2">{state.toCurrencyRate}</span>
                <span className="pad-r2">{state.toCurrency}</span>
            </p>
            <p>
                1&nbsp;
                <span className="pad-r2">{state.toCurrency}</span>
                &nbsp;=&nbsp;
                <span className="pad-r2">{state.fromCurrencyRate}</span>
                <span className="pad-r2">{state.fromCurrency}</span>
            </p>
        </div>
    </>
}

export default ConvertInfo;