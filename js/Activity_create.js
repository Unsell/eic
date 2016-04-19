
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
	// 选择抽奖时间
	$('#activity-time').click(function(){
		
		$('.box-activity-time').show().css({
			'left': $(this).offset().left-250,
			'top' : $(this).offset().top-55
		});
		
		setDateTimePicker();
		
	});
	$('.input-group-addon').click(function(){
		$('.box-activity-time').show().css({
			'left': $(this).offset().left-480,
			'top' : $(this).offset().top-55
		});
		setDateTimePicker();
		$('#activity-time').focus();
	});
	$('.input-group-addon i').click(function(){
		$('.box-activity-time').show().css({
			'left': $(this).offset().left-480,
			'top' : $(this).offset().top-55
		});
		setDateTimePicker();
		$('#activity-time').focus();
	});
	//  初始化和绑定时间选择弹窗
	function setDateTimePicker(){
		var data = new Date();
		var nowDay = data.getFullYear() + "-" + ("0" + (data.getMonth() + 1)).slice(-2) + "-" + ("0" + (data.getDate())).slice(-2);
		
		$('.startDatetime').attr("data-sdate", nowDay);
		$('.endDatetime').attr("data-edate", nowDay);
		
		
		
		$(".startDatetime").datetimepicker({
			language: 'zh',
			format: 'yyyy-mm-dd',
			autoclose: true,
			minView: "month"
		})
		.on("changeDate", function(e) {
			$(".startDatetime").attr("data-sdate", FormatDate(e.date));
			$('.endDatetime').datetimepicker('setStartDate', FormatDate(e.date));
			if (!dateCompare($(".startDatetime").attr("data-sdate"), $('.endDatetime').attr("data-edate"))) {
				$('.endDatetime').datetimepicker('update', FormatDate(e.date));
				$(".endDatetime").attr("data-edate", FormatDate(e.date));
			}
		});
		$(".endDatetime").datetimepicker({
			language: 'zh',
			format: 'yyyy-mm-dd',
			autoclose: true,
			minView: "month"
		})
		.on("changeDate", function(e) {
			$(".endDatetime").attr("data-edate", FormatDate(e.date));
		});
	};
	// 确定选择时间
	$('.btn-confirm').click(function(){
		
		$('#activity-time').val($('.startDatetime').attr('data-sdate') + "  到  " + $('.endDatetime').attr('data-edate'));
		$('.box-activity-time').hide();
		
	});
	// 关闭日期选择弹窗
	$('.btn-cancle').click(function(){
		$('.box-activity-time').hide();
	});
	$(document).click(function(e){
		e = window.event || e;
		var obj = e.srcElement || e.target;
		if(!$(obj).is(".box-activity-time")&&!$(obj).is('#activity-time')&&!$(obj).is('.input-group-addon')&&!$(obj).is('.input-group-addon i')) {
			if($(".box-activity-time").css('display')=='block'){
				$(".box-activity-time").hide();
			}
		}
	});
	// 日期格式转化
	function FormatDate(strTime) {
		var date = new Date(strTime);
		return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2);
	}
	function dateCompare(startdate, enddate) {
		var arr = startdate.split("-");
		var starttime = new Date(arr[0], arr[1], arr[2]);
		var starttimes = starttime.getTime();
		var arrs = enddate.split("-");
		var lktime = new Date(arrs[0], arrs[1], arrs[2]);
		var lktimes = lktime.getTime();
		if (starttimes >= lktimes) {
			return false;
		} else
			return true;
	}
	// 时间显示的重定义
	$.fn.datetimepicker.dates['zh'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
		daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		meridiem: ["上午", "下午"],
		//suffix:      ["st", "nd", "rd", "th"],  
		today: "今天"
	};
	var days = {
		"0": "星期日", 
		"1": "星期一",
		"2": "星期二",
		"3": "星期三",
		"4": "星期四",
		"5": "星期五",
		"6": "星期六"
	};
	
});










