import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Direction } from '@angular/cdk/bidi';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public isSmallScreen = false;

  isDarkTheme = false;
  dir: Direction = 'ltr';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      // Breakpoints.XSmall,
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches;
    });

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
