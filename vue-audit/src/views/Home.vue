<!--<template>-->
<!--  <div class="home" >-->
<!--    <ul class="goods-body">-->
<!--      <li v-for="(list,index) in goods.goodsData" :key="list.id">-->
<!--&lt;!&ndash;        <div class="goods-main">&ndash;&gt;-->
<!--&lt;!&ndash;          <img :src="list.image">&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div class="goods-info">-->
<!--          <h3 class="goods-title">{{ list.title }}</h3>-->
<!--          <p class="goods-price">¥ {{ list.price }}</p>-->
<!--          <div class="goods-compute">-->
<!--            <span class="goods-reduce" @click="reduceGoods(index)">-</span>-->
<!--            <input readonly v-model="list.num" />-->
<!--            <span class="goods-add" @click="addGoods(index)">+</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <div class="goods-footer">-->
<!--      <div class="goods-total">-->
<!--        合计：¥-->
<!--        {{ goods.totalPrice }}-->

<!--            getters里面的数据可以直接这样写-->
<!--            {{ totalPrice }}-->

<!--      </div>-->
<!--      <button class="goods-check" :class="{activeChecke: goods.totalNum <= 0}">去结账({{ goods.totalNum }})</button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// eslint-disable-next-line no-unused-vars-->
<!--import { mapState, mapGetters, mapMutations } from 'vuex'-->
<!--// @ is an alias to /src-->


<!--export default {-->
<!--  name: 'home',-->
<!--  components: {-->

<!--  },-->
<!--  computed: {-->
<!--    // count() {-->
<!--    //   return this.$store.state.goods.totalPrice-->
<!--    // },-->
<!--    ...mapState(['goods']),-->
<!--    ...mapGetters(['totalPrice', 'totalNum']),-->

<!--  },-->
<!--  methods: {-->
<!--    ...mapMutations(['reduceGoods', 'addGoods']),-->
<!--  },-->
<!--}-->
<!--</script>-->
