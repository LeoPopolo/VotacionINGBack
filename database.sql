CREATE TYPE status AS ENUM (
    'voting_1',
    'voting_2',
    'final'
);

CREATE TABLE persons_list_one (
    id              serial,
    name            text,
    description     text,
    image_url       text,
    votes_quantity  int DEFAULT 0
);

CREATE TABLE persons_list_two (
    id              serial,
    name            text,
    description     text,
    image_url       text,
    votes_quantity  int DEFAULT 0
);

CREATE TABLE persons_list_final (
    id              serial,
    name            text,
    description     text,
    image_url       text,
    votes_quantity  int DEFAULT 0
);

CREATE TABLE vote_status (
    id              serial,
    status          status DEFAULT ('voting_1')
);

INSERT INTO persons_list_one (name,description,image_url) VALUES ('Chantal Galvez', '', ''), ('Abi Di Franco', '', ''), ('Tobi Galvez', '', ''), ('Santi Diaz', '', ''), ('Nico Evangelista', '', '');
INSERT INTO persons_list_two (name,description,image_url) VALUES ('Leo Popolo', '', ''), ('Vicki Ordoñez', '', ''), ('Kevin Valdez', '', ''), ('Pablito Torres', '', ''), ('Contu Molina', '', '');
INSERT INTO vote_status(status) VALUES ('voting_1');