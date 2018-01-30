import { document } from 'global';
import App from './components/todomvc-app/index.marko';

const result = App.renderSync({});

result.appendTo(document.body);
