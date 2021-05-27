if(typeof(Vue)=="function"){
  Vue.component('qcqitem',{
    template:
    `
    <div :class="{qcqnrli:detail.status==0,qcqnrli2:detail.status!=0}" @click="_itemClick">
      <div class="qcqnrliz">
        <div class="qcqnrlizs">¥<span class="qcqnrlizsje">{{parseFloat(detail.num)||0}}</span></div>
        <div class="qcqnrlizx f22" v-if="detail.status==0">立即使用</div>
        <div class="qcqnrlizx2 f22" v-else-if="detail.status==1">已使用</div>
        <div class="qcqnrlizx2 f22" v-else>已失效</div>
      </div>
      <div class="qcqnrliy">
        <div class="qcqnrliymz f30"> 七彩券</div>
        <div class="qcqnrliyyxq f24 qhsz"> 有效期：{{date("Y-m-d",detail.create_time)}}—{{date("Y-m-d",detail.end_time)}}</div>
        <div class="qcqnrliyfw  f24 qhsz"> 适用范围：集市</div>
      </div>
      <div v-if="detail.status==-1" class="qcq_sxt"><img class="qcq_sxtt" src="../image/ysx.png"></div>
    </div>
    `,
    methods:{
      _itemClick(){
        this.$emit('click');
      }
    },
    props:{
      detail:{
        type:Object,
        default(){
          return {}
        }
      }
    }

  })
  Vue.component('share',{
    template:
    `
    <div>
      <div class="share-body-mask" @click="fnShareType('cancel')"></div>
      <div class="share-content">
        <div class="share-body-title">分享到</div>
        <div class="share-box">
          <div class="share-item" @click="fnShareType('session')">
            <img src="../icon/wxhy1.png" class="img">
            <div class="share-title">微信好友</div>
          </div>
          <div class="share-item" @click="fnShareType('timeline')">
            <img src="../icon/wxpyq1.png" class="img">
            <div class="share-title">微信朋友圈</div>
          </div>
        </div>
      </div>
    </div>
    `,
    methods:{
      fnShareType(type){
        this.$emit('type',type)
      }
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      show(v){

        if(v){
          $api.dom('.share-body-mask').style.display='block';
        }else{
          $api.dom('.share-body-mask').style.display='none';
        }
        $(".share-content").slideToggle(200);


      }
    }

  })
  Vue.component('selectpayway',{
    template:
    `
    <div>
      <div class="share-body-mask" @click="fnShareType('cancel')"></div>
      <div class="share-content">
        <div class="share-body-title">选择支付方式</div>
        <div class="share-box">
          <div class="share-item" @click="fnShareType('wechat')">
            <img src="../icon/wxzf.png" class="img">
            <div class="share-title">微信</div>
          </div>
          <div class="share-item" @click="fnShareType('alipay')">
            <img src="../icon/zfb.png" class="img">
            <div class="share-title">支付宝</div>
          </div>
          <div class="share-item" @click="fnShareType('credit')">
            <img src="../icon/yuezf.png" class="img">
            <div class="share-title">余额</div>
          </div>
        </div>
      </div>
    </div>
    `,
    methods:{
      fnShareType(type){
        this.$emit('type',type)
      }
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      show(v){

        if(v){
          $api.dom('.share-body-mask').style.display='block';
        }else{
          $api.dom('.share-body-mask').style.display='none';
        }
        $(".share-content").slideToggle(200);


      }
    }

  })

  //组件
  Vue.component('status-bar',{
    template:
    `
    <div>
      <div :style="{height:height,background:bg}" class="status-bar"></div>
      <div :style="{height:height,background:bg}"></div>
    </div>
    `,
    props:{
      bg:{
        default:String,
        default:'rgba(0,0,0,0)'
      }
    },
    data(){
      return{
        height:"undefined" == typeof(api)?'30px':api.safeArea.top+'px'
      }
    }
  })
  Vue.component('title-bar',{
    template:
    `
    <div>
      <div class="r_tit title-bar" :style="style">
        <status-bar ></status-bar>
        <div class="r_titnr s_titnr gg">
          <slot name="left" class="r_titl" >
            <img class="r_titltp" src="../image/hfh.png" @click="leftClick()">
          </slot>
          <div class="r_titm f36">{{title}}</div>
          <slot name="right"></slot>
        </div>
      </div>
      <div :style="{height:height}"></div>
    </div>
    `,
    props:{
      bg:{
        type:String,
        default:'rgba(0,0,0,0)'
      },
      title:{
        default:String,
        default:''
      },
      color:{
        type:String,
        default:'#fff'
      },
      _class:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        height:0
      }
    },
    computed:{
      style(){
        let style={};
        if(this.color){
          style.color=this.color;
        }
        if(this.bg){
          style.background=this.bg;
        }
        return style;
        // :style="{color:color,background:bg}"
      }
    },
    methods:{
      leftClick(){
        api.closeWin();
      }
    },
    mounted(){
      this.height=$api.dom('.title-bar').offsetHeight+'px';
    }
  })
  Vue.component('top-bar',{
    template:
    `
    <div>
      <div class="s_tit s_titk" :style="{background:bg}">
        <status-bar :bg="bg"></status-bar>
        <div class="s_titnr gg">
          <div class="s_titz">
            <img class="s_tittx" :src="icon">
          </div>
          <div class="s_titm">
            <form action="" class="sc_tjbd" @click="interfaceGoodsList()">
              <input type="text" class="sc_search" placeholder="请输入搜索关键字" readonly>
              <img class="sc_fdj" src="../image/fdj.png">
            </form>
          </div>
          <div class="s_tity">
            <div class="s_tityz"><img class="s_tityzt" src="../image/syrw.png"></div>
            <div class="s_tityy">
              <img class="s_tityyt" src="../image/syxx.png">
              <div class="s_tityd"></div>
            </div>
          </div>
        </div>
      </div>
      <div :style="{height:height}"></div>
    </div>
    `,
    props:{
      bg:{
        type:String,
        default:''
      },
      icon:{
        type:String,
        default:'../image/tx.png'
      }
    },
    data(){
      return{
        height:0
      }
    },
    mounted(){
      this.height=($api.dom('.s_tit').offsetHeight-1)+'px';
    }
  })

  Vue.component('select-area',{
    template:
    `<div class="thyy gg f28" @click="fnSelectArea">
      <div class="thyyz">{{title}}</div>
      <div class="thyyy">
        <span style="flex:1;text-align:right;margin-right:10px;">{{areas||'选择区域'}}</span>
        <img class="jtdx" src="../icon/jt.png">
      </div>
    </div>`,
    data(){
      return{
        actives:[0,0,0],
        cityList:getCityList(),
        areas:''
      }
    },
    props:{
      area:{
        type:String,
        default:''
      },
      title:{
        type:String,
        default:'所在地区'
      },
      level:{
        type:[String,Number],
        default:3
      }
    },
    mounted(){
      this.areas=this.area;
      this.actives=getActives(this.cityList,this.areas);
    },
    methods:{
      fnSelectArea(){
        if(!this.level){
          toast('请选择代理类型');
          return;
        }
        fnCityPicker(this.cityList,this.actives,function(ret){
          this.actives=ret.actives;
          if(this.level==1){
            this.areas=ret.text1;
          }
          if(this.level==2){
            this.areas=ret.text1+" "+ ret.text2
          }
          if(this.level==3){
            this.areas=ret.text1+" "+ ret.text2+" "+ret.text3;
          }

          this.$emit('selectarea',this.areas);
        }.bind(this));
      }
    }
  })
  Vue.component('goods',{
    template:
    `
    <div class="goods-content-lb" @click="interfaceGoods(goods.id,goods.title,ext)">
      <div class="goods-content-lb-img">
        <img :src="tImage(goods.thumb)" onerror="this.src='../icon/nopic.png'">
        <div class="sold-out" v-if="goods.total<=0">
          已售完
        </div>
      </div>
      <div class="goods-content-text">
        <div class="goods-content-text-bt">{{goods.title}}</div>
        <div class="goods-content-text-price">
          ￥{{parseFloat(goods.marketprice)}}
        </div>
        <div class="goods-content-text-price2">
          <span v-if="goods.ug>0">+{{goods.ug}}浆果</span>
          <span v-if="goods.deduct>0">积分抵扣￥{{parseFloat(goods.deduct)}}</span>
        </div>
      </div>
    </div>`,
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        },
        required:true
      },
      ext:{
        type:Object,
        default(){
          return{}
        }
      }
    }
  })
  Vue.component('jiaoyi-item',{
    template:
    `<div>
      <div class="jiaoyi_bt" v-if="w.type==0">
        <p class="f30 lsz">卖出LDG</p>
        <p  class="f22 lsz lscd" v-if="w.chedan>0" style="color:#999;border:1px solid #999">已撤单</p>
        <p  class="f22 lsz lscd" @click="fnCd" v-else>撤单</p>
      </div>
      <div class="jiaoyi_bt" v-if="w.type==1">
        <p class="f30 csz">买入LDG</p>
        <p  class="f22 csz cscd" v-if="w.chedan>0" style="color:#999;border:1px solid #999">已撤单</p>
        <p  class="f22 csz cscd" @click="fnCd" v-else>撤单</p>
      </div>
      <div @click="interfaceJyls(w.id)">
        <div class="jiaoyi_wz f22 hsz"><span>单价</span><span>数量</span><span>成交额</span></div>
        <div class="jiaoyi_sj f28 "><span>{{parseFloat(w.price)}}</span><span>{{w.total}}</span><span>{{w.total-w.num-w.chedan}}</span></div>
      </div>
    </div>`,
    props:{
      w:{
        type:Object,
        required:true,
        default(){
          return {}
        }
      }
    },
    methods:{
      fnCd(){
        //撤单
        fnConfirm('确定撤单么？',function(){
          ajax('ud.ds.cd',{id:this.w.id}).then(res=>{
            toast(res);
            reloadUserInfo();
            api.sendEvent({
                name: 'cd-success'
            });
          })
        }.bind(this))
      },
    }
  })

  Vue.component('videoitem',{
    template:
    `<div class="in_yxli" @click="interfaceVideoDetail(video.id)">
      <img class="sxy_yxlit" :src="tImage(video.poster_url)">
      <div class="in_yxlibt f28">{{video.title}}</div>
      <div class="sxy_yx f22 qhsz">{{tCount(video.watch_count)}}人已学</div>
    </div>`,
    props:{
      video:{
        type:Object,
        required:true,
        default(){
          return {}
        }
      }
    },
    methods:{


    }
  })

  Vue.component('tanchuang',{
    template:
    `
    <div class="tanchuang-box" @touchmove.prevent>
      <div class="tanchuang-mask" @click="_cancel"></div>
      <div class="tanchuang-content"  @click="_ok" v-if="poster">
        <img :src="tImage(poster)" class='tanchuang-content-img'/>
      </div>
      <div class="tanchuang-content tanchuang-content-text"  @click="_ok" v-else>
        <div class="tanchuang-content-title">
          {{title}}
        </div>
        <div class="tanchuang-content-msg">
          {{msg}}
        </div>
        <div class="tanchuang-content-button">
          {{button}}
        </div>
      </div>
    </div>
    `,
    data(){
      return{
        show:false
      }
    },
    props:{
      type:{
        type:String,
        default:''
      },
      visible:{
        type:Boolean,
        default: false
      },
      title:{
        type:String,
        default:'提示'
      },
      msg:{
        type:String,
        default:'请输入提示'
      },
      button:{
        type:String,
        default:'确定'
      },
      poster:{
        type:String,
        default:''
      }
    },

    mounted(){

    },
    methods:{
      _cancel(){
        this.$emit('cancel',this.type)
      },
      _ok(){
        this.$emit('ok',this.type)
      }
    }
  })

  Vue.component('tuan-item',{
    template:
    `
    <li @click="interfaceMiniGroupGoods(goods.id)">
      <div class="tg-pt-conn-img">
        <img :src="tImage(goods.thumb)">
      </div>
      <div class="tg-pt-conn-text">
        <div class="tg-pt-conn-text-title">{{goods.title}}</div>
        <div class="tg-pt-conn-text-ct">
          <div class="tg-pt-conn-text-ct-num">{{goods.groupnum}}人团</div>
        </div>
        <div class="tg-pt-conn-text-price">
          <div class="tg-pt-conn-text-price-num">团购价￥{{parseFloat(goods.groupsprice)}}</div>
          <div class="tg-pt-conn-text-price-cy">马上抢</div>
        </div>
      </div>
    </li>
    `,
    data(){
      return {}
    },
    props:{
      goods:{
        type:Object,
        required:true,
        default(){
          return {}
        }
      }
    },
    methods:{}

  })
}
