import React from 'react';
import {
    DatePickerAndroid,
    Platform,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/LotoStyle';
import Chapter from "../components/Chapter";

class ChapterScreen extends React.Component {
    static navigationOptions = {
        title: 'Đọc truyện'
    };

    onRegionChange = region => {
        this.regionModal.close();
    };

    submitForm = () => {
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.mainTab}>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('loto')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={styles.mainTabItemTextActive}>Truyện Audio</Text>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
                        onPress={() => {this.changeTab('vietlott')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='vietlott'?styles.mainTabItemTextActive:styles.mainTabItemText}>Truyện Chữ</Text>
                        </View>
                    </TouchableOpacity>*/}
                </View>
                <Chapter navigation={navigation}/>
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
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen);
