import {get_current_token} from "../../profile/profile.helpers";
import {Platform, Image} from "react-native";
import {CONFIG} from "../common.constants";

export const callAPI = async function callAPI(endpoint, params, include_token) {
    let start_time = new Date().getTime();
    const formData = new FormData();
    formData.append('_client_id', CONFIG.api_client_id);
    formData.append('_client_key', CONFIG.api_client_key);
    formData.append('_source', 'app');
    if(include_token === undefined || include_token === true){
        let token = await get_current_token();
        if(token){
            formData.append('token', token);
        }
    }
    for (let key in params) {
        if(params.hasOwnProperty(key)){
            if(typeof params[key] === 'object'){
                if(params[key].type === 'photo'){
                    let source = params[key].uri;
                    if (Platform.OS === 'ios') {
                        source = source.replace('file://', '');
                    }
                    const uriPart = source.split('.');
                    const fileExtension = uriPart[uriPart.length - 1];
                    formData.append(key, {
                        uri: source,
                        name: params[key].name !== undefined?params[key].name +"."+ fileExtension:"photo."+ fileExtension,
                        type: "image/"+ fileExtension
                    })
                }else{
                    formData.append(key,JSON.stringify(params[key]));
                }
            }else{
                formData.append(key, params[key]);
            }
        }
    }
    console.log("API", endpoint, ": Request => ", JSON.stringify(formData));
    console.log(CONFIG.api_domain);
    return await fetch(
            CONFIG.api_domain +'/api/'+ endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Encoding':'gzip;q=1.0, compress;q=0.5'
                },
                body: formData,
            }
        )
        .then((response) => {
            console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
            console.log("API", endpoint, ": Response 1 => ", response);
            try{
                return response.json();
            }catch (error){
                console.log("API", endpoint, ": Response 2 => ", response);
                console.error("API trả về không đúng định dạng #1: ", error);
                return {
                    error: 1,
                    message: "API trả về không đúng định dạng #1"
                };
            }
        })
        .then((responseJson) => {
            console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
            console.log("API", endpoint, ": JSON => ", JSON.stringify(responseJson));
            if(responseJson.error === undefined){
                console.error("API trả về không đúng định dạng #2: ", JSON.stringify(responseJson));
                return {
                    error: 1,
                    message: "API trả về không đúng định dạng #2"
                };
            }else{
                return responseJson;
            }
        })
        .catch((error) => {
            console.log("API trả về không đúng định dạng #3: ", error);
            console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
            return {
                error: 1,
                message: "API trả về không đúng định dạng #3"
            };
        });
};

export const callJsonAPI = async function callJsonAPI(endpoint, params, include_token) {
    let start_time = new Date().getTime();
    if(include_token === undefined || include_token === true){
        let token = await get_current_token();
        if(token){
            params.token = token;
        }
    }
    params._source = 'app';
    console.log("API", endpoint, ": Request => ", params);
    return await fetch(
        CONFIG.api_domain +'/api/'+ endpoint,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Encoding':'gzip;q=1.0, compress;q=0.5'
                },
                body: JSON.stringify(params),
            }
        )
        .then((response) => {
            console.log("API", endpoint, ": Response 3 => ", response);
            console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
            try{
                return response.json();
            }catch (error){
                console.log("API", endpoint, ": Response 4 => ", response);
                console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
                console.error("API trả về không đúng định dạng #1: ", error);
                return {
                    error: 1,
                    message: "API trả về không đúng định dạng #1"
                };
            }
        })
        .then((responseJson) => {
            if(responseJson.error === undefined){
                console.error("API trả về không đúng định dạng #2: ", JSON.stringify(responseJson));
                console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
                return {
                    error: 1,
                    message: "API trả về không đúng định dạng #2"
                };
            }else{
                return responseJson;
            }
        })
        .catch((error) => {
            console.log("API trả về không đúng định dạng #3: ", error);
            console.log("API", endpoint, ": Time => ", new Date().getTime() - start_time);
            return {
                error: 1,
                message: "API trả về không đúng định dạng #3"
            };
        });
};