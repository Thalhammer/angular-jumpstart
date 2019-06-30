import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '@model';
import { AuthenticationService } from '@service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private authenticationService: AuthenticationService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}