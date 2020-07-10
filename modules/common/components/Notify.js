import {WebBrowser, Icon} from 'expo';
const Notify = {
    toggle: () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    }
}

export default Notify;