<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}"  @click="searchBoxHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			//背景颜色
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			//圆角样式
			radius: {
				type: Number,
				default: 18 //px
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchBoxHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		// background-color: #C00000;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		background-color: #ffffff;
		width: 100%;
		// border-radius: 15px;
		height: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.placeholder {
		margin-left: 5px;
		font-size: 15px;
	}
</style>
