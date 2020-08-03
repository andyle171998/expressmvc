'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('domains', [
    {
      id: 1,
      domain_name: 'Localhost',
      domain_link: 'http://localhost:3000',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('domains', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
