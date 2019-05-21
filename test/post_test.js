const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

const PostModel = require('../models/post_model');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Post', () => {

  describe('PostModel', () => {
    var model;

    beforeEach(() => {
      model = new PostModel();
    });

    describe('model validateNew()', () => {
      it('should not allow an empty title', () => {
        assert.equal(model.validateNew({title: ''}, 'esteban').success, false);
      });

      it('should not allow an empty post', () => {
        let post = {
          title: '',
          text: '',
          author: '',
          state: ''
        };

        assert.equal(model.validateNew(post, 'esteban').success, false);
      });

      it('should not allow a wrong state', () => {
        let post = {
          title: 'title34',
          text: 'text text',
          author: 'esteban',
          state: 'wrong_state'
        };

        assert.equal(model.validateNew(post, 'esteban').success, false);
      });
    });

    describe('model validateList()', () => {
      it('should allow an empty post object', () => {
        assert.equal(model.validateList({}).success, true);
      });

      it('should not allow an empty title', () => {
        assert.equal(model.validateList({title: ''}).success, false);
      });
    });

    describe('model validateDelete()', () => {
      it('should not allow IDs with less than 24 chars', () => {
        let obj = {id: 'asdasd'};
        assert.equal(model.validateList(obj).success, false);
      });
    });
  });

  describe('PostController', () => {

    describe('/posts', () => {
      it('should get a unauthorized error', (done) => {
        chai.request(app)
          .post('/posts')
          .end( (err, res) => {
            res.should.have.status(401);
            done();
          });
      });

      it('should create a new post', (done) => {
        chai.request(app)
          .post('/posts')
          .auth('esteban', 'pass123')
          .send({
            title: 'title234',
            text: 'bla bla bla',
            author: 'esteban',
            state: 'draft'
          })
          .end( (err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

  });

  describe('PostController', () => {
    var testPost = {
      title: 'title234',
      text: 'bla bla bla',
      author: 'esteban',
      state: 'draft'
    };

    const create = async () => {
      return await chai.request(app)
        .post('/posts')
        .auth('esteban', 'pass123')
        .send(testPost);
    };

    const listByTitle = async (title) => {
      return await chai.request(app)
        .get(`/posts?title=${title}`)
        .auth('esteban', 'pass123');
    };
    
    const listById = async (id) => {
      return await chai.request(app)
        .get(`/posts?id=${id}`)
        .auth('esteban', 'pass123');
    };    
    
    const remove = async (id) => {
      return await chai.request(app)
        .delete('/posts')
        .auth('esteban', 'pass123')
        .send({id});
    };    

    it('should create, list and delete a post', async () => {
      const res = await create();      
      const createdPost = res.body.data[0];      
      const id = createdPost._id;
      createdPost.title.should.be.equal(testPost.title);
      
      const listRes = await listById(id);
      const listedPost = listRes.body.data[0];      
      listedPost.text.should.be.equal(testPost.text);
      
      const deletedRes = await remove(id);      
      deletedRes.body.data.affectedDocs.should.be.equal(1);
      
      const listResDeleted = await listById(id);
      listResDeleted.should.have.status(404);      
    });

  });

});