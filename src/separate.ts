import * as UIkit from 'uikit/dist/js/uikit-core.js';
import * as Notification from 'uikit/dist/js/components/notification.js';
import * as Icons from 'uikit/dist/js/uikit-icons.js';
// import * as css from 'uikit/dist/css/uikit.css';
// import 'uikit/dist/css/uikit.css';

UIkit.use(Icons);
UIkit.use(Notification);

UIkit.notification('Hello world.<span uk-icon icon="home"></span>');