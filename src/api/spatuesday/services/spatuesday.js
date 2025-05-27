'use strict';

/**
 * spatuesday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::spatuesday.spatuesday');
