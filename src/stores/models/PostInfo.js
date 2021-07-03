import { get } from 'lodash';


export default class PostInfo {
  id: String;
  title: String;
  body: String;
  userId: String;

  constructor(post: any) {
    this.id = get(post, 'id');
    this.title = get(post, 'title');
    this.body = get(post, 'body');
    this.userId = get(post, 'userId');
  }
}


