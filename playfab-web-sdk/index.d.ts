/// <reference path="src/Typings/PlayFab/PlayFabAdminApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabClientApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabMatchmakerApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabServerApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabAuthenticationApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabCloudScriptApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabDataApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabEventsApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabExperimentationApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabInsightsApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabGroupsApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabLocalizationApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabMultiplayerApi.d.ts" />
/// <reference path="src/Typings/PlayFab/PlayFabProfilesApi.d.ts" />

export module PlayFabModule {
    export interface ISettings {
        titleId: string;
        developerSecretKey: string;
        GlobalHeaderInjection?: { [key: string]: string };
        advertisingIdType: string;
        advertisingIdValue: string;
        disableAdvertising: boolean;
        AD_TYPE_IDFA: string;
        AD_TYPE_ANDROID_ID: string;
        productionServerUrl: string;
    }
    export interface IPlayFabRequestCommon { }
    export interface IPlayFabError {
        code: number;
        status: string;
        error: string;
        errorCode: number;
        errorMessage: string;
        errorDetails?: { [key: string]: string[] };
        request?: any;
        customData?: any;
    }
    export interface SuccessContainer<TResult extends IPlayFabResultCommon> extends IPlayFabError {
        data: TResult;
    }
    export interface IPlayFabResultCommon extends IPlayFabError { }

    export interface ApiCallback<TResult extends IPlayFabResultCommon> { (result: SuccessContainer<TResult>, error: IPlayFabError): void }
}

export const PlayFab: {
    buildIdentifier: string;
    sdkVersion: string;
    GenerateErrorReport(error: PlayFabModule.IPlayFabError): string;
    settings: PlayFabModule.ISettings;
    AdminApi: PlayFabAdminModule.IPlayFabAdmin;
    ClientApi: PlayFabClientModule.IPlayFabClient;
    MatchmakerApi: PlayFabMatchmakerModule.IPlayFabMatchmaker;
    ServerApi: PlayFabServerModule.IPlayFabServer;
    AuthenticationApi: PlayFabAuthenticationModule.IPlayFabAuthentication;
    CloudScriptApi: PlayFabCloudScriptModule.IPlayFabCloudScript;
    DataApi: PlayFabDataModule.IPlayFabData;
    EventsApi: PlayFabEventsModule.IPlayFabEvents;
    ExperimentationApi: PlayFabExperimentationModule.IPlayFabExperimentation;
    InsightsApi: PlayFabInsightsModule.IPlayFabInsights;
    GroupsApi: PlayFabGroupsModule.IPlayFabGroups;
    LocalizationApi: PlayFabLocalizationModule.IPlayFabLocalization;
    MultiplayerApi: PlayFabMultiplayerModule.IPlayFabMultiplayer;
    ProfilesApi: PlayFabProfilesModule.IPlayFabProfiles;

};
// Continue to support older usage
export const PlayFabAdminSDK: PlayFabAdminModule.IPlayFabAdmin;
export const PlayFabClientSDK: PlayFabClientModule.IPlayFabClient;
export const PlayFabMatchmakerSDK: PlayFabMatchmakerModule.IPlayFabMatchmaker;
export const PlayFabServerSDK: PlayFabServerModule.IPlayFabServer;
export const PlayFabAuthenticationSDK: PlayFabAuthenticationModule.IPlayFabAuthentication;
export const PlayFabCloudScriptSDK: PlayFabCloudScriptModule.IPlayFabCloudScript;
export const PlayFabDataSDK: PlayFabDataModule.IPlayFabData;
export const PlayFabEventsSDK: PlayFabEventsModule.IPlayFabEvents;
export const PlayFabExperimentationSDK: PlayFabExperimentationModule.IPlayFabExperimentation;
export const PlayFabInsightsSDK: PlayFabInsightsModule.IPlayFabInsights;
export const PlayFabGroupsSDK: PlayFabGroupsModule.IPlayFabGroups;
export const PlayFabLocalizationSDK: PlayFabLocalizationModule.IPlayFabLocalization;
export const PlayFabMultiplayerSDK: PlayFabMultiplayerModule.IPlayFabMultiplayer;
export const PlayFabProfilesSDK: PlayFabProfilesModule.IPlayFabProfiles;


