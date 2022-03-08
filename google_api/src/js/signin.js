function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function onSignIn(googleUser) {

    let profile = googleUser.getBasicProfile();
    
    auth("login", profile);

}

function auth(action, profile = null) {
    gapi.load('auth2', function() {

        /* more proccess */
        let data = { userAction: action }
        if (profile) {
            data =
            {
                UserName: profile.getGivenName(),
                UserLastName: profile.getFamilyName(),
                UserEmail: profile.getEmail(),
                userAction: action

            };
        }
        fetch('http://localhost/google_api/php/login.php',{
            method: 'POST',
            body: JSON.stringify(data),
        }).then(rep => rep.json()).then(data =>{
            gapi.auth2.init({
                client_id: '535784351769-0h40j77tseej1p22reu49nvhbm9pjt1q.apps.googleusercontent.com'
            })
            if (data.logged) 
            {
                
                $('#user_given_name').text(profile.getGivenName());
                $('#user_last_name').text(profile.getFamilyName());
                $('#user_email').text(profile.getEmail());
                $('#imageProfile').attr("src", profile.getImageUrl());
                console.log(profile.getImageUrl())
                if (document.URL === "http://localhost/google_api/") {
                    window.location.href = "http://localhost/google_api/profile.html";
                }
            }
            else
            {
                if (data.mesagge) {
                    alert("La cuenta no esta registrada");
                    signOut();
                }
            }
        })
      });
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect()
    auth2.signOut().then(function () {
        console.log('User signed out.');
        auth("logout");
        if (document.URL === "http://localhost/google_api/profile.html") {
            window.location.href = "http://localhost/google_api/";
        }
    });
}



document.addEventListener("DOMContentLoaded",()=>{

    if (! (getCookie('logged')=='1')){
        if (document.URL === "http://localhost/google_api/profile.html") {
            window.location.href = "http://localhost/google_api/";
        }
    }
})