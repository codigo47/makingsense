const Joi = require('@hapi/joi');
const ObjectID = require('mongodb').ObjectID;

class PostModel {
  getNewObj(post) {    
    //custom config here
    return post;
  }

  getFilterList(post) {
    let filter = {};

    if (post.id)
      filter._id = ObjectID(post.id);
    else if (post.title)
      filter.title = post.title;

    return filter;
  }
  
  getFilterDelete(post) {
    let filter = {};

    if (post.id)
      filter._id = ObjectID(post.id);

    return filter;
  }  

  validate(post, schema) {
    var data = {success: true};
    
    const result = Joi.validate(post, schema);

    if (result.error !== null) {
      data.message = result.error.details[0].message;
      data.success = false;
    } 

    return data;    
  }

  validateNew(post, authUser) {
    const schema = Joi.object().keys({
      title: Joi.string().min(1).max(30).required(),
      text: Joi.string().max(10000).required(),
      author: Joi.string().max(100).required().valid(authUser),
      state: Joi.string().valid('draft','private','public').required()
    });

    return this.validate(post, schema);
  }

  validateList(post) {
    const schema = Joi.object().keys({
      id: Joi.string().optional().min(24).max(24),
      title: Joi.string().optional().min(1).max(30)
    }).without('id', 'title');

    return this.validate(post, schema);
  }
  
  validateDelete(post) {
    const schema = Joi.object().keys({
      id: Joi.string().min(24).max(24).required()
    });
    
    return this.validate(post, schema);
  }
}

module.exports = PostModel;