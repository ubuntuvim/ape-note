function oschinaLogin() {
    console.log('oschinaLogin');
    var client_id = "v7z5CBAoqIVBClvNcXnj";
    var client_secret = "jPVjqJxvKNwyT28Lue1RNakQQCoDDkfK";
    var redirect_uri = "http://oauth2.ape-note.com/oauth2/oschina";
    // 首先获取code
    // var getCodeUrl = `https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    var getCodeUrl = `${redirect_uri}`;

    $.get(getCodeUrl, function(data,status){
        console.log(data,status);
    });
}
