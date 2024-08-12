CREATE DATABASE flashcard_store;
USE flashcard_store;

CREATE TABLE flashcard(
    id integer PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    category TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO flashcard(question , answer , category , user_id )
VALUES
('What is an API enpoint ?' , "an API endpoint is a specific location within an API that accepts requests and sends back responses. It's a way for different systems and applications to communicate with each other, by sending and receiving information and instructions via the endpoint" , 'beginner'  , "all" ),
('What is a database ?' , "A database is an organized collection of structured information, or data, typically stored electronically in a computer system." , 'beginner' , 'all'),
('What is the difference between frontend and backend?' , 'Frontend is the face of the website whereas backend provides functionality to the website !' , 'beginner' , "all");
