//
// import FirebaseAdapter from 'emberfire/adapters/firebase';
//
// export default FirebaseAdapter.extend({
// });

import WildemberAdapter from 'wildember/adapters/wildember';
import config from '../config/environment';

export default WildemberAdapter.extend({
    wilddogConfig: config.wilddogConfig
});
