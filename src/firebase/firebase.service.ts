import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-service-account.json';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async verifyIdToken(idToken: string): Promise<any> {
    try {
      const data = await this.app.auth().verifyIdToken(idToken);
      const user = await this.app.auth().getUser(data.uid);
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid token id');
    }
  }
}
