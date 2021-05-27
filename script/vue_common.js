if(typeof(Vue)=="function"){

  Vue.prototype.BigNumber=function(d){
    math.config({number: 'BigNumber'});
    return math.evaluate(d);
  }
  Vue.prototype.Copy=function(str){
    let clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: str
    }, function(ret, err) {
        if (ret.status) {
            toast('复制成功');
        } else {
            toast('复制失败');
        }
    });
  }
  Vue.prototype.tUrl=function(url){
    if(!url){
      return '';
    }
    if(url.indexOf('http://')!=-1||url.indexOf('https://')!=-1){
      return url;
    }
    return root_url+"/"+url;
  }
  Vue.prototype.fnTest=function(){
    ajax('ud.fnTest').then(res=>{
      _log(res);
    })
  }
  Vue.prototype.tCount=function(count){
    var count=parseInt(count);
    if(count<1||!count||isNaN(count)){
      return 0;
    }
    if(count>=10000){
      return parseFloat((count/10000).toFixed(1))+'w';
    }
    return count;
  }
  Vue.prototype.tImage=function(url,default_image='../icon/logo.png'){
    if(url){
      if(url.indexOf('attachment')!=-1){
        return this.tUrl(url);
      }else if(url.indexOf('http://')!=-1||url.indexOf('https://')!=-1){
        return this.tUrl(url);
      }else{
        return this.tUrl('/attachment/'+url);
      }

    }else{
      return default_image;
    }
  }
  Vue.prototype.date=function(format="Y-m-d H:i:s",time){
    if (!time) {
      var d = new Date();
    }else{
      var d = new Date(time * 1000);
    }

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    return format.replace("Y",year)
      .replace("m",(month<10?("0"+month):month))
      .replace("d",(date<10?("0"+date):date))
      .replace("H",(hour<10?("0"+hour):hour))
      .replace("i",(minute<10?("0"+minute):minute))
      .replace("s",(second<10?("0"+second):second));
  }
  Vue.prototype.cdate=function(time){
    var d =  Date.parse(new Date());
    var cha=d/1000-time;
    if(cha<60){
            //小于60s
      return "刚刚";
    }
    if(cha<3600){
        //小于1小时
        return parseInt(cha/60)+"分钟前";
    }
    if(cha<86400){
        //小于1小时
        return parseInt(cha/3600)+"小时前";
    }
    day=parseInt(cha/86400);
    if(day>10){
        return this.date("Y-m-d",time);
    }
    return day+"天前";
  }
  Vue.prototype.delArray=function(arr, idx) {
    var temp = [];
    for (var i in arr) {
        if (i != idx) {
            temp.push(arr[i]);
        }
    }
    return temp;
  }
  Vue.prototype.timeDate=function(time) {
    var nowTime=Date.parse(new Date())/1000;

    if(!time||time<=nowTime){
      return '已结束';
    }

    var cha =time-nowTime;
    var day=Math.floor(cha/86400);
    var hour=Math.floor((cha%86400)/3600);
    var min=Math.floor((cha-86400*day-hour*3600)/60);
    var sec=cha%60;
    return "距离结束："+day+"天"+hour+"时"+min+"分"+sec+'秒';

  }

  Vue.prototype.decimal_length=function(val){
    var arr=val.toString().split(".");
    return  arr[1]?arr[1].length:0;
  }

  Vue.prototype.longProess=function(){
    clipBoard = api.require('clipBoard');
    setTimeout(function () {
      $("input").on({
          touchstart: function(e){
              var that=this;
              timeOutEvent = setTimeout(function(){
                //此处为长按事件-----在此显示遮罩层及删除按钮
                clipBoard.get(function(ret, err) {
                    if (ret.value) {
                      jQuery(that).val(ret.value);
                      that.dispatchEvent(new Event('input'));
                    }
                });

              },500);
          },
          touchmove: function(e){
              clearTimeout(timeOutEvent);
              timeOutEvent = 0;
          },
          touchend: function(e){
              clearTimeout(timeOutEvent);
              timeOutEvent=0;
          }
      });
      $("textarea").on({
          touchstart: function(e){
              var that=this;
              timeOutEvent = setTimeout(function(){
                //此处为长按事件-----在此显示遮罩层及删除按钮
                clipBoard.get(function(ret, err) {
                    if (ret.value) {
                      jQuery(that).val(ret.value);
                      that.dispatchEvent(new Event('input'));
                    }
                });

              },500);
          },
          touchmove: function(){
              clearTimeout(timeOutEvent);
              timeOutEvent = 0;

          },
          touchend: function(e){
              clearTimeout(timeOutEvent);
              timeOutEvent = 0;
          }
      });
    }, 100);
  }
  //判断是否是空对象
  Vue.prototype.isEmptyObj=function(obj){
    if(!obj)return true;
    for(var i in obj){
      return false;
    }
    return true;
  }


  Vue.prototype.fnCountDown=function(time,callback){
    callback(time);
    let interval=setInterval(function () {
      time-=1
      callback(time);
      if(time<=0){
        clearInterval(interval);
      }
    }, 1000);
  }
  Vue.prototype.interfaceSet=function(){
    openWhiteWin('zhsz','账户设置');
  }
  //个人资料
  Vue.prototype.interfaceZl=function(){
    openWhiteWin('grzl','个人资料');
  }
  //我的收货地址
  Vue.prototype.fnMyAddress=function(listen="",account=''){
    openWhiteWin('shdz','我的收货地址',{listen:listen,account:account},{text:'添加'});
  }
  Vue.prototype.interfaceWdGs=function(){
    openWhiteWin('wdgs','我的果树');
  }

  //添加/编辑收货地址
  Vue.prototype.fnAddress=function(id=0,account=''){
    if(id==0){
      openWhiteWin('xzshdz','新建地址',{id:0,account:account});
    }else{
      openWhiteWin('xzshdz','新建地址',{id:id,account:account},{text:'删除'});
    }
  }
  Vue.prototype.interfaceRegister=function(){
    openWhiteWin('register','注册',{temp:'sms_reg'})
  }
  Vue.prototype.interfaceForgetPwd=function(){
    openWhiteWin('register','忘记密码',{temp:'sms_forget'});
  }

  Vue.prototype.interfaceBindMobile=function(){
    openWhiteWin('bind-mobile','绑定手机号',{temp:'sms_reg'});
  }
  Vue.prototype.interfaceSetPaypwd=function(){
    //设置支付密码
    openWhiteWin('set-paypwd','设置支付密码');
  }

  //我的订单 //type=1 平台寄售 2积分订单

  Vue.prototype.interfaceWddd=function(tab=0,type=0){
    openNotTabWin('wddd',{tab:tab,type:type});
  }
  //交易中心
  Vue.prototype.interfaceJiaoYi=function(){
      openWhiteWin('jiaoyi','交易中心');
  }
  Vue.prototype.interfaceJiaoYiLog=function(){
    openWhiteWin('jiaoyi-log','交易记录');
  }
  //签到界面
  Vue.prototype.interfaceQd=function(){
    openWin('qiandao','签到',{},null,'#3ccb7c');
  }
  Vue.prototype.jumpInterface=function(interface){
    if(!interface){
      return;
    }
    eval('Vue.prototype.'+interface.replace(/&#039;/g, "'").replace(/&quot;/g, "'"));
  }
  Vue.prototype.toast=function(msg='开发中'){
    toast(msg);
  }
  //文章详情
  Vue.prototype.interfaceArticle=function(id,title='详情'){
    openWhiteWin('article',title,{id:id});
  }
  Vue.prototype.interfaceNews=function(type=0){
    if(type==1){
      openWhiteWin('news','短视频',{type:type});
    }else if(type==2){
      openWhiteWin('news','系统公告',{type:type});
    }else{
      openWhiteWin('news','全部内容',{type:type});

    }
  }
  Vue.prototype.fnDayToWeek=function(year,month,day) {
    date = new Date(year, parseInt(month)-1, day);
    return "周" + "日一二三四五六".charAt(date.getDay());
  }
  Vue.prototype.interfaceGoods=function(id,title="",ext={}){
    //商品详情
    var navigationBar={
      background: '#fff',
      color: '#000',
      leftButtons: [{
          iconPath: 'widget://icon/hfh2.png'
      }],
      rightButtons:[{
        iconPath: 'widget://icon/d2.png'
      }]
    }
    api.openTabLayout({
        name: 'spxq-'+id,
        url: 'widget://html/spxq.html',
        useWKWebView: true,
        bgColor: '#fff',
        title: title?title:'商品详情',
        pageParam:{
          goods_id:id,
          ext:ext
        },
        navigationBar:navigationBar
    });
  }
  Vue.prototype.interfaceGoodsList=function(param={}){
     openNotTabWin('goods-list',param);
  },
  Vue.prototype.interfaceGwc=function(){
    //购物车
    openNotTabWin('gwc');
  }
  //提交订单
  Vue.prototype.interfaceTJDd=function(option){
    openWhiteWin('tjdd','确认订单',option);
  }
  Vue.prototype.interfaceOrderPay=function(id){
    openWhiteWin('ddzf','订单支付',{id:id});
  }
  Vue.prototype.interfaceJfdh=function(){
    //兑换积分
    openWhiteWin('jfdh','积分兑换',{},{iconPath: 'widget://icon/hjl2.png'});
  }
  Vue.prototype.interfaceCredit1Log=function(){
    openWhiteWin('credit-log','积分明细',{credit_type:'credit1'});
  }
  Vue.prototype.interfaceCredit2Log=function(){
    openWhiteWin('credit-log','余额明细',{credit_type:'credit2'});
  }

  Vue.prototype.interfaceCredit3Log=function(){
    openWhiteWin('credit-log','七彩券明细',{credit_type:'credit3'});
  }
  Vue.prototype.interfaceCredit6Log=function(){
    openWhiteWin('credit-log','果子明细',{credit_type:'credit6'});
  }

  Vue.prototype.interfaceXjcz=function(){
    //余额充值
    openWhiteWin('xjcz','余额充值',{},{iconPath: 'widget://icon/hjl2.png'})
  }
  Vue.prototype.interfaceMyTeam=function(tab=0){
    //我的团队
    openWhiteWin('my-team-list','我的团队',{tab:tab})
  }

  Vue.prototype.interfaceZc=function(){
    openGreenWin('zc','我的资产');
  }
  Vue.prototype.interfaceTx=function(){
    openWhiteWin('tx','提现',{},{iconPath:"widget://icon/hjl2.png"});
  }
  Vue.prototype.interfaceLdgTx=function(){
    openWhiteWin('ldg-tx','LDG提现',{},{iconPath:"widget://icon/hjl2.png"});
  }
  Vue.prototype.interfaceTxLog=function(){
    openWhiteWin('tx-log','提现记录');
  }

  Vue.prototype.interfaceYqhy=function(){
    openBaseWin('yqhy','邀请好友',{},{
        text: '邀请说明'
    });
  }
  Vue.prototype.interfaceKtdl=function(){
    openWhiteWin('sqdl','申请代理');
  }
  Vue.prototype.interfaceZcjs=function(){
    openWhiteWin('zcjs','宗祠建设');
  }
  Vue.prototype.interfaceQb=function(){
    openWhiteWin('qb','我的钱包');
  }
  Vue.prototype.interfaceZz=function(id=""){
    openWhiteWin('zz','转账',{id:id},{iconPath:"widget://icon/hjl2.png"});
  }
  Vue.prototype.interfaceSmrz=function(){
    openWhiteWin('smrz','实名认证');
  }
  Vue.prototype.interfaceXsjl=function(){
    openOrangeWin('jli','福利兑换');
  }
  Vue.prototype.interfaceXsjlDetail=function(id,title='奖励详情'){
    openOrangeWin('jli_xq',title,{id:id});
  }
  Vue.prototype.interfaceBuyTree=function(){
    // openWhiteWin('buy-tree','果树购买');
    this.interfaceGoods(312,'果树购买');
  }
  Vue.prototype.interfaceJyls=function(id){
    openWhiteWin('jyls','交易记录('+id+')',{id:id});
  }

  Vue.prototype.interfaceYeji=function(){
    openWhiteWin('yeji','我的业绩');
  }
  Vue.prototype.interfaceBaodan=function(tab=0){
    openNotTabWin('baodan',{tab:tab})
  }
  Vue.prototype.interfaceBaodanRegister=function(param={}){
    openWhiteWin('baodan-tab','报单/升级',{param:param});
  }

  //取消订单
Vue.prototype.fnOrderCancel=function(id){
    var buttons=['不想买了','信息填写错误，重新拍','同城见面交易','其他原因'];
    selectAction(buttons,true).then(res=>{
      fnConfirm('确定取消该订单么？',function(){
        ajax('ud.orderOp.cancel',{id:id,remark:res}).then(ret=>{
          toast(ret);
          orderRelaodEvent();
        })
      })
    })
}
Vue.prototype.fnOrderCancelJs=function(id){

  fnConfirm('确定取消寄售么？取消寄售之后，将改为发货，且该订单不能重新寄售。',function(){
    ajax('ud.orderOp.cancelJs',{id:id}).then(res=>{
      toast(res);
      orderRelaodEvent();
    })
  });
}

  //删除订单
Vue.prototype.fnOrderDelete=function(id,userdeleted){
  var msg='确认要恢复订单么？';
  if(userdeleted==1){
    msg="确定删除该订单么?";
  }
  if(userdeleted==2){
    msg="确定彻底删除该订单么？";
  }
  fnConfirm(msg,function(){
    ajax('ud.orderOp.delete',{id:id,userdeleted:userdeleted}).then(res=>{
      toast(res);
      orderRelaodEvent();
    })
  })

}

  //订单评价
  Vue.prototype.fnOrderComment=function(id,iscomment){
    if(iscomment){
      openWhiteWin('fbpj','追加评价',{id:id},{text:'发布'});
    }else{
      openWhiteWin('fbpj','评价',{id:id},{text:'发布'});
    }
  }
  //订单物流
  Vue.prototype.fnOrderWl=function(id){
    openWhiteWin('express','物流信息',{id:id});
  }
  //确认收货订单
  Vue.prototype.fnOrderFinish=function(id){
    fnConfirm("确认已收到货了吗?",function(){
      ajax('ud.orderOp.finish',{id:id}).then(res=>{
        toast(res);
        orderRelaodEvent();
        reloadUserInfo();
      })
    })

  }

  //订单详情
  Vue.prototype.fnOrderDetail=function(id){
    openWhiteWin('ddxq','订单详情',{id:id});
  }
  //申请售后
  Vue.prototype.fnOrderSh=function(id,title="申请售后"){
    openWhiteWin('sqtk',title,{id:id});
  }
  Vue.prototype.fnLqLdg=function(){
    return ajax('ud.member.lqLdg')
  }
  Vue.prototype.interfacePinTuan=function(){
    openWhiteWin('tuangou','团购')
  }

  Vue.prototype.interfaceTreeList=function() {
    openWhiteWin('wdgs','我的果树');
  }
  //小程序接口
  var wxPlus;
  Vue.prototype.interfaceMini=function(path=''){
    if(!wxPlus){
      wxPlus = api.require('wxPlus');
    }
    wxPlus.launchMiniProgram({
      miniProgramType:'release',
      userName:'gh_9320940ec329',
      path:path
    });
  }
  Vue.prototype.interfaceMiniGroupGoods=function(id){
    this.interfaceMini('pages/groups/goods/index?id='+id)
  }
  Vue.prototype.fnUpdateLevel=function(){
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err){
        if (!ret.update) {
            fnAlert('已是最新版本');
        }
    });
  }
  Vue.prototype.interfaceQcsc=function(tab=0){
    openNotTabWin('sc',{tab:tab});
  }
  Vue.prototype.fnBindWechat=function(){
    wxPlus = api.require('wxPlus');
    wxPlus.isInstalled(function(ret, err) {
        if (!ret.installed) {
            fnAlert('当前设备未安装微信客户端');
            return;
        }
        wxPlus.auth({}, function(ret, err) {
          if(ret.status){
            wxPlus.getToken({
                code: ret.code
            }, function(ret, err) {
                if (ret.status) {
                  let param={
                    token:ret.accessToken,
                    openid:ret.openId
                  }
                  ajax('ud.member.bindWechat',param,'post').then(res=>{
                    toast(res);
                    reloadUserInfo();
                  })

                } else {
                    fnAlert("Token获取失败："+err.code);
                }
            });
          }else{
            fnAlert('授权失败 code:'+err.code);
          }
        });
    });
  }
  //学院派
  Vue.prototype.interfaceXyp=function(){
    openWhiteWin('sxy','学院派');
  }
  Vue.prototype.interfaceVideoDetail=function(id){
    openNotTabWin('video-detail',{id:id});
  }
  Vue.prototype.interfaceQcq=function(){
    openWhiteWin('qcq','七彩券')
  }

  Vue.prototype.fnSelectQcq=function(){
      //选择七彩券
      openWhiteWin('select-qcq','选择七彩券')
  }
  Vue.prototype.interfaceUpgrade=function(){
    openNotTabWin('vip')
  }
  Vue.prototype.interfaceDfw=function(){
    openWhiteWin('china','大富翁');
  }
  //七彩森林
  Vue.prototype.interfaceQcsl=function(){
    openWin('qcsl','七彩森林')
  }
  Vue.prototype.interfaceRwzx=function(){
    openWhiteWin('rwzx','任务中心');
  }
  Vue.prototype.interfaceFaquan=function(){
    openNotTabWin('faq');
  }

}
