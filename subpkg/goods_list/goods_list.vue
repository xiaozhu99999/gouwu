<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
                     <my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj: {
					//查询关键词	
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				//商品列表的数据
				goodsList: [],
				//总数量，用来实现分页
				total: 0,
				//是否在请求数据
				isLoading:false
			};
		},
		methods: {
			// 获取商品列表数据的方法
			async getGoodsList(cd) {
				this.isLoading = true  //开启节流阀
				const { data:res } = await uni.$http.get('/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg
				
				//关闭节流阀
				this.isLoading = false
				// 只要数据请求完毕，就立即按需调用 cb 回调函数
				cd && cd()
				// 新旧数据拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			//下拉触底事件
			onReachBottom() {
				if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
				if(this.isLoading)return 
				//让页面数子增加 1
				this.queryObj.pagenum+=1
				// 调用获取商品列表数据的方法
				this.getGoodsList()
			},
			//下拉刷新
			onPullDownRefresh() {
				//将数据重置
				this.queryObj.pagenum = 1
				this.total = 0
				this.isLoading = false
				this.goodsList = []
				
				//重新发起请求
				this.getGoodsList(()=>uni.stopPullDownRefresh())
			},
			//点击跳转到详情页的事件
			gotoDetail(item) {
				// console.log(item.goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			//定义获取商品列表数据的方法
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">
	

</style>
