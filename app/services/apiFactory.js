export default class apiFactory {

    constructor ($http) {
        this.http = $http;
        this.githubUrl = 'https://api.github.com';
    }

    // user get request will repond with the user data
    getUser (username) {
        return this.http.get(this.githubUrl + '/users/' + username);
    }

    // gist get request will repond with the gist data
    getGist (username) {
        return this.http.get(this.githubUrl + '/users/' + username + '/gists');
    }

    // gist fork get request will repond with the forked data
    getGistForks (gistId) {
        return this.http.get(this.githubUrl + '/gists/' + gistId + '/forks');
    }
}
