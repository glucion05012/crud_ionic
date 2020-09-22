import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://www.foursquare.org.ph/giddel/crud_api/api/user';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[User]>(this.url);
  }

  get(id: string) {
    return this.http.get<[User]>(this.url + '/' + id);
  }

  create(user: User) {
    return this.http.post(this.url, user);
  }

  update(user: User, id: string) {
    return this.http.put(this.url + '/' + id, user);
  }

  delete(id: string) {
    return this.http.delete(this.url + '/' + id);
  }


}
