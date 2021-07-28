import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PlayfabService } from '../../../shared/playfab.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  roles = [
      { id: "0", name: 'Estudiante' },
      { id: "1", name: 'Docente' }
  ];

  roleValue = 0;
  genreValue = 0;
  // user!: User;

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: PlayfabService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: string) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage(): string {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit(): void {
    // this.user = new User();

    this.userService.getPlayerData(this.data, (roleValue, genreValue) => {
      console.log(roleValue);
      this.roleValue = roleValue;
      this.genreValue = genreValue;
    });
  }

  save(): void {
    // this.user.name = this.name.value;

    // if (!this.user.name) {
    //   this.openSnackBar('You must enter a name', 'Ok');
    //   return;
    // }

    // this.userService.addUser(this.user).then(user => {
    //   this.dialogRef.close(user);
    // });
    console.log(this.roleValue);
    this.userService.updatePlayerData(this.data, this.roleValue, (version) => {
      this.openSnackBar('Success: Role changed', 'Ok');
      this.dialogRef.close();
    });
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
