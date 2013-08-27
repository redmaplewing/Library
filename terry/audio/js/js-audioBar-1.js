// JavaScript Document
/*
* A jQuery extension to provide audio area
* 
* 
* @date 08/23/13
*
* @requires jquery.js
* @requires jquery-ui-1.10.3.custom.min.js
* @requires audioBar.css
* @requires jquery-ui-1.10.3.custom.min.css
* @requires media source file (*.ogg, *.mp3)
*
*/
(function($) {	
	//load css files
	var css = jQuery("<link>");
    css.attr({
      rel:  "stylesheet",
      type: "text/css",
      href: "css/audioBar.css"
    });
    $("head").append(css);
	
	css = jQuery("<link>");
    css.attr({
      rel:  "stylesheet",
      type: "text/css",
      href: "js/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.min.css"
    });
    $("head").append(css);
	
	//load javascript files         
    $("<scri"+"pt>"+"</scr"+"ipt>").attr({src:'js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js',type:'text/javascript'}).appendTo($("head"));
    
	
	//main function
	$.fn.audioBar = function(sourceFile) {
		//if(sourceFile!='' && sourceFile!=undefined){
			var $audioBar = $(this);
			$audioBar.addClass('au-audio');
			
			//播放、暫停 BTN
			var $playBtn = $('<div class="au-play au-icon"></div>');
			$audioBar.append($playBtn);
			
			//音量區域
			var $rightArea = $('<div id="au-rightArea"></div>');
			var $volume = $('<div class="au-volume au-on"></div><div id="au-slider"><div id="au-volume"><div id="au-volumeBar"></div></div></div>');		
			$rightArea.append($volume);
			$audioBar.append($rightArea);
			
			//source file
			var $audio = $('<audio preload="auto" loop></audio>');
			var $source = $('<source src="audio/'+sourceFile+'.ogg"><source src="audio/'+sourceFile+'.mp3">');
			$audio.append($source);
			$audioBar.append($audio);
			
			
			
			var audio = document.getElementsByTagName('audio')[0];
			
			//play or pause
			$(".au-icon").click(function(){
				if($(this).attr('class').indexOf('au-play')!=-1){
					audio.play();	
					$(this).removeClass('au-play');
					$(this).addClass('au-pause');
				}else{
					audio.pause();	
					$(this).removeClass('au-pause');
					$(this).addClass('au-play');	
				}
			});
			
			//mute or not
			$(".au-volume").click(function(){
				var num = 0;
				if($(this).attr('class').indexOf('au-on')==-1)
					num = 50;
				changeVolumeBar(num);			
				$("#au-volumeBar").width(num);		
			});
			
			//volume up or down
			$("#au-volume").slider({
				min: 0,
				max: 100,
				value: 100,
				slide: function( event, ui ) {
				 $( "#au-volumeBar" ).width( ui.value );
				 changeVolumeBar(ui.value);
				}
			});
			
		
			 $("#au-volumeBar").width( $("#au-volume").slider("value"));
			 
			 //execute function
			 function changeVolumeBar(num){		
				var audio = document.getElementsByTagName('audio')[0];			
				if(num!=0){		
					audio.volume = num/100;
					$(".au-volume").removeClass('au-off');
					$(".au-volume").addClass('au-on');		
				}else{
					audio.volume = 0;
					$(".au-volume").removeClass('au-on');
					$(".au-volume").addClass('au-off');
				}
			}
		//}
	}
})(jQuery);