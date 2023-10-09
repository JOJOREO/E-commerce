import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}
  userObject: any = {};
  username: any = 'Guest';
  userImage: any =
    'assets/images/403022_business man_male_user_avatar_profile_icon.png';

  userObjectMonitoring: BehaviorSubject<{}> = new BehaviorSubject<{}>(
    this.userObject
  );
  usernameMonitoring: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.username
  );
  userImageMonitoring: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.userImage
  );

  Login = () => {
    return this._http.post<any>('https://dummyjson.com/auth/login', {
      username: 'kminchelle',
      password: '0lelplR',
    });
  };
}
