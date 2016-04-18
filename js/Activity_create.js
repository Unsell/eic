
$(function(){
	// 计算textarea标签的内容长度
	$('#box_tab1').on('input', 'textarea', function(){
		var content = $(this).val();
		if(content.length<=30){
			$(this).parent().find('.count').find('span').html(content.length);
		}
		return;
	});
	// 增加奖项
	var prizeNums = 3;
	var prizeName = {1:'一等奖', 2: '二等奖', 3: '三等奖', 4: '四等奖', 5: '五等奖', 6: '六等奖'};
	$('.btn-addActivity').click(function(){
		if(prizeNums<6){
			prizeNums++;
			var PromptParent = $('.prompt');
			var GradeParent = $('.create-setting');
			
			var GradeDiv = document.createElement('div');
			GradeDiv.className = 'form-inline clearfix';
			GradeDiv.id = 'Grade_' + prizeNums;
			var str1 = '<div class="form-group">'+
							'<label for="" class="">'+prizeName[prizeNums]+'：</label>'+
							'<input type="text" class="form-control" id="" placeholder="">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="" class="">奖品数量：</label>'+
							'<input type="text" class="form-control" id="" placeholder="">'+
						'</div>';
			GradeDiv.innerHTML = str1;
			GradeParent.append(GradeDiv);
			
			var PromptDiv = document.createElement('div');
			PromptDiv.className = 'form-group clearfix';
			PromptDiv.id = 'Prompt_' + prizeNums;
			var str2 = '<label for="" class="">'+prizeName[prizeNums]+'：</label>'+
						'<textarea class="form-control" name="" rows="3" cols=""  maxlength="30"></textarea>'+
						'<div class="count"><span>0</span>/30</div>';
			PromptDiv.innerHTML = str2;
			PromptParent.append(PromptDiv);
			return;
		}else{
			return;
		}
	});
	// 减少奖项
	$('.btn-subActivity').click(function(){
		
		if(prizeNums>1){
			
			$('#Grade_'+prizeNums).remove();
			$('#Prompt_'+prizeNums).remove();
			prizeNums--;
		}else{
			return;
		}
		
	});
	
	$('#activity-time').click(function(){
		
		
		
	});
	
	
});










