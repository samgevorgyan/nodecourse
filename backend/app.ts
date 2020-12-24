// The Express app is exported so that it can be used by serverless Functions.
import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from '../src/app/app.server.module';
import * as login from './loginController/login';
import * as db from './database/db-connection';
import { APP_BASE_HREF } from '@angular/common';
import * as bodyParser from 'body-parser';

class Server {
  private server = express();
  private distFolder = join(process.cwd(), 'dist/nodecourse/browser');
  private indexHtml = existsSync(join(this.distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  constructor() {
    this.connectToDb();
    this.setUsage();
  }

  private connectToDb(): void {
    db.maked();
  }

  private setUsage(): void {
    this.server.engine(
      'html',
      ngExpressEngine({
        bootstrap: AppServerModule,
      })
    );
    this.server.set('view engine', 'html');
    this.server.set('views', this.distFolder);
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.get('*.*', express.static(this.distFolder, { maxAge: '1y' }));
    // All regular routes use the Universal engine
    this.server.get('*', (req, res) => {
      res.render(this.indexHtml, {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
    });
    this.server.use('/api/login', (req, res, next) => {
      console.log('midelwareic');
      next();
    });
  }
  public run(): void {
    console.log('mtav run linelu');
    const port = process.env.PORT || 4000;
    // Start up the Node server

    this.server.listen(port, () => {
      console.log('pooort listenic', port);
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  }
}

const app = new Server();
export { app };
