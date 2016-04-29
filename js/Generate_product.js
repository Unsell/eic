
$(function(){
	
	argument=1;  // 代表有多少个参数  全局变量
	var t1,t2; // 定义两个定时器，用来控制手机预览框的点轮播
	$('.choose-file').change(function(){
		clearTimeout(t2);
		imgTimer();
		
	})
	function imgTimer(){
		t1 = setTimeout(function(){
			// 点轮播
			var inner = $('.carousel-indicators');
			var spotNum = inner.children().length-1;
			var activeItem = inner.find('.active');
			var wrapper = $('.carousel-inner');
			var activeDiv = wrapper.find('.active');
			var slideNumber = activeItem.attr('data-slide-to');
			inner.find('li').removeClass('active');
			wrapper.find('div').removeClass('active');
			if(spotNum!=slideNumber){
				activeItem.next().addClass('active');
				activeDiv.next().addClass('active');
			}else{
				inner.find('li').eq(0).addClass('active');
				wrapper.find('div').eq(0).addClass('active');
			}
			// 图片轮播

			clearTimeout(t1);
			spotCarousel();
		}, 2500)
	}
	function spotCarousel(){  //手机预览框的点轮播
		t2 = setTimeout(function(){
			var inner = $('.carousel-indicators');
			var spotNum = inner.children().length-1;
			var activeItem = inner.find('.active');
			var wrapper = $('.carousel-inner');
			var activeDiv = wrapper.find('.active');
			var slideNumber = activeItem.attr('data-slide-to');
			inner.find('li').removeClass('active');
			wrapper.find('div').removeClass('active');
			if(spotNum!=slideNumber){
				activeItem.next().addClass('active');
				activeDiv.next().addClass('active');
			}else{
				inner.find('li').eq(0).addClass('active');
				wrapper.find('div').eq(0).addClass('active');
			}
			spotCarousel();
		}, 5000)

	}
	// 这个if判断是如果进入的是产品信息修改页，已上传图片的显示
	if($('#image_url1').attr('value')!=''){// 说明一开始有数值，所以不是产品生成页而是产品编辑修改页，若没数值，怎两个页面都是空的
		var fileTbody = $('.files');
		var i =1;
		var str = '';
		for(i; i<5; i++){ // 这里暂时确定最多只能上传4张图片，所以最多有四张
			var strImgUrl = $('#image_url'+i).attr('value');
			var imgName = strImgUrl.substr(34);
			if(strImgUrl!=''){
				str += '<tr class="template-download fade in">'+
						'<td>'+
							'<span class="preview">'+
							'<a href="'+ strImgUrl +'" download="'+ imgName +'" data-gallery=""><img src="'+ strImgUrl +'" width="80px" height="60px"></a>'+
							'</span>'+
						'</td>'+
						'<td>'+
							'<p class="name">'+
								'<a href="'+ strImgUrl +'" title="'+ imgName +'" download="'+ imgName +'" data-gallery="">'+ imgName +'</a>'+
							'</p>'+
						'</td>'+
						'<td>'+
							'<span class="size"></span>'+
						'</td>'+
						'<td>'+
							'<button type="button" class="btn btn-danger delete1 btn-delete" data-type="DELETE" data-url="'+ strImgUrl +'">'+
								'<i class="fa fa-trash-o"></i>'+
								'<span>删除</span>'+
							'</button>'+
							'<input type="checkbox" name="delete" value="1" class="toggle" style="display: none;">'+
						'</td>'+
					'</tr>';
			}else{
				break;
			}
		}
		fileTbody.html(str);
		// 右边手机预览框也要显示图片
		var imgNum = --i;
		//console.log(imgNum);
    	$('#product-img').html('');
    	var str2 = '';
    	var j = 0;
    	str2 += '<ol class="carousel-indicators">'
    	for(j; j<imgNum; j++){
    		if(j==0){
    			str2 += '<li data-target="#carousel-example-generic" data-slide-to="'+j+'" class="active"></li>'
    		}else{
    			str2 += '<li data-target="#carousel-example-generic" data-slide-to="'+j+'" class=""></li>'
    		}
    	}
    	str2 += '</ol>';
    	str2 += '<div class="carousel-inner" role="listbox">';
    	for(j=0; j<imgNum; j++){
    		if(j==0){
    			str2 += '<div class="item active">'+
					      '<img src="'+ fileTbody.find('tr').eq(j).find('td').eq(0).find('span').find('a').find('img').attr('src') +'" alt="...">'+
					    '</div>';
    		}else{
    			str2 += '<div class="item">'+
					      '<img src="'+ fileTbody.find('tr').eq(j).find('td').eq(0).find('span').find('a').find('img').attr('src') +'" alt="...">'+
					    '</div>';
    		}
    	}
    	str2 += '</div>';
    	$('#product-img').html(str2);
		imgTimer();
		
	}
	if($('#extend_value').val()!=''){  // 页面上产品参数值是存储在一个隐藏的input框中的，所以如果有值代表是产品编辑页，所以要显示出来
		var strValue = JSON.parse( $('#extend_value').val() );
		var str = '';
		var j = 1;
		for(var keyVlaue in strValue){
			for (var keyVlaue1 in strValue[keyVlaue]) {
				str += '<li class="list clearfix" id="parameter_'+ j +'">'+
							'<input type="text" class="form-control parameter-name" placeholder="参数" value="'+ keyVlaue1 +'">'+
							'<input type="text" class="form-control parameter-value" placeholder="" value="'+ strValue[keyVlaue][keyVlaue1] +'">'+
							'<div class="parameter-delete" title="删除">'+
								'<span class="fa fa-minus"></span>'+
							'</div>'+
						'</li>';
				j++;
			}
			argument = j;
		}
		$('.parameter').html(str);
		
	}
	
	// 初始化手机预览框的值，即如果打开的是产品信息编辑页，一些输入框会有值了，这时手机预览框就要进行初始化显示
	if($('#product-name').val()!=''){ //产品信息修改页最起码产品名字有值，所以这部分代码是在进入产品信息修改页执行的
		$('.product-name').html( $('#product-name').val() );  // 产品信息名
		$('.product-retail').html( $('#product-retail').val() );  // 零售价
		var dateUnit = {0: '日', 1: '月', 2: '年'};
		$('.ShelfLife-value').html( $('#ShelfLife-value').val() ); // 保质期
		$('.ShelfLife-company').html( dateUnit[$('#ShelfLife-company').val()] );
		$('#detailed').html( $('#editor').html() ); // 产品详细
		$('.btn-website').attr( 'href', $('#website').val() );  // 官网
		$('.btn-shopping').attr( 'href', $('#shopping').val() );  // 电商
		
		// 详细参数
		var str = '';
		for(var i=1; ;i++){
			if($('#parameter_'+i).html()!=undefined){
				str += '<li class="list clearfix parameter_'+ i +'">'+
							'<div class="name">'+ $('#parameter_'+i).find('.parameter-name').val() +':</div>'+
							'<div class="content">'+ $('#parameter_'+i).find('.parameter-value').val() +'</div>'+
						'</li>';
			}else{
				break;
			}
		}
		$('.product-parameter').html(str);
	}
	
	
	// 判断推荐产品的名称超过12个字符后以省略号显示
	var recommendName = $('.recommend-img').find('.name');
	var recommendList = $('.recommend-img').find('.list');
	for( var i=0;i<recommendName.length; i++ ){
		var str = recommendName[i].innerText+'';
		if(str.length>7){
			recommendName[i].innerText = str.substr(0,6)+ '...' ;
		}
	}
	if(recommendList.length>2){  //  判断有几个推荐产品
		//console.log(recommendList.length);
		$('.recommend-img').slick({  //调用插件，底部轮播图
		  	slidesToShow: 3,
		  	slidesToScroll: 1,
		  	autoplay: true,
		  	autoplaySpeed: 2000,
		
		});
		$('.img-prev').show();
		$('.img-next').show();
	}
	
	$('.tab-content').css('min-height', window.innerHeight-50-41);
	// 鼠标悬停时隐藏提示（产品详细输入插件的样式选择按钮）
	$('.btn-toolbar').on('mouseover', 'a', function(){
		$('.ui-tooltip').css('left', $(this).offset().left+'px');
		$('.ui-tooltip').hide();
//		$('.ui-tooltip').css('top', ($(this).offset().top-40)+'px');
	})
	
	$('input').keyup(function(){
		var content = $(this).val();
		var name = $(this).attr('id');
		if(name=='product-name' || name=='ShelfLife-value'){
			$('.'+name).html(content);
		}
		if( name=='product-retail'  ){
			if(content!=''){
				$('.'+name).html('￥'+content);
			}else{
				$('.'+name).html('');
			}
			
		}
		if(name=='website' || name=='shopping'){
			$('.btn-'+name).attr('href', 'http://'+content);
		}
		return;
	});
	// 产品参数
	$('.parameter').on('keyup', 'input', function(){
		var parameterId = $(this).parent().attr('id');
		var name = $('#'+parameterId).find('.parameter-name').val();
		var value = $('#'+parameterId).find('.parameter-value').val();
		var str = '<div class="name">'+ name +':</div>'+
					'<div class="content">'+ value +'</div>'
		$('.'+parameterId).html(str);
	});
	// 产品详细
	$('#editor').on('keyup', function(){
		var content = $(this).html();
		$('#detailed').html(content);
	});
	$('.btn-toolbar').on('click','a', function(){
		var editor = $('#editor').html();
		var detailed = $('#detailed').html();
		
		if(editor!==detailed){
			$('#detailed').html(editor);
		}
	})
	
	//保质期单位修改
	$('#ShelfLife-company').change(function(){
		var val = $(this).val();
		var company = {0:'日', 1:'月', 2:'年'};
		$('.ShelfLife-company').html(company[val]);
	})
	
	//添加/删除参数
	$('#left-form').on('click', '.btn-addParameter', function(){
		var parameter = $('.parameter');
		var li = document.createElement('li');
		li.className = 'list clearfix';
		li.id = 'parameter_'+argument;
		var str = '<input type="text" class="form-control parameter-name" placeholder="参数">'+
					'<input type="text" class="form-control parameter-value" placeholder="">'+
					'<div class="parameter-delete" title="删除"><span class="fa fa-minus"></span></div>';
		li.innerHTML = str;
		parameter.append(li);
		
		// 右边也要增加标签
		var productParameter = $('.product-parameter');
		var pLi = document.createElement('li');
		pLi.className = 'list clearfix parameter_'+argument;
		productParameter.append(pLi);
		argument++;
	});
	

	$('#left-form').on('click', '.parameter-delete', function(){
		var list = $(this).parent();
		var parendId = list.attr('id');
		list.remove();
		$('.'+parendId).remove();
	});
	
//	$('.btn-generate').click(function(){
//		var parameter = {};
//		var i=1;
//		var str = "[";
//		for(i; i<argument; i++){
//			var par = $('#parameter_'+i);
//			var name = par.find('.parameter-name').val();
//			var val = par.find('.parameter-value').val();
//			if(name!=undefined&&val!=undefined){
//				str+= '{"'+name+'":"'+val+'"},';
//			}
//			
//		}
//		str=str.substring(0,str.length-1);
//		str+="]";
//		console.log(str);
//		parameter = JSON.parse(str);
//		console.log(parameter);
//	})
	//var chooseFile = {};  // 存取选择了哪些张图片

	$('.files').on('click', '.btn-delete', function(){ // 删除上传图片，更新存取的上传了图片的input所存的value
		$('#image_url1').attr('value', '');
		$('#image_url2').attr('value', '');
		$('#image_url3').attr('value', '');
		$('#image_url4').attr('value', '');
		console.log('111');
		$(this).parent().parent().remove();
		var fileImg = $('.files');
		var i = 0;
		var j = 1;
		for(i; i<fileImg.find('tr').length; i++){
			var filetTd = fileImg.find('tr').eq(i).find('td').eq(3).find('button').attr('data-url');
			//console.log(filetTd.eq(3).find('button').attr('data-url'));
			if(filetTd!=undefined){
				//console.log('2221');
				$('#image_url'+j).attr(  'value', filetTd );
				j++;
			}
		}
		// 更新图片
		var imgNum = $('.carousel-inner').children().length;
		console.log()
		imgNum--;
		$('#product-img').html('');
		var str = '';
		var i = 0;
		var File = $('.files');
		str += '<ol class="carousel-indicators">'
		for(i; i<imgNum; i++){
			if(i==0){
				str += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="active"></li>'
			}else{
				str += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class=""></li>'
			}
		}
		str += '</ol>';
		str += '<div class="carousel-inner" role="listbox">';
		for(i=0; i<imgNum; i++){
			if(i==0){
				str += '<div class="item active">'+
					'<img src="'+ File.find('tr').eq(i).find('td').eq(0).find('span').find('img').attr('src') +'" alt="...">'+
					'</div>';
			}else{
				str += '<div class="item">'+
					'<img src="'+ File.find('tr').eq(i).find('td').eq(0).find('span').find('img').attr('src') +'" alt="...">'+
					'</div>';
			}
		}
		str += '</div>';
		$('#product-img').html(str);

	});


	$('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
//        xhrFields: {withCredentials: true},
        url: 'http://www.eic.com/upload_img',
        dataType: 'json',
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
        autoUpload: false, // 是否自动上传
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // 图片名筛选
        //fileInput : uploader.find("input:file"),
        maxFileSize: 5000000, //  5MB  最大
        maxNumberOfFiles : 4,
        previewCanvas: false
        //formData:{param1:"p1",param2:"p2"},//如果需要额外添加参数可以在这里添加  
   }).on('fileuploadprogress', function (e, data) {   //fileuploadprogress：主要是进度条的修改  上传过程中的函数  
//      var progress = parseInt(data.loaded / data.total * 100, 10);  
//      $("#weixin_progress").css('width',progress + '%');  
//      $("#weixin_progress").html(progress + '%');  
    }).on('fileuploaddone', function (e, data) {  // fileuploaddone：上传成功结束后执行的操作
//      $("#weixin_show").attr("src","__PUBLIC__/"+data.result);  
//      $("#weixin_upload").css({display:"none"});  
//      $("#weixin_cancle").css({display:""});

	}).on('fileuploadfinished', function (e, data) {  // 存储上传好的图片路径
		//console.log('1112');
		var fileImg = $('.files');
		var i = 0;
		var j = 1;
		for(i; i<fileImg.find('tr').length; i++){
			var filetTd = fileImg.find('tr').eq(i).find('td').eq(3).find('button').attr('data-url');
			//console.log(filetTd.eq(3).find('button').attr('data-url'));
			if(filetTd!=undefined){
				//console.log('2221');
				$('#image_url'+j).attr(  'value', filetTd );
				j++;
			}
		}


	}).on('fileuploadfailed', function (e, data) {  // 上传失败(点击取消按钮也执行)手机预览图片删除更新
        //eva.p(data);
//      console.log(data);
//      console.log(data.files);
//      console.log($('.files').children().length);
        
        var imgNum = $('.carousel-inner').children().length;
        if(data.files.error!=true){
        	imgNum--;
        	$('#product-img').html('');
	    	var str = '';
	    	var i = 0;
	    	var File = $('.files');
	    	str += '<ol class="carousel-indicators">'
	    	for(i; i<imgNum; i++){
	    		if(i==0){
	    			str += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="active"></li>'
	    		}else{
	    			str += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class=""></li>'
	    		}
	    	}
	    	str += '</ol>';
	    	str += '<div class="carousel-inner" role="listbox">';
	    	for(i=0; i<imgNum; i++){
	    		if(i==0){
	    			str += '<div class="item active">'+
						      '<img src="'+ File.find('tr').eq(i).find('td').eq(0).find('span').find('img').attr('src') +'" alt="...">'+
						    '</div>';
	    		}else{
	    			str += '<div class="item">'+
						      '<img src="'+ File.find('tr').eq(i).find('td').eq(0).find('span').find('img').attr('src') +'" alt="...">'+
						    '</div>';
	    		}
	    	}
	    	str += '</div>';
	    	$('#product-img').html(str);
        }

        
//      console.log(data.result.files);
    }).on('fileuploadalways', function (e, data) {  // 总是执行(提交成功、失败、暂停)
        //eva.p(data);
        console.log(data);
        console.log(data.files);
//      console.log(data.result.files);
    }).on('fileuploadchange', function (e, data) {  // 选择文件改变
//  	console.log(data);
//      console.log(data.files);
//      var Files = data.files;
//      var i = 0,j = 0;
//      var FileLength = chooseFile.length;
//      var isNew = true;
//      for(i; i<Files.length; i++){
//      	for(j=0; j<chooseFile.length; j++){
//      		if(Files[i].name===chooseFile[j].name){
//      			isNew = false;
//      			break;
//      		}
//      	}
//      	if(isNew!==true){
//      		chooseFile[FileLength] = Files[i];
//      		isNew = true;
//      	}
//      }
        
    }).on('fileuploaddestroy', function (e, data) {  // 删除文件触发的事件
		console.log(data);
        console.log(data.files);


		//$(this).parent().remove();
    }).on('fileuploadadd', function (e, data) {  // 选择添加文件  这里排除重复选择的照片
		//console.log(data);
        //console.log(data.files);
        var filename = data.files[0].name;
        var fileListLenght = $('.table-striped').find('tr').length;
        for (var i = 0; i < fileListLenght; i++) {
            if (filename == $('.table-striped').find('.name').eq(i).text()) {
                $('.table-striped').find('.name').eq(i).parent().parent().remove();
            }
        }
    }).on('fileuploadadded', function (e, data) {  // 这里可尝试图片的实时添加显示
    	
//		console.log(data);
//      console.log('111');
    	$('#product-img').html('');
    	var str = '';
    	var i = 0;
    	var File = $('.files');
    	if($('.files').children().length<5){
    		var trLength = $('.files').children().length;
    	}else{
    		var trLength = 4;
    	}
    	str += '<ol class="carousel-indicators">'
    	for(i; i<trLength; i++){
    		if(i==0){
    			str += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="active"></li>'
    		}else{
    			str += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class=""></li>'
    		}
    	}
    	str += '</ol>';
    	str += '<div class="carousel-inner" role="listbox">';
    	for(i=0; i<trLength; i++){
    		if(i==0){
    			str += '<div class="item active">'+
					      '<img src="'+ File.find('tr').eq(i).find('td').eq(0).find('span').find('img').attr('src') +'" alt="...">'+
					    '</div>';
    		}else{
    			str += '<div class="item">'+
					      '<img src="'+ File.find('tr').eq(i).find('td').eq(0).find('span').find('img').attr('src') +'" alt="...">'+
					    '</div>';
    		}
    	}
    	str += '</div>';
    	$('#product-img').html(str);
    });
	

	// 先隐藏手机预览中的标签
//	$('.carousel-indicators').find('li').hide();
//	$('.carousel-inner').find('.item').hide()


//	 $("input[type='file']").fileupload({
//      url: 'image_ajax_save.action',
//      dataType: 'json',
//      autoUpload: true,
//      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // 图片名筛选
//      maxFileSize: 2097152// 2 MB  最大
//	}).on('fileuploadadd', function (e, data) { //
//        $(this).parent().children("label").remove();
//		   $("<p class='uploadImgLoad'>上传中... 0%</p>").appendTo($(this).parent());
//		  $(this).attr("disabled",true);
//	}).on('fileuploadprocessalways', function (e, data) {
//		if(data.files.error){
//		   $(this).parent().children("p").remove();
//		   $(this).removeAttr("disabled");
//		   if(data.files[0].error=='acceptFileTypes'){
//		       $(this).parent().append("<label class='error'>图片类型错误</label>");
//		   }
//		   if(data.files[0].error=='maxFileSize'){
//		      $(this).parent().append("<label class='error'>图片不能大于2M</label>");
//		   }  
//		} 
//	}).on('fileuploadprogressall', function (e, data) {
//	    var $p = $(this).parent().children("p");
//	    var progress = parseInt(data.loaded / data.total * 100, 10);
//		if($p.length==0){
//		    $("<p class='uploadImgLoad'>上传中... "+progress+"%</p>").appendTo($(this).parent());
//		}else{
//		   console.info(progress);
//		   $p.text('上传中... '+progress+'%');
//		   if(progress==100){
//		      $p.fadeOut("slow",function(){
//			     $(this).remove();
//			  });
//		   }
//		} 
//	}).on('fileuploaddone', function (e, data) {
//	      if(data.result.result=='error'){
//		     $(this).removeAttr("disabled");
//		     alert('抱歉，上传过快，请稍等！');
//		  }else if(data.result.result=='success'){
//		    $(this).parent().prepend($("<a href='#' >  删除</a>").attr("onclick","uploadImageAjaxDelete('image_ajax_delete.action?dbFileName="+data.result.dbFileName+"',this)").add("<br/>"))
//			.prepend($("<img  width='140' height='90' border='0' />").attr("src",data.result.url))
//			.prepend($("<input type='hidden' name="+data.result.hiddenName+" id="+data.result.hiddenName+" value='"+data.result.dbFileName+"' />"));
//		  }
//	});
})



