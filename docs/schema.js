db.user.drop();
db.post.drop();
users = [ {
	"firstname" : "Thomas",
	"lastname" : "Davis",
	"age" : 12
}, {
	"firstname" : "Annie",
	"lastname" : "Chan",
	"age" : 33
}, {
	"firstname" : "Dustin",
	"lastname" : "Light",
	"age" : 35
}, {
	"firstname" : "Luke",
	"lastname" : "Smith",
	"age" : 47
} ];

db.post.insert({
	"title": "Getting Started",
	"content": "<p>When working on a web application that involves a lot of JavaScript, one of the first things you learn is to stop tying your data to the DOM. It's all too easy to create JavaScript applications that end up as tangled piles of jQuery selectors and callbacks, all trying frantically to keep data in sync between the HTML UI, your JavaScript logic, and the database on your server. </p>",
	"tags": "html and node js",
	"keywords": "html node"
});
db.post.insert({
	"title": "Lorem Ipsum",
	"content": "<p>We'll build a form to create new posts soon, but for now we can manually add a post to the simpleBlogPosts.json file; this file may not exist yet because we haven't written any data, so you'll have to create it. Just make sure the file you create has</p>",
	"tags": "boat plane",
	"keywords": "html RC plane"
});