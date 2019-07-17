$(document).ready(function(){$.ajaxSetup({beforeSend:function(xhr,settings){if(!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)&&!this.crossDomain){xhr.setRequestHeader("X-CSRFToken",g.csrftoken);}}});$('#captcha-change').click(function(){$("#captcha-code").attr("src","/captcha"+"?code="+Math.random());});function AuthCallBack(response){if(response.status==='200')
{window.location="/";}
else
{$("#captcha-code").attr("src","/captcha"+"?code="+Math.random());$("#captcha").val("");if(response.description!==""){alert(response.description);}else{alert(response.message);}}}
$('button#login').click(function(){$.ajax({type:"POST",url:"/login",data:JSON.stringify({username:$('#username').val(),password:$('#password').val(),captcha:$("#captcha").val(),remember:$("#remember").is(':checked')}),contentType:'application/json;charset=UTF-8',success:function(response){return AuthCallBack(response);}});});$('button#register').click(function(){$.ajax({type:"POST",url:"/register",data:JSON.stringify({username:$('#username').val(),email:$('#email').val(),password:$('#password').val(),captcha:$("#captcha").val()}),contentType:'application/json;charset=UTF-8',success:function(response){return AuthCallBack(response);}});});$('button#forget').click(function(){$.ajax({type:"POST",url:"/forget",data:JSON.stringify({email:$('#email').val(),captcha:$("#captcha").val()}),contentType:'application/json;charset=UTF-8',success:function(response){return AuthCallBack(response);}});});});function loadFile(event){var _file=document.getElementById("avatar");var i=_file.value.lastIndexOf('.');var len=_file.value.length;var extEndName=_file.value.substring(i+1,len);var extName="JPG,PNG";if(extName.indexOf(extEndName.toUpperCase())==-1){alert("您只能上传"+extName+"格式的文件");$('#avatar').val('');}else{var reader=new FileReader();reader.onload=function(){var icon='<i class="fa fa-exchange"></i>'+'\n';var img='<img src="'+reader.result+'" title="avatar" class="avatar img-circle">';$("#show-avatar").html(icon+img);};reader.readAsDataURL(event.target.files[0]);}}
function getQueryParams(k){var p={};location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v;});return k?p[k]:p;}
function SortFuntion(){var within=$('select#within').val();var orderby=$('select#orderby').val();var desc=$('select#desc').val();var params=getQueryParams();params.within=within;params.orderby=orderby;params.desc=desc;window.location.href=window.location.pathname+'?'+$.param(params);}
$(document).ready(function(){$('select#within').change(function(){SortFuntion();});$('select#orderby').change(function(){SortFuntion();});$('select#desc').change(function(){SortFuntion();});$('span#email-confirm').click(function(){$.ajax({type:"POST",url:"/confirm",data:JSON.stringify({}),contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{alert(response.message);}else
{alert(response.message);}}});});});function dispatch(){var q=document.getElementById("search");if(q.value!==""){var url='https://www.google.com/search?q=site:forums.honmaple.org%20'+q.value;if(navigator.userAgent.indexOf('iPad')>-1||navigator.userAgent.indexOf('iPod')>-1||navigator.userAgent.indexOf('iPhone')>-1){location.href=url;}else{window.open(url,"_blank");}
return false;}else{return false;}}
function Follow(obj,data,url){if(obj.hasClass('active')){$.ajax({type:"DELETE",url:url,data:data,contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{obj.text('关注').removeClass('active');}else
{alert('fail');}}});}else{$.ajax({type:"POST",url:url,data:data,contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{obj.text('取消关注').addClass('active');}else
{alert('fail');}}});}}
$(document).ready(function(){$('button.topic-following').click(function(){var _$this=$(this);var url="/following/topics";var data=JSON.stringify({pk:_$this.attr("data-id"),});Follow(_$this,data,url);});$('button.tag-following').click(function(){var _$this=$(this);var url="/following/tags";var data=JSON.stringify({tagId:_$this.attr("data-id"),});Follow(_$this,data,url);});$('button.user-following').click(function(){var _$this=$(this);var url="/following/users";var data=JSON.stringify({userId:_$this.attr("data-id"),});Follow(_$this,data,url);});$('button.collect-following').click(function(){var _$this=$(this);var url="/following/collects";var data=JSON.stringify({collectId:_$this.attr("data-id"),});Follow(_$this,data,url);});});function DoCollect(collect_url){$(document).ready(function(){$('button#edit-collect').click(function(){var data=JSON.stringify({name:$('#name').val(),description:$('#description').val(),is_hidden:$("input[name='is_hidden']:checked").val()});$.ajax({type:"PUT",url:collect_url,data:data,contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{window.location.href=collect_url;}}});});$('button#delete-collect').click(function(){$.ajax({type:"DELETE",url:collect_url,data:JSON.stringify(),contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{window.location.href=collect_url;}}});});$('#delete-from-collect').click(function(){var _$this=$(this);var pk=_$this.attr('data-id');var data=JSON.stringify({pk:pk});$.ajax({type:"DELETE",url:'/topic/'+pk+'/collect',data:data,contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{_$this.parent().remove();}}});});});}
$(document).ready(function(){$('.like-reply').click(function(){var _$this=$(this);var pk=_$this.attr('data-id');var like_url="/replies/"+pk+'/like';var data=JSON.stringify({});if(_$this.hasClass('like-active')){$.ajax({type:"DELETE",url:like_url,data:data,contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{_$this.attr("title","赞");_$this.removeClass("like-active");_$this.addClass("like-no-active");}else{window.location.href=response.url;}}});}else{$.ajax({type:"POST",url:like_url,data:data,contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200')
{_$this.attr("title","取消赞");_$this.removeClass("like-no-active");_$this.addClass("like-active");}else
{window.location.href=response.url;}}});}});$('.reply-author').click(function(){var _$this=$(this);var author=_$this.attr('data-id');$('#content').focus();$('#content').val('@'+author+' ');});$('#topic-preview').click(function(){var contentType=$('#content_type').val();if(contentType=="1"){$("#show-preview").html(marked($('#content').val()));}else if(contentType=="2"){var parser=new Org.Parser();var orgDocument=parser.parse($('#content').val());var orgHTMLDocument=orgDocument.convert(Org.ConverterHTML,{headerOffset:1,exportFromLineNumber:false,suppressSubScriptHandling:false,suppressAutoLink:false});$("#show-preview").html(orgHTMLDocument.toString());}else{$("#show-preview").html($('#content').val());}});$('#tokenfield').tokenfield({limit:4});$('#topic-put-btn').click(function(){var _$this=$(this);var url='/topic/'+_$this.attr("data-id");var data={csrf_token:$('input[name="csrf_token"]').val(),title:$('input[name="title"]').val(),tags:$('input[name="tags"]').val(),category:$('select[name="category"]').val(),content:$('textarea[name="content"]').val(),content_type:$('select[name="content_type"]').val()};$.ajax({type:"PUT",url:url,data:JSON.stringify(data),contentType:'application/json;charset=UTF-8',success:function(response){if(response.status==='200'){window.location.href=url;}else{if(response.description!=""){alert(response.description);}else{alert(response.message);}}}});});});