import Constants from 'expo-constants';
import md5 from 'md5';
export const getUserCodeAPI = (phone_number, verify_code) => {
    //TODO get code using phone number
    return md5(Constants.installationId.toString());
};