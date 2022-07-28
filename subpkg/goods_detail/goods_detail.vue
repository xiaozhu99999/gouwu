<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
		    <image :src="item.pics_big" @click="preview(i)"></image>
		  </swiper-item>
		</swiper>
		
		
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				    <view class="goods-name">{{goods_info.goods_name}}</view>
				    <!-- 收藏 -->
				    <view class="favi">
				      <uni-icons type="star" size="18" color="gray"></uni-icons>
				      <text>收藏</text>
				    </view>
			</view>
			<!-- 运费 -->
			<view class="yf">
				快递：免运费
			</view>
		</view>
		
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 商品底部导航区域 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				 options: [{
							icon: 'shop',
							text: '店铺',
							// info: 2,
							// infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							// info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			};
		},
		
		onLoad(options) {
			//获取商品的id
			const goods_id = options.goods_id
			// 调用方法
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 获取数据方法，
			async getGoodsDetail(goods_id) {
				const res = await uni.$http.get('/goods/detail',{goods_id})
				if(res.data.meta.status !== 200 ) return uni.$showMsg
				
               res.data.message.goods_introduce = res.data.message.goods_introduce
			   .replace(/<img /g,'<img style="display:block;"').replace(/webp/g,'jpg')
				this.goods_info = res.data.message
				
			},
			//点击图片显示大图事件
			preview(i) {
				uni.previewImage({
					//预览时，默认显示索引图片的索引
					current:i,
					//所有图片 url 地址的数组
					urls: this.goods_info.pics.map( item => item.pics_big)
				})
			},
			// 点击跳转到购物车页面事件
			onClick(e) {
				if(e.content.text === '购物车') {
					//切换到购物车页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	
	swiper {
	  height: 750rpx;
	
	  image {
	    width: 100%;
	    height: 100%;
	  }
	}
	
	// 商品信息区域的样式
	.goods-info-box {
	  padding: 10px;
	  padding-right: 0;
	  
	    .price {
	      color: #c00000;
	      font-size: 18px;
	      margin: 10px 0;
	    }
		
	  .goods-info-body {
		  display: flex;
		  justify-content:space-between;
		  
		     .goods-name {
		        font-size: 13px;
		        padding-right: 10px;
		      }
			  //收藏区域
			  .favi {
				  width: 120px;
				  font-size: 12px;
				  display: flex;
				  flex-direction: column;
				  justify-content: center;
				  align-items: center;
				  border-left: 2px solid #efefef;
				  color: gray;
			  }
		}
		// 运费
		.yf {
		  margin: 10px 0;
		  font-size: 12px;
		  color: gray;
		}
	  }

.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}
.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
