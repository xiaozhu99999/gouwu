<template>
	<view>
		<!-- 添加收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress"> 请选择收货地址+</button>
		</view>

		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<!-- 上部分 -->
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16">
					</uni-icons>
				</view>
			</view>
			<!-- 收货地址下部分 -->
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addstr}}</view>
			</view>
		</view>


		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-addres",
		data() {
			return {
				// address: {}
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			//选择收货地址
			async chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				const [fail, success] = await uni.chooseAddress().catch(fail => fail)

				if (fail === null && success.errMsg === 'chooseAddress:ok') {
					this.updateAddress(success)
				}
				//用户没有授权
				if (fail && fail.errMsg === "chooseAddress:fail cancel") {
					this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
				}
			},
			async reAuth() {
				const [err, confirmResult] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去设置打开',
					confirmText: '确认',
					cancelText: '取消',
				})
				if (err) return
				console.log(confirmResult)

				if (confirmResult.cancel) return uni.$showMsg('你取消了地址授权')
				if (confirmResult.confirm) return uni.openSetting({
					success: (settingResult) => {
						console.log(settingResult)
						if (!settingResult.authSetting['scope.address']) return uni.$showMsg('你取消了授权')
						if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功')
					}
				})


			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr'])
		}
	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 渲染收货信息的盒子
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
