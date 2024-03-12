import { credentials } from "./credentials";

const webApiParameter = `?key=${credentials.webApiKey}`;

export const environment = {
    production: false,
    webApiUserUpdateUrl: `${credentials.webApiUserStorageUrl}:update${webApiParameter}`,
    webApiUserSignupUrl: `${credentials.webApiUserStorageUrl}:signUp${webApiParameter}`,
    webApiUserLoginUrl:  `${credentials.webApiUserStorageUrl}:signInWithPassword${webApiParameter}`,
    getWebApiDataStorageUrl: (userId: string): string =>
        `${credentials.webApiDataStorageUrl}/users/${userId}/data.json`,
    getWebApiSettingStorageUrl: (userId: string): string =>
        `${credentials.webApiDataStorageUrl}/users/${userId}/setting.json`,

    passwordMinLength: 6,

    pagePreviewItemsCount: 3,
    pageItemsCount: 6,

    sumMaxValue: 9999999.99,
    enumerationMaxLength: 22,
    descriptionMaxLength: 48,
    truncateLength: 20,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
