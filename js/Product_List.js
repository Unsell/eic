
$(function(){
	
	$('.tab-content').css('min-height', window.innerHeight-50-41);
	
	
	// 打开关闭二维码
	$('.box-table-product').on('click', '.QR-code', function(){
		var src = $(this).attr('src');
		$('.popup-QRcode').show();
		$('.box-QRcode').delay(10000).addClass('in').show().find('img').attr('src', src);
		
	});
	$('.close-popup').click(function(){
		$('.popup-QRcode').hide();
	})
	
})











