
$(function(){
	
	$('.tab-content').css('min-height', window.innerHeight-50-41);
	
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
		
		$('.'+parameterId).html(name+'：&nbsp;&nbsp;&nbsp;'+value);
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
	var argument=1;  // 代表有多少个参数
	$('#left-form').on('click', '.btn-addParameter', function(){
		var parameter = $('.parameter');
		var li = document.createElement('li');
		li.className = 'list clearfix';
		li.id = 'parameter_'+argument;
		var str = '<input type="text" class="form-control parameter-name" placeholder="参数">'+
					'<input type="text" class="form-control parameter-value" placeholder="">'+
					'<div class="parameter-delete"><span class="fa fa-minus"></span></div>';
		li.innerHTML = str;
		parameter.append(li);
		
		// 右边也要增加标签
		var productParameter = $('.product-parameter');
		var pLi = document.createElement('li');
		pLi.className = 'list parameter_'+argument;
		productParameter.append(pLi);
		argument++;
	});
	

	$('#left-form').on('click', '.parameter-delete', function(){
		var list = $(this).parent();
		list.remove();
		var parendId = $(this).parent().attr('id');
		$('.'+parendId).remove();
	});
	
	
})



