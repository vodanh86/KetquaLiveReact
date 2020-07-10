import React from "react";
import {View, Text, TouchableWithoutFeedback, Image, ImageBackground} from "react-native";
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import styles from '../styles/MenuUserCardStyle';
import IconItem from "../../common/components/IconItem";
import { Coin } from '../../common/components/Coin';
import nocover from '../../../assets/images/bg.png'
import noavatar from '../../../assets/images/no_avatar.png';

class MenuUserCard extends React.Component {
    render() {
        return <TouchableWithoutFeedback onPress={() => this.props.goToRoute(this.props.navigation, 'Profile')}>
                <View style={styles.user_card}>
                    <ImageBackground source={this.props.visitor.cover!==""?{uri: this.props.visitor.cover}:nocover} style={styles.user_cover}>
                        <View style={styles.user_bio}>
                            <Image source={this.props.visitor.avatar!==""?{uri: this.props.visitor.avatar}:noavatar} style={styles.user_avatar} />
                            <Text style={styles.user_name}>{this.props.visitor.name}</Text>
                            <Text style={styles.user_id}>ID: {this.props.visitor.id}</Text>
                            <View style={styles.user_coin}>
                                <Coin/>
                                <Text style={styles.user_coin_text}>{this.props.visitor.coin_formatted}</Text>
                            </View>
                        </View>
                        <View style={styles.cover_mask} />
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>;
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MenuUserCard));