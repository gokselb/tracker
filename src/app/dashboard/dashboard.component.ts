import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@tts/models';
import { AuthenticationService } from '@tts/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public currentUser?: Subject<User>;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUser.otherData;
  }

  public logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  ngOnInit(): void {}
}
