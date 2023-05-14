import { Injectable } from '@angular/core';

import { ServerUserPage } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DummyHttpClientService {
  async getUsers(url: string): Promise<ServerUserPage> {
    const serverUserPage: ServerUserPage = {
      page: {
        total: 2,
        current: 1,
        size: 3
      },
      users: [
        { "id": 1, "name": "iivanov", "email": "asidorov@vtb.ru", "phone": 79991234567, "create_at": 1681721695, "update_at": 1681724695 },
        { "id": 2, "name": "petrov", "email": "petrov@vtb.ru", "phone": 79991234599, "create_at": 1681711695, "update_at": 1681764695 }
      ],
      data: [
        { "user_id": 2, "is_admin": false, "is_ecp": false, "status": "ACTIVE" },
        { "user_id": 2, "is_admin": true, "is_ecp": true, "status": "ACTIVE" },
        { "user_id": 1, "is_admin": true, "is_ecp": false, "status": "ACTIVE" }
      ]
    };
    return Promise.resolve(serverUserPage);
  }
}
