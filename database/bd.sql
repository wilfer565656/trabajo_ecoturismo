CREATE DATABASE database_links ;
;

---CREATE TABLE USERS();
CREATE TABLE link(
    id INT(11) NOT NULL PRIMARY KEY ,
    tittle VARCHAR(100) NOT NULL,
    url VARCHAR(255)NOT NULL,
    description text,
    user_id INT(11)  , 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    CONSTRAINT fk_userv  FOREIGN KEY (user_id) REFERENCES users(id)

);
