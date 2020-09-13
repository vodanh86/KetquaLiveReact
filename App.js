import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View, Image} from 'react-native';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import AppNavigator from './navigators/navigator.app';
import { Provider } from 'react-redux';
import store from './modules/common/common.store';
import {FontAwesome, MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons';
import WrapScreen from './modules/common/containers/WrapScreen';

class AppContainer extends Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <WrapScreen><AppNavigator/></WrapScreen>
                    </View>
            );
        }
    }

    _cacheImages = (images) => {
        return images.map(image => {
            if (typeof image === 'string') {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    };

    _cacheFonts = (fonts) => {
        return fonts.map(font => Font.loadAsync(font));
    };

    _loadResourcesAsync = async () => {
        const imageAssets = this._cacheImages([
            require('./assets/images/bg.png'),
            require('./assets/images/no_avatar.png'),
            require('./assets/images/coin.png'),
            require('./assets/images/bg_head.png'),
            require('./assets/images/icon.png'),
            require('./assets/images/splash.png'),
            require('./assets/images/vip.png'),
            require('./assets/images/super_vip.png'),
            require('./assets/images/banners/banner_01.gif'),
            require('./assets/images/banners/banner_02.gif'),
        ]);
        const fontAssets = this._cacheFonts([
            FontAwesome.font,
            MaterialCommunityIcons.font,
            MaterialIcons.font,
            Ionicons.font
        ]);
        return await Promise.all([...imageAssets, ...fontAssets]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default class App extends React.Component {
    render(){
        return <Provider store={store}><AppContainer/></Provider>
    }
}


