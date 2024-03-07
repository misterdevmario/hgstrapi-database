'use strict';

/**
 * barfriday router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::barfriday.barfriday');
