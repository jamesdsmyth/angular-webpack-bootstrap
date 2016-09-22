// importing the stylesheet and using Webpack as a bundler to create a bundle.js
require('./styles/style.scss');

// importing the dependancies
import angular from 'angular'
import { filter } from 'angular-filter'
import apiController from './controllers/apiController.js'
import apiFactory from './services/apiFactory.js'

const app = angular.module('github-api-app', ['angular.filter']);

app.controller('apiController', apiController)
    .service('apiFactory', apiFactory);
