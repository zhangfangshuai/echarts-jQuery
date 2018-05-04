/**
 * Created: dameng by webstorm
 * Date: 2017/11/16 11:46
 * Update: zhangfs by Atom
 * Date: 2018/04/24 15:32
 */
$(function () {
    // reportEntry();
    localStorage.user && $('.userName').val(localStorage.user);
    localStorage.password && $('.wordsName').val(localStorage.password);

    $('.loginBtn').on('click', function(){
        if(!$('.userName').val()){
            Tip.success('请输入用户名');
            return false;
        };
        if(!$('.wordsName').val()){
            Tip.success('请输入密码');
            return false;
        };

        buildAjax('get', 'loginOn', {username: $('.userName').val(), password: $('.wordsName').val()}, false, false, function(res){
            localStorage.user = $('.userName').val();
            localStorage.password = $('.wordsName').val();
            // reportEvent('用户登录');
            try {
                sessionStorage.token = res.data.token;
                sessionStorage.nickname = res.data.nickname;
                sessionStorage.entryTime = new Date().toISOString();
                sessionStorage.ip = returnCitySN.cip;
                sessionStorage.address = returnCitySN.cname;
                sessionStorage.platform = window.navigator.platform;
                var md = new MobileDetect(window.navigator.userAgent);
                sessionStorage.device = md.mobile() +'-'+ md.os();

                buildAjax('get', 'getMenu', {}, false, false, function(res) {
                    if (res.data.length == 0) {
                        Tip.success('您没有访问权限');
                        // reportEvent('没有访问权限');
                        return;
                    }
                    for (let d of res.data) {
                        for (let m of menuConfig) {
                            if (d.menuId == m.id) {
                                sessionStorage.page = m.page;
                                // reportLeave();
                                window.location.href = './html/' + m.page + '.html?v=' + version;
                                return;
                            }
                        }
                    }
                    Tip.success('您没有访问权限');
                    // reportEvent('没有访问权限');
                })
            } catch (e) {
                // reportEvent('登录失败');
            }
        }, function(res){
            // reportEvent('登录失败');
        });
    })
})

//
// function buildAjax (method, uri, data, ayc, hasarrparam, s, f) {
//     if (uri != "loginOn" )  { data.token = sessionStorage.token; }
//     $.ajax({
//         url: http + 'mobile/' + uri,
//         type: method,
//         async: ayc,
//         dataType: 'json',
//         traditional: hasarrparam,
//         data: data,
//         success: (r) => {
//             if (r) {
//                 if (r.code != 200) {
//                     Tip.success(r.desc);
//                     return;
//                 }
//                 s && s(r);
//             } else {
//                 Tip.success('请求' + i + '错误');
//             }
//         },
//         error: (r) => {
//             r ? Tip.success(r.desc) : Tip.success('请求' + i + '错误');
//             f && f(r);
//         }
//     });
// }
