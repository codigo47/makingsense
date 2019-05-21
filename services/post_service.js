BaseService = require('./base_service')

class PostService extends BaseService {
  constructor() {
    super('posts');
  }
}

module.exports = PostService