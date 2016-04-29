
$(function(){
	if(window.innerWidth*0.15<170){
		$('#main-content').css('margin-left', '170px')
	}
	$(window).resize(function(){
		if(window.innerWidth*0.15>170){
			$('#main-content').css('margin-left', $('#sidebar').width());
		}else{
			$('#main-content').css('margin-left', '170px');
		}
	})
	
	
})









