export default class apiController {

    constructor($scope, apiFactory) {

        this.$scope = $scope;
        this.apiFactory = apiFactory;

        // on submit/button submit we call this function which initiates the calls to the api
        $scope.searchUser = () => {

            if(this.$scope.gistAccountInput) {
                this.callUserApiFactory();
            }
        }
    }

    // calling a factory and passing a parameter of the username from the input field.
    // I am using a promise here that responds with either a resolve or reject.
    callUserApiFactory () {

        // returns the result which either resolves or rejects depending if the username is valid
        this.apiFactory.getUser(this.$scope.gistAccountInput).then((result) => {

            // success!
            let data = result.data;

            this.$scope.user = {
                name: data.login,
                avatar: data.avatar_url,
                url: data.html_url
            }

            this.callUserGistApiFactory();

        }, (result) => {
            // resetting the user value and adding an error message
            this.$scope.user = 0;
            this.$scope.errorMessage = result.statusText;
        });
    }

    // if the user exists then this function is called and we can populate the gists or show an error message
    callUserGistApiFactory () {

        // returns the result which either resolves or rejects depending if the username is valid
        this.apiFactory.getGist(this.$scope.gistAccountInput).then((result) => {

            // success!

            this.$scope.errorMessage = null;
            this.$scope.user.gists = result.data;

            // this.filterTags();
            this.callGistForkedApiFactory();

        }, (result) => {
            this.$scope.errorMessage = result.statusText;
            this.$scope.userGists = null;
        });
    }

    // we need to display the forked gists so we needs to make a call for each gist
    // this has been structured to be called AFTER the gists have been recieved and are being displayed.
    // This is additional information and this can be loaded onto the page shortly after the main info is there
    callGistForkedApiFactory () {

        // for loop looping through each gist and passing its ID to the getGistForks factory function
        for(var i = 0; i < this.$scope.user.gists.length; i++) {

            let gist = this.$scope.user.gists[i];

            this.apiFactory.getGistForks(gist.id).then((result) => {

                // success!

                // saving the gist forks array into the user object
                gist.forks = result.data;

            }, (result) => {
                console.log('failed to get the forks', result);
            });
        }
    }
}
