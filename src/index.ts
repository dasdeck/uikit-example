import * as UIkit from 'uikit';
import * as Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css';

declare const BUNDLED;

if (BUNDLED) {
    UIkit.use(Icons);
}
UIkit.notification('Hello world.');