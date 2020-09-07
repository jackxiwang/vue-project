import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import {warningAlert} from '../util/alert'
import  router  from '../router/index'
const base = '/api'
// 请求拦截
axios.interceptors.request.use(config=>{
    if(config.url == base+'/api/userlogin'){
        return config
    }
   config.headers.authorization=store.state.user.msg.token;
    return config
})
// 响应拦截
axios.interceptors.response.use(res=>{
    console.log('======='+res.config.url+'=======');
    console.log(res);
    if(res.data.msg == '登录已过期或访问权限受限'){
        warningAlert('登录已过期或访问权限受限')
        store.dispatch('user/changeUserAction', {})
        router.push('/login')
    }
    return res;
})
/*-------------------------------------登录 ---------------------------------------*/
export const reqLogin = (data)=>{
    return axios({
        url:base+'/api/userlogin',
        method:'post',
        data:qs.stringify(data)
    })
}


/*-------------------------------------登录 ---------------------------------------*/

/*--------------------------------角色--------------------------------------------- */
// 角色列表添加
export const reqRoleAddList = (data)=>{
    return axios({
        url:base+'/api/roleadd',
        method:'post',
        data
    })
}
// 角色列表
export const reqRoleList = ()=>{
    return axios({
        url:base+'/api/rolelist',
        method:'get'
    })
}
// 角色单独一条
export const reqroleDetail = (id)=>{
    return axios({
        url:base+'/api/roleinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 角色修改
export const reqRoleReset = (data)=>{
    return axios({
        url:base+'/api/roleedit',
        method:'post',
        data:qs.stringify(data)
    })
}
// 角色删除
export const reqRoleDel=(id)=>{
    return axios({
        url:base +'/api/roledelete',
        method:'post',
        data:{
            id
        }
    })
}
/*--------------------------------------角色结束 --------------------------------*/

/*-------------------------------菜单---------------------------------------------- */

// 菜单列表添加
export const reqMenuaddList = (data)=>{
    return axios({
        url:base+'/api/menuadd',
        method:'post',
        data
    })
}
// 菜单列表
export const reqMenuList = (params)=>{
    return axios({
        url:base+'/api/menulist',
        method:'get',
        params
    })
}
// 菜单单独一条
export const reqMenuDetail = (id)=>{
    return axios({
        url:base+'/api/menuinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 菜单修改
export const reqMenuReset = (data)=>{
    return axios({
        url:base+'/api/menuedit',
        method:'post',
        data:qs.stringify(data)
    })
}
// 菜单删除
export const reqMenuDel=(id)=>{
    return axios({
        url:base +'/api/menudelete',
        method:'post',
        data:{
            id
        }
    })
}

/*--------------------------------------菜单结束 --------------------------------*/


/*-------------------------------管理员---------------------------------------------- */

// 管理员列表添加
export const reqUseraddList = (data)=>{
    return axios({
        url:base+'/api/useradd',
        method:'post',
        data
    })
}
// 管理员列表
export const reqUserList = (params)=>{
    return axios({
        url:base+'/api/userlist',
        method:'get',
        params
    })
}
// 管理员单独一条
export const reqUserDetail = (id)=>{
    return axios({
        url:base+'/api/userinfo',
        method:'get',
        params:{
            uid:id
        }
    })
}
// 管理员修改
export const reqUserReset = (data)=>{
    return axios({
        url:base+'/api/useredit',
        method:'post',
        data:qs.stringify(data)
    })
}
// 总数
export const reqUserTotal = ()=>{
    return axios({
        url:base+'/api/usercount',
        method:'get'
    })
}
// 管理员删除
export const reqUserDel=(id)=>{
    return axios({
        url:base +'/api/userdelete',
        method:'post',
        data:{
            uid:id
        }
    })
}

/*--------------------------------------管理员结束 --------------------------------*/



/*-------------------------------会员---------------------------------------------- */

// 会员列表
export const reqMemberList = ()=>{
    return axios({
        url:base+'/api/memberlist',
        method:'get',
    })
}
// 会员单独一条
export const reqMemberDetail = (id)=>{
    return axios({
        url:base+'/api/memberinfo',
        method:'get',
        params:{
            uid:id
        }
    })
}
// 会员修改
export const reqMemberReset = (data)=>{
    return axios({
        url:base+'/api/memberedit',
        method:'post',
        data:qs.stringify(data)
    })
}


/*--------------------------------------会员结束 --------------------------------*/

/*-------------------------------分类---------------------------------------------- */

// 分类列表添加
export const reqCateaddList = (params)=>{
    let data = new FormData();
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:base+'/api/cateadd',
        method:'post',
        data
    })
}
// 分类列表
export const reqCateList = (params)=>{
    return axios({
        url:base+'/api/catelist',
        method:'get',
        params
    })
}
// 分类单独一条
export const reqCateDetail = (id)=>{
    return axios({
        url:base+'/api/cateinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 分类修改
export const reqCateReset = (params)=>{
    let data = new FormData();
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:base+'/api/cateedit',
        method:'post',
        data
    })
}
// 分类删除
export const reqCateDel=(id)=>{
    return axios({
        url:base +'/api/catedelete',
        method:'post',
        data:qs.stringify({
            id
        })
    })
}

/*--------------------------------------分类结束 --------------------------------*/

/*-------------------------------商品规格---------------------------------------------- */

// 商品规格列表添加
export const reqSpecsaddList = (data)=>{
    return axios({
        url:base+'/api/specsadd',
        method:'post',
        data
    })
}
// 商品规格列表
export const reqSpecsList = (params)=>{
    return axios({
        url:base+'/api/specslist',
        method:'get',
        params
    })
}
// 商品规格单独一条
export const reqSpecsDetail = (id)=>{
    return axios({
        url:base+'/api/specsinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 商品规格修改
export const reqSpecsReset = (data)=>{
    return axios({
        url:base+'/api/specsedit',
        method:'post',
        data:qs.stringify(data)
    })
}
// 总数
export const reqSpecsTotal = ()=>{
    return axios({
        url:base+'/api/specscount',
        method:'get'
    })
}
// 商品规格删除
export const reqSpecsDel=(id)=>{
    return axios({
        url:base +'/api/specsdelete',
        method:'post',
        data:{
           id
        }
    })
}

/*--------------------------------------商品规格结束 --------------------------------*/


/*-------------------------------轮播图规格---------------------------------------------- */

// 轮播图规格列表添加
export const reqBannerAddList = (params)=>{
    let data = new FormData();
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:base+'/api/banneradd',
        method:'post',
        data
    })
}
// 轮播图规格列表
export const reqBannerList = ()=>{
    return axios({
        url:base+'/api/bannerlist',
        method:'get'
    })
}
// 轮播图规格单独一条
export const reqBannerDetail = (id)=>{
    return axios({
        url:base+'/api/bannerinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 轮播图规格修改
export const reqBannerReset = (params)=>{
    let data = new FormData();
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:base+'/api/banneredit',
        method:'post',
        data
    })
}
// 轮播图规格删除
export const reqBannerDel=(id)=>{
    return axios({
        url:base +'/api/bannerdelete',
        method:'post',
        data:{
           id
        }
    })
}

/*--------------------------------------轮播图规格结束 --------------------------------*/

/*-------------------------------商品管理---------------------------------------------- */

// 商品管理列表添加
export const reqGoodsAddList = (params)=>{
    let data = new FormData();
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:base+'/api/goodsadd',
        method:'post',
        data
    })
}
// 商品管理列表
export const reqGoodsList = (params)=>{
    return axios({
        url:base+'/api/goodslist',
        method:'get',
        params
    })
}
// 商品管理单独一条
export const reqGoodsDetail = (id)=>{
    return axios({
        url:base+'/api/goodsinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 商品管理修改
export const reqGoodsReset = (params)=>{
    let data = new FormData();
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:base+'/api/goodsedit',
        method:'post',
        data
    })
}
// 总数
export const reqGoodsTotal = ()=>{
    return axios({
        url:base+'/api/goodscount',
        method:'get'
    })
}
// 商品管理删除
export const reqGoodsDel=(id)=>{
    return axios({
        url:base +'/api/goodsdelete',
        method:'post',
        data:qs.stringify({
           id
        })
    })
}

/*--------------------------------------商品管理结束 --------------------------------*/

/*-------------------------------秒杀---------------------------------------------- */

// 秒杀列表添加
export const reqSeckAddList = (params)=>{
    
    return axios({
        url:base+'/api/seckadd',
        method:'post',
        data:qs.stringify(params)
    })
}
// 秒杀列表
export const reqSeckList = (params)=>{
    return axios({
        url:base+'/api/secklist',
        method:'get',
        params
    })
}
// 秒杀单独一条
export const reqSeckDetail = (id)=>{
    return axios({
        url:base+'/api/seckinfo',
        method:'get',
        params:{
            id
        }
    })
}
// 秒杀修改
export const reqSeckReset = (params)=>{

    return axios({
        url:base+'/api/seckedit',
        method:'post',
        data:qs.stringify(params)
    })
}

// 秒杀删除
export const reqSeckDel=(id)=>{
    return axios({
        url:base +'/api/seckdelete',
        method:'post',
        data:qs.stringify({
           id
        })
    })
}

/*--------------------------------------秒杀结束 --------------------------------*/