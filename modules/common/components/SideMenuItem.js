import React, { Component } from "react";
import {StyleSheet, Text, View, Linking, TouchableOpacity} from "react-native";
import SideMenuItemIcon from "./SideMenuItemIcon";
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getAppPropMap, getAppStateMap} from "../common.map";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
    },
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
    },
    optionIconContainer: {
        marginRight: 15,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    optionTextContainer: {

    },
    optionText: {
        fontSize: 15,
        marginTop: 5,
    },
});

class SideMenuItem extends Component {
    render() {
        const handleMenuItemClick = () => {
            if(this.props.href !== ""){
                if(this.props.href.substr(0,4) === 'tel:'){
                    Linking.openURL(this.props.href);
                }else{
                    this.props.clearHistories();
                    this.props.goToRoute(this.props.navigation, this.props.href);
                    this.props.navigation.closeDrawer();
                }
            }else{
                // nothing to do
            }
        };
        return <View><TouchableOpacity
            style={styles.option}
            onPress={() => handleMenuItemClick()}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <SideMenuItemIcon name={this.props.icon}/>
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SideMenuItem));