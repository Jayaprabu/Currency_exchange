import _ from "lodash"

export const Utility = {

    currenyDate : () => {
        let currentyDate = new Date()
        return  currentyDate.toISOString().split('T')[0];
    },

    passDate : (duration) => {
        const current = new Date();
        current.setDate(current.getDate() - duration);
        return current.toISOString().split('T')[0];
    },
    
    handleOnFromAndToDateBasedOnDuration: (duration, fromCurrency) => {
        return "?start_date="+Utility.passDate(duration)+"&end_date="+Utility.currenyDate()+"&base="+fromCurrency

    },

    getAverageConertRate: (averageRate)=> {       
        return Number((averageRate.reduce((sum, { rate }) => sum + rate, 0) / averageRate.length).toFixed(6));
    },

    getTwoDigits : (num) => {
        return num.toString().padStart(2, "0")
    },

    getDateFormate: () => {
        const date = new Date();
        return [Utility.getTwoDigits(date.getDate()), Utility.getTwoDigits(date.getMonth()+1), date.getFullYear()].join("/");
    },

    getCurrentTime: () => {
        const date = new Date();
        return date.getHours()+ ":"+ date.getMinutes()
    },

    setStorageConvertAmount: (amount, fromCurrency, toCurrency) =>{
       let getStorageValue = JSON.parse(localStorage.getItem("getConvertHistory"));
       let convertInfo = {
            date: Utility.getDateFormate()+" @ "+Utility.getCurrentTime(),
            event: `Converted an amount of ${amount} from ${fromCurrency} to ${toCurrency}` ,
            amount: amount,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            randomVal: Math.random() 
        }
        if(!_.isEmpty(getStorageValue)){
            getStorageValue.history.push(convertInfo);         
            localStorage.setItem('getConvertHistory', JSON.stringify({"history":  getStorageValue.history}));
        }else{
            localStorage.setItem('getConvertHistory', JSON.stringify({"history": [convertInfo]}));
        }
    },
    handleServiceError: ()=> {
        alert("Serive error. Pls check the service")
    }

}