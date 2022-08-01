export default {
	//为当前模块开启命名空间
	namespaced: true,

	// 模块的state数据

	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	// 模块的mutations方法
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find(v => v.goods_id === goods.goods_id)

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		//存储转为字符串
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},

		// 更新购物车的勾选状态
		updateGoodsState(state, goods) {
			const findCart = state.cart.find(v => v.goods_id === goods.goods_id)

			//find 查找以后不为空，带这新值进入
			if (findCart) {
				//更新对应商品的勾选状态
				findCart.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		//更新购物车的数量
		updateGoodsCount(state, goods) {
			const findCount = state.cart.find(v => v.goods_id === goods.goods_id)

			if (findCount) {
				findCount.goods_count = goods.goods_count
				//持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		//根据id从购物车里面删除定义的信息
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(v => v.goods_id !== goods_id)

			//持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		// 全选反选的功能
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)

			//持久化存储到本地
			this.commit('m_cart/saveToStorage')
		}
	},

	// 计算属性  模块的 getters 方法
	getters: {
		total(state) {
			let c = 0
			state.cart.forEach(v => c += v.goods_count)
			return c
		},
		//动态渲染已勾选的总数量
		checked(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},

		// 已勾选的商品的总价
		checkedGoodsAmount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
			// reduce() 的返回值就是已勾选的商品的总价
			// 最后调用 toFixed(2) 方法，保留两位小数
			return state.cart.filter(x => x.goods_state)
				.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
				.toFixed(2)
		}
	}

}
