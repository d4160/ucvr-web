import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { PlayfabService } from '../../../shared/playfab.service';

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.css']
})
export class ChangeRoleDialogComponent implements OnInit {

  roles = [
      { id: '0', name: 'Estudiante' },
      { id: '1', name: 'Docente' }
  ];

  roleValue = 0;
  genreValue = 0;

  constructor(
    private dialogRef: MatDialogRef<ChangeRoleDialogComponent>,
    private userService: PlayfabService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: string) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage(): string {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit(): void {
    this.userService.getPlayerData(this.data, (roleValue, genreValue) => {
      this.roleValue = roleValue;
      this.genreValue = genreValue;
    });
  }

  save(): void {
    this.userService.updatePlayerData(this.data, this.roleValue, (version) => {
      this.openSnackBar('Rol cambiado correctamente', 'Ok');
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
