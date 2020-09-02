<template>
  <div>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList:"cate/changeCate"
    })
  },
  mounted() {
    this.reqList();
  },
  watch: {
    list:{
      handler(){
      if(this.list.length > 0){
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            title: {
                text: '商品分类'
            },
            tooltip: {},
            legend: {
                data:['详情']
            },
            xAxis: {
              data:this.list.map(item => item.catename)
                // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '详情',
                type: 'line',
              data:this.list.map(item => item.children.length)
                // data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option);


      }
    }
    }
  }
}


</script>
<style scoped>
</style>