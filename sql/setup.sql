DROP TABLE IF EXISTS users,
tardys,
comments;
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_photo_url VARCHAR(255)
);
CREATE TABLE tardys (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  photo_url VARCHAR(255) NOT NULL,
  caption VARCHAR(255),
  tags VARCHAR(255) [] NOT NULL
);
CREATE TABLE comments (
  comment_by BIGINT REFERENCES users(id),
  post BIGINT REFERENCES tardys(id),
  comment VARCHAR(255) NOT NULL
);