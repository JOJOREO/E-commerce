import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}
  userObject: any;
  username: any = 'Guest';
  userImage: any =
    'assets/images/403022_business man_male_user_avatar_profile_icon.png';
  Login = () => {
    this._http
      .post<any>('https://dummyjson.com/auth/login', {
        username: 'kminchelle',
        password: '0lelplR',
      })
      .subscribe((responseData) => {
        this.userObject = responseData;
        console.log(responseData);
        console.log(responseData.firstName);
        console.log(responseData.image);
        this.username = responseData.firstName;
        this.userImage = responseData.image;
        console.log(this.userObject);
        console.log(this.username);
        console.log(this.userImage);

        // localStorage.setItem(
        //   'Token',
        //   JSON.stringify({ token: responseData.token })
        // );
        // localStorage.setItem(
        //   'currentUser',
        //   JSON.stringify({ currentUser: responseData })
        // );

        //to get data from local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // var token = currentUser.token;

        // console.log(responseData);
        // console.log(responseData['id']);
      });
  };
}
