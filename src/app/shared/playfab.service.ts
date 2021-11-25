import { Injectable } from '@angular/core';
import { } from 'playfab-web-sdk';
import { BehaviorSubject, Observable } from 'rxjs';

declare let PlayFab: any;
declare let PlayFabClientSDK: PlayFabClientModule.IPlayFabClient;
declare let PlayFabAdminSDK: PlayFabAdminModule.IPlayFabAdmin;

// let playerData: any = {};

@Injectable({
  providedIn: 'root'
})
export class PlayfabService {
  public userToken: string | undefined;

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
      this.dataStore.users = result.data.PlayerProfiles;
      this._users.next(Object.assign({}, this.dataStore).users);
    });
  }

  getPlayerData(id: string, callback?: (roleValue: number, genreValue: number) => void): void {
    PlayFab.settings.titleId = '5702E';
    PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    const request: PlayFabAdminModels.GetUserDataRequest = {
      PlayFabId: id,
      Keys: ['Genre', 'Role']
    };

    PlayFabAdminSDK.GetUserData(request, (result) => {

      const pd: any = result.data.Data;
      // if (pd.PlayerData) {
      //   playerData = JSON.parse(pd.PlayerData.Value);
      //   console.log(playerData.inventoryManagerData.items[0].mutableProperties[1].value.m_ValueType.longValue);

      //   if (callback) {
      //     callback(playerData.inventoryManagerData.items[0].mutableProperties[1].value.m_ValueType.longValue);
      //   }
      // }
      if (pd.Role) {
        if (callback) {
          callback(pd.Role.Value, pd.Genre?.Value);
        }
      }
    });
  }

  updatePlayerData(id: string, roleValue: number, callback?: (version: number) => void): void {
    PlayFab.settings.titleId = '5702E';
    PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    // playerData.inventoryManagerData.items[0].mutableProperties[1].value.m_ValueType.longValue = roleValue;

    const request: PlayFabAdminModels.UpdateUserDataRequest = {
      PlayFabId: id,
      Data: {Role: roleValue.toString()} // JSON.stringify(playerData)
    };

    PlayFabAdminSDK.UpdateUserData(request, (result) => {
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
    loginCallback?: (result: PlayFabClientModels.LoginResult) => any,
    errorCallback?: (error: PlayFabModule.IPlayFabError) => any): void {
    PlayFab.settings.titleId = '5702E';
    // PlayFab.settings.developerSecretKey = '1YU3GNBGN6AA9KRQNXU84RPJY8GBP3FT3TP7TH1AISEB5GS8TI';

    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, (result, error) => {
      if (result) {
        this.userToken = result.data.EntityToken?.EntityToken;

        if (loginCallback) {
          loginCallback(result.data);
        }
      }
      else if (error) {
        if (errorCallback) {
          errorCallback(error);
        }
      }
    });
  }

  logout(): void {
    this.userToken = undefined;
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
