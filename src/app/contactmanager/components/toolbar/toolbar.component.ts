import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';
import { PlayfabService } from '../../../shared/playfab.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private playfab: PlayfabService) { }

  ngOnInit(): void {
  }

  openAddContactDialog(): void {
    // this.dialog.open(NewContactDialogComponent, {
    //   width: '450px'
    // });
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar('Contact added', 'Navigate')
          .onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  playfabLoginTest(): void {
    // const loginRequest: PlayFabClientModels.LoginWithCustomIDRequest = {
    //     TitleId: '5702E',
    //     CustomId: 'NodeJS hello',
    //     CreateAccount: true
    // };

    // this.playfab.loginWithCustomID(loginRequest);

    const loginRequest: any = {
        TitleId: '5702E',
        Email: 'me31@me.com',
        Password: 'me.com31'
    };

    this.playfab.loginWithEmailAddress(loginRequest);
  }

  getPlayersInSegment(): void {
    this.playfab.getPlayersInSegment();
  }

  getPlayerData(): void {
    this.playfab.getPlayerData('');
  }

  updatePlayerData(): void {
    this.playfab.updatePlayerData('', 1);
  }

  loginCallback(error: null, result: null): void {
    if (result !== null) {
        console.log('Congratulations, you made your first successful API call!');
    } else if (error !== null) {
        console.log('Something went wrong with your first API call.');
        console.log('Here\'s some debug information:');
        console.log(this.compileErrorReport(error));
    }
  }

  compileErrorReport(error: any): string {
    if (error == null) {
        return '';
    }
    let fullErrors = error?.errorMessage;
    for (const paramName in error.errorDetails) {
      if (error.errorDetails[paramName]) {
        for (const msgIdx in error.errorDetails[paramName]) {
          if (error.errorDetails[paramName][msgIdx]) {
            fullErrors += '\n' + paramName + ': ' + error.errorDetails[paramName][msgIdx];
          }
        }
      }
    }
    return fullErrors;
  }
}
