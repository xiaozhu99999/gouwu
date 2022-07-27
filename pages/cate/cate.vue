<template>
	<view>
		<view class="scroll-view-container">

			<!-- 左侧的滚动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh +'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-item',index === active ? 'active' : '']"
					@click="activeChanged(index)"
					>{{item.cat_name}}</view>
				</block>
			</scroll-view>
			
			<!-- 右侧的滚动区域 -->
			<scroll-view :scroll-top="scrollTop" class="right-scroll-view" scroll-y="true" :style="{height: wh +'px'}">
						<view class="cate-lv2" v-for="(item2,index2) in cateList2" :key="index2">
							<!-- 二级分类的标题 -->
							<view class="cate-lv2-title">
								/ {{item2.cat_name}} /
							</view>
							<!-- 二级分类下 的三级列表 -->
							<view class="cate-lv3-list">
								<view class="cate-lv3-item3" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)" >
									<!-- 图片 -->
									<image :src="item3.cat_icon"></image>
									<!-- 文本 -->
									<text>{{item3.cat_name}}</text>
								</view>
							</view>
						</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				wh:0,
				//当前选中项的索引，默认让第一项选中
				active:0,
				//分类列表的数据
				cateList:[],
				//分类二级列表的数据
				cateList2:[],
				//重置滚动条的位置
				scrollTop:0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			
			//获取列表数据的方法
			this.getCateList()
		},
		methods: {
			//定义分类列表的数据方法
			async getCateList() {
				const res = await uni.$http.get('/categories')
				//判断是否
				if(res.data.meta.status !== 200) return uni.$showMsg
				this.cateList = res.data.message
				
				//二级分类赋值
				this.cateList2 = res.data.message[0].children
			},
			//点击事件
			activeChanged(index) {
				this.active = index
				//二级分类列表赋值
				this.cateList2 = this.cateList[index].children
				
				//让 scrollTop 的值在 0 与 1 之间切换
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			 //点击跳转到商品列表页面
			gotoGoodsList(item3) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
		
		.left-scroll-view {
			width: 120px;
			
			.left-scroll-item {
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				
				&.active {
					background-color: #FFFFFF;
					position: relative;
					
					&::before {
						content: ' ';
						background-color: #C00000;
						position: absolute;
						display: block;
						width: 3px;
						height: 30px;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}
	.cate-lv2-title {
		  font-size: 12px;
		  font-weight: bold;
		  text-align: center;
		  padding: 15px 0;
	}
	.cate-lv3-list {
		display: flex;
		  flex-wrap: wrap;
		.cate-lv3-item3 {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			align-content: center;
			justify-content: center;
			image{
				width: 85px;
				height: 70px;
			}
			text{
				font-size: 12px;
				text-align: center;
			}
		}
	}

</style>
