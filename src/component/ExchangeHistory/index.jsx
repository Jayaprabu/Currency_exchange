import React from "react";
import { MenuItem, FormControl, Select, InputLabel, RadioGroup, FormControlLabel, Radio, FormGroup }  from '@mui/material';
import _ from "lodash";
import { CONSTANTS } from "../../Config/Constants";
import SectionTitle from "../Common/SectionTitle";
import { useEffect } from "react";
import { ServiceInfo } from "../../Service"; 
import { Utility  } from "../../Config/Utility";
import { ContextStore } from "../../Contexts";
const ExchangeHistory = () => { 

    const [duration, setDuration] = React.useState(6);
    const {state, dispatch} = React.useContext(ContextStore)

    const handleOnServiceExchangeHistorySuccess = (res) => {
        let currencyRates = {}
        currencyRates = _.get(res, "rates");

        return dispatch({
            type: CONSTANTS.DISPATCH.UPDATE_CURRENCY_HISTORY,
            currencyHistory:currencyRates             
        });
    }

    const handleOnServiceExchangeHistoryError = () => {

    }

    const handleChangeDuration = (event) => {      
        setDuration(event.target.value);
    };

    const handleOnServiceExchangeHistory = () => {
        ServiceInfo.ServiceCall(CONSTANTS.URL.GET_CONVERT_HISTORY_URL+Utility.handleOnFromAndToDateBasedOnDuration(duration, state.fromCurrency),
        handleOnServiceExchangeHistorySuccess, handleOnServiceExchangeHistoryError)

    }

    const handleTabelRowInfo = () => {      
        return state.currencyHistory.map((value, index) => {
            return <div className="rTableRow" key={index}>
            <div className="rTableCell">{value.date}</div>
            <div className="rTableCell">{value.rate}</div>
        </div>
        })
    }

    useEffect( () => { 
        handleOnServiceExchangeHistory();
    },[duration])
    

    return <div className="mrg-t2">
                <SectionTitle title={CONSTANTS.LABEL.EXCHANGE_HISTORY}  classInfo="title-medium"/>
                <div className="mrg-t2">
                    <div></div>
                    <FormControl fullWidth>
                    <FormGroup row>
                        <InputLabel id="duration-label">{CONSTANTS.LABEL.DURATION}</InputLabel>
                        <Select className="dropdownAlign" labelId="duration-label" id="duration-select" value={duration}  label={CONSTANTS.LABEL.DURATION} onChange={handleChangeDuration}>                       
                            <MenuItem value={6}>7 Days</MenuItem>
                            <MenuItem value={13}>14 Days</MenuItem>
                            <MenuItem value={29}>30 Days</MenuItem>
                        </Select>                       
                         <RadioGroup  row  name="row-radio-buttons-group"  defaultValue="table">
                            <FormControlLabel value="table" control={<Radio />} label="Table" />
                            <FormControlLabel value="chart" control={<Radio />} label="Chart" />      
                         </RadioGroup>
                        </FormGroup>
                    </FormControl>
                </div>
                <div className="mrg-t3">
                    <div className="rTable width_40 float_l">
                        <div className="rTableRow">
                            <div className="rTableHead"><strong>{CONSTANTS.LABEL.DATE}</strong></div>
                            <div className="rTableHead"><strong >{CONSTANTS.LABEL.EXCHANGE_RATE}</strong></div>                            
                        </div>
                        {handleTabelRowInfo()}
                    </div>
                    <div className="rTable width_40 float_l margin-l70">
                        <div className="rTableRow">
                            <div className="rTableHead"><strong>{CONSTANTS.LABEL.STATISTICS}</strong></div>
                            <div className="rTableHead"><strong ></strong></div>                            
                        </div>
                        <div className="rTableRow">
                            <div className="rTableCell">{CONSTANTS.LABEL.LOWEST_RATE}</div>
                            <div className="rTableCell">{state.lowertConertRate}</div>
                        </div>
                        <div className="rTableRow">
                            <div className="rTableCell">{CONSTANTS.LABEL.HIGHEST_RATE}</div>
                            <div className="rTableCell">{state.highConertRate}</div>                            
                        </div>
                        <div className="rTableRow">
                            <div className="rTableCell">{CONSTANTS.LABEL.AVERAGE_RATE}</div>
                            <div className="rTableCell">{state.averageConertRate}</div>
                        </div>
                    </div>
                </div>
         </div>
}

export default ExchangeHistory;