// JavaScript Document
/*
* A jQuery extension to provide audio area
* 
* 
* @date 08/23/13
*
* @requires jquery.js
* @require jquery-ui-1.10.3.custom.min.js
* @requires audioBar.css
* @require jquery-ui-1.10.3.custom.min.css
*
*
*/
(function($) {	
	//main function
	$.fn.audioBar = function() {
		var $audioBar = $(this);
		$audioBar.addClass('audio');
		
		//播放、暫停 BTN
		var $playBtn = $('<div class="play icon"></div>');
		$audioBar.append($playBtn);
		
		//音量區域
		var $rightArea = $('<div id="rightArea"></div>');
		var $volume = $('<div class="volume on"></div><div id="slider"><div id="volume"><div id="volumeBar"></div></div></div>');		
		$rightArea.append($volume);
		$audioBar.append($rightArea);
		
		//source file
		var $audio = $('<audio preload="auto" loop></audio>');
		var $source = $('<source src="audio/SleepAway.ogg"><source src="audio/SleepAway.mp3">');
		$audio.append($source);
		$audioBar.append($audio);
		
		
		
		var audio = document.getElementsByTagName('audio')[0];

		$(".icon").click(function(){
			if($(this).attr('class').indexOf('play')!=-1){
				audio.play();	
				$(this).removeClass('play');
				$(this).addClass('pause');
			}else{
				audio.pause();	
				$(this).removeClass('pause');
				$(this).addClass('play');	
			}
		});
		
		$(".volume").click(function(){
			var num = 0;
			if($(this).attr('class').indexOf('on')!=-1){
				audio.volume = 0;	
				$(this).removeClass('on');
				$(this).addClass('off');
				$("#volume").val(0);
				$("#volume a").css('left',"0px");				
			}else{
				audio.volume = 0.5;
				$(this).removeClass('off');
				$(this).addClass('on');
				$("#volume").val(0.5);
				$("#volume a").css('left',"60%");
				num = 50;			
			}
			changeVolumeBar(num);			
			$("#volumeBar").width(num);		
		});
		
		$("#volume").slider({
			min: 0,
			max: 100,
			value: 100,
			slide: function( event, ui ) {
			 $( "#volumeBar" ).width( ui.value );
			 changeVolumeBar(ui.value);
			}
		});
		
	
		 $("#volumeBar").width( $("#volume").slider("value"));
		 
		 function changeVolumeBar(num){
	
			var audio = document.getElementsByTagName('audio')[0];
		
			if(num!=0){		
				audio.volume = num/100;
				$(".volume").removeClass('off');
				$(".volume").addClass('on');		
			}else{
				audio.volume = 0;
				$(".volume").removeClass('on');
				$(".volume").addClass('off');
			}
		}
	}
})(jQuery);