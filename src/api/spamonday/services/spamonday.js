'use strict';

/**
 * spamonday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::spamonday.spamonday');
