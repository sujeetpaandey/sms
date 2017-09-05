var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all messages and show them
    $http.get('/api/messages')
        .success(function(data) {
            $scope.messages = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.saveMessage = function() {
        $scope.formData.message = 'Test OTP message';
        $http.post('/api/messages', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.messages = data;
                $scope.getSmsCount();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a message after checking it
    $scope.deleteMessage = function(id) {
        $http.delete('/api/messages/' + id)
            .success(function(data) {
                $scope.messages = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // get remaining sms counts
    $scope.getSmsCount = function() {
        $http.get('/api/counts', {})
            .success(function(data) {
                $scope.smsCounts = data.Details;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // send sample otp sms
    $scope.sendMessage = function() {
        $http.post('api/send/message', $scope.formData)
            .success(function(data) {
                if (data.Status === 'Success') {
                    $scope.saveMessage();
                    alert('Message sent');
                } else {
                    alert('Message not sent');
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // send promotional sms
    $scope.sendPMSMessage = function() {
        var url = 'http://2factor.in/API/V1/96cd4ca5-9205-11e7-94da-0200cd936042/ADDON_SERVICES/SEND/PSMS';
        var body = {
            From: 'Sujeet',
            Msg: $scope.formData.message,
            To: $scope.formData.mobile
        };
        $http.post(url, body)
            .success(function(data) {
                if (data.Status === 'Success') {
                    $scope.saveMessage();
                    alert('Test OTP Message sent');
                } else {
                    alert('Message not sent');
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getSmsCount();
}