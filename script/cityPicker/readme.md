# 功能描述

    底部弹出地址选择器三级联动
    基于picker.min.js

# 依赖的模块
    lib/CityPicker.css
    lib/picker.min.js
    lib/city.js

# 快速使用
	
	引用部分
    <link rel="stylesheet" type="text/css" href="lib/CityPicker.css">
    <script src="lib/picker.min.js"></script>
	<script src="lib/city.js"></script>

	HTML部分
	<ul class="formarea">
		<li>
			<label class="lit">所在地区</label>
			<a href="#" class="btn btn-info btn-lg active textbox" role="button" id="sel_city">请选择</a>
		</li>
	</ul>
	<div style="height:1.2rem;"></div>

	####下面是默认显示内容
	<div class="picker">
		<div class="picker-mask mask-hook"></div>
		<div class="picker-panel panel-hook">
			<div class="picker-choose choose-hook">
				<span class="cancel cancel-hook">取消</span>
				<span class="confirm confirm-hook">确定</span>
				<h1 class="picker-title">地址选择</h1>
			</div>
			<div class="picker-content">
				<div class="mask-top border-1px"></div>
				<div class="mask-bottom border-1px"></div>
				<div class="wheel-wrapper wheel-wrapper-hook">
					<div class="wheel wheel-hook">
						<ul class="wheel-scroll wheel-scroll-hook">
							<li class="wheel-item" data-val="0">北京</li>
							<li class="wheel-item" data-val="1">广东</li>
							<li class="wheel-item" data-val="2">上海</li>
							<li class="wheel-item" data-val="3">天津</li>
							<li class="wheel-item" data-val="4">重庆</li>
							<li class="wheel-item" data-val="5">辽宁</li>
							<li class="wheel-item" data-val="6">江苏</li>
							<li class="wheel-item" data-val="7">湖北</li>
							<li class="wheel-item" data-val="8">四川</li>
							<li class="wheel-item" data-val="9">陕西</li>
							<li class="wheel-item" data-val="10">河北</li>
							<li class="wheel-item" data-val="11">山西</li>
							<li class="wheel-item" data-val="12">河南</li>
							<li class="wheel-item" data-val="13">吉林</li>
							<li class="wheel-item" data-val="14">黑龙江</li>
							<li class="wheel-item" data-val="15">内蒙古</li>
							<li class="wheel-item" data-val="16">山东</li>
							<li class="wheel-item" data-val="17">安徽</li>
							<li class="wheel-item" data-val="18">浙江</li>
							<li class="wheel-item" data-val="19">福建</li>
							<li class="wheel-item" data-val="20">湖南</li>
							<li class="wheel-item" data-val="21">广西</li>
							<li class="wheel-item" data-val="22">江西</li>
							<li class="wheel-item" data-val="23">贵州</li>
							<li class="wheel-item" data-val="24">云南</li>
							<li class="wheel-item" data-val="25">西藏</li>
							<li class="wheel-item" data-val="26">海南</li>
							<li class="wheel-item" data-val="27">甘肃</li>
							<li class="wheel-item" data-val="28">宁夏</li>
							<li class="wheel-item" data-val="29">青海</li>
							<li class="wheel-item" data-val="30">新疆</li>
							<li class="wheel-item" data-val="31">香港</li>
							<li class="wheel-item" data-val="32">澳门</li>
							<li class="wheel-item" data-val="33">台湾</li>
							<li class="wheel-item" data-val="34">海外</li>
							<li class="wheel-item" data-val="35">其他</li>
						</ul>
					</div>
					<div class="wheel wheel-hook">
						<ul class="wheel-scroll wheel-scroll-hook">
							<li class="wheel-item" data-val="0">东城区</li>
							<li class="wheel-item" data-val="1">西城区</li>
							<li class="wheel-item" data-val="2">崇文区</li>
							<li class="wheel-item" data-val="3">宣武区</li>
							<li class="wheel-item" data-val="4">朝阳区</li>
							<li class="wheel-item" data-val="5">海淀区</li>
							<li class="wheel-item" data-val="6">丰台区</li>
							<li class="wheel-item" data-val="7">石景山区</li>
							<li class="wheel-item" data-val="8">房山区</li>
							<li class="wheel-item" data-val="9">通州区</li>
							<li class="wheel-item" data-val="10">顺义区</li>
							<li class="wheel-item" data-val="11">昌平区</li>
							<li class="wheel-item" data-val="12">大兴区</li>
							<li class="wheel-item" data-val="13">怀柔区</li>
							<li class="wheel-item" data-val="14">平谷区</li>
							<li class="wheel-item" data-val="15">门头沟区</li>
							<li class="wheel-item" data-val="16">密云县</li>
							<li class="wheel-item" data-val="17">延庆县</li>
							<li class="wheel-item" data-val="18">其他</li>
						</ul>
					</div>
					<div class="wheel wheel-hook">
						<ul class="wheel-scroll wheel-scroll-hook">
							<li class="wheel-item" data-val="0"></li>
						</ul>
					</div>

				</div>
			</div>
			<div class="picker-footer footer-hook"></div>
		</div>
	</div>

