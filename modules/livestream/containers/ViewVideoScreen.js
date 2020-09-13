import React from 'react';
import {View} from 'react-native';
import { WebView } from 'react-native-webview'
import {connect} from 'react-redux';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import styles from '../styles/ViewVideoStyle';

class ViewVideoScreen extends React.Component {

    state = {
        loading: true,
        video: null
    };

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: state.params.title||"Loading...",
            headerRight: state.params.headerRight||null
        }
    };

    async UNSAFE_componentWillMount() {
        let video = this.props.navigation.getParam('video');
        const {setParams} = this.props.navigation;
        if(typeof video === 'object'){
            this.setState({video: video});
            setParams({
                title: video.title
            });
        }else{
            alert("Video không tồn tại hoặc đã bị xoá");
            this.props.goToRoute(this.props.navigation, 'Home');
        }
    }

    render(){
            return (<View style={styles.viewVideoModal}>
                <WebView
                    style={styles.videoContainer}
                    javaScriptEnabled={true}
                    allowsInlineMediaPlayback={true}
                    source={{
                        uri: this.state.video.youtube_id,
                    }}
                />
                </View>);
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ViewVideoScreen);