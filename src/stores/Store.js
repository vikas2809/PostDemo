import Post from './Post';

class Store {
  post: Post;

  constructor() {
    this.post = new Post(this);
  }
}

export default new Store();