const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = async function(email) {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user.rows[0];
  } catch (err) {
    console.log(err.message);
    const user = null;
    return user;
  }
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = async function(id) {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return user.rows[0];
  } catch (err) {
    console.log(err.message);
    const user = null;
    return user;
  }
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = async function(user) {
  try {
    const newUser = await pool.query(`INSERT INTO users(NAME, PASSWORD, EMAIL) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.password, user.email]);
    return newUser.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};
exports.addUser = addUser;

/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = async function(guest_id, limit = 10) {
  try {
    const reservations = await pool.query(`SELECT * FROM reservations 
    JOIN properties ON reservations.property_id = properties.id
    WHERE guest_id = $1
    LIMIT $2`, [guest_id, limit]);
    return reservations.rows;
  } catch (err) {
    console.log(err.message);
  }
};
exports.getAllReservations = getAllReservations;

/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night BETWEEN $${(queryParams.length - 1) * 100} AND $${queryParams.length * 100} `;
  }
  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = async function(property) {
  try {
    const newProperty = await pool.query(`INSERT INTO properties(OWNER_ID, TITLE, DESCRIPTION, THUMBNAIL_PHOTO_URL, COVER_PHOTO_URL,
      COST_PER_NIGHT, STREET, CITY, PROVINCE, POST_CODE, COUNTRY, PARKING_SPACES, NUMBER_OF_BATHROOMS, NUMBER_OF_BEDROOMS) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,
      [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
      property.cost_per_night, property.street, property.city, property.province, property.post_code,
      property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
    return newProperty.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};
exports.addProperty = addProperty;
