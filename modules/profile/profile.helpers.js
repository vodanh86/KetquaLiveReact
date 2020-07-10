import moment from "moment";
import {number_format} from "../common/common.helpers";
import {AsyncStorage} from "react-native";
import {CONFIG, crop_size} from "../common/common.constants";

export const format_user_data = (user, include_code) => {
    if(user === undefined || (user.user_id === undefined && user.id === undefined)){
        return false;
    }else{
        if(user.user_id === undefined && user.id !== undefined){
            user.user_id = user.id;
        }
        if(user.id === undefined && user.user_id !== undefined){
            user.id = user.user_id;
        }
        if(user.custom_title === null || user.custom_title === ""){
            user.custom_title = "khach"+ user.user_id;
        }
        if(user.birthday > 0){
            user.birthday_formatted = moment.unix(user.birthday).format('DD/MM/YYYY');
        }else{
            user.birthday_formatted = "";
        }

        if(user.coin === null || user.coin === undefined){
            user.coin = 0;
        }

        if(user.coin_charge === null || user.coin_charge === undefined){
            user.coin_charge = 0;
        }

        if(user.phone === null || user.phone === undefined){
            user.phone = "";
        }

        if(user.email === null || user.email === ""){
            user.email = "";
        }

        if(user.gender === "male" || user.gender === "Nam"){
            user.gender = "Nam";
        }else if(user.gender === "female" || user.gender === "Nữ"){
            user.gender = "Nữ";
        }else{
            user.gender = "";
        }

        if(user.avatar === null || user.avatar === ""){
            user.avatar = "";
        }else{
            user.avatar = user_avatar_url(user.avatar);
        }

        user.coin_formatted = number_format(user.coin, 0, ",", ".");

        user.coin_charge_formatted = number_format(user.coin_charge, 0, ",", ".");


        if(user.cover === null || user.cover === ""){
            user.cover = "";
        }else{
            user.cover = user_cover_url(user.cover);
        }

        user.type = 'normal';

        if(parseInt(user.expired_vip) > moment().unix()){
            user.type = 'vip';
            user.expired_vip_formatted = "Tài khoản VIP còn hạn đến "+ moment.unix(user.expired_vip).format('DD/MM/YYYY H:mm');
        }else if(parseInt(user.expired_vip) === 0){
            user.expired_vip_formatted = "Bạn chưa mua tài khoản VIP";
        }else{
            user.expired_vip_formatted = "Tài khoản VIP của bạn đã hết hạn";
        }

        if(parseInt(user.is_supervip) === 1){
            user.type = 'supervip';
        }

        if(user.followers === undefined || user.followers === null){
            user.followers = [];
        }

        if(user.following === undefined || user.following === null){
            user.following = [];
        }

        if(include_code !== true){
            user.token = "";
        }

        return {
            id: user.user_id,
            name: user.custom_title,
            birthday: user.birthday,
            birthday_formatted: user.birthday_formatted,
            phone: user.phone,
            email: user.email,
            gender: user.gender,
            avatar: user.avatar,
            code: user.token,
            coin: user.coin,
            coin_formatted: user.coin_formatted,
            coin_charge: user.coin_charge,
            coin_charge_formatted: user.coin_charge_formatted,
            cover: user.cover,
            followers: user.followers,
            follower_count: user.followers.length,
            following: user.following,
            following_count: user.following.length,
            type: user.type,
            expired_vip_formatted: user.expired_vip_formatted,
            active_pay: user.active_pay,
        };
    }
};

export const format_follower_data = (user) => {
    return {
        ...format_user_data(user, false),
        follower_id: user.id
    }
};

export const format_following_data = (user) => {
    return {
        ...format_user_data(user, false),
        following_id: user.id
    }
};

export const user_avatar_url = (path) => {
    if(path.indexOf(CONFIG.api_domain) >= 0){
        return path;
    }else{
        return CONFIG.api_domain +"/thumb_"+ crop_size.avatar.width +"_"+ crop_size.avatar.height +"_1/"+ path;
    }
};

export const user_cover_url = (path) => {
    if(path.indexOf(CONFIG.api_domain) >= 0){
        return path;
    }else{
        return CONFIG.api_domain +"/thumb_"+ crop_size.cover.width +"_"+ crop_size.cover.height +"_1/"+ path;
    }
};

export const get_current_token = async () => {
    return await AsyncStorage.getItem('code', (err, result) => {

    });
};