'use strict';

exports.secure = {
  description: 'Route to demonstrate how to call a secure route',
  notes: 'This should be removed once everyone knows how to access secure routes.',
  tags: ['api'],
  auth: {
    mode: 'required',
    strategy: 'jwt'
  },
  handler: (request, reply) => {
    reply({ message: 'You are secure.' });
  }
};

