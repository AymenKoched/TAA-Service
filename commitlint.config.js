const fs = require('fs').promises;
const path = require('path');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
