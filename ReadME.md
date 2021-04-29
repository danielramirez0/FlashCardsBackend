Flashcard App (Backend User Stories)
Learning objective: Use Node.js, Express.js, MongoDB and Mongoose to build a flashcard backend server that will enable CRUD functionality for a client application.
Technologies: Node.js, Express.js, MongoDB, Mongoose

GOALS:
I want to set up my MongoDB Atlas cluster so that I have a place to store and access data.
I want to connect my Node.js and Express.js Web API to a MongoDB cluster.

Collection Endpoints
I want to create a GET endpoint that responds to a request with all of card collections within my MongoDB flashcards collection.
I want to create a GET endpoint that takes in a collection’s id as a parameter through the request’s URL and responds with the collection document.
I want to create a POST endpoint that receives a new collection object through the request’s body and add it as a new document in my MongoDB database.

Flashcard Endpoints
I want to create a GET endpoint that takes in a collection’s id as a parameter through the request’s URL and responds with that collection’s array of cards.
I want to create a GET endpoint that takes in a collection and flashcard id as a parameter through the request’s URL and responds with that collection’s specific flashcard.

I want to create a POST endpoint that does the following: - takes in a collection and flashcard id as a parameter through the request’s URL - receives the properties and values that are for a new card through the request’s body - add the new card as a subdocument to the correct collection in my database
I want to create a PUT endpoint that does the following: - takes in a collection’s and flashcard’s id as a parameter through the request’s - receives the properties and values that are to be updated through the request’s body - updates the flash card document within the correct collection in my database
I want to create a DELETE endpoint that takes in a collection and flashcard id as a parameter through the request’s URL and removes the flashcard from the correct collection in my database.
