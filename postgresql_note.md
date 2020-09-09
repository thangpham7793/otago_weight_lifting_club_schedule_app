https://www.youtube.com/watch?v=qw--VYLpxG4
www.mockaroo.com
planet.postgresql.org
https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart
To connect to heroku postgresql: heroku pg:psql (then it's business as usual)

https://stackoverflow.com/questions/37971961/docker-error-bind-address-already-in-use

### Study Notes

- id BIGSERIAL/SERIAL: auto-increment and used as index
- when inserting date: DATE 'yyyy-mm-dd' (ISO FORMAT)
- use single quote, but json key must use double quote
- json is inserted as a string
- -> returns json, ->> return text (e.g: SELECT colname -> 'key' FROM ...)
- 'key' is single-quoted
- chainable if result is a json object
- query nested array https://stackoverflow.com/questions/22736742/query-for-array-elements-inside-json-type
- https://stackoverflow.com/questions/19568123/query-for-element-of-array-in-json-column/19868697#19868697
- json_array_elements(...) unest json arr to text
- A::B (cast A to type B)
- need to surround alias in single quotes to have camelCase

### Command List:

- Connect to DB: psql -h -p -U -dbname
- Shell: \l \c \q \d \dt \i file_path
- Statement:
  - DROP DATABASE/TABLE [name];
  - CREATE TABLE [name]([name][type][constraint]);
  - ALTER TABLE [name] ADD COLUMN [name][type][constraint];
  - INSERT INTO [name](cols...) VALUES (...);
  - ALTER TABLE [name] ALTER COLUMN [name] TYPE [type]; (change type, implicit casting)
  - ORDER BY col1 ASC/DESC, [col2 ASC/DESC, ...] / can be used in distinct statement as well
  - CREATE TYPE [name] AS ENUM ('value1', 'value2', 'value3');
  - To switch to a custom type: ALTER TABLE name ALTER COLUMN column TYPE custom_type USING custom_type::custom_type;
