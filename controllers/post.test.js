const sinon = require('sinon');
const postModel = require('../models/post');
const postController = require("./postController");

describe('Post controller', () => {
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        },
        session: {
            user: 'stswenguser'
        },
        flash: sinon.spy()
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    describe('Create Post', () => {
        let createPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() }),
                redirect: sinon.spy()
            };
        });

        afterEach(() => {
            createPostStub.restore();
        });

        it('should redirect to /posts if post creation is successful', () => {

            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(postModel, 'create').yields(null, expectedResult);

            postController.addPost(req, res);

            sinon.assert.calledWith(postModel.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.session.user }));
            sinon.assert.calledWith(res.redirect, '/posts');
            sinon.assert.notCalled(req.flash);
        });

        it('should redirect to /posts/add if post creation fails', () => {
            createPostStub = sinon.stub(postModel, 'create').yields(error);

            postController.addPost(req, res);

            sinon.assert.calledWith(res.redirect, '/posts/add');
            sinon.assert.calledWith(req.flash, 'error_msg', 'Could not create post. Please try again.');
        });

    });

});
