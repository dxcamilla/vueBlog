$(function(){
    $("#saveContent").on("click",function(){
        var contId = $("#editHidden").attr("data-id") || '',
            contType = $('#contType option:selected').val(),
            contTitle = $("#contTitle").val(),
            contSummary = $("#contSummary").val(),
            contBody = $("#contEditor .w-e-text").html()
        if(contTitle == null || contTitle === ""){
            $("#failTip").slideDown().find(".txt").html("标题不能为空")
            setTimeout(()=>{
                $("#failTip").slideUp();
            },1500)
        } else {
            if(editFlag) {
                $.ajax({
                    type: "get",
                    url:"/admin/saveEditContent",
                    data: {
                        contId: contId,
                        contType: contType,
                        contTitle: contTitle,
                        contSummary: contSummary,
                        contBody: contBody
                    },
                    dataType: "json",
                    timeout: 30000,
                    success: function(data){
                        if(data.resCode === 1){
                            $("#successTip").slideDown().find(".txt").html(data.resMsg);
                            setTimeout(()=>{
                                $("#successTip").slideUp();
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
            }else {
                $.ajax({
                    type: "get",
                    url:"/admin/addContent",
                    data: {
                        contType: contType,
                        contTitle: contTitle,
                        contSummary: contSummary,
                        contBody: contBody
                    },
                    dataType: "json",
                    timeout: 30000,
                    success: function(data){
                        if(data.resCode === 1){
                            $("#successTip").slideDown().find(".txt").html(data.resMsg);
                            setTimeout(()=>{
                                $("#successTip").slideUp();
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
            }
            
        }
    })
    $("#showContentBox .del_btn").on("click",function(){
        var contId = $(this).attr("data-id");
        var _this = $(this);
        console.log(contId)
        showConfirmBox("确定删除 ？",function(){
            $.ajax({
                type: "get",
                url:"/admin/delContent",
                data: {
                    contId: contId
                },
                dataType: "json",
                timeout: 30000,
                success: function(data){
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
    })
    // $("#showContentBox .edit_btn").on("click",function(){
    //     var contId = $(this).attr("data-id");
    //     var _this = $(this);
    //     $.ajax({
    //         type: "get",
    //         url:"/admin/editContent",
    //         data: {
    //             contId: contId
    //         },
    //         dataType: "json",
    //         timeout: 30000,
    //         success: function(data){
    //             console.log(data)
    //             window.location.open('admin/editContent')
    //         },
    //         error: function(e){
    //             throw(e)
    //         }
    //     })
    // })
});