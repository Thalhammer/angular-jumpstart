import { Component, ChangeDetectorRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: [ './default-layout.component.scss' ]
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: (e:MediaQueryListEvent) => void;
  @ViewChild('snav', {static: true}) snav : MatSidenav; 
  
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authenticationService: AuthenticationService,
    private router: Router,
    private i18n: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = (e) => {
      changeDetectorRef.detectChanges();
      if(!e.matches) this.snav.open();
      else if(this.snav.opened) this.snav.close();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if(!this.mobileQuery.matches) this.snav.open();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changeLang(lang: string) {
    this.i18n.use(lang);
  }
}