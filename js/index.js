/**
 * Created: dameng by webstorm
 * Date: 2017/11/16 11:46
 * Update: zhangfs by Atom
 * Date: 2018/04/24 15:32
 */

$(function () {
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

        buildAjax('get', 'loginOn',{username: $('.userName').val(), password: $('.wordsName').val()}, false, false, function(res){
            localStorage.user = $('.userName').val();
            localStorage.password = $('.wordsName').val();
            sessionStorage.token = res.data.token;
            sessionStorage.nickname = res.data.nickname;
            buildAjax('get', 'getMenu', {}, false, false, function(res){
                if (res.data.length == 0) {
                    Tip.success('您没有访问权限');
                    return;
                }
                for (let d of res.data) {
                    for (let m of menuConfig) {
                        if (d.menuId == m.id) {
                            sessionStorage.page = m.page;
                            window.location.href = './html/' + m.page + '.html';
                            return;
                        }
                    }
                }
                Tip.success('您没有访问权限');
            })
        });
    })
})


function buildAjax (method, uri, data, ayc, hasarrparam, s, f) {
    data.token = sessionStorage.token;
    $.ajax({
        url: http + 'mobile/' + uri,
        type: method,
        async: ayc,
        dataType: 'json',
        traditional: hasarrparam,
        data: data,
        success: (res) => {
            res.code != 200 && (() => {
                r ? Tip.success(r.desc) : Tip.success('接口' + i + '请求丢失');
                return;
            })();
            s && s(res);
        },
        error: (res) => {
            r ? Tip.success(r.desc) : Tip.success('接口' + i + '请求丢失');
            f && f(res);
        }
    });
}
