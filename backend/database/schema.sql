-- ============================================================
-- ESQUEMA DE BASE DE DATOS - INSTITUTO IAI
-- Ejecutar en phpMyAdmin seleccionando la base instituto_iai.
-- ATENCION: este archivo elimina y vuelve a crear las tablas.
-- Realiza una copia de seguridad antes de ejecutarlo.
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `paper_research_group`;
DROP TABLE IF EXISTS `paper_authors`;
DROP TABLE IF EXISTS `paper_translations`;
DROP TABLE IF EXISTS `papers`;
DROP TABLE IF EXISTS `news_translations`;
DROP TABLE IF EXISTS `news`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `investigator_group`;
DROP TABLE IF EXISTS `research_group_translations`;
DROP TABLE IF EXISTS `research_groups`;
DROP TABLE IF EXISTS `investigator_education`;
DROP TABLE IF EXISTS `investigator_interests`;
DROP TABLE IF EXISTS `investigator_translations`;
DROP TABLE IF EXISTS `investigators`;
DROP TABLE IF EXISTS `roles`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE investigators (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    image VARCHAR(500) NULL,
    email VARCHAR(255) NULL,
    office VARCHAR(150) NULL,
    scholar VARCHAR(500) NULL,
    orcid VARCHAR(500) NULL,
    researchgate VARCHAR(500) NULL,
    website VARCHAR(500) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE investigator_translations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    investigator_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) NOT NULL,
    name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    degree VARCHAR(255) NULL,
    position VARCHAR(255) NULL,
    area VARCHAR(255) NULL,
    summary TEXT NULL,
    biography LONGTEXT NULL,
    UNIQUE KEY uq_investigator_language (investigator_id, language),
    CONSTRAINT fk_inv_translation_investigator FOREIGN KEY (investigator_id) REFERENCES investigators(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE investigator_interests (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    investigator_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) NOT NULL,
    interest VARCHAR(200) NOT NULL,
    UNIQUE KEY uq_investigator_interest (investigator_id, language, interest),
    CONSTRAINT fk_interest_investigator FOREIGN KEY (investigator_id) REFERENCES investigators(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE investigator_education (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    investigator_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) NOT NULL,
    education TEXT NOT NULL,
    CONSTRAINT fk_education_investigator FOREIGN KEY (investigator_id) REFERENCES investigators(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE research_groups (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    image VARCHAR(500) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE research_group_translations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    research_group_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) NOT NULL,
    name VARCHAR(200) NOT NULL,
    summary TEXT NULL,
    description LONGTEXT NULL,
    UNIQUE KEY uq_research_group_language (research_group_id, language),
    CONSTRAINT fk_group_translation_group FOREIGN KEY (research_group_id) REFERENCES research_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE investigator_group (
    investigator_id INT UNSIGNED NOT NULL,
    research_group_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (investigator_id, research_group_id),
    CONSTRAINT fk_inv_group_investigator FOREIGN KEY (investigator_id) REFERENCES investigators(id) ON DELETE CASCADE,
    CONSTRAINT fk_inv_group_group FOREIGN KEY (research_group_id) REFERENCES research_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE papers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(500) NULL,
    doi VARCHAR(255) NULL,
    publication_date DATE NULL,
    journal VARCHAR(255) NULL,
    pdf VARCHAR(500) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE paper_translations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    paper_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) NOT NULL,
    title VARCHAR(500) NOT NULL,
    abstract LONGTEXT NULL,
    keywords TEXT NULL,
    UNIQUE KEY uq_paper_language (paper_id, language),
    CONSTRAINT fk_paper_translation_paper FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE paper_authors (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    paper_id INT UNSIGNED NOT NULL,
    investigator_id INT UNSIGNED NULL,
    name VARCHAR(200) NOT NULL,
    author_order INT UNSIGNED NOT NULL,
    UNIQUE KEY uq_paper_author_order (paper_id, author_order),
    CONSTRAINT fk_paper_author_paper FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE,
    CONSTRAINT fk_paper_author_investigator FOREIGN KEY (investigator_id) REFERENCES investigators(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE paper_research_group (
    paper_id INT UNSIGNED NOT NULL,
    research_group_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (paper_id, research_group_id),
    CONSTRAINT fk_paper_group_paper FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE,
    CONSTRAINT fk_paper_group_group FOREIGN KEY (research_group_id) REFERENCES research_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE news (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(500) NULL,
    publish_date DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE news_translations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    news_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) NOT NULL,
    title VARCHAR(500) NOT NULL,
    summary TEXT NULL,
    content LONGTEXT NULL,
    UNIQUE KEY uq_news_language (news_id, language),
    CONSTRAINT fk_news_translation_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_id INT UNSIGNED NOT NULL,
    investigator_id INT UNSIGNED NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL DEFAULT NULL,
    must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_investigator (investigator_id),
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_user_investigator FOREIGN KEY (investigator_id) REFERENCES investigators(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

