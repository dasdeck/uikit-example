import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.css';

if (BUNDLED) {
    UIkit.use(Icons);
}

UIkit.notification('Hello world.');