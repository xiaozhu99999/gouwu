<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<view class="search-box">
		  <my-search @click="gotoSearch"></my-search>
		</view>
		
		<!-- 轮播图的区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区域 -->
		  <view class="nav-list">
		  	<view class="nav-item" v-for="(v,index) in navList" :key="index" 
			@click="navClickHandler(v)">
		  		<image class="nav-img" :src="v.image_src"></image>
		  	</view>
		  </view>
		  
		  <!-- 楼层的区域 -->
		  <!-- 楼层的容器 -->
		  <view class="Fool">
			  <!-- 楼层的item项 -->
		  	<view class="Fool-item" v-for="(item,index) in foolList" :key="index">
				<!-- 楼层的标题 -->
		  		<image :src="item.floor_title.image_src" class="Fool-image"></image>
				<!-- 楼层图片区域 -->
				<view class="fool-img-box">
					<!-- 左侧图片区域 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧图片区域 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width +'rpx'}" mode="widthFix"></image>
						</navigator>
				</view>
		  	</view>
		  </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图的数据列表
				swiperList:[],
				//分类导航的数据列表
				navList :[],
				//获取楼层数据的列表
				foolList:[]
			};
		},
		onLoad() {
			//调用方法，获取轮播图的数据
			this.getSwiperList(),
			//调用获取导航的方法
			this.getNavList()
			//调用获取楼层的方法
			this.getFoolList()
			},
		methods: {
			//获取轮播图
			 async getSwiperList() {
				const { data:res } = await uni.$http.get('/home/swiperdata')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
				},
				//获取导航
				async getNavList() {
				const {data:res} =  await uni.$http.get('/home/catitems')
				if(res.meta.status !== 200 ) return uni.$showMsg
				this.navList = res.message
				},
				//切换分类的点击事件
				navClickHandler(v) {
					if(v.name === '分类') {
						uni.switchTab({
							url:'/pages/cate/cate',
							
						})
					}
				},
				//定义获取楼层的方法
				async getFoolList() {
					const res = await uni.$http.get('/home/floordata')
				if(res.data.meta.status !== 200) return uni.$showMsg
				res.data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
						})
					})
					
					this.foolList = res.data.message
				},
				gotoSearch() {
				  uni.navigateTo({
				    url: '/subpkg/search/search'
				  })
				}
		}
	}

</script>

<style lang="scss">
	swiper {
		height: 333rpx;
		.swiper-item,
		image{
			width: 100%;
			height: 100%;
		}
	}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.Fool-image{
	width: 100%;
	height: 60rpx;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
}
.fool-img-box{
	display: flex;
}
.search-box{
	position: sticky;
	top: 0	;
	z-index: 999;
}
</style>
