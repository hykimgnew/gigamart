'use strict';		
		// 동영상 재생
        var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();
        document.getElementById('videoSpan').appendChild(videoPlayer);
        videoPlayer.data = "http://14.52.244.91:8080/video/tv/category/4.mp4";
        videoPlayer.width = "600";
        videoPlayer.height = "350";
        videoPlayer.play(1);