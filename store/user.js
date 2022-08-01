export default {
	//开启命名空间
	namespaced: true,

	state: () => ({
		// 收货地址
		// 3. 读取本地的收货地址对象，初始化address对象
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	//方法
	mutations: {
		//更新收货地址
		updateAddress(state, address) {
			state.address = address
			// 2. 通过this.commit()方法，定义m_user模块下的saveAddressToStorage方法将address对象持久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 1. 定义将address持久化存储到本地的方法
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''

			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
