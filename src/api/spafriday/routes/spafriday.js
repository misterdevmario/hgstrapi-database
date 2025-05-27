'use strict';

/**
 * spafriday router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::spafriday.spafriday');
