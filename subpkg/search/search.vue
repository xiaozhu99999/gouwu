<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" radius="20" bgColor="pink" cancelButton="auto"></uni-search-bar>
		</view>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length > 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="qing"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				 <uni-tag :text="item2" v-for="(item2, i) in historys" :key="i" @click="gotoGoodsList(item2)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//延时器的timerid
				timer:null,
				//搜索关键词
				kw:'',
				//搜索建议列表的数组
				searchResults:[],
				//历史记录的数组
				historyList:['a','b','c']
			};
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchResults()	
				},500)
			},
			//搜索建议列表的方法
			async getSearchResults(){
				if(this.kw === ''){
					this.searchResults = []
					return
				}
				const res = await uni.$http.get('/goods/qsearch',{query:this.kw})
				if(res.data.meta.status !== 200) return uni.$showMsg
				this.searchResults = res.data.message
				
				this.saveSearchHistory()
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			// 搜索关键词添加到历史列表
			saveSearchHistory() {
				// this.historyList.push(this.kw)
				
				// new一个set对象出来
				const set = new Set(this.historyList)
				// 调用set对象的delete方法,移除相同的元素
				set.delete(this.kw)
				// 调用set对象add方法,向set添加元素
				set.add(this.kw)
				// 将set对象转换成数组
				this.historyList = Array.from(set)
				
				//调用uni.setStorageSync(key,value) 将搜索历史记录持久化存储到本地
				  uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 点击清楚按钮,清楚历史记录
			qing() {
				this.historyList = []
				//清空本地历史记录的数据
				 uni.setStorageSync('kw', '[]')
			},
			// 点击搜索历史跳转到商品列表页面
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		// 初始化生命周期函数
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		// 计算属性
		computed:{
		  	historys(){
				return[...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	
.search-box {
	position: sticky;
	top: 0;
	z-index: 99;
}

.sugg-list {
	padding: 0 5px;
}
.sugg-item {
	font-size: 12px;
	padding: 13px 0;
	border-bottom: 1px solid #efefef;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
	
	// 搜索历史记录
	.history-box {
	  padding: 0 5px;
	
	  .history-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 40px;
	    font-size: 13px;
	    border-bottom: 1px solid #efefef;
	  }
	
	  .history-list {
	    display: flex;
	    flex-wrap: wrap;
	
	    .uni-tag {
	      margin-top: 5px;
	      margin-right: 5px;
	    }
	  }
	}
</style>
