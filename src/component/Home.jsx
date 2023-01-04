import _ from 'lodash'
import React, {useEffect} from 'react'
import "../Styles/App.css"
import { CONSTANTS } from '../Config/Constants'
import { ContextStore } from '../Contexts'
import Convert from './Convert'
import ExchangeHistory from './ExchangeHistory'
import { ServiceInfo } from '../Service'
import { Utility } from '../Config/Utility'

const Home = () => {
 const { state, dispatch } = React.useContext(ContextStore)

    const handleSuccessOnServiceCallBack = (response) => {
      dispatch({
        type: CONSTANTS.DISPATCH.ALL_CURRENCY,
        allRates: _.get(response, "rates")
      });
    } 

    const handleErrorOnServiceCallBack = () => {
      Utility.handleServiceError();
    }

 
    useEffect( () => {
      ServiceInfo.ServiceCall(CONSTANTS.URL.GET_CURRENCY_LIST, handleSuccessOnServiceCallBack, handleErrorOnServiceCallBack);    
    },[]);

  return (
    <div className="container">      
      <Convert/>
       {state.isConvertSuccess && <ExchangeHistory/> }
    </div>
  )
}

export default Home;