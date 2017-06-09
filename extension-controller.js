var app = angular.module('extensionApp', []);

app.controller('extensionController', function ( $scope, $http ) {
    /**
     * URL base de um video do youtube
     */
    $scope.YOUTUBE_VIDEO_LINK = "https://www.youtube.com/watch";
    /**
     * URL da api do youtubeInMp3
     */
    $scope.YOUTUBE_IN_MP3_API_LINK = "www.youtubeinmp3.com/fetch/?video=";

    //--------------------------------------------------------------------------
    //  HANDLERS
    //--------------------------------------------------------------------------

    /**
     * Função de download do video do youtube
     */
    $scope.onDownloadClick = function () {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            
            //Verificamos se a url atual contem o link base de uma URL de video do YOUTUBE
            if ( url && url.includes( $scope.YOUTUBE_VIDEO_LINK ) ) 
            {
                // Está em uma URL válida de video.
                var downloadUrl = getDownloadUrl( url );
                chrome.downloads.download({ url: downloadUrl }, function success ( data ) {
                    console.log( 'Sucesso:', data );
                    Materialize.toast('Download iniciado...');
                })
            }
            else
            {
                Materialize.toast('Essa URL não é uma URL de video do Youtube.');
            }

        });
    }

    /**
     * @param  URL atual
     * @return URL no formato que a API de video do YoutubeInMp3 espera.
     */
    function getDownloadUrl( currentUrl )
    {
        var downloadUrl = 'https://' + $scope.YOUTUBE_IN_MP3_API_LINK + currentUrl;

        return downloadUrl;
    }


});