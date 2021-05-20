import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanatizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      sanatizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));
  }

  ngOnInit(): void {
  }

}
