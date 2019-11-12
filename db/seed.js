const path = require('path');
const client = require('./index');

client.query(
  'CREATE TABLE IF NOT EXISTS homes ('
  + 'id integer PRIMARY KEY NOT NULL, '
  + 'photos text[], '
  + 'description text'
  + ');',
)
  .then(() => console.log('CREATED TABLE homes'))
  .catch((err) => console.error(`CREATING TABLE FAILED WITH ERR ${err}`))
  .then(() => {
    return client.query(
      'COPY homes (id,photos,description) '
      + `FROM '${path.join(__dirname, 'data.csv')}' WITH CSV HEADER`,
    );
  })
  .then(() => console.log('POPULATED TABLE homes'))
  .catch((err) => console.error(`POPULATING TABLE homes FAILED WITH ERR ${err}`))
  .then(() => client.end());
