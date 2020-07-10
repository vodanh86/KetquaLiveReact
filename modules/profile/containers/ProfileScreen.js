import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView,
    Platform,
    ImageBackground,
    DatePickerAndroid
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import {editAvatarSubmit, editCoverSubmit, logoutClicked, updateUserInfo} from "../profile.actions";
import styles from '../styles/ProfileStyle';
import IconItem from "../../common/components/IconItem";
import {Colors} from "../../common/common.constants";
import ModalExtra from "../../common/components/ModalExtra";
import DateTimeSelectModal from "../../common/components/DateTimeSelectModal";
import nocover from '../../../assets/images/bg.png'
import noavatar from '../../../assets/images/no_avatar.png';
import moment from 'moment';
import PopupExtra from "../../common/components/PopupExtra";
import ImagePickerModal from "../../common/components/ImagePickerModal";
import {goToRoute} from "../../common/common.actions";
import {EditUserAPI} from "../api/EditUserAPI";
import EditFullnamePopup from '../components/EditFullnamePopup';
import EditPasswordPopup from '../components/EditPaswordPopup';
import EditPhonePopup from "../components/EditPhonePopup";
import EditEmailPopup from "../components/EditEmailPopup";
import GenderSelectModal from "../components/GenderSelectModal";

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Tài khoản',
    };

    state = {
        name: "",
        gender: "",
        email: "",
        phone: ""
    };

    askPermissionsCameraRoll = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    askPermissionsCamera = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
    };

    onChangeCoverPicker = async (type) => {
        await this.coverModal.close();
        try{
            if(type === "camera"){
                await this.takeCoverPicture();
            }else{
                await this.chooseCoverFromLibrary();
            }
        }catch ({code, message}){
            console.warn("Không truy cập được ảnh")
        }
    };

    chooseCoverFromLibrary = async () => {
        await this.askPermissionsCameraRoll();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [16, 9],
        });

        if (!result.cancelled) {
            await this.props.editCoverSubmit(result.uri);
        }
    };

    takeCoverPicture = async () => {
        await this.askPermissionsCamera();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9]
        });

        if (!result.cancelled) {
            await this.coverModal.close();
            await this.props.editCoverSubmit(result.uri);
        }
    };

    onChangeAvatarPicker = async (type) => {
        await this.avatarModal.close();
        try{
            if(type === "camera"){
                await this.takeAvatarPicture();
            }else{
                await this.chooseAvatarFromLibrary();
            }
        }catch ({code, message}){
            console.warn("Không truy cập được ảnh")
        }
    };

    chooseAvatarFromLibrary = async () => {
        await this.askPermissionsCameraRoll();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            await this.props.editAvatarSubmit(result.uri);
        }
    };

    takeAvatarPicture = async () => {
        await this.askPermissionsCamera();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1,1]
        });

        if (!result.cancelled) {
            await this.props.editAvatarSubmit(result.uri);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <ImageBackground source={this.props.visitor.cover!==""?{uri: this.props.visitor.cover}:nocover} style={styles.user_card}>
                        <View style={styles.user_bio}>
                            <TouchableOpacity style={styles.edit_cover_button} onPress={() => this.coverModal.open()}>
                                <IconItem style={styles.edit_cover_icon} type={`mc`} name={`camera`} size={26} />
                            </TouchableOpacity>

                            <View style={styles.user_avatar_wrap}>
                                <TouchableOpacity onPress={() => this.avatarModal.open()} style={styles.change_avatar_button}><IconItem type={`mc`} name={`camera`} size={20} color={Colors.white}/></TouchableOpacity>
                                <Image source={this.props.visitor.avatar!==""?{uri: this.props.visitor.avatar}:noavatar} style={styles.user_avatar} />
                            </View>
                            <Text style={styles.user_name}>{this.props.visitor.name}</Text>
                            <Text style={styles.user_id}>ID: {this.props.visitor.id}</Text>
                            <TouchableOpacity style={styles.view_profit_button} onPress={() => this.props.goToRoute(this.props.navigation,'PremiumBenefit')} >
                                <View style={styles.view_profit}>
                                    <IconItem name="ribbon" size={20} style={styles.view_profit_icon} color={Colors.white}/>
                                    <Text style={styles.view_profit_text}>Đặc quyền của bạn</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cover_mask} />
                    </ImageBackground>
                    <View style={styles.meta}>
                        <TouchableOpacity style={styles.coin} onPress={() => this.props.goToRoute(this.props.navigation,'Charge')}>
                            <Text style={styles.coin_count}>{this.props.visitor.coin_formatted}</Text>
                            <Text>Ngân lượng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.follower} onPress={() => this.props.goToFollower(this.props.navigation, this.props.visitor.id)}>
                            <Text style={styles.follower_count}>{this.props.visitor.follower_count}</Text>
                            <Text>Người theo dõi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.following} onPress={() => this.props.goToFollowing(this.props.navigation, this.props.visitor.id)}>
                            <Text style={styles.following_count}>{this.props.visitor.following_count}</Text>
                            <Text>Đã theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.user_info}>
                        <View style={styles.info_row} comment="Họ và tên">
                            <View style={styles.info_label}>
                                <IconItem name={`person${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                <Text style={styles.info_row_label}>Tên</Text>
                            </View>
                            <View style={styles.info_value}>
                                <Text style={this.props.visitor.name!==""?styles.info_row_value:styles.info_row_value_gray}>{this.props.visitor.name!==""?this.props.visitor.name:"Chưa cung cấp"}</Text>
                                <TouchableOpacity onPress={() => this.fullnamePopup.open()}>
                                    <IconItem name={`create${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_edit_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.info_row} comment="Ngày sinh">
                            <View style={styles.info_label}>
                                <IconItem name={`calendar${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                <Text style={styles.info_row_label}>Ngày sinh</Text>
                            </View>
                            <View style={styles.info_value}>
                                <Text style={this.props.visitor.birthday_formatted!==""?styles.info_row_value:styles.info_row_value_gray}>{this.props.visitor.birthday_formatted!==""?this.props.visitor.birthday_formatted:"Chưa cung cấp"}</Text>
                                <TouchableOpacity onPress={() => this.openBirthdayPicker()}>
                                    <IconItem name={`create${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_edit_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.info_row} comment="Số điện thoại">
                            <View style={styles.info_label}>
                                <IconItem name={`call${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                <Text style={styles.info_row_label}>Số điện thoại</Text>
                            </View>
                            <View style={styles.info_value}>
                                <Text style={this.props.visitor.phone!==""?styles.info_row_value:styles.info_row_value_gray}>{this.props.visitor.phone!==""?this.props.visitor.phone:"Chưa cung cấp"}</Text>
                                <TouchableOpacity onPress={() => this.phonePopup.open()}>
                                    <IconItem name={`create${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_edit_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.info_row} comment="Email">
                            <View style={styles.info_label}>
                                <IconItem name={`mail${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                <Text style={styles.info_row_label}>Địa chỉ email</Text>
                            </View>
                            <View style={styles.info_value}>
                                <Text style={this.props.visitor.email!==""?styles.info_row_value:styles.info_row_value_gray} numberOfLines={1} ellipsizeMode={`middle`}>{this.props.visitor.email!==""?this.props.visitor.email:"Chưa cung cấp"}</Text>
                                <TouchableOpacity onPress={() => this.emailPopup.open()}>
                                    <IconItem name={`create${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_edit_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.info_row} comment="Mật khẩu">
                            <View style={styles.info_label}>
                                <IconItem name={`lock${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                <Text style={styles.info_row_label}>Mật khẩu</Text>
                            </View>
                            <View style={styles.info_value}>
                                <Text style={styles.info_row_value_gray}>************</Text>
                                <TouchableOpacity onPress={() => this.passwordPopup.open()}>
                                    <IconItem name={`create${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_edit_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.info_row} comment="Giới tính">
                            <View style={styles.info_label}>
                                <IconItem name={`transgender${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                <Text style={styles.info_row_label}>Giới tính</Text>
                            </View>
                            <View style={styles.info_value}>
                                <Text style={this.props.visitor.gender!==""?styles.info_row_value:styles.info_row_value_gray}>{this.props.visitor.gender!==""?this.props.visitor.gender:"Chưa cung cấp"}</Text>
                                <TouchableOpacity onPress={() => this.genderModal.open()}>
                                    <IconItem name={`create${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_edit_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <ModalExtra ref={modal => this.birthdayModal = modal} title={"Ngày sinh"}>
                    <DateTimeSelectModal date={this.props.visitor.birthday>0?moment.unix(this.props.visitor.birthday).toDate():moment().subtract(30, 'year').toDate()} onChange={(date) => this.onChangeBirthday(date)}/>
                </ModalExtra>
                <ModalExtra ref={modal => this.genderModal = modal} title={"Giới tính"}>
                    <GenderSelectModal onChange={(gender) => this.onChangeGender(gender)}/>
                </ModalExtra>
                <ModalExtra ref={modal => this.coverModal = modal} title={"Đổi ảnh bìa"}>
                    <ImagePickerModal onChange={(type) => this.onChangeCoverPicker(type)}/>
                </ModalExtra>
                <ModalExtra ref={modal => this.avatarModal = modal} title={"Đổi hình đại diện"}>
                    <ImagePickerModal onChange={(type) => this.onChangeAvatarPicker(type)}/>
                </ModalExtra>
                <PopupExtra ref={popup => this.fullnamePopup = popup} title={"Đổi tên"}>
                    <EditFullnamePopup onChange={this.onChangeFullname} fullname={this.props.visitor.name} />
                </PopupExtra>
                <PopupExtra ref={popup => this.passwordPopup = popup} title={"Đổi mật khẩu"}>
                    <EditPasswordPopup onChange={this.onChangePassword} />
                </PopupExtra>
                <PopupExtra ref={popup => this.phonePopup = popup} title={"Đổi số điện thoại"}>
                    <EditPhonePopup onChange={this.onChangePhone} phone={this.props.visitor.phone} />
                </PopupExtra>
                <PopupExtra ref={popup => this.emailPopup = popup} title={"Đổi email"}>
                    <EditEmailPopup onChange={this.onChangeEmail} email={this.props.visitor.email} />
                </PopupExtra>
            </View>
        );
    }

    onChangeGender = async (gender) => {
        if(gender === "" || gender === "male" || gender === "female"){
            this.props.alert_loading("Đang lưu...");
            let result = await EditUserAPI({gender: gender});
            if(result){
                this.props.updateUserInfo(result);
                this.props.alert_info("Đã cập nhật giới tính");
            }else{
                this.props.alert_error("Không cập nhật được giới tính");
            }
            this.genderModal.close();
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
        }else{
            this.props.alert_error("Không cập nhật được giới tính");
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
        }
    };

    openBirthdayPicker = async () => {
       if(Platform.OS === 'ios'){
           this.birthdayModal.open();
        }else{
           try {
               const {action, year, month, day} = await DatePickerAndroid.open({
                   date: new Date(1989, 7, 10)
               });
               if (action !== DatePickerAndroid.dismissedAction) {
                  await this.onChangeBirthday(new Date(year, month, day));
               }
           } catch ({code, message}) {
               console.warn('Không mở được lịch của máy', message);
           }
       }
    };
    onChangeBirthday = async (date) => {
        let result = await EditUserAPI({birthday: moment(date).unix()});
        if(result){
            this.props.updateUserInfo(result);
            this.props.alert_info("Đã cập nhật ngày sinh");
        }else{
            this.props.alert_error("Không cập nhật được ngày sinh");
        }
        setTimeout(() => {
            this.props.hide_alert();
        }, 3000);
    };

    onChangeFullname = async (name) => {
        this.props.alert_loading("Đang lưu...");
        let result = await EditUserAPI({custom_title: name});
        if(result){
            this.props.updateUserInfo(result);
            this.props.alert_info("Đã cập nhật họ tên");
        }else{
            this.props.alert_error("Không cập nhật được họ tên");
        }
        this.fullnamePopup.close();
        setTimeout(() => {
            this.props.hide_alert();
        }, 3000);
    };

    onChangePassword = async (password) => {
        this.props.alert_loading("Đang lưu...");
        let result = await EditUserAPI({password: password});
        if(result){
            this.props.updateUserInfo(result);
            this.props.alert_info("Đã cập nhật mật khẩu");
        }else{
            this.props.alert_error("Không cập nhật được mật khẩu");
        }
        this.passwordPopup.close();
        setTimeout(() => {
            this.props.hide_alert();
        }, 3000);
    };

    onChangePhone = async (phone) => {
        this.props.alert_loading("Đang lưu...");
        let result = await EditUserAPI({phone: phone});
        if(result){
            this.props.updateUserInfo(result);
            this.props.alert_info("Đã cập nhật số điện thoại");
            this.phonePopup.close();
        }else{
            this.props.alert_error("Số điện thoại đã được sử dụng");
        }
        setTimeout(() => {
            this.props.hide_alert();
        }, 3000);
    };

    onChangeEmail = async (email) => {
        this.props.alert_loading("Đang lưu...");
        let result = await EditUserAPI({email: email});
        if(result){
            this.props.updateUserInfo(result);
            this.props.alert_info("Đã cập nhật email");
            this.emailPopup.close();
        }else{
            this.props.alert_error("Email đã được sử dụng");
        }
        setTimeout(() => {
            this.props.hide_alert();
        }, 3000);
    };
}

const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state),
        editing: state.profile.editing
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        logout: (navigator) => {
            dispatch(logoutClicked(navigator))
        },
        editCoverSubmit: (uri) => {
            dispatch(editCoverSubmit(uri))
        },
        editAvatarSubmit: (uri) => {
            dispatch(editAvatarSubmit(uri))
        },
        goToFollower: (navigation, user_id) => {
            dispatch(goToRoute(navigation, 'Followers', {id: user_id}));
        },
        goToFollowing: (navigation, user_id) => {
            dispatch(goToRoute(navigation, 'Following', {id: user_id}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
