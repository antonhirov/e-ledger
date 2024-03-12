import { credentials } from "./credentials";

const webApiParameter = `?key=${credentials.webApiKey}`;

export const environment = {
    production: true,
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
