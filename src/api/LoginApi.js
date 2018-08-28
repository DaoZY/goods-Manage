import http from '@/util/http'
import 'Base64'

class  LoginApi {

    login(params) {
        let user = {};
        user.userName = params.username;
        user.password = btoa(params.password);
        var url = '/authAction/shareAuth';
        return http.post(url, user);
    }

    getMenu(params) {
        var url = '/share-system/menu/getLeftMenuList';
        return http.post(url, params);
    }

    getUserInfo(params) {
        var url = '/share-system/userinfo/detail';
        return http.post(url, params);
    }

    logout(params) {
        var url = '/authAction/shareLogout';
        return http.post(url, params);
    }


}

export default LoginApi




