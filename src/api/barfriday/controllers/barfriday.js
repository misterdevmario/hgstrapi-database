'use strict';

/**
 * barfriday controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::barfriday.barfriday');
