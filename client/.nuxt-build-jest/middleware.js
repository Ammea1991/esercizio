const middleware = {}
/* eslint-disable dot-notation */

middleware['isAuthenticated'] = require('../middleware/isAuthenticated.js')
middleware['isAuthenticated'] = middleware['isAuthenticated'].default || middleware['isAuthenticated']

/* eslint-enable dot-notation */
export default middleware
