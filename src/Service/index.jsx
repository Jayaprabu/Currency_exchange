import { ajax } from 'rxjs/ajax';
import _ from "lodash";

export const ServiceInfo = ( ()=> {

    
//
    const ServiceCall = (url, successCallBackFun, errorCallBackFun) => {
        ajax.getJSON(url).subscribe({
            next: res => { if(_.get(res, "success")) successCallBackFun(res); else errorCallBackFun("error") },
            error: err => { errorCallBackFun("error")}
        });
    }

    return {ServiceCall}

})();