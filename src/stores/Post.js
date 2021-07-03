import { observable } from 'mobx';
import NetworkOps from 'App/src/network/Network';
import PostInfo from './models/PostInfo';

export default class Post {

    @observable isLoading: Boolean = false;
    @observable postList: Array<PostInfo> = []
    @observable url: String = 'https://jsonplaceholder.typicode.com/posts';

    constructor(store) {
        this.store = store;
    }

    async fetchPostsList() {
        this.postList = []
        this.isLoading = true;
        let _results = [];
        let response = await NetworkOps.getRaw(this.url);
        console.log('REsponse from store', response)
        if (response && response.length > 0 && response.length > 0) {
            this.isLoading = false
            response.forEach(element => _results.push(new PostInfo(element)));
            this.postList = _results
            return { success: true }
        }
        return { success: false }
    }

    async postMessage(body) {
        let request = {
            title: 'Post Data',
            body: body,
            userId: 1,
        }
        this.isLoading = true;
        let response = await NetworkOps.postToJson(this.url, request);
        this.isLoading = false;
        if (Object.keys(response).length > 0) {
            return { success: true }
        }
        return { success: false }
    }

}