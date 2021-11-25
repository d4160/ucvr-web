import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayfabService } from '../shared/playfab.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private playfabService: PlayfabService,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginProcess(): void {
    if (this.formGroup.valid) {
      const loginRequest: PlayFabClientModels.LoginWithEmailAddressRequest = {
        TitleId: '5702E',
        Email: this.formGroup.value.email,
        Password: this.formGroup.value.password,
        InfoRequestParameters: {
          GetCharacterInventories: false,
          GetCharacterList: false,
          GetPlayerProfile: true,
          GetPlayerStatistics: false,
          GetTitleData: false,
          GetUserAccountInfo: false,
          GetUserData: true,
          GetUserInventory: false,
          GetUserReadOnlyData: false,
          GetUserVirtualCurrency: false,
          PlayerStatisticNames: undefined,
          ProfileConstraints: undefined,
          TitleDataKeys: undefined,
          UserDataKeys: ['Role'],
          UserReadOnlyDataKeys: undefined
        }
      };

      this.playfabService.loginWithEmailAddress(loginRequest, (result) => {
        console.log(result);
        let role = result.InfoResultPayload?.UserData?.Role?.Value;
        if (role) {
          this.openSnackBar(`Bienvenido ${result.InfoResultPayload?.PlayerProfile?.DisplayName}!`, '');
          // console.log('Success logged as Teacher!');
          setInterval(() => {
            this.router.navigate(['/usermanager']);
          }, 500);
        }
        else {
          this.openSnackBar(`Error: No tiene los permisos para ingresar al sistema...`, 'Ok');
        }
      }, (error) => {
        this.openSnackBar(`Error: Credenciales incorrectos...`, 'Ok');
      });
    }
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}


