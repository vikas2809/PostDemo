import React, { Component } from 'react';
import {
    View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Dimensions
} from 'react-native';
import { observer, inject } from 'mobx-react';
import Loader from 'App/src/components/loader/Loader';
import { POSTDEMO_IMAGES } from 'App/src/utility/constant/Constant';
import { COLOR_CODES } from 'App/src/utility/Theme';
import Button from 'App/src/components/button/Button';
import CustomInput from 'App/src/components/input/CustomInput';
import { showAlert } from 'App/src/utility/Utility';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

@inject('post')
@observer
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            postList: [],
            showSearchBar: false,
            isFocussed: false,
            height: 40,
            search: ''
        }
    }

    componentDidMount() {
        this.fetchPostsList()
    }


    async fetchPostsList() {
        let _results = []
        let response = await this.props.post.fetchPostsList();
        console.log('REsponse', response)
        if (response.success) {
            _results = [...this.state.postList, ...this.props.post.postList]
            this.setState({
                postList: _results
            })
        }
    }

    renderSeparator = () => {
        return (
            <View style={styles.separatorContainer} />
        );
    };

    renderFooter = () => {
        const { isLoading } = this.props.post
        if (!isLoading) return null;
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    }

    async navigateDetails(item) {
        this.props.navigation.navigate('details')
    }

    _renderBadge(item) {
        return (
            <View style={{ borderWidth: 1, backgroundColor: COLOR_CODES.HEADER_COLOR, borderRadius: 50, height: 25, width: 25, borderColor: COLOR_CODES.HEADER_COLOR }}>
                <Text style={{ textAlign: 'center', color: COLOR_CODES.WHITE }}>{item.userId}</Text>
            </View>
        )
    }

    _renderItem(item) {
        return (
            <TouchableOpacity key={item.description} style={styles.renderItemContainer} onPress={() => this.navigateDetails(item)}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 0.15 }}>
                        <Image source={POSTDEMO_IMAGES.POST_ICON} style={{ height: 50, width: 50 }} />
                    </View>
                    <View style={{ marginLeft: 20, flex: 0.85 }}>
                        <Text numberOfLines={3} style={{ fontSize: 16 }}>{item.title}</Text>
                    </View>
                    <View style={{ marginRight: 5, marginTop: 10 }}>
                        {this._renderBadge(item)}
                    </View>

                </View>
                <View>
                    <Text style={styles.bodyTextStyle}>{item.body}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress = async () => {
        const { search, postList } = this.state
        let _data = [...postList]
        if (search.trim().length === 0) {
            this.setState({ postList: this.props.post.postList })
            showAlert('Error', `Search can't be empty`)
        } else {
            let filteredData = _data.filter(item => item.userId == search || item.id == search || item.body == search || item.title == search)
            this.setState({
                postList: filteredData,
                showSearchBar: false
            })
        }
    }

    _handleBlur = () => this.setState({ isFocussed: false, showSearchBar: false })

    _handleFocus = () => this.setState({ isFocussed: true })

    _onContentSizeChange = event => this.setState({ height: event.nativeEvent.contentSize.height })

    _onChangeText = text => this.setState({ search: text })

    _renderSearchBar() {
        return (
            <View style={styles.searchBarContainer}>
                <View style={{ flexDirection: 'column', flex: 0.7 }}>
                    <CustomInput
                        isFocussed={this.state.isFocussed}
                        height={this.state.height}
                        _multiline={false}
                        _placeholder={'search by id,userid,title,post'}
                        _handleBlur={this._handleBlur}
                        _handleFocus={this._handleFocus}
                        _onContentSizeChange={this._onContentSizeChange}
                        _onChangeText={this._onChangeText}
                        _value={this.state.search}
                    />
                </View>
                <View style={{ flexDirection: 'column', flex: 0.3 }}>
                    <Button _onPress={this._onPress} title="Search" extraStyle={{ height: 40, padding: 5 }} />
                </View>
            </View>
        )
    }

    render() {
        const { isLoading } = this.props.post;
        const { showSearchBar, postList } = this.state
        return (
            <View style={styles.container}>
                <Loader loading={isLoading} />
                {postList.length === 0 && (
                    <View style={styles.errorTextContainer}>
                        <Text style={styles.errorTextStyle}>No Details Found</Text>
                        <Text style={styles.tryAgain} onPress={() => this.fetchPostsList()}>Try Again</Text>
                    </View>
                )}
                {showSearchBar && (
                    <View style={{ flex: 0.1 }}>
                        {this._renderSearchBar()}
                    </View>
                )}

                <View style={showSearchBar ? { flex: 0.9 } : { flex: 1 }}>
                    <FlatList
                        data={postList}
                        extraData={this.state}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>


                <TouchableOpacity style={styles.filterContainer} onPress={() => this.setState({ showSearchBar: !this.state.showSearchBar })}>
                    <Image source={POSTDEMO_IMAGES.FILTER_ICON} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CODES.WHITE
    },
    renderItemContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    footerContainer: {
        paddingVertical: 1,
        borderTopWidth: 1,
        borderColor: COLOR_CODES.GRAY_SCALE
    },
    separatorContainer: {
        height: 1,
        width: SCREEN_WIDTH - 20,
        backgroundColor: COLOR_CODES.GRAY_SCALE,
        marginLeft: "2%"
    },
    filterContainer: {
        position: 'absolute',
        bottom: 10,
        height: 50,
        width: 50,
        borderWidth: 1,
        backgroundColor: COLOR_CODES.LIGHT_GRAY,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        borderColor: COLOR_CODES.LIGHT_GRAY
    },
    searchBarContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bodyTextStyle: {
        marginLeft: 10,
        textAlign: 'left',
        color: COLOR_CODES.GRAY_SHADE
    },
    errorTextStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: COLOR_CODES.HEADER_COLOR,
    },
    errorTextContainer: {
        marginTop: SCREEN_HEIGHT / 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    tryAgain: {
        fontSize: 18,
        color: COLOR_CODES.BRIGHT_GREY,
        marginLeft: 5,
        textDecorationLine: 'underline',
    }
})