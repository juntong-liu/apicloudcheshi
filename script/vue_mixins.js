var list={
  data(){
    return {
      list:[],
      url:'',
      page:1,
      isEnd:false,
      isLoading:false
    }
  },
  methods:{
    refresh(){
      if(!this.url){
        fnAlert('未定义URL');
        return;
      }
      this.list=[];
      this.page=1;
      this.isEnd=false;
      this.fnList();
    },
    fnList(){
      if(this.isLoading||this.isEnd)return;
      this.isLoading=true;

      ajax(this.url,this.getParams()).then(res=>{
        this.list=merge_list(this.list,res.list);
        this.isEnd=res.isEnd;
        this.isLoading=false;
        this.page+=1;
        // _log(res);
      })
    },
    getParams(){
      return {page:this.page}
    }
  },
  created(){
    scrollToBottom(function(){
      this.fnList();
    }.bind(this))
  }

}
