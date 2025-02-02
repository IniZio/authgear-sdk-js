import {
  SessionStateChangeReason,
  ColorScheme,
  PromptOption,
  type UserInfo,
} from "@authgear/core";
import { CapacitorContainer } from ".";

/**
 * @public
 */
export interface CapacitorContainerDelegate {
  /**
   * This callback will be called when the session state is changed.
   *
   * For example, when the user logs out, the new state is "NO_SESSION"
   * and the reason is "LOGOUT".
   *
   * @public
   */
  onSessionStateChange: (
    container: CapacitorContainer,
    reason: SessionStateChangeReason
  ) => void;
}

/**
 * Auth UI authorization options
 *
 * @public
 */
export interface AuthenticateOptions {
  /**
   * The value should be a valid Redirect URI to which the response will be sent after authentication.
   * You must also add a Redirect URI in Authgear Poral via the Redirect URI section of your Authgear Application.
   */
  redirectURI: string;
  /**
   * OIDC prompt parameter.
   *
   * Prompt parameter will be used for Authgear authorization, it will also be forwarded to the underlying SSO providers.
   *
   * For Authgear, currently, only login is supported. Other unsupported values will be ignored.
   *
   * For the underlying SSO providers, some providers only support a single value rather than a list.
   * The first supported value will be used for that case.
   * e.g. Azure Active Directory
   *
   */
  prompt?: PromptOption[] | PromptOption;
  /**
   * OIDC login hint parameter
   */
  loginHint?: string;
  /**
   * UI locale tags. You can use this parameter to set the display language for Auth UI.
   *
   * First, enable the language you want to change to in Authgear Portal (Your project \> UI Settings \> click on the settings icon beside Language.)
   *
   * For example, to change the language for Auth UI to Hong Kong,
   * set the value for uiLocales to ["zh-HK"] after enabling "Chinese (Hong Kong)" in Authgear Portal.
   */
  uiLocales?: string[];

  /**
   * Override the color scheme
   */
  colorScheme?: ColorScheme;

  /**
   * OAuth response type
   */
  responseType?: "code" | "none";

  /**
   * @internal
   * Platform is provided by the sdk
   */
  platform?: string;
  /**
   * Initial page to open. Valid values are 'login' and 'signup'.
   */
  page?: string;
  /**
   * Auto-redirect the user to the OAuth provider. You can set the value for each OAuth provider in Authgear portal via
   * Authentication \> Social / Enterprise Login.
   *
   * For example, to auto-redirect your users to sign in with Google, first, set the alias for Sign in with Google to "google" in Authgear portal,
   * then set oauthProviderAlias to "google".
   */
  oauthProviderAlias?: string;
}

/**
 * Options for reauthentication
 * @public
 */
export interface ReauthenticateOptions {
  /**
   * The value should be a valid Redirect URI to which the response will be sent after authentication.
   * You must also add a Redirect URI in Authgear Poral via the Redirect URI section of your Authgear Application.
   */
  redirectURI: string;
  /**
   * UI locale tags. You can use this parameter to set the display language for Auth UI.
   *
   * First, enable the language you want to change to in Authgear Portal (Your project \> UI Settings \> click on the settings icon beside Language.)
   *
   * For example, to change the language for Auth UI to Hong Kong,
   * set the value for uiLocales to ["zh-HK"] after enabling "Chinese (Hong Kong)" in Authgear Portal.
   */
  uiLocales?: string[];

  /**
   * Override the color scheme
   */
  colorScheme?: ColorScheme;

  /**
   * @internal
   * Platform is provided by the sdk
   */
  platform?: string;

  /**
   * OIDC max_age
   */
  maxAge?: number;
}

/**
 * Result of authorization.
 *
 * @public
 */
export interface AuthenticateResult {
  /**
   * UserInfo.
   */
  userInfo: UserInfo;
}

/**
 * Result of reauthentication
 *
 * @public
 */
export interface ReauthenticateResult {
  /**
   * UserInfo.
   */
  userInfo: UserInfo;
}

/**
 * @public
 */
export interface SettingOptions {
  /**
   * UI locale tags. You can use this parameter to set the display language for Auth UI.
   *
   * First, enable the language you want to change to in Authgear Portal (Your project \> UI Settings \> click on the settings icon beside Language.)
   *
   * For example, to change the language for Auth UI to Hong Kong,
   * set the value for uiLocales to ["zh-HK"] after enabling "Chinese (Hong Kong)" in Authgear Portal.
   */
  uiLocales?: string[];
  /**
   * Override the color scheme
   */
  colorScheme?: ColorScheme;
}

/**
 * BiometricLAPolicy configures iOS specific behavior.
 * It must be consistent with BiometricAccessConstraintIOS.
 *
 * @public
 */
export enum BiometricLAPolicy {
  /**
   * The biometric prompt only prompts for biometric. No fallback to device passcode.
   *
   * See https://developer.apple.com/documentation/localauthentication/lapolicy/deviceownerauthenticationwithbiometrics
   *
   * @public
   */
  deviceOwnerAuthenticationWithBiometrics = "deviceOwnerAuthenticationWithBiometrics",
  /**
   * The biometric prompt prompts for biometric first, and then fallback to device passcode.
   *
   * See https://developer.apple.com/documentation/localauthentication/lapolicy/deviceownerauthentication
   *
   * @public
   */
  deviceOwnerAuthentication = "deviceOwnerAuthentication",
}

/**
 * BiometricAccessConstraintIOS configures iOS specific behavior.
 * It must be consistent with BiometricLAPolicy.
 *
 * @public
 */
export enum BiometricAccessConstraintIOS {
  /**
   * The user does not need to set up biometric again when a new finger or face is added or removed.
   *
   * See https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/2937191-biometryany
   *
   * @public
   */
  BiometricAny = "biometryAny",
  /**
   * The user needs to set up biometric again when a new finger or face is added or removed.
   *
   * See https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/2937192-biometrycurrentset
   *
   * @public
   */
  BiometryCurrentSet = "biometryCurrentSet",
  /**
   * The user can either use biometric or device code to authenticate.
   *
   * See https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/1392879-userpresence
   *
   * @public
   */
  UserPresence = "userPresence",
}

/**
 * iOS specific options for biometric authentication.
 *
 * @public
 */
export interface BiometricOptionsIOS {
  /**
   * See https://developer.apple.com/documentation/localauthentication/lacontext/1514176-evaluatepolicy#parameters
   *
   * @public
   */
  localizedReason: string;
  constraint: BiometricAccessConstraintIOS;
  policy: BiometricLAPolicy;
}

/**
 * See https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators
 *
 * @public
 */
export enum BiometricAccessConstraintAndroid {
  /**
   * The user can use Class 3 biometric to authenticate.
   *
   * See https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators#BIOMETRIC_STRONG()
   *
   * @public
   */
  BiometricStrong = "BIOMETRIC_STRONG",
  /**
   * The user can either use biometric or device code to authenticate.
   *
   * See https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators#DEVICE_CREDENTIAL()
   *
   * @public
   */
  DeviceCredential = "DEVICE_CREDENTIAL",
}

/**
 * Android specific options for biometric authentication.
 *
 * @public
 */
export interface BiometricOptionsAndroid {
  /**
   * See https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo#getTitle()
   *
   * @public
   */
  title: string;
  /**
   * See https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo#getSubtitle()
   *
   * @public
   */
  subtitle: string;
  /**
   * See https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo#getDescription()
   *
   * @public
   */
  description: string;
  /**
   * https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo#getNegativeButtonText()
   *
   * @public
   */
  negativeButtonText: string;
  constraint: BiometricAccessConstraintAndroid[];
  /**
   * The user needs to set up biometric again when a new biometric is enrolled or all enrolled biometrics are removed.
   *
   * See https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec#isInvalidatedByBiometricEnrollment()
   *
   * @public
   */
  invalidatedByBiometricEnrollment: boolean;
}

/**
 * BiometricOptions is options for biometric authentication.
 *
 * @public
 */
export interface BiometricOptions {
  ios: BiometricOptionsIOS;
  android: BiometricOptionsAndroid;
}

/**
 * @internal
 */
export interface BiometricPrivateKeyOptions extends BiometricOptions {
  kid: string;
  payload: {
    iat: number;
    exp: number;
    challenge: string;
    action: string;
    device_info: unknown;
  };
}
