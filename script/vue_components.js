if(typeof(Vue)=="function"){
  //组件

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
    <div class="index-hy-conn-lb" @click="interfaceGoods(goods.id)">
      <div class="index-hy-conn-lb-img">
        <img :src="tImage(goods.thumb)" onerror="this.src='../icon/nopic.png'">
        <div class="sold-out" v-if="goods.total<=0">
          已售完
        </div>
      </div>
      <div class="index-hy-conn-text">
        <div class="index-hy-conn-text-bt">{{goods.title}}</div>
        <div class="index-hy-conn-text-price">￥{{parseFloat(goods.marketprice)}}<span v-if="goods.ug>0">+{{goods.ug}}浆果</span></div>
      </div>
    </div>`,
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        },
        required:true
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
