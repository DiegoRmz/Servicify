DROP DATABASE IF EXISTS servicify;

CREATE DATABASE servicify;
USE servicify;

CREATE TABLE Users(
    email VARCHAR(40) NOT NULL,
    passwd VARCHAR(100) NOT NULL,
    userName VARCHAR(100) NOT NULL,
    birthday DATE,
    city VARCHAR(40) NOT NULL,
    estado VARCHAR(40) NOT NULL,
    country VARCHAR(40) NOT NULL,

    PRIMARY KEY(email)
);

CREATE TABLE PaymentMethod(
    usermail VARCHAR(40) NOT NULL,
     creditCardNumber VARCHAR(25) NOT NULL,
     dateCard DATE NOT NULL,
     cvc CHAR(3) NOT NULL,
     methodType VARCHAR(20) NOT NULL,

     FOREIGN KEY(usermail) REFERENCES Users(email) ON DELETE CASCADE
);

CREATE TABLE Ad(
    id INT(11) NOT NULL AUTO_INCREMENT,
    creationDate DATE NOT NULL,
    header TEXT NOT NULL,
    descript TEXT NOT NULL,
    category VARCHAR(20) NOT NULL,
    rating DECIMAL(3,2),
    locat TEXT,
    usermail VARCHAR(40) NOT NULL,


    PRIMARY KEY(id),
    FOREIGN KEY(usermail) REFERENCES Users(email) ON DELETE CASCADE
);

CREATE TABLE review(
    parentId INT(11) NOT NULL,
    Stars DECIMAL(3,2) NOT NULL,
    review TEXT,
    crDate DATE,

    FOREIGN KEY(parentId) REFERENCES Ad(id) ON DELETE CASCADE
);