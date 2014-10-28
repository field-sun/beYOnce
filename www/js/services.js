angular.module('starter.services', [])
.factory('Cards', function ($http) {
  // Your code here
  /* START SOLUTION */
  var getAll = function (id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/cards/new?id=' + id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getMatches = function(id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/cards/matched?id=' + id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getCompanies = function() {
    return $http({
      method: 'GET',
      url: 'https://still-fjord-2818.herokuapp.com/api/companies'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getUsers = function() {
    return $http({
      method: 'GET',
      url: 'https://still-fjord-2818.herokuapp.com/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    getMatches: getMatches,
    getCompanies: getCompanies,
    getUsers: getUsers
  }

})

.factory('Profile', function ($http) {

var storeProfile = function(profile_object, auth_token) {
    var exists = true;
    var li_id = profile_object.user_id;
    var loc = profile_object.location.name;
    var skills = profile_object.skills;
    var edu = profile_object.educations; 
    $http({
      method: 'GET',
      url: 'https://still-fjord-2818.herokuapp.com/api/user?name=' + li_id
    })
    .then(function (resp) {
      
      if (resp.data.length === 0) {
        var school = edu.values[0];
        var education = school.schoolName
        + ": " + school.degree
        + ": " + school.fieldOfStudy;
        var languages = "JavaScript, C#, PHP"; //JSON.stringify(skills.values;
        var data = {
          name: li_id,
          location: loc,
          education: education,
          languages: languages,
          linkedin: li_id,
          github: 'berp',
          auth: "stupidauthtoken"//auth_token
        };

        $http({
          method: 'POST',
          url: 'https://still-fjord-2818.herokuapp.com/api/user',
          dataType: 'application/x-www-form-urlencoded',
          // transformRequest: function(obj) {
          //     var str = [];
          //     for(var p in obj)
          //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          //     return str.join("&");
          // },
          data: JSON.stringify(data)
        })
        .then(function (resp) {
          console.log('user inserted', resp.data);
          return resp.data;
        })
        .catch(function (err) {
          exists = false;
          console.log("things sploded:", err);
          return err;
        });
      } else {
        console.log('user exists');
      }
    });
    return exists;
}

  return {
    storeProfile: storeProfile //function(a,b) { }
  }
});