import React, {Fragment} from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView,
    Platform,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ProfileStyle';
import IconItem from "../../common/components/IconItem";
import {Colors} from "../../common/common.constants";
import {GetUserAPI} from "../api/GetUserAPI";
import nocover from '../../../assets/images/bg.png'
import noavatar from '../../../assets/images/no_avatar.png';
import {goToRoute} from "../../common/common.actions";
import {doFollowError, doFollowSuccess, unFollowSuccess, unFollowError} from '../profile.actions';
import IconLoading from "../../common/components/IconLoading";
import {callAPI} from "../../common/api/callAPI";
class PublicProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Trang cá nhân',
    };

    state = {
        loading: true,
        doFollowing: false,
        user: null
    };

    async componentWillMount(){
        await this.updateInfo();
    };

    updateInfo = async () => {
        let user = await GetUserAPI(this.props.visitor.code, this.props.navigation.getParam('id'));
        if(user){
            this.setState({loading: false, user: user});
        }else{
            this.props.clickBack(this.props.navigation);
            alert("Không tim thấy thành viên");
        }
    };

    doFollow = async () => {
        if(this.state.doFollowing === true){
            return false;
        }
        this.setState({doFollowing: true});
        let result = await callAPI('user/do-follow',{user_id: this.state.user.id});
        if(result.error === 0){
            this.props.followSuccess(this.state.user.id);
            this.setState({doFollowing: false});
            await this.updateInfo();
        }else{
            this.setState({doFollowing: false});
            this.props.followError(result.message);
            await this.updateInfo();
        }
    };

    unFollow = async () => {
        if(this.state.doFollowing === true){
            return false;
        }
        this.setState({doFollowing: true});
        let result = await callAPI('user/un-follow',{user_id: this.state.user.id});
        if(result.error === 0){
            this.props.unFollowSuccess(this.state.user.id);
            this.setState({doFollowing: false});
            await this.updateInfo();
        }else{
            this.props.unFollowError(result.message);
            this.setState({doFollowing: false});
            await this.updateInfo();
        }
    };

    render() {
        if(this.state.loading === true){
            return (<ActivityIndicator size="large" style={{paddingVertical: 30}} />)
        }else{
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <ImageBackground source={this.state.user.cover!==""?{uri: this.state.user.cover}:nocover} style={styles.user_card}>
                            <View style={styles.user_bio}>
                                <View style={styles.user_avatar_wrap}>
                                    <Image source={this.state.user.avatar!==""?{uri: this.state.user.avatar}:noavatar} style={styles.user_avatar} />
                                </View>
                                <Text style={styles.user_name}>{this.state.user.name}</Text>
                                <Text style={styles.user_id}>ID: {this.state.user.id}</Text>
                                {this.followButton()}
                            </View>
                            <View style={styles.cover_mask} />
                        </ImageBackground>
                        <View style={styles.meta}>
                            <View style={styles.coin} onPress={() => this.props.goToRoute(this.props.navigation,'Charge')}>
                                <Text style={styles.coin_count}>{this.state.user.coin_formatted}</Text>
                                <Text>Ngân lượng</Text>
                            </View>
                            {this.props.navigation.getParam('source') === "follow" && (<Fragment>
                                <View style={styles.follower}>
                                    <Text style={styles.follower_count}>{this.state.user.follower_count}</Text>
                                    <Text>Người theo dõi</Text>
                                </View>
                                <View style={styles.following}>
                                    <Text style={styles.following_count}>{this.state.user.following_count}</Text>
                                    <Text>Đã theo dõi</Text>
                                </View>
                            </Fragment>)}
                            {this.props.navigation.getParam('source') !== "follow" && (<Fragment>
                                <TouchableOpacity style={styles.follower} onPress={() => this.props.goToFollower(this.props.navigation, this.state.user.id)}>
                                    <Text style={styles.follower_count}>{this.state.user.follower_count}</Text>
                                    <Text>Người theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.following} onPress={() => this.props.goToFollowing(this.props.navigation, this.state.user.id)}>
                                    <Text style={styles.following_count}>{this.state.user.following_count}</Text>
                                    <Text>Đã theo dõi</Text>
                                </TouchableOpacity>
                            </Fragment>)}

                        </View>
                        <View style={styles.user_info}>
                            <View style={styles.info_row} comment="Họ và tên">
                                <View style={styles.info_label}>
                                    <IconItem name={`person${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                    <Text style={styles.info_row_label}>Tên</Text>
                                </View>
                                <View style={styles.info_value}>
                                    <Text style={this.state.user.name!==""?styles.info_row_value:styles.info_row_value_gray}>{this.state.user.name!==""?this.state.user.name:"Chưa cung cấp"}</Text>
                                </View>
                            </View>
                            <View style={styles.info_row} comment="Ngày sinh">
                                <View style={styles.info_label}>
                                    <IconItem name={`calendar${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                    <Text style={styles.info_row_label}>Ngày sinh</Text>
                                </View>
                                <View style={styles.info_value}>
                                    <Text style={this.state.user.birthday_formatted!==""?styles.info_row_value:styles.info_row_value_gray}>{this.state.user.birthday_formatted!==""?this.state.user.birthday_formatted:"Chưa cung cấp"}</Text>
                                </View>
                            </View>
                            <View style={styles.info_row} comment="Số điện thoại">
                                <View style={styles.info_label}>
                                    <IconItem name={`call${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                    <Text style={styles.info_row_label}>Số điện thoại</Text>
                                </View>
                                <View style={styles.info_value}>
                                    <Text style={this.state.user.phone!==""?styles.info_row_value:styles.info_row_value_gray}>{this.state.user.phone!==""?this.state.user.phone:"Chưa cung cấp"}</Text>

                                </View>
                            </View>
                            <View style={styles.info_row} comment="Email">
                                <View style={styles.info_label}>
                                    <IconItem name={`mail${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                    <Text style={styles.info_row_label}>Địa chỉ email</Text>
                                </View>
                                <View style={styles.info_value}>
                                    <Text style={this.state.user.email!==""?styles.info_row_value:styles.info_row_value_gray} numberOfLines={1} ellipsizeMode={`middle`}>{this.state.user.email!==""?this.state.user.email:"Chưa cung cấp"}</Text>

                                </View>
                            </View>
                            <View style={styles.info_row} comment="Giới tính">
                                <View style={styles.info_label}>
                                    <IconItem name={`transgender${Platform.OS === 'ios'?'-outline':''}`} size={20} style={styles.info_row_icon} />
                                    <Text style={styles.info_row_label}>Giới tính</Text>
                                </View>
                                <View style={styles.info_value}>
                                    <Text style={this.state.user.gender!==""?styles.info_row_value:styles.info_row_value_gray}>{this.state.user.gender!==""?this.state.user.gender:"Chưa cung cấp"}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }

    followButton = () => {
        if(this.props.visitor.following.includes(this.props.navigation.getParam('id').toString())){
            return (<TouchableOpacity style={styles.unfollow_button} onPress={this.unFollow} >
                <View style={styles.view_profit}>
                    {this.state.doFollowing?<IconLoading style={styles.view_profit_icon} />:<IconItem name="check" type={`mc`} size={20} style={styles.view_profit_icon} color={Colors.white}/>}
                    <Text style={styles.view_profit_text}>Bỏ theo dõi</Text>
                </View>
            </TouchableOpacity>)
        }else{
            return (<TouchableOpacity style={styles.follow_button} onPress={this.doFollow} >
                <View style={styles.view_profit}>
                    {this.state.doFollowing?<IconLoading style={styles.view_profit_icon}  />:<IconItem name="plus" type={`mc`} size={20} style={styles.view_profit_icon} color={Colors.white}/>}
                    <Text style={styles.view_profit_text}>Theo dõi</Text>
                </View>
            </TouchableOpacity>)
        }
    }
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        goToFollower: (navigation, user_id) => {
            dispatch(goToRoute(navigation, 'Followers', {id: user_id}));
        },
        goToFollowing: (navigation, user_id) => {
            dispatch(goToRoute(navigation, 'Following', {id: user_id}));
        },
        followSuccess: (id) => {
            dispatch(doFollowSuccess(id));
        },
        followError: (message) => {
            dispatch(doFollowError(message));
        },
        unFollowSuccess: (id) => {
            dispatch(unFollowSuccess(id));
        },
        unFollowError: (message) => {
            dispatch(unFollowError(message));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileScreen);
