

process.env.NODE_ENV = 'test';

require('./nts.js');
require('./nts.database.js');
require('./backend.js');
require('./backend.models.js');
require('./backend.endpoints.js');
