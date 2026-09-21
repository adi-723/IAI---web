-- =====================================================
-- BASE DE DATOS
-- Instituto de Inteligencia Artificial
-- =====================================================

CREATE DATABASE IF NOT EXISTS instituto_iai;

USE instituto_iai;

CREATE TABLE investigators (

    id INT AUTO_INCREMENT PRIMARY KEY,

    slug VARCHAR(100) NOT NULL UNIQUE,

    image VARCHAR(255),

    email VARCHAR(150),

    office VARCHAR(150),

    scholar VARCHAR(255),

    orcid VARCHAR(255),

    researchgate VARCHAR(255),

    website VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE investigator_translations (

    id INT AUTO_INCREMENT PRIMARY KEY,

    investigator_id INT NOT NULL,

    language CHAR(2) NOT NULL,

    name VARCHAR(200) NOT NULL,

    degree VARCHAR(200),

    position VARCHAR(200),

    area VARCHAR(200),

    summary TEXT,

    biography LONGTEXT,

    FOREIGN KEY (investigator_id)
        REFERENCES investigators(id)
        ON DELETE CASCADE

);

CREATE TABLE investigator_interests (

    id INT AUTO_INCREMENT PRIMARY KEY,

    investigator_id INT,

    language CHAR(2),

    interest VARCHAR(200),

    FOREIGN KEY (investigator_id)

        REFERENCES investigators(id)

        ON DELETE CASCADE

);

CREATE TABLE investigator_education (

    id INT AUTO_INCREMENT PRIMARY KEY,

    investigator_id INT,

    language CHAR(2),

    education TEXT,

    FOREIGN KEY (investigator_id)

        REFERENCES investigators(id)

        ON DELETE CASCADE

);

CREATE TABLE research_groups (

    id INT AUTO_INCREMENT PRIMARY KEY,

    slug VARCHAR(120),

    image VARCHAR(255)

);

CREATE TABLE research_group_translations (

    id INT AUTO_INCREMENT PRIMARY KEY,

    research_group_id INT,

    language CHAR(2),

    name VARCHAR(200),

    summary TEXT,

    description LONGTEXT,

    FOREIGN KEY (research_group_id)

        REFERENCES research_groups(id)

        ON DELETE CASCADE

);

CREATE TABLE investigator_group (

    investigator_id INT,

    research_group_id INT,

    PRIMARY KEY(

        investigator_id,

        research_group_id

    ),

    FOREIGN KEY (investigator_id)

        REFERENCES investigators(id)

        ON DELETE CASCADE,

    FOREIGN KEY (research_group_id)

        REFERENCES research_groups(id)

        ON DELETE CASCADE

);

CREATE TABLE papers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    image VARCHAR(255),

    doi VARCHAR(255),

    publication_date DATE,

    journal VARCHAR(255),

    pdf VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE paper_translations (

    id INT AUTO_INCREMENT PRIMARY KEY,

    paper_id INT,

    language CHAR(2),

    title VARCHAR(300),

    abstract LONGTEXT,

    keywords TEXT,

    FOREIGN KEY (paper_id)

        REFERENCES papers(id)

        ON DELETE CASCADE

);

CREATE TABLE paper_authors (

    paper_id INT,

    investigator_id INT,

    PRIMARY KEY(

        paper_id,

        investigator_id

    ),

    FOREIGN KEY (paper_id)

        REFERENCES papers(id)

        ON DELETE CASCADE,

    FOREIGN KEY (investigator_id)

        REFERENCES investigators(id)

        ON DELETE CASCADE

);

CREATE TABLE news (

    id INT AUTO_INCREMENT PRIMARY KEY,

    image VARCHAR(255),

    publish_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE news_translations (

    id INT AUTO_INCREMENT PRIMARY KEY,

    news_id INT,

    language CHAR(2),

    title VARCHAR(300),

    summary TEXT,

    content LONGTEXT,

    FOREIGN KEY (news_id)

        REFERENCES news(id)

        ON DELETE CASCADE

);

CREATE TABLE roles (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(50) NOT NULL UNIQUE

);

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    role_id INT NOT NULL,

    investigator_id INT NULL,

    username VARCHAR(100) UNIQUE NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id)

        REFERENCES roles(id),

    FOREIGN KEY (investigator_id)

        REFERENCES investigators(id)

);