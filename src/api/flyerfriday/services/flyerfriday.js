'use strict';

/**
 * flyerfriday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flyerfriday.flyerfriday');
