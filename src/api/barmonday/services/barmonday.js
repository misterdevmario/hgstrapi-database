'use strict';

/**
 * barmonday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::barmonday.barmonday');
