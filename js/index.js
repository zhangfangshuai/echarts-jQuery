/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/16
 * Time: 11:46
 *
 */
$(function () {

    if(localStorage.user && localStorage.password){
        $('.userName').val(localStorage.user);
        $('.wordsName').val(localStorage.password);
    }
    //login start
    $('.loginBtn').on('click',function(){
        if(!$('.userName').val()){
            Tip.success('请输入用户名');
            return false;
        };
        if(!$('.wordsName').val()){
            Tip.success('请输入密码');
            return false;
        };
        $.ajax({
            url:http+'mobile/loginOn',
            type:'get',
            dateType:'json',
            data:{
                username:$('.userName').val(),
                password:$('.wordsName').val()
            },
            success:function(res){
                console.log(res);
                if(res.code==200){
                    localStorage.user=$('.userName').val();
                    localStorage.password=$('.wordsName').val();
                    sessionStorage.token=res.data.token;
                    sessionStorage.nickname=res.data.nickname;
                    $.ajax({
                        url:http+'/mobile/getMenu',
                        type:'get',
                        dataType:'json',
                        data:{
                            token:sessionStorage.token
                        },
                        success:function(res){
                            console.log('print data');
                            if(res.code==200){
                                console.log(res);
                                if(res.data.length<=0){
                                    Tip.success('您没有访问权限');
                                    return false;
                                };
                                var menuArr2=[];
                                for(var i=0;i<res.data.length;i++){
                                    var acc=res.data[i].menuId;
                                    for(var j=0;j<menuArr.length;j++){
                                        if(menuArr[j]==acc){
                                             console.log(menuArr[j]);
                                            menuArr2.push(acc)
                                        }
                                    }
                                }
                                console.log(menuArr2);
                                if(menuArr2.length<=0){
                                    Tip.success('您没有访问权限');
                                    return false;
                                };
                                var menuId=menuArr2[0];
                                console.log(res,menuId);
                                for( var id in menuJson){
                                    if(id==menuId){
                                        console.log(menuJson[id]);
                                        window.location.href='./html/'+menuJson[id];
                                    }
                                }
                            }
                        },
                        error:function(res){
                            console.log(res)
                        }
                    });

                }else if(res.code==201){
                    Tip.success(res.desc)
                }else if(res.code==301){
                    Tip.success(res.desc)
                }else if(res.code==302){
                    Tip.success(res.desc)
                }else if(res.code==303){
                    Tip.success(res.desc)
                }else if(res.code==305){
                    Tip.success(res.desc)
                }else if(res.code==306){
                    Tip.success(res.desc)
                }else if(res.code==307){
                    Tip.success(res.desc)
                }else if(res.code==308){
                    Tip.success(res.desc)
                }else if(res.code==500){
                    Tip.success(res.desc)
                }
            },
            error:function(res){
                console.log(res,'失败')
            }
        })
    });
//login end

})
