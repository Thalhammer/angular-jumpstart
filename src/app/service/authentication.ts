import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@model';
import { environment } from '@environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private users = [
        {
            username: "Max",
            fullname: "Max Mustermann",
            password: "Test123",
            token: "sample jwt token"
        }
    ];

    constructor(private http: HttpClient) {
        let user = JSON.parse(localStorage.getItem(environment.ls_prefix + '.currentUser')) as User;
        if(user) try {
            let exp : any = user.token.split(".")[1];
            exp = JSON.parse(atob(exp));
            exp = exp.exp;
            if((new Date().getTime()/1000) - exp > -30) {
                user = null;
                localStorage.removeItem(environment.ls_prefix + ".currentUser");
            }
        } catch(e) {
            console.error("Failed to restore login", e);
        }
        this.currentUserSubject = new BehaviorSubject<User>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) : Promise<User> {
        for(let e of this.users) {
            if(e.username == username && e.password == password) {
                this.currentUserSubject.next(e);
                return Promise.resolve(e);
            }
        }
        return Promise.reject("Invalid login");
    }

    register(username: string, password: string, fullname: string) : Promise<any> {
        for(let e of this.users) {
            if(e.username == username) return Promise.reject("User already exists");
        }
        let user = {
            username: username,
            fullname: fullname,
            password: password,
            token: "sampletoken"
        };
        this.users.push(user);
        return Promise.resolve(user);
    }

    updateAccount(fullname: string, password: string) : Promise<any> {
        for(let e of this.users) {
            if(e.username == this.currentUserValue.username) {
                e.fullname = fullname;
                if(password) e.password = password;
                return Promise.resolve(e);
            }
        }
        return Promise.resolve("User not found");
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(environment.ls_prefix + '.currentUser');
        this.currentUserSubject.next(null);
    }
}