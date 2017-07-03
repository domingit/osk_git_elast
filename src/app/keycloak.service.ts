import {Injectable} from "@angular/core";
//import * as Keycloak from 'keycloak-js';
declare var Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: any = {};

    /**
     * Método de inicialização da segurança.
     * Inicializa o timer para atualização do token
     */
    static init(): Promise<any> {
        let keycloak = Keycloak({
  "realm": "orange",
  "realm-public-key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj2qlvZb2w9wLP80nCXgy0XD0E3ZI6Db4IHmW8DdzjfJDwUWy1OE/gzTc8HVo3nQOixQHfwcFlb9sowJe1dbzQhylCJPTHiKbds/h3KdjHlPjCGg2a542h1wEM75FcSOSUbd62GKKjdgyn/sN+blJQl2FYi6BbCAFth0lTScabJ+YMbp+TlQC9/XKIdTiiOvQzZc+RwEkvTUecWDLuj++t3CcUFDEcwpGon316FI5z7StKuVXH2IYraidTErF1Zizwq6aUDlz4MHJ5UqRg3FevNkNoYsqVOXaLTKgcXZhPo9TpVmOWTLIeMFoNNN922y6cV+Z546hgbIZlVAdCZKkcQIDAQAB",
  "auth-server-url": "https://idp.orange.sk/auth",
  "ssl-required": "external",
  "resource": "elastika",
  "public-client": true
});
        KeycloakService.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            keycloak.init({ onLoad: 'login-required' })
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloak;
                    KeycloakService.auth.logoutUrl = keycloak.authServerUrl + "/realms/TRE/protocol/openid-connect/logout?redirect_uri=http://localhost:4200";

                    // refresh login
                    setInterval(function () {

                        keycloak.updateToken(70).success(function (refreshed) {
                            if (refreshed) {
                                console.log('Token refreshed');
                            } else {
                                console.log('Token not refreshed, valid for '
                                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                            }
                        }).error(function () {
                            console.error('Failed to refresh token');
                        });

                    }, 60000);

                    console.log("Loading...");

                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }

    login(): Promise<any> {
        let keycloak = Keycloak({
  "realm": "orange",
  "realm-public-key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj2qlvZb2w9wLP80nCXgy0XD0E3ZI6Db4IHmW8DdzjfJDwUWy1OE/gzTc8HVo3nQOixQHfwcFlb9sowJe1dbzQhylCJPTHiKbds/h3KdjHlPjCGg2a542h1wEM75FcSOSUbd62GKKjdgyn/sN+blJQl2FYi6BbCAFth0lTScabJ+YMbp+TlQC9/XKIdTiiOvQzZc+RwEkvTUecWDLuj++t3CcUFDEcwpGon316FI5z7StKuVXH2IYraidTErF1Zizwq6aUDlz4MHJ5UqRg3FevNkNoYsqVOXaLTKgcXZhPo9TpVmOWTLIeMFoNNN922y6cV+Z546hgbIZlVAdCZKkcQIDAQAB",
  "auth-server-url": "https://idp.orange.sk/auth",
  "ssl-required": "external",
  "resource": "elastika",
  "public-client": true
});
        KeycloakService.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            keycloak.init({ onLoad: 'login-required' })
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloak;
                    KeycloakService.auth.logoutUrl = keycloak.authServerUrl + "/realms/TRE/protocol/openid-connect/logout?redirect_uri=http://localhost:4200";

                    // refresh login
                    setInterval(function () {

                        keycloak.updateToken(70).success(function (refreshed) {
                            if (refreshed) {
                                console.log('Token refreshed');
                            } else {
                                console.log('Token not refreshed, valid for '
                                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                            }
                        }).error(function () {
                            console.error('Failed to refresh token');
                        });

                    }, 60000);

                    console.log("Loading...");

                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }

    /**
     * Método de logout
     */
    logout() {
        console.log('*** LOGOUT');
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;

        window.location.href = KeycloakService.auth.logoutUrl;
    }

    /**
     * Captura o token
     */
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

    /**
     * Retorna as informações do usuário
     */
    getLoadUserInfo() {
        KeycloakService.auth.authz.loadUserInfo().success(function (userInfo) {
            console.log(userInfo);
        }).error(function () {
            console.log('Failed to load user info');
        })
    }

    /**
     * Verifica se o usuário possui a regra informada.
     * @param role Regra a pesquisar
     */
    getHasResourceRole(role: string) {
        console.log(KeycloakService.auth.authz.hasResourceRole(role, 'spring-boot'));
    }
}




















/*export class KeycloakService {
    static auth: any = {};

    static init(): Promise<any> {
    let keycloakAuth: any = new Keycloak('keycloak.json');
    KeycloakService.auth.loggedIn = false;
        return new Promise((resolve, reject) => {
            keycloakAuth.init({onLoad: 'login-required', checkLoginIframe: false})
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloakAuth;
                    KeycloakService.auth.logoutUrl = "https://localhost/elastika/app/index.html"
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
}*/