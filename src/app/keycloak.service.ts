import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Promise<any> {
    //let keycloakAuth: any = new Keycloak('keycloak.json');
    let keycloakAuth: any = new Keycloak('assets/keycloak.json');
    KeycloakService.auth.loggedIn = false;

      return new Promise((resolve, reject) => {
        //keycloakAuth.init({ onLoad: 'login-required' })

        keycloakAuth.onAuthSuccess = function () {
        console.log('*** AUTH SUCCESS');
        };

        keycloakAuth.onAuthError = function (errorData) {
            console.log('*** AUTH ERROR');
        };

        keycloakAuth.onAuthRefreshSuccess = function () {
          console.log('*** AUTH REFRESH SUCCESS');
        };

        keycloakAuth.onAuthRefreshError = function () {
            console.log('*** AUTH REFRESH ERROR');
        };

        keycloakAuth.onAuthLogout = function () {
            console.log('*** LOGOUT');
        };

        keycloakAuth.onTokenExpired = function () {
            console.log('*** TOKEN EXPIRED');
        };

        keycloakAuth.init({ responseMode: 'fragment',
                            flow: 'standard',
                            onLoad: 'login-required' })
          .success(() => {
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = "localhost:4444";// "/realms/demo/protocol/openid-connect/logout?redirect_uri=/angular2-product/index.html";
            resolve();
          })
          .error(() => {
            reject();
          });
      });
    }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }

  signOut(logOutUrl) {
    console.log('*** signOut');
    KeycloakService.auth.authz.logout(logOutUrl);
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    //window.location.href = KeycloakService.auth.logoutUrl;
  }

  getUserInfo() {
    //console.log('*** getUserInfo');
    return KeycloakService.auth;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }
}