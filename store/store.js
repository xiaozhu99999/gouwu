// 导入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入购物车的 vuex 模块
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'

//将vuex安装 为vue插件
Vue.use(Vuex)

// new 创建个store实例对象
const store = new Vuex.Store({
	// 挂载store模块
	modules: {
		// 2. 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
		//    购物车模块中 cart 数组的访问路径是 m_cart/cart
		m_cart: moduleCart,
		//用户收货地址存储vuex
		m_user: moduleUser
	},
})

//向外共享 store 实例对象
export default store
