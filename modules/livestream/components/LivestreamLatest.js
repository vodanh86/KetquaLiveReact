import React, {Fragment} from 'react';
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
    TouchableOpacity, TouchableHighlight, ImageBackground
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import styles from '../styles/LivestreamStyle';
import {Colors} from "../../common/common.constants";
import {callAPI} from "../../common/api/callAPI";
import noavatar from "../../../assets/images/no_avatar.png";
import Swiper from "react-native-swiper";
import IconItem from "../../common/components/IconItem";
import IconLoading from "../../common/components/IconLoading";

class LivestreamLatest extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            videos: [],
            fetching: false,
            loading: true,
            no_more: false,
            isRefreshing: false,
            limit: 10
        };
    }

    async UNSAFE_componentWillMount() {
        await this._fetchVideo();
    }

    _fetchVideo = async (refresh) => {
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let max_id = 999999999;
            if(this.state.videos.length > 0 && refresh !== true){
                max_id = await this.state.videos[this.state.videos.length - 1].id;
            }
            let videos = await callAPI('video/list', {max_id: max_id, limit: this.state.limit});
            await this.setState({loading: false, fetching: false, isRefreshing: false});
            if(videos.data.length === 0){
                await this.setState({no_more: true});
            }else{
                let listVideos = this.state.videos;
                if(refresh === true){
                    listVideos = [];
                }
                let data = listVideos.concat(videos.data);
                await this.setState({videos: data, no_more: videos.data.length < this.state.limit});
            }
        }
    };

    render() {
        if(this.state.loading === true){
            return (<ActivityIndicator size={`large`} style={{paddingVertical: 30}} />)
        }else if(this.state.videos.length === 0){
            return (<View style={styles.container}><Text style={styles.noData}>Chưa có video nào</Text></View>);
        }else{
            return (<View style={styles.listLivestreamWrap}>
                <FlatList
                    style={styles.listLivestream}
                    data={this.state.videos}
                    keyExtractor={(item, index) => item.screenshot}
                    initialNumToRender={1}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter}
                    onEndReachedThreshold={0.4}
                    onEndReached={this._handleLoadMore}
                />
            </View>);
        }
    }

    _renderHeader = () => {
        return (<Fragment>
            <Swiper style={styles.wrapper} showsButtons={false} dotColor="#FFFFFF" activeDotColor={Colors.tintColor} autoplay={true} autoplayTimeout={10}>
                <View style={styles.slideItem}>
                    <TouchableHighlight onPress={() => this.props.goToRoute(this.props.navigation, 'SoiCau')}>
                        <ImageBackground style={styles.slideImage} source={require('../../../assets/images/banners/banner_01.gif')} />
                    </TouchableHighlight>
                </View>
                <View style={styles.slideItem}>
                    <TouchableHighlight onPress={() => this.props.goToRoute(this.props.navigation, 'LotoSubscribe')}>
                        <ImageBackground style={styles.slideImage} source={require('../../../assets/images/banners/banner_02.gif')} />
                    </TouchableHighlight>
                </View>
            </Swiper>
            <View>
                <Text style={styles.serviceLinkTitle}>Tham khảo Xổ Số - Bóng Đá</Text>
            </View>
            <View style={styles.serviceLinks}>
                <TouchableOpacity style={styles.serviceLinkItem} onPress={() => this.props.goToRoute(this.props.navigation, 'LotoSubscribe')}>
                    <Text style={styles.serviceTitleItem}>
                        <IconItem name="globe" size={20} color={Colors.white} />  Nhận số VIP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceLinkItem} onPress={() => this.props.goToRoute(this.props.navigation, 'FootballSubscribe')}>
                    <Text style={styles.serviceTitleItem}>
                        <IconItem name="football" size={20} color={Colors.white} />  TIP Bóng đá
                    </Text>
                </TouchableOpacity>
            </View>
            <View><Text style={styles.serviceCert}>(Không đúng hoàn lại ngân lượng)</Text></View>
        </Fragment>)
    };

    _renderFooter = () => {
        if (!this.state.fetching || this.state.isRefreshing) return null;
        return (<IconLoading color={Colors.lightBlack} />);
    };

    _handleLoadMore = async () => {
        if(this.state.no_more === false && this.state.fetching === false){
            await this._fetchVideo();
        }
    };

    _renderItem = ({item}) => (
        <View style={styles.streamItem} key={item.screenshot}>
            <TouchableOpacity activeOpacity={0.9} style={styles.streamItemTouch} onPress={() => this._onPressItem(item)}>
                <View style={styles.streamItemViewing}>
                    <Text style={styles.streamItemViewingNumber}>{item.time}</Text>
                </View>
                <Image source={{uri: item.screenshot}} style={styles.streamItemScreenshot}/>
            </TouchableOpacity>
            <View style={styles.streamInfo}>
                <Image source={item.author_avatar!==""?{uri: item.author_avatar}:noavatar} style={styles.streamItemAvatar} />
                <View style={styles.streamTitleAndAuthor}>
                    <Text style={styles.streamItemTitle}>{item.title}</Text>
                    <Text style={styles.streamItemAuthorName}>{item.author_name}</Text>
                </View>
            </View>
        </View>
    );

    _onPressItem = (item) => {
        this.props.goToRoute(this.props.navigation, 'videoDetail', {video: item});
    };


    _onRefresh = async () => {
        if(this.state.isRefreshing === false){
            await this.setState({no_more: false, isRefreshing: true, loading: false, fetching: false});
            await this._fetchVideo(true);
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
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(withNavigation(LivestreamLatest));