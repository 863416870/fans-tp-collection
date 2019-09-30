<template>
  <div class="out" :class="{ 'l-liang-out': isLLiang,'l-you-out':isLYou,'l-qing-out':isLQing,'l-zhong-out': isLZhong, 'l-zhongdu-out':isLZhongDu }" @mouseenter="onMouseOver" @mouseleave="onMouseout">
    <div class="in" :class="{ 'l-liang-in': isLLiang,'l-you-in':isLYou,'l-qing-in':isLQing,'l-zhong-in': isLZhong, 'l-zhongdu-in':isLZhongDu }"></div>
    <div class="point-info" v-if="seen">
      <div class="point-item">监测点：{{deviceName}}</div>
      <div class="point-item">位置：{{zoneName}}</div>
      <div class="point-item">首要污染物：{{pollutant}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Point',
    props:{
      deviceName:{
        type:String,
        require:true
      },
      zoneName:{
        type:String,
        require:true
      },
      pollutant:{
        type:String,
        require:true
      },
      api:{
        type:Number,
        require:true
      }
    },
    data(){
      return{
        seen: false,
        isLYou: false,
        isLLiang: false,
        isLQing: false,
        isLZhong: false,
        isLZhongDu: false,
      }
    },
    watch:{
      api:{
        handler(val) {
          this.setColor(val);
        },
        deep: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setColor(this.api)
      })
    },
    methods:{
      onMouseOver(){
        this.seen = true;
      },
      onMouseout: function(){
        this.seen = false;
      },
      setColor(val){
        if(val >=0 && val < 50){
          this.isLYou = true
        }else if(val >=50 && val < 100){
          this.isLLiang = true
        }else if(val >=101 && val < 150){
          this.isLQing = true
        }else if(val >=151 && val < 200){
          this.isLZhong = true
        }else{
          this.isLZhongDu = true
        }
      }
    },
    computed:{

    }
  };
</script>

<style lang="scss" scoped>
  .point-info{
    position: absolute;
    left: 0;
    top: 30px;
    padding: 10px;
    background: rgba(27, 74, 203, 0.75);
    border: solid 2px rgba(45, 250, 248, 0.75);
    border-radius: 10px;
    display: inline-block;
    width: 160px;
    .point-item{
      padding-bottom: 8px;
    }
  }
  .out{
    width: 20px;
    height: 20px;
    border: 2px solid #0cec41;
    border-radius: 50%;
    position: relative;
  }
  .in{
    width: 10px;
    height: 10px;
    background: #0cec41;
    border-radius: 50%;
    position: absolute;
    margin: auto;      /*以下五个属性为水平垂直居中的方法*/
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .l-liang-in{
    background-color: #03a7f3;
  }
  .l-liang-out{
    opacity: 0.85;
    border: 2px solid #03a7f3;
    box-shadow: 0 0 20px #03a7f3;
  }
  .l-you-in{
    background-color: #0cec41;
  }
  .l-you-out{
    opacity: 0.85;
    border: 2px solid #0cec41;
    box-shadow: 0 0 20px #0cec41;
  }
  .l-qing-in{
    background-color: #f7bc08;
  }
  .l-qing-out{
    opacity: 0.85;
    border: 2px solid #f7bc08;
    box-shadow: 0 0 20px #f7bc08;
  }
  .l-zhong-in{
    background-color: #e82505;
  }
  .l-zhong-out{
    opacity: 0.85;
    border: 2px solid #e82505;
    box-shadow: 0 0 20px #e82505;
  }
  .l-zhongdu-in{
    background-color: #000000;
  }
  .l-zhongdu-out{
    opacity: 0.85;
    border: 2px solid #000000;
    box-shadow: 0 0 20px #000000;
  }
</style>
