'use strict';

/**
 * spafriday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::spafriday.spafriday');
