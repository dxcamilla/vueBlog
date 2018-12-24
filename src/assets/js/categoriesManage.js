$(function(){
    
    $("#addCateBtn").on("click",function(){
        $("#addCatePop").addClass("show-pop-wrap")
    })
    $("#confirmCat").on("click",function(){
        var isChange = $(this).parents(".pop-wrap").attr("data-type") === "change" ? true : false;
        var cateName = $("#cateName").val();
        if(cateName === null || cateName === ''){
            $("#cateName").siblings(".err-tip").html("分类名不能为空").show();
        }else {
            if(isChange){
                var cateId = $("#addCatePop").attr("data-id") || '';
                $.ajax({
                    type: "get",
                    url:"/admin/changeCategory",
                    data: {
                        cateId: cateId,
                        cateName: cateName
                    },
                    dataType: "json",
                    timeout: 30000,
                    success: function(data){
                        if(data.resCode === 1){
                            $("#successTip").slideDown().find(".txt").html(data.resMsg);
                            $("#addCatePop").removeClass("show-pop-wrap");
                            setTimeout(()=>{
                                window.location.reload();
                            },1000)
                        } else{
                            $("#failTip").slideDown().find(".txt").html(data.resMsg);
                            setTimeout(()=>{
                                $("#failTip").slideUp();
                            },1000)
                        }
                    },
                    error: function(e){
                        throw(e)
                    }
                })
            }else{
                $.ajax({
                    type: "get",
                    url:"/admin/addCategory",
                    data: {
                        cateName: cateName
                    },
                    dataType: "json",
                    timeout: 30000,
                    success: function(data){
                        if(data.resCode === 1){
                            $("#successTip").slideDown();
                            $("#addCatePop").removeClass("show-pop-wrap");
                            setTimeout(()=>{
                                window.location.reload();
                            },1000)
                        } else{
                            $("#failTip").slideDown().find(".txt").html(data.resMsg);
                            setTimeout(()=>{
                                $("#failTip").slideUp();
                            },1500)
                        }
                    },
                    error: function(e){
                        throw(e)
                    }
                })
            }
            
        }
        
        
    });
    $(".del_cate").on("click",function(){
        var cateId = $(this).attr("data-id");
        var _this = $(this);
        showConfirmBox("确定删除 ？",function(){
            $.ajax({
                type: "get",
                url:"/admin/delCategory",
                data: {
                    cateId: cateId
                },
                dataType: "json",
                timeout: 30000,
                success: function(data){
                    console.log(data);
                    if(data.resCode === 1){
                        _this.parents("tr").remove();
                        $("#successTip").slideDown().find(".txt").html(data.resMsg);
                        $("#addCatePop").removeClass("show-pop-wrap");
                        setTimeout(()=>{
                            $("#successTip").slideUp();
                        },1500)
                    } 
                },
                error: function(e){
                    throw(e)
                }
            })
        })
    });
    $(".change_cate").on("click",function(){
        $("#addCatePop").addClass("show-pop-wrap")
        .attr({"data-type":"change","data-id":$(this).attr("data-id")})
        .find("#cateName").val($(this).attr("data-name"));
    });
})