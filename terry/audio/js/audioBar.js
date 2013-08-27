// JavaScript Document
$(function(){
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
	
});

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