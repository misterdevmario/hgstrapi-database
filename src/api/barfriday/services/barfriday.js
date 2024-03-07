'use strict';

/**
 * barfriday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::barfriday.barfriday');
