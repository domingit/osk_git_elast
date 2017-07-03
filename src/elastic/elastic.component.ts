import { Component, Input, OnInit } from '@angular/core';
import elasticsearch from 'elasticsearch';
//var elasticsearch = require('elasticsearch');


export class ElasticComponent implements OnInit {

    public ES_uri: 'https://localhost';
    //IDP URI for getting info about account
    public account_url: 'https://idp.orange.sk/auth/realms/orange/account/?referrer=elastika';

    //URI for stabilization logout proces. otherwise application is trying to login again, because id is in URL
    public logout_redirect_uri: 'https://localhost/elastika/app/index.html';

    private _client: elasticsearch.ClientInterface

    constructor() {
    this._client = elasticsearch.Client(
      {
        host: this.ES_uri,
        maxRetries: 0,
        requestTimeout: 5000,
        apiVersion: '2.0' //, log: 'trace'
    }
    );
  }

    ngOnInit() {
  }
}
