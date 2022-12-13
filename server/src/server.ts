import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import { FileRequestsRoute } from './routes/fileRequests.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new FileRequestsRoute()]);

app.listen();
