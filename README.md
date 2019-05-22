# MakingSense blog API

How to Install the blog backend

```docker
git clone git@github.com:codigo47/makingsense_blog.git
cd makingsense_blog
docker-compose up
```

How to run the tests
```bash
$ docker exec -it app /bin/bash
$ mocha test
```

Endpoints

`POST /posts`, creates a new post

body: 
```JS 
{"title": "title1", "text": "bla bla bla", "author": "esteban", "state": "draft"}
```

Example
```bash 
curl -X POST "http://127.0.0.1:3000/posts" --user esteban:pass123 -H "Content-Type: application/json" -d '{"title": "title1", "text": "bla bla bla", "author": "esteban", "state": "draft"}'
```

-----------
`GET /posts`, get all posts
```bash
curl "http://127.0.0.1:3000/posts" --user esteban:pass123 -H "Content-Type: application/json"
```

-----------
`GET /posts?id=[ID]`, get post by ID
```bash
curl "http://127.0.0.1:3000/posts?id=5ce44c5bd072890a9f9849b4" --user esteban:pass123 -H "Content-Type: application/json"
```

-----------
`GET /posts?title=[TITLE]`, get post by TITLE
```bash
curl "http://127.0.0.1:3000/posts?title=any_title" --user esteban:pass123 -H "Content-Type: application/json"
```

-----------
`DELETE /posts`, deletes a post

body: 
```JS
{id: '5ce48ba2e72abd0012e56ae8'}
```

Example
```BASH
curl -X DELETE "http://127.0.0.1:3000/posts" --user codigo47:codigo12 -H "Content-Type: application/json" -d '{"id": "5ce44c5bd072890a9f9849b4"}'
```
