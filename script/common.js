document.write('<script type="text/javascript" src="../script/math.js"></script>');
document.write('<script type="text/javascript" src="../script/flexible.js"></script>');
document.write('<script type="text/javascript" src="../script/md5.js"></script>');
document.write('<script type="text/javascript" src="../script/api.js"></script>');
document.write('<script type="text/javascript" src="../script/vue.js"></script>');
document.write('<script type="text/javascript" src="../script/vue_common.js"></script>');
document.write('<script type="text/javascript" src="../script/vue_components.js"></script>');
document.write('<script type="text/javascript" src="../script/vue_mixins.js"></script>');
document.write('<script type="text/javascript" src="../script/jquery.min.js"></script>');
document.write('<script type="text/javascript" src="../script/jquery.js"></script>');

document.write('<link rel="stylesheet" href="../css/common.css">');
document.write('<script type="text/javascript" src="../script/pwdInput.js"></script>');
document.write('<link rel="stylesheet" href="../css/pwdInput.css">');

document.write('<script src="../script/cityPicker/picker.min.js"></script>');
document.write('<link rel="stylesheet" href="../script/cityPicker/CityPicker.css">');





var root_url = "http://app.dongqichengcl.com";
var root = root_url + "/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=";

function mobile_url(url){
  return root + url;
}

function _log(data) {
    var type = typeof(data);
    if (type == "object") {
        console.log(document.location.toString().split('/').pop() + ":" + JSON.stringify(data));
    } else if (type == "string") {
        console.log(document.location.toString().split('/').pop() + ":" + data);
    } else if (type == "function") {
        console.log(document.location.toString().split('/').pop() + ":" + data.toString());
    } else {
        console.log(document.location.toString().split('/').pop() + ":" + data);
    }
}



function download(url, savePath, callback,hideProgress=true) {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '文件下载中...',
        text: '请稍后...',
        modal: false
    });

    api.download({
        url: url,
        savePath: savePath,
        report: false,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        hideProgress&&api.hideProgress();
        callback(ret);
    });
}


function openWhiteWin(html, title, param = {}, right_button = null) {
    var navigationBar = {
        background: '#fff',
        color: '#000',
        leftButtons: [{
            iconPath: 'widget://icon/hfh2.png'
        }]
    }
    if (right_button) {
        navigationBar.rightButtons = [right_button];
    }
    var top_height = api.safeArea.top + 45;
    param.top_height = top_height;
    api.openTabLayout({
        name: html,
        url: 'widget://html/' + html + '.html',
        useWKWebView: true,
        bgColor: '#fff',
        title: title,
        pageParam: param,
        navigationBar: navigationBar
    });
}

function openWin(html, title, param = {}, right_button = null,bg='#3994c7',color='#fff') {
    var navigationBar = {
        background: bg,
        color:color,
        shadow: bg,
        leftButtons: [{
            iconPath: 'widget://icon/back-white.png'
        }]
    }
    if (right_button) {
        navigationBar.rightButtons = [right_button];
    }

    var top_height = api.safeArea.top + 45;
    param.top_height = top_height;
    api.openTabLayout({
        name: html,
        url: 'widget://html/' + html + '.html',
        useWKWebView: true,
        bgColor: bg,
        title: title,
        pageParam: param,
        navigationBar: navigationBar
    });
}

function openBaseWin(html, title, param = {}, right_button = null) {
    var navigationBar = {
        background: '#4d85f9',
        color: '#fff',
        shadow: '#4d85f9',
        leftButtons: [{
            iconPath: 'widget://icon/back-white.png'
        }]
    }
    if (right_button) {
        navigationBar.rightButtons = [right_button];
    }

    var top_height = api.safeArea.top + 45;
    param.top_height = top_height;
    api.openTabLayout({
        name: html,
        url: 'widget://html/' + html + '.html',
        useWKWebView: true,
        bgColor: 'rgba(0,0,0,0)',
        title: title,
        pageParam: param,
        navigationBar: navigationBar
    });
}
function openOrangeWin(html, title, param = {}, right_button = null) {
    var navigationBar = {
        background: '#f57c00',
        color: '#fff',
        shadow: '#f57c00',
        leftButtons: [{
            iconPath: 'widget://image/back-white.png'
        }]
    }
    if (right_button) {
        navigationBar.rightButtons = [right_button];
    }

    var top_height = api.safeArea.top + 45;
    param.top_height = top_height;
    api.openTabLayout({
        name: html,
        url: 'widget://html/' + html + '.html',
        useWKWebView: true,
        bgColor: '#f57c00',
        title: title,
        pageParam: param,
        navigationBar: navigationBar
    });
}

function openImage(url){
  api.openTabLayout({
      name: 'image',
      url: 'widget://html/image.html',
      useWKWebView: true,
      navigationBar: false,
      pageParam: {url:url},
      bgColor: "#000",
      title: '',
      animation:{
          type:"none",
          subType:"from_bottom",
          duration:300
      }

  });
}


function openUrl(url, title) {
    api.openTabLayout({
        name: url,
        url: url,
        useWKWebView: true,
        bgColor: '#fff',
        title: title,
        headers: {
            "Token": getToken(),
            'Ajpushid':getCache('ajpush_id'),
            'systemType':api.systemType,
            'iosversion':ios_version
        },
        showProgress: true,
        navigationBar: {
            background: '#fff',
            color: '#000'
        }
    });

}

function cacheImage(url){
  var name=url.split('/').pop();
  var thumb_dir='fs://thumb';
  var img_dir='fs://img/'+name;
  return new Promise((resolve,reject)=>{
    download(url,img_dir,function(res){
      var imageFilter=api.require('imageFilter');
      imageFilter.compress({
        img: img_dir,
        scale: 0.1,
        save:{imgPath:thumb_dir,imgName:name}
        },function( ret, err ){
          if(ret.status){
            resolve({
              thumb:thumb_dir+'/'+name,
              img:img_dir,
              dir:api.fsDir+'/img/'+name
            });
          }else{
            reject(err);
          }

        }
      );
    })
  })

}
function compress(img_dir){
  var imageFilter=api.require('imageFilter');
  var name=img_dir.split('/').pop();
  var thumb_dir='fs://thumb';
  return new Promise((resolve,reject)=>{
    imageFilter.compress({
      img: img_dir,
      scale: 0.1,
      save:{imgPath:thumb_dir,imgName:name}
      },function( ret, err ){
        if(ret.status){
          resolve({
            thumb:thumb_dir+'/'+name,
            dir:api.fsDir+'/thumb/'+name,
            img:img_dir
          });
        }else{
          reject(err);
        }

      }
    );
  })


}
function fnCopy(value){
  var clipBoard = api.require('clipBoard');
  clipBoard.set({
      value:value
  }, function(ret, err) {
      if (ret) {
          toast('复制成功')
      } else {
          toast('复制失败')
      }
  });
}



function openNotTabWin(html, param = {},bgColor="#fff") {
    api.openTabLayout({
        name: html,
        url: 'widget://html/' + html + '.html',
        useWKWebView: true,
        hideNavigationBar: true,
        pageParam: param,
        bgColor: bgColor,
        title: '',
        navigationBar: {
            background:bgColor
        }
    });
}


function inArray(search, arr) {
    for (var i in arr) {
        if (arr[i] == search) {
            return true;
        }
    }
}

function getToken() {
    return getCache('token');
}

function setToken(value) {
    setCache('token', value);
}

function ajax(url, param = {},method="get",showProgress=true) {

  if(showProgress){
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
  }
  param.is_ios=getCache('is_ios');
  return new Promise((resolve,reject)=>{
    api.ajax({
            url: root + url,
            method:method,
            timeout: 60,
            dataType: 'json',
            headers: {
                "Token": getToken(),
                'systemType':api.systemType
            },
            data: {
                values: param
            }
        },
        function(ret, err) {
          if(showProgress){
            api.hideProgress();
            api.refreshHeaderLoadDone();
          }
          httpRes(ret, err, resolve,reject, url, param,method,showProgress)
        }
    );
  })

}

function httpRes(ret, err, resolve,reject, url, param,method="get",showProgress=true) {


  if (typeof ret == 'object') {
      if (ret.status == 1) {
        if(url=='ud.member'){
          setCacheObj('user-info',ret.data);
          //刷新一下账号列表
          api.sendEvent({
              name: 'reload-user-info-success'
          });
        }
        if (ret.data) {
            resolve(ret.data);
        } else if (ret.result) {
            resolve(ret.result);
        }
      }
      else if (ret.status==-5) {
        fnAlert(ret.data,'提示',function(){
          api.closeWin();
        });
      }
      else if(ret.status==-7){
        //需要支付密码
        isPwdInput.open(function(data) {
            if(data.pwd&&data.pwd.length==6){
              param.pay_pwd=data.pwd;
              isPwdInput.close();
              ajax(url,param).then(res=>{
                resolve(res);
              });
            }
        });
      }
      else if (ret.status == -10) {
          let key=hex_md5("login-success-"+url);
          login(key);
          api.addEventListener({
              name: key
          }, function(ret, err){
            api.closeFrame({
                name: 'login'
            });
            param.second=1;

            ajax(url,param,method,showProgress).then(res=>{
              resolve(res);
            })
          });

      }else if(ret.status==-12){
        fnConfirm(ret.data.msg, function() {
            //确认
            eval('Vue.prototype.'+ret.data.interface);
        });
      }else if(ret.status==-13){
        fnConfirm(ret.data.msg, function() {
            //确认
            eval('Vue.prototype.'+ret.data.interface);
        },function(){
          api.closeWin();
        });
      }
      else {
          fnAlert(ret.data);
          _log(ret.data);
          if(ret.reject){
            reject(ert.data);
          }
      }
  }
  else {
      _log(err);
      fnAlert(err.msg + ":" + err.body);

  }

}


function merge_list(list1, list2) {
    if (list2 && list2.length > 0) {
        return list1.concat(list2);
    }
    return list1;
}

function login(successCallbackEvent) {
    api.openFrame({
        name: 'login',
        url: 'widget://html/login-wechat.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
            successCallbackEvent:successCallbackEvent
        },
        bounces: false,
        bgColor: '#fff',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true,
        animation: {
            type: 'movein',
            subType: "from_bottom",
            duration: 300
        }
    });

}


//取缓存
function getCache(key) {
    return api.getPrefs({
        sync: true,
        key: key
    });
}

//设置缓存
function setCache(key, value) {
    api.setPrefs({
        key: key,
        value: value
    });
}

function fnAlert(msg, title = "提示", callback = false) {
    api.alert({
        title: title,
        msg: msg,
    }, function(ret, err) {
        if (callback) callback();
    });
}

//检测手机号
function checkMobile(mobile) {
    var reg = /^0?[1|8][1|2|3|4|5|6|7|8|9][0-9]\d{8}$/;
    return reg.test(mobile);
}

function toast(data) {
    var type = typeof(data);
    if (type == "object") {
        api.toast({
            msg: JSON.stringify(data),
            duration: 1000,
            location: 'bottom'
        });
    } else if (type == "string") {
        api.toast({
            msg: data,
            duration: 1000,
            location: 'bottom'
        });
    } else if (type == "function") {
        api.toast({
            msg: data.toString(),
            duration: 1000,
            location: 'bottom'
        });
    }
    else {
        _log(data);
    }
}

function fnConfirm(msg, confirmCallBack, cancelCallback = false, title = "提示") {
    api.confirm({
        title: title,
        msg: msg,
        buttons: ['确定', '取消']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if (index == 1) {
            confirmCallBack();
        } else {
            if (cancelCallback) cancelCallback();
        }
    });
}

function orderRelaodEvent() {
    api.sendEvent({
        name: 'reload-order-list'
    });
}

function fnSelectImage(callback, max = 5) {
    if (typeof UIAlbumBrowser == 'undefined') {
        UIAlbumBrowser = api.require('UIAlbumBrowser');
    }
    UIAlbumBrowser.open({
        max: max,
        type: 'image',
        isOpenPreview: false,
        styles: {
            bg: '#fff',
            mark: {
                icon: '',
                position: 'bottom_left',
                size: 20
            },
            nav: {
                bg: 'rgba(0,0,0,0.6)',
                titleColor: '#fff',
                titleSize: 18,
                cancelColor: '#fff',
                cancelSize: 16,
                finishColor: '#fff',
                finishSize: 16
            }
        },
        rotation: true
    }, function(ret) {
        if (ret) {
            if (ret.eventType == 'confirm') {
                if (typeof callback == 'function') {
                    callback(ret.list);
                }
            }
        }
    });
}

//删除数组对应位置的元素
function delArray(arr, idx) {
    var temp = [];
    for (var i in arr) {
        if (i != idx) {
            temp.push(arr[i]);
        }
    }
    return temp;
}
//上传文件
function uploadFile(url, files = [], param = {}) {
    if (files.length == 0) {
        fnAlert("请选择要上传的文件");
        return;
    }
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '上传文件中',
        text: '请勿关闭',
        modal: true
    });
    var upload_files = {};
    for (var i = 0; i < files.length; i++) {
        upload_files['file_' + i] = files[i];
    }
    return new Promise((resolve,reject)=>{
      api.ajax({
              url: root + url,
              method: 'post',
              timeout: 60,
              dataType: 'json',
              headers: {
                  "Token": getToken()
              },
              data: {
                  values: param,
                  files: upload_files
              }
          },
          function(res, err) {
            api.hideProgress();
            api.refreshHeaderLoadDone();
            if (res) {
                if (res.status == 1) {
                    resolve(res.data);
                } else if (res.status == -10) {
                    toast('请先登录');
                    return;
                } else {
                    fnAlert(res.data);
                }
            } else {
                fnAlert(err.msg);
                _log(err);
            }
          }
      );
    });

}

//上传文件
function uploadFile2(url, callback, file, param = {}) {
    if (!file) {
        fnAlert("请选择要上传的文件");
        return;
    }
    var upload_files = {};
    upload_files['file'] = file;


    api.ajax({
            url: root + url,
            method: 'post',
            timeout: 60,
            dataType: 'json',
            headers: {
                "Token": getToken()
            },
            data: {
                values: param,
                files: upload_files
            }
        },
        function(res, err) {
            if (res) {
                if (res.status == 1) {
                    callback(res.data);
                } else if (res.status == -10) {
                    login(url, callback, param);
                } else if (res.status == 2) {
                    _log(res);
                } else {
                    fnAlert(res.data);
                }
            } else {
                fnAlert(err.msg);
                _log(err);
            }

        }
    );
}

//上传文件
function uploadFile3(url, callback, file, param = {}) {
    if (!file) {
        fnAlert("请选择要上传的文件");
        return;
    }
    var upload_files = {};
    upload_files['file'] = file;
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '正在上传图片...',
        text: '请稍后...',
        modal: false
    });


    api.ajax({
            url: root + url,
            method: 'post',
            timeout: 60,
            dataType: 'json',
            headers: {
                "Token": getToken()
            },
            data: {
                values: param,
                files: upload_files
            }
        },
        function(res, err) {
            api.hideProgress();
            if (res) {
                if (res.status == 1) {
                    callback(res.data);
                } else if (res.status == -10) {
                    toast('请先登录');
                    return;
                } else {
                    fnAlert(res.data);
                }
            } else {
                fnAlert(err.msg);
                _log(err);
            }

        }
    );
}

function uploadFileNew(url,file, param = {}) {
    if (!file) {
        fnAlert("请选择要上传的文件");
        return;
    }
    var upload_files = {};
    upload_files['file'] = file;
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '正在上传图片...',
        text: '请稍后...',
        modal: false
    });
    return new Promise((resolve,reject)=>{
      api.ajax({
              url: root + url,
              method: 'post',
              timeout: 60,
              dataType: 'json',
              headers: {
                  "Token": getToken()
              },
              data: {
                  values: param,
                  files: upload_files
              }
          },
          function(res, err) {
              api.hideProgress();
              if (res) {
                  if (res.status == 1) {
                      resolve(res.data);
                  } else if (res.status == -10) {
                      toast('请先登录');
                      return;
                  } else {
                      fnAlert(res.data);
                  }
              } else {
                  fnAlert(err.msg);
                  _log(err);
              }

          }
      );
    });



}

function scrollToBottom(callback) {
    api.addEventListener({
        name: 'scrolltobottom',
        extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function(ret, err) {
        callback();
    });

}

function refresh(callback, bgColor = "#ccc") {
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: bgColor,
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function(ret, err) {
        callback();
    });
}

function isUrl(url) {
    if (!url) {
        return false;
    }
    if (url.indexOf('http://') != -1 || url.indexOf('https://') != -1) {
        return true;
    }
    return false;
}

function fnScanner(callback = false) {
    if (typeof FNScanner == 'undefined') {
        FNScanner = api.require('FNScanner');
    }
    FNScanner.openScanner({
        autorotation: true
    }, function(ret, err) {
        if (ret.eventType == 'success') {
            if (typeof callback == 'function') {
                callback(ret.content);
            }
        }
    });
}

function ToJson(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return obj;
            } else {
                return false;
            }

        } catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
}
var aliPayPlus = null;

function alipay(data, callback) {
    if (!aliPayPlus) {
        aliPayPlus = api.require('aliPayPlus');
    }
    if (data.alipay.url) {
        aliPayPlus.payOrder({
            orderInfo: data.alipay.url
        }, function(ret, err) {
            if (ret.code == 9000) {
                callback(data);
            } else {
                toast('支付失败');
            }
        }.bind(this));
    } else {
        toast('支付参数错误');
    }
}
var wxPayPlus = null;

function wechatpay(data, callback) {
    if (!wxPayPlus) {
        wxPayPlus = api.require('wxPayPlus');
    }

    var param = {
        apiKey: data.wechat.appid,
        orderId: data.wechat.prepayid,
        mchId: data.wechat.partnerid,
        nonceStr: data.wechat.noncestr,
        timeStamp: data.wechat.timestamp,
        package: data.wechat.package,
        sign: data.wechat.sign
    }
    wxPayPlus.payOrder(param, function(ret, err) {
        if (ret.status) {
            //支付成功
            callback(data);
        } else {
            toast('取消支付');
        }
    });
}

function fnInitWindow() {
    api.addEventListener({
        name: 'navitembtn'
    }, function(ret, err) {
        if (ret.type == 'left') {
            api.closeWin();
        }
    });
}
var picker=null;
var g_city=null
function fnCityPicker(city, selectedIndex = [0, 0, 0], callback) {
    if(!city){
      if(!g_city){
        g_city=getCityList();
      }
      city=g_city;
    }
    if(!picker){
      var first = [];
      /* 省，直辖市 */
      var second = [];
      /* 市 */
      var third = [];

      /* 默认选中的地区 */

      var checked = [0, 0, 0];

      /* 已选选项 */
      function creatList(obj, list) {
          obj.forEach(function(item, index, arr) {
                  var temp = new Object();
                  temp.text = item.name;
                  temp.value = index;
                  list.push(temp);
              }

          )
      }

      creatList(city, first);

      if (city[selectedIndex[0]].hasOwnProperty('sub')) {
          creatList(city[selectedIndex[0]].sub, second);
      } else {
          second = [{
                  text: '',
                  value: 0
              }

          ];
      }

      if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
          creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
      } else {
          third = [{
                  text: '',
                  value: 0
              }

          ];
      }

      picker = new Picker({
             data: [first, second, third],
             selectedIndex: selectedIndex,
             title: '地址选择'
         }

     );

     picker.on('picker.select', function(selectedVal, selectedIndex) {
         var text1 = first[selectedIndex[0]].text;
         var text2 = second[selectedIndex[1]].text;
         var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
         var back = {
             actives: selectedVal,
             text1: text1,
             text2: text2,
             text3: text3
         }
         if (callback) {
             callback(back);
         }
     });
     picker.on('picker.change', function(index, selectedIndex) {
             if (index === 0) {
                 firstChange();
             } else if (index === 1) {
                 secondChange();
             }

             function firstChange() {
                 second = [];
                 third = [];
                 checked[0] = selectedIndex;
                 var firstCity = city[selectedIndex];

                 if (firstCity.hasOwnProperty('sub')) {
                     creatList(firstCity.sub, second);

                     var secondCity = city[selectedIndex].sub[0]
                     if (secondCity.hasOwnProperty('sub')) {
                         creatList(secondCity.sub, third);
                     } else {
                         third = [{
                                 text: '',
                                 value: 0
                             }

                         ];
                         checked[2] = 0;
                     }

                 } else {
                     second = [{
                             text: '',
                             value: 0
                         }

                     ];

                     third = [{
                             text: '',
                             value: 0
                         }

                     ];
                     checked[1] = 0;
                     checked[2] = 0;
                 }

                 picker.refillColumn(1, second);
                 picker.refillColumn(2, third);
                 picker.scrollColumn(1, 0)
                 picker.scrollColumn(2, 0)
             }

             function secondChange() {
                 third = [];
                 checked[1] = selectedIndex;
                 var first_index = checked[0];

                 if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                     var secondCity = city[first_index].sub[selectedIndex];
                     creatList(secondCity.sub, third);
                     picker.refillColumn(2, third);
                     picker.scrollColumn(2, 0)
                 } else {
                     third = [{
                             text: '',
                             value: 0
                         }

                     ];
                     checked[2] = 0;
                     picker.refillColumn(2, third);
                     picker.scrollColumn(2, 0)
                 }

             }

         }

     );

    }
    picker.show();
}

//图片质量压缩  图片对象 压缩之后的宽度
function photoCompress(img, width) {
    var w = img.width,
        h = img.height,
        // 宽高比例
        scale = w / h;
    var height = width / scale;

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    //将图片绘制到canvas
    var cxt = canvas.getContext("2d");
    cxt.drawImage(img, 0, 0, width, height);
    var dd = canvas.toDataURL();
    return dd
}

//获取当前时间戳
function time() {
    return Date.parse(new Date()) / 1000;
}

function canvasToImage(canvas, callback) {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '正在生成图片',
        text: '请稍后',
        modal: false
    });

    var imgName = time() + '.png';
    var trans = api.require('trans');

    trans.saveImage({
        base64Str: canvas.toDataURL().replace("data:image/png;base64,", "").replace('data:image/jpeg;base64,', ''),
        album: true,
        imgPath: "fs://canvas_imgs/",
        imgName: imgName
    }, function(ret, err) {
        api.hideProgress();
        if (ret.status) {
            callback("fs://canvas_imgs/" + imgName);
        } else {
            fnAlert(JSON.stringify(err));
        }
    });
}

function isempty(obj) {
    if (!obj) return true;
    for (var i in obj) {
        return false;
    }
    return true;
}

function toInt(data) {
    if (!data) return 0;
    var t = parseInt(data);
    if (isNaN(t)) {
        return 0;
    }
    return t;
}



function getPicture(callback) {
    api.getPicture({
        sourceType: 'library',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 100,
        targetWidth: 300,
        saveToPhotoAlbum: false
    }, function(ret, err) {
        if (ret.data) {
            callback(ret.data);
        }
    });
}
function getPictureNew() {
  return new Promise((resolve,reject)=>{
    api.getPicture({
        sourceType: 'library',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 100,
        targetWidth: 800,
        saveToPhotoAlbum: false
    }, function(ret, err) {
        if (ret.data) {
            resolve(ret.data);
        }
    });
  })

}


function evaluate(d){
    math.config({number: 'BigNumber'});
    return math.evaluate(d);
}

function getCityList(){
  var cityList = api.readFile({
      path: "widget://res/city.json",
      sync: true
  });

  return JSON.parse(cityList);
}


function t_url(url){
  if(url.indexOf('http://')==-1&&url.indexOf('https://')==-1){
    return "http://"+url;
  }else{
    return url;
  }
}
function openFrame(url,obj={}){
  api.openFrame({
      name: url,
      url: 'widget://html/'+url+'.html',
      rect: {
          x: 0,
          y: 0,
          w: 'auto',
          h: 'auto'
      },
      pageParam: obj,
      animation:{
        type:"movein",
        subType:"from_bottom",
        duration:300
      },
      bounces: false,
      bgColor: 'rgba(0,0,0,0)',
      vScrollBarEnabled: true,
      hScrollBarEnabled: true
  });
}

function getActives(cityList,position){
  let actives=[0,0,0];
  let arr=position.split(' ');
  if(arr[0]){
    for(var i in cityList){
      if(cityList[i].name==arr[0]||cityList[i].name.indexOf(arr[0])!=-1){
        actives[0]=i;
        for(var j in cityList[i].sub){
          if(cityList[i].sub[j].name==arr[1]||cityList[i].sub[j].name.indexOf(arr[1])!=-1){
            actives[1]=j;
            for(var k in cityList[i].sub[j].sub){
              if(cityList[i].sub[j].sub[k].name==arr[2]||cityList[i].sub[j].sub[k].name.indexOf(arr[2])!=-1){
                actives[2]=k;
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
  }
  return actives;
}

function selectAction(buttons,back_result=false){
  return  new Promise((resolve,reject)=>{
    api.actionSheet({
        title: '请选择',
        cancelTitle: '取消',
        buttons: buttons
    }, function(ret, err){
      if(back_result){
        //返回选中结果
        if(ret.buttonIndex<=buttons.length){
          resolve(buttons[ret.buttonIndex-1]);
        }
      }else{
        //返回选中index
        resolve(ret.buttonIndex);
      }

    });
  })
}

function getCacheObj(key){
  let obj=api.readFile({
      sync: true,
      path: 'fs://obj/'+key+'.txt'
  });
  if(!obj){
    return {};
  }
  obj=JSON.parse(obj);
  return obj;
}
function setCacheObj(key,obj){
    let data="";
    if(typeof(obj)!="object"){
      data=obj;
    }else{
     data=JSON.stringify(obj);
    }
    api.writeFile({
        path: 'fs://obj/'+key+'.txt',
        data: data
    }, function(ret, err) {

    });

}
function getUserInfo(){
  return getCacheObj('user-info');
}
function setUserInfo(data){
  setCacheObj('user-info',data)
}
function accountList(account,nickname,action='refresh'){
  let list=getCacheObj('account-list');
  if(action=='refresh'){
    list[account]=nickname;
  }
  if(action=='deleted'){
    delete list[account];
  }
  setCacheObj('account-list',list);
}
apiready=function(){
  var _vm;
  api.addEventListener({
      name:'navitembtn'
  },function(ret, err){
    if(ret.type=='left'){
      api.closeWin();
    }

    if(ret.type=='right'){
      if(_vm&&typeof(_vm.rightClick)=='function'){
        _vm.rightClick();
      }
    }
  });
  if(typeof(apiLoad)=='function'){
    apiLoad(vm=>{
      _vm=vm;
      //谁监听VM全局变量
      api.addEventListener({
          name: 'reload-user-info-success'
      }, function(ret, err){
        vm.userInfo=getCacheObj('user-info');
      });
    });
  }
}

function getYearAndMonth(start, end='') {
    var result = [];
    var starts = start.split('-');
    if(!end){
      var date=new Date();
      end=date.getFullYear()+"-"+(date.getMonth()+1);
    }
    var ends = end.split('-');
    var staYear = parseInt(starts[0]);
    var staMon = parseInt(starts[1]);
    var endYear = parseInt(ends[0]);
    var endMon = parseInt(ends[1]);
    while (staYear <= endYear) {
        if (staYear === endYear) {
            while (staMon < endMon) {
                staMon++;
                var str = staYear + '年'+(staMon >= 10 ? staMon : '0' + staMon)+"月";
                result.push(str);
            }
            staYear++;
        } else {
            staMon++;
            if (staMon > 12) {
                staMon = 1;
                staYear++;
            }
            var str = staYear + '年'+(staMon >= 10 ? staMon : '0' + staMon)+"月";
            result.push(str);
        }
    }
    return result;
}
function reloadUserInfo(){
  api.sendEvent({
      name: 'reload-user-info'
  });

}



function shareWebpage(obj,callback){
  var wxPlus=api.require('wxPlus')
  var shareObj={
      scene: obj.scene,
      title:obj.title,
      description:obj.des,
      contentUrl:obj.url,
  };
  api.showProgress({
      style: 'default',
      animationType: 'fade',
      title: '努力加载中...',
      text: '请稍后...',
      modal: false
  });
  if(obj.thumb){
    cacheImage(Vue.prototype.tImage(obj.thumb)).then(data=>{
      api.hideProgress();
      shareObj.thumb=data.url;
      wxPlus.shareWebpage(shareObj,function(ret,err){
        api.hideProgress();

        if (!ret.status) {
          fnAlert(err.code);
        }else{
          if(typeof(callback)=='function'){
            callback();
          }
        }
      });
    }).catch(err=>{
      api.hideProgress();
      fnAlert(err);
    })
  }else{
    wxPlus.shareWebpage(shareObj,function(ret,err){
      api.hideProgress();
      if (!ret.status) {
        fnAlert(err.code);
      }else{
        if(typeof(callback)=='function'){
          callback();
        }
      }
    });
  }

}
