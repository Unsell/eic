
$(function(){
	
	var str = '';
	$(document).on('click',function(){
		var valueTime = $('#calendar').val();
		
		if(str!=valueTime){
			valueTime = valueTime.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$3/$2/$1" );
			$('#calendar').val(valueTime);
		}
		
	});
	
	
});
















