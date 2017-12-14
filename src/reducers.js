import { createStore } from 'redux'
import axios from 'axios';

function loader(state=false, action){
    switch (action.type){
        case "LOAD_JSON":
            axios.get(action.url).then(
                function(response){
                    action.target.addJsonLayer(response.data);
                }
            ) 
            return true;
        case "DELETE_JSON":
            //operazione
            return false;
        default:
            return false;
    }
}

var store = createStore(loader);

function loadJson(url, target) {
    store.dispatch({
        type: "LOAD_JSON",
        url: url,
        target: target
    });
}

export default loadJson