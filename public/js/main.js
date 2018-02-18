$(document).ready(function(){
    $('.delete-article').on('click',function(e){
        $target=$(e.target);
        id=$target.attr('data-id');
        $.ajax({
            type:'delete',
            url:'/article/'+id,
            success:function(response){
                alert('deleting');
                window.location.href='/';
            },
            error:function(err){
                console.log(err);
            }
        });
        
    });
});


