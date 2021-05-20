import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Direction } from '@angular/cdk/bidi';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public isSmallScreen = false;

  users!: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      // Breakpoints.XSmall,
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches;
    });

    this.users = this.userService.users;
    this.userService.loadAll();

    // Same as maincontent
    // this.users.subscribe(data => {
    //   if (data.length > 0) { this.router.navigate(['/contactmanager', data[0].id]); }
    // });

    this.router.events.subscribe(() => {
      if (this.isSmallScreen) {
        this.sidenav.close();
      }
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir(): void {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }
}
