
import $ from 'jquery';
var accessToken='';
var exprireTime='';
const clientId='227a1a66687c4067bcdfdfb18421fa2e';
const redirectURI ='http://localhost:3000/';

var Spotify={};
    Spotify.getAccessToken=function(){
        

       if((accessToken != '')&&(accessToken!=null)){
           console.log('returnin access token first if');
           return;
       }else{
        console.log('reached here');
        var currUrl = window.location.href;
        console.log('acces token inside getaccesstoken:' + currUrl);
        //accessToken = '';
       // exprireTime = '';
        console.log('acces token inside getaccesstoken:' + accessToken);
        accessToken = currUrl.match(/access_token=([^&]*)/);
        exprireTime=currUrl.match(/expires_in=([^&]*)/); 
        console.log('expire time:' + exprireTime); 
        if((accessToken != null)&&(accessToken !='') && (exprireTime != null)){
            console.log('inside window setTimeout');
            window.setTimeout(() => accessToken = '', exprireTime[1] * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        if((accessToken == null) || (accessToken == '')){
            window.location = 'https://accounts.spotify.com/authorize?client_id='+ clientId +'&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI;
            //accessToken = currUrl.match(/access_token=([^&]*)/);
            console.log('inside authorization');
            //exprireTime=currUrl.match(/expires_in=([^&]*)/); 
        }
        /*var aT = String(accessToken).split(",");
        console.log('the reduces accesstoken:' + aT);
        accessToken =aT;*/
        
        //return accessToken[1];
       }
   };

   Spotify.search=function(value){
       
    console.log('access token:'+accessToken);
       console.log('value:' + value);
       if((accessToken ==null)||(accessToken== '')){
          Spotify.getAccessToken();
       }
       console.log('access token:'+accessToken[1]);

      /* $.ajax({
           url:'https://api.spotify.com/v1/search?type=track&q='+value,
           headers: { 
            
            Authorization: `Bearer  ${accessToken[1]}`}

        },
        function(response){
            var data = JSON.parse(response);
            
            var track_item =data.tracks.items;
            var track = track_item.map((item)=>{
                var t1 ={};
                
                t1.name = item.name;
                t1.artist = item["artists"].name;
                t1.album = item["album"].name;
                t1.id = item.id; 
                //t1.uri = item.uri;
                console.log("each item: "+t1.name);
                return t1;
           });
           return track;
        })*/
      fetch('https://api.spotify.com/v1/search?type=track&q='+value,{
          headers: { 
              
              Authorization: `Bearer ${accessToken[1]}`}

          }).then (response =>{
              if(response.ok){
                   response.json().then(data=>{
                    var track_item =data.tracks.items;
                    console.log('data:' + data.tracks);
                    console.log('track_item list:'+track_item);
                    var track = track_item.map((item)=>{
                        //console.log('spotify search response:'+item);
                        var t1 ={};
                         
                         t1.name = item.name;
                         var art = item["album"].artists;
                         t1.artist = art[0].name;
                         t1.album = item["album"].name;
                         t1.id = item.id; 
                         //t1.uri = item.uri;
                         
                         console.log("each item: "+t1.id);
                         return t1;
                    });
                    console.log('track after mapping:'+track.length);
                    this.setState({searchResults: track});
                    //return track; 
                  })
              }
              else{
                console.log('Network request for '+value + 'failed'+ response.status+':'+ response.statusText);
              }
            })
            
               
              
          

          
      
   };

   Spotify.savePlaylist=function(name,listOfUri){
       if((name == '')||(listOfUri == '')){
           return;
       }else{
           var accessTkn = accessToken;
           var userId = '';
           var playlistId = '';
           var hdr = {
            Authorization: `Bearer ${accessTkn}`} ;
           fetch('https://api.spotify.com/v1/me',{
               headers: hdr}
            ).then(response =>{
                if(response.ok){
                    return response.json();
                }
            }).then (jsonResonse =>{
                userId = jsonResonse.id;
            }) 
           
        fetch('https://api.spotify.com/v1/users/{user_id}/playlists',{
            headers:{
                Authorization: `Bearer ${accessTkn}`,
                'Content-Type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({name})
        }).then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then(jsonResponse =>{
            playlistId = jsonResponse.id;
        })
       var url1 = 'https://api.spotify.com/v1/users/{userId}/playlists/{playlistId}/tracks'
       fetch(url1,{
           headers:{
               Authorization: `Bearer ${accessTkn}`,
               'Content-Type': 'application/json'
           },
           method:'POST',
           body: JSON.stringify({listOfUri})

       })

    }

       };
   




export default Spotify;
