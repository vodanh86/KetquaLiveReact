/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @version v1.0.2
 */

import React, { Component } from 'react';
import { WebView } from 'react-native-webview'
import {CONFIG} from "../common.constants";;
import {
    View,
    Dimensions,
    Platform,
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const injectedScript = function() {
    function waitForBridge() {
        if (window.postMessage.length !== 1){
            setTimeout(waitForBridge, 200);
        }
        else {
            postMessage(
                Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
            )
        }
    }
    waitForBridge();
};

export default class WebViewExtra extends Component {
    state = {
        webViewHeight: Number
    };

    static defaultProps = {
        autoHeight: true,
    };

    constructor (props) {
        super(props);
        this.state = {
            webViewHeight: this.props.defaultHeight
        };

        this._onMessage = this._onMessage.bind(this);
    }

    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }

    stopLoading() {
        this.webview.stopLoading();
    }

    reload() {
        this.webview.reload();
    }

    render () {
        const baseUrl = CONFIG.api_domain + '/view';
        const _w = this.props.width || Dimensions.get('window').width;
        const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
        const androidScript = 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');' +
            '(' + String(injectedScript) + ')();';
        const iosScript = '(' + String(injectedScript) + ')();' + 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');';
        return (
            <View style={{flex: 1,backgroundColor: '#fff',width:deviceWidth,height:deviceHeight}}>
            <WebView
                ref={(ref) => { this.webview = ref; }}
                injectedJavaScript={Platform.OS === 'ios' ? iosScript : androidScript}
                scrollEnabled={this.props.scrollEnabled || false}
                onMessage={this._onMessage}
                javaScriptEnabled={true}
                javaScriptEnabledAndroid={true}
                automaticallyAdjustContentInsets={true}
                source={this.props.fullUrl!==undefined?{uri: this.props.fullUrl}:{uri: baseUrl +'/'+ this.props.url +'.html?v=ggdfg'}}
                scalesPageToFit={Platform.OS !== 'ios'}
                autoHeight={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                style={{width: _w, ...this.props.style, height: _h}}
            />
            </View>
        )
    }
}