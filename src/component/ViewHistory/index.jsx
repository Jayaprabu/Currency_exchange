import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import { CONSTANTS } from '../../Config/Constants'
import _ from "lodash"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { ContextStore } from '../../Contexts';


const ViewHistory = () => {

    const { dispatch } = React.useContext(ContextStore)

    const navigate = useNavigate();

    const handleOnViewIconOnClick = (info)=> () => {        
        dispatch({
            type: CONSTANTS.DISPATCH.VIEW_HISTORY_DETAILS,
            amount:info.amount,
            fromCurrency: info.fromCurrency,
            toCurrency:info.toCurrency
        
        });
        navigate("/");
    }

    const handleOnDeleteIconOnClick =(info)=> () => {  
        const getConvertHistory = JSON.parse(localStorage.getItem("getConvertHistory"));        
        const history = _.get(getConvertHistory, "history");        
        const filterInfo = _.filter(history, (value, index)=> {
                return (value.randomVal != info.randomVal );
        });
        localStorage.setItem('getConvertHistory', JSON.stringify({"history": filterInfo}));
        navigate("/viewHistory");
    }

    const renderHistoryDate = ()=> {        
        const getConvertHistory = JSON.parse(localStorage.getItem("getConvertHistory"));
        
        const history = _.get(getConvertHistory, "history");

        if(!_.isEmpty(history))
            return history.map((value, index) => {
                return <div className="rTableRow" key={index}>
                    <div className="rTableCell">{value.date}</div>
                    <div className="rTableCell">{value.event}</div>
                    <div className="rTableCell action"> 
                        <div className='display_none bold'>                    
                            <div className=''>                             
                                <span onClick= {handleOnViewIconOnClick(value)}> 
                                    <RemoveRedEyeIcon color="info" fontSize="small" className="pad-10" />
                                    <span className='info-color mar_l5'>{CONSTANTS.LABEL.VIEW}</span>
                                </span>
                                <span className='mar_l50' onClick= {handleOnDeleteIconOnClick(value)}>
                                    <DeleteIcon color="error" fontSize="small"  />
                                    <span className='warn-color mar_l5'>{CONSTANTS.LABEL.DELETE_HISTORY}</span>
                                </span>
                            </div> 
                            
                        </div>
                    </div>
            </div>
            }) 
        else 
            return <div className="rTableRow" >
                    <div className="rTableCell"></div>
                    <div className="rTableCell">{CONSTANTS.LABEL.NO_DATA_AVAILABLE}</div>
                    <div className="rTableCell"></div>
                </div>
        
    }

    
 
    return (    
        <div className="container">
        <SectionTitle title={CONSTANTS.LABEL.VIEW_TITLE}  classInfo="title-bold"/>
        <div className="mrg-t3">
        <div className="rTable  float_l">
                <div className="rTableRow">
                    <div className="rTableHead height_50 lineHeight_3"><strong>{CONSTANTS.LABEL.DATE}</strong></div>
                    <div className="rTableHead height_50 lineHeight_3"><strong >{CONSTANTS.LABEL.EVENT}</strong></div>  
                    <div className="rTableHead height_50 lineHeight_3"><strong >{CONSTANTS.LABEL.ACTION}</strong></div>                          
                </div>
                {renderHistoryDate()}
            </div>
        </div>
        </div>
  )
}

export default ViewHistory;
