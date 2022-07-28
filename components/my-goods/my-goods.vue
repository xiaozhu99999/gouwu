<template>
	<view>
		<view class="goods-item">
			<!-- 左侧的盒子 -->
			<view class="goods-item-left">
				<image :src="item.goods_small_logo || imgdizi" class="goods-pic"></image>
			</view>
		
			<!--右侧的盒子 -->
			<view class="goods-item-right">
				<!-- 商品的	名字 -->
				<view class="goods-name">{{item.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		    // 定义 props 属性，用来接收外界传递到当前组件的数据
		    props: {
		      // 商品的信息对象
		      item: {
		        type: Object,
		        defaul: {},
		      },
		    },
		data() {
			return {
				//图片加载不出来后，备用图片
				imgdizi:'https://img2.baidu.com/it/u=1905569806,3041692410&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1659114000&t=a88d8f7d4076ffc23064cb9d9fc710be'
			};
		},
		// 过滤器
		filters: {
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">

.goods-item {
	  display: flex;
	  padding: 10px 5px;
	  border-bottom: 1px solid #f0f0f0;
	
	  .goods-item-left {
	    margin-right: 5px;
	
	    .goods-pic {
	      width: 100px;
	      height: 100px;
	      display: block;
	    }
	  }
	
	  .goods-item-right {
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	
	    .goods-name {
	      font-size: 13px;
	    }
	
	    .goods-price {
	      font-size: 16px;
	      color: #c00000;
	    }
	  }
	}
</style>