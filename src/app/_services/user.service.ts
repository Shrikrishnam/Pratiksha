import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";
    constructor(private http: Http) {}
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
    }
    updateUser(user,id){
      return this.http.put("http://localhost:6565/allfriends/" +id, user);
    }
    deleteUser(user){
      return this.http.delete("http://localhost:6565/allfriends/"+ user.id);    
    }
    postcontactdata(data){
      return this.http.post(UserService.BaseUrl+'contact',data,httpOptions).pipe(map((response: Response) => response.json()));
    
    }
}