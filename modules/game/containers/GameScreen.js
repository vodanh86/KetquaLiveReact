import React, {Fragment} from 'react';
import {
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import styles from '../styles/GameStyle';
import MenuLeftButton from '../../../modules/common/components/MenuLeftButton';
import MenuNotifyButton from '../../../modules/common/components/MenuNotifyButton';
import { GiftedChat, Send, Bubble, Avatar, InputToolbar } from 'react-native-gifted-chat'
import {goToRoute} from "../../common/common.actions";
import IconItem from "../../common/components/IconItem";
import {Colors} from "../../common/common.constants";


class GameScreen extends React.Component {
    static navigationOptions = {
        title: 'Chém gió',
        headerLeft: <MenuLeftButton />,
        headerRight: <MenuNotifyButton />,
    };

    state = {
        messages: [],
        image: null
    };

    UNSAFE_componentWillMount() {
        this.setState({
            messages: [

            ],
        })
    }

    onSend(messages = []) {
        if(this.state.image !== null){
            messages[0].image = this.state.image;
        }
        if(messages.length > 0 && messages[0].text !== "" || messages[0].image){
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
                image: null
            }));
        }
    }

    onPressAvatar = user => {
        this.props.goToProfile(this.props.navigation, user._id)
    };

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    pickPhoto = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    removeImageAttach = () => {
        this.setState({image: null});
    };

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    alwaysShowSend={true}
                    inverted={true}
                    placeholder={"Nhập tin nhắn..."}
                    onPressAvatar={this.onPressAvatar}
                    renderSend={(props) => {
                        return (
                            <Send {...props} >
                                <View style={styles.sendButton}><IconItem type={`mc`} name={`send`} size={26} color={Colors.blue} /></View>
                            </Send>
                        );
                    }}
                    renderChatFooter = {() => {
                        if(this.state.image !== null){
                            return (
                                <View style={styles.imageAttach}>
                                    <View style={styles.imageItem}>
                                        <TouchableOpacity onPress={this.removeImageAttach} style={styles.removeImageButton}><IconItem name={`times-circle`} type={`fa`} color={Colors.tintColor}/></TouchableOpacity>
                                        <Image source={{ uri: this.state.image }} style={styles.attachImageItem} />
                                    </View>
                                </View>
                            );
                        }else{
                            return null;
                        }
                    }}
                    renderActions={() => {
                        return (<TouchableOpacity onPress={this.pickPhoto} style={{marginBottom: 7, marginLeft: 7}}><IconItem type={`mc`} name={`camera`} size={26} color={Colors.gray} /></TouchableOpacity>)
                    }}
                    renderBubble={(props) => {
                        let color = "#f4f4f4";
                        if(props.currentMessage.user.vip === true){
                            color = '#a8e5ff';
                        }
                        if(props.currentMessage.user.supervip === true){
                            color = '#fff387';
                        }
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    left: {
                                        backgroundColor: color,
                                    }
                                }}
                            />
                        );
                    }}
                    user={{
                        _id: 37,
                        name: "me",
                        supervip: true,
                        vip: false
                    }}
                />
                <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={80} />
            </View>
            );
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
        goToProfile: (navigation, id) => {
            dispatch(goToRoute(navigation, 'PublicProfile', {id: id}))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
