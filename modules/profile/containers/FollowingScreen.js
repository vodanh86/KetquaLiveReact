import React from 'react';
import {
    WebView,
    RefreshControl,
    ScrollView,
    Image,
    Text,
    View,
    Platform,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/FollowersStyle';
import noavatar from '../../../assets/images/no_avatar.png';
import {Colors} from "../../common/common.constants";
import {goToRoute} from "../../common/common.actions";
import {GetFollowingAPI} from "../api/GetFollowingAPI";

class FollowingScreen extends React.Component {
    static navigationOptions = {
        title: 'Đang theo dõi'
    };

    state = {
        users: [],
        fetching: false,
        loading: true,
        no_more: false,
        isRefreshing: false,
        limit: 10
    };

    async componentWillMount() {
        await this._fetchUser();
    }

    _fetchUser = async () => {
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let min_id = 0;
            if(this.state.users.length > 0){
                min_id = await this.state.users[this.state.users.length - 1].following_id;
            }
            let users = await GetFollowingAPI(this.props.navigation.getParam('id'), min_id, this.state.limit);
            await this.setState({loading: false, fetching: false, isRefreshing: false});
            if(users.length === 0){
                await this.setState({no_more: true});
            }else{
                let listUser = this.state.users;
                let data = listUser.concat(users);
                await this.setState({users: data, no_more: users.length < this.state.limit});
            }
        }
    };

    render() {
        if(this.state.loading === true){
            return (<ActivityIndicator size="large" style={{paddingVertical: 30}} />)
        }else if(this.state.users.length === 0){
            return (<View style={styles.container}><Text style={styles.noData}>Chưa theo dõi ai</Text></View>);
        }else{
            return (<View style={styles.container}>
                <FlatList
                    style={styles.listFollower}
                    data={this.state.users}
                    keyExtractor={(item, index) => item.following_id}
                    initialNumToRender={10}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReachedThreshold={0.4}
                    onEndReached={this._handleLoadMore.bind(this)}
                />
            </View>);
        }
    }

    _renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: Colors.lightGray
                }}
            />
        );
    };

    _renderFooter = () => {
        if (!this.state.fetching || this.state.isRefreshing) return null;
        return (<ActivityIndicator style={{ color: '#000' }} />);
    };

    _handleLoadMore = async () => {
        if(this.state.no_more === false && this.state.fetching === false){
            await this._fetchUser();
        }
    };

    _renderItem = ({item}) => {
        if(parseInt(this.props.visitor.id) === parseInt(this.props.navigation.getParam('id'))){
            return (<TouchableOpacity style={styles.item} key={item.id} onPress={() => this.props.goToProfile(this.props.navigation, item.id)}>
                <View style={styles.avatar}><Image source={item.avatar!==""?{uri: item.avatar}:noavatar} style={styles.avatarImage} /></View>
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>);
        }else{
            return (<View style={styles.item} key={item.id}>
                <View style={styles.avatar}><Image source={item.avatar!==""?{uri: item.avatar}:noavatar} style={styles.avatarImage} /></View>
                <Text style={styles.name}>{item.name}</Text>
            </View>);
        }
    };

    _onRefresh = async () => {
        if(this.state.isRefreshing === false){
            await this.setState({users: [], no_more: false, isRefreshing: true, loading: true, fetching: false});
            await this._fetchUser();
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
        goToProfile: (navigation, id) => {
            dispatch(goToRoute(navigation, 'PublicProfile', {id: id, source: 'follow'}))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen);
