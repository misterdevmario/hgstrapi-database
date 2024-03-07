'use strict';

/**
 * barmonday router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::barmonday.barmonday');
