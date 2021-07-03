import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, TextInput
} from 'react-native';

import Button from 'App/src/components/button/Button';
import CustomInput from 'App/src/components/input/CustomInput';
import { showAlert } from 'App/src/utility/Utility';
import { observer, inject } from 'mobx-react';

@inject('post')
@observer
export default class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            post: '',
            isFocussed: false,
            height: 40
        }
    }


    _onPress = async () => {
        if (this.state.post.trim().length === 0) {
            showAlert('Error', `Post can't be empty`)
        } else {
            let response = await this.props.post.postMessage(this.state.post)
            if (response.success) {
                showAlert('Success', `Post has been successfully delievered`)
            } else {
                showAlert('Error', `Something went wrong`)
            }
            this.setState({ post: '' })
        }
    }

    _handleBlur = () => this.setState({ isFocussed: false })

    _handleFocus = () => this.setState({ isFocussed: true })

    _onContentSizeChange = event => this.setState({ height: event.nativeEvent.contentSize.height })

    _onChangeText = text => this.setState({ post: text })

    render() {
        const { isFocussed, height } = this.state;
        return (
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                <CustomInput
                    isFocussed={isFocussed}
                    height={height}
                    _multiline={true}
                    _placeholder={'Enter your post'}
                    _handleBlur={this._handleBlur}
                    _handleFocus={this._handleFocus}
                    _onContentSizeChange={this._onContentSizeChange}
                    _onChangeText={this._onChangeText}
                    _value={this.state.post}
                />
                <Button _onPress={this._onPress} title="Post" extraStyle={{ height: 50, padding: 10 }} />
            </ScrollView>
        )
    }
}

