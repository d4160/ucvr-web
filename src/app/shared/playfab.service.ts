import { Injectable } from '@angular/core';
import { } from 'playfab-web-sdk';
import { BehaviorSubject, Observable } from 'rxjs';

declare let PlayFab: any;
declare let PlayFabClientSDK: PlayFabClientModule.IPlayFabClient;
declare let PlayFabAdminSDK: PlayFabAdminModule.IPlayFabAdmin;

let playerData: any = {};

@Injectable({
  providedIn: 'root'
})
export class PlayfabService {

  // tslint:disable-next-line:variable-name
  private _users!: BehaviorSubject<PlayFabAdminModels.PlayerProfile[] | undefined>;

  private dataStore: {
    users: PlayFabAdminModels.PlayerProfile[] | undefined;
  };

  constructor() {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<PlayFabAdminModels.PlayerProfile[] | undefined>([]);
  }

  get users(): Observable<PlayFabAdminModels.PlayerProfile[] | undefined> {
    return this._users.asObservable();
  }

  getPlayersInSegment(): void {
    PlayFab.settings.titleId = '5702E';
    PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    const request: PlayFabAdminModels.GetPlayersInSegmentRequest = {
      SegmentId: '6E05839798DD526B'
    };

    PlayFabAdminSDK.GetPlayersInSegment(request, (result) => {
      console.log(result.data.PlayerProfiles);
      this.dataStore.users = result.data.PlayerProfiles;
      this._users.next(Object.assign({}, this.dataStore).users);
    });
  }

  getPlayerData(id: string, callback?: (roleValue: number) => void): void {
    PlayFab.settings.titleId = '5702E';
    PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    const request: PlayFabAdminModels.GetUserDataRequest = {
      PlayFabId: id,
      Keys: ['PlayerData']
    };

    PlayFabAdminSDK.GetUserData(request, (result) => {
      console.log(result.data.Data);
      const pd: any = result.data.Data;
      // console.log(pd.PlayerData);
      if (pd.PlayerData) {
        playerData = JSON.parse(pd.PlayerData.Value);
        console.log(playerData.inventoryManagerData.items[0].mutableProperties[1].value.m_ValueType.longValue);

        if (callback) {
          callback(playerData.inventoryManagerData.items[0].mutableProperties[1].value.m_ValueType.longValue);
        }
      }
    });
  }

  updatePlayerData(id: string, roleValue: number, callback?: (version: number) => void): void {
    PlayFab.settings.titleId = '5702E';
    PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    playerData.inventoryManagerData.items[0].mutableProperties[1].value.m_ValueType.longValue = roleValue;

    const request: PlayFabAdminModels.UpdateUserDataRequest = {
      PlayFabId: id,
      Data: {PlayerData: JSON.stringify(playerData)}
    };

    PlayFabAdminSDK.UpdateUserData(request, (result) => {
      console.log(result.data.DataVersion);
      if (callback) {
        callback(result.data.DataVersion);
      }
    });
  }

  loginWithCustomID(
    loginRequest: PlayFabClientModels.LoginWithCustomIDRequest,
    loginCallback?: PlayFabModule.ApiCallback<PlayFabClientModels.LoginResult>): void {
    PlayFab.settings.titleId = '5702E';
    // PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    PlayFabClientSDK.LoginWithCustomID(loginRequest, this.loginCallback);
  }

  loginWithEmailAddress(
    loginRequest: PlayFabClientModels.LoginWithEmailAddressRequest,
    loginCallback?: PlayFabModule.ApiCallback<PlayFabClientModels.LoginResult>): void {
    PlayFab.settings.titleId = '5702E';
    // PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, this.loginCallback);
  }

  loginCallback(result: PlayFabModule.SuccessContainer<PlayFabClientModels.LoginResult>, error: PlayFabModule.IPlayFabError): void {
    if (result !== null) {
        console.log('Congratulations, you made your first successful API call!');
    } else if (error !== null) {
        console.log('Something went wrong with your first API call.');
        console.log('Here\'s some debug information:');
        console.log(this.compileErrorReport(error));
    }
  }

  // This is a utility function we haven't put into the core SDK yet.  Feel free to use it.
  compileErrorReport(error: PlayFabModule.IPlayFabError): string {
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
