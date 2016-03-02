var hhh=0,sss=0,mmm=0
var totalr=0,wrongr=0,rightr=0
var hasdonequestion=new Array()
//左侧导航栏滑动
function slide(){
  var i=document.getElementById("left-navi")
  var sl=document.getElementById('slideinbutton')
  var ss=document.getElementById('wraper')
  if(i.classList.contains('leftnavihide')){
    i.classList.remove('leftnavihide')
    sl.innerHTML='&lt'
    sl.style.right='0px'
    sl.style.fontSize='34px'
    sl.style.top='50%'
  }
  else{
    i.classList.add('leftnavihide')
    sl.innerHTML='&gt'
    sl.style.right='-30px'
    sl.style.fontSize='60px'
    sl.style.top="48%"
  }
}
//选择选项后的反应
function answer(event){
  var a=0
  var event = window.event;
  if(!event){var event=arguments.callee.caller.arguments[0]}
  var ssd=document.getElementById('nowssd').className
  var nowon=document.getElementsByClassName('on')[0].innerHTML
  if(event.target.id==content.answer){
    event.target.classList.add('choiceright')
    for (var i=0;i<hasdonequestion.length;i++){
      if(ssd+'-'+nowon==hasdonequestion[i]){
        a++
      }
    }
    if(a==0){
      counttotal(true)
      var push=ssd+'-'+nowon
      hasdonequestion.push(push)
      donequestion.push(nowon)
    }
    var ss=document.getElementsByClassName('on')[0]
    ss.classList.remove('on')
    ss.nextElementSibling.classList.add('on')
    checklike()
    hasdonelist[ssd.slice(3,4)-1]=donequestion.join(',')
    predonelist[ssd.slice(3,4)-1]=ss.innerHTML
    var change=parseInt(ss.innerHTML)+1
    setTimeout(function(){fill(parseInt(ss.innerHTML)+1)},500)
    questionswitch()
    questionleft() 
  }
  else{
    var ss=document.getElementsByClassName('on')[0]
    event.target.classList.add('choicewrong')
    ss.classList.add('wrong')
    for (var i=0;i<hasdonequestion.length;i++){
      if(ssd+'-'+nowon==hasdonequestion[i]){
          a++
        }
      }
    if(a==0){
      counttotal(false)
      var sss=ssd.slice(3,4)-1
      wronglist[sss]=wronglist[sss]+','+ss.innerHTML
      hasdonequestion.push(ssd+'-'+nowon)
    }
  }
}
//点击右侧导航栏题号后的反应
function onchange(event){
  if(!event){  var event = window.event;}
  var on=document.getElementsByClassName('on')
  on[0].classList.remove('on')
  event.target.classList.add('on')
  checklike()
  var s=event.target.innerHTML
  questionswitch()
  setTimeout(function(){fill(s)},500)
}
//为右侧的题号添加监听事件
function addlistener(){
  document.getElementById('jumpicon').addEventListener('click',jump,false)
  var num=document.getElementsByClassName('number')
  for (var i=0;i<num.length;i++){
    num[i].addEventListener('click',onchange)
  }
}
//创建右侧导航栏的题号
function numbercreate(wrong,like,hasdone,qucount){
  if(document.getElementById('num-bar')!=undefined){
    document.getElementById('num-bar').parentNode.removeChild(document.getElementById('num-bar'))
  }
  var ta=document.createElement('div')
  ta.setAttribute('id','num-bar')
  for (var i=1;i<qucount;i++){
    var td=document.createElement('div')
    td.setAttribute('class','number')
    td.innerHTML=i
    if(i==hasdone){
      td.classList.add('on')
    }
    for(var wa=0;wa<wrong.length;wa++){
      if(i==wrong[wa]){
        td.classList.add('wrong')
      }
    }
    for(var la=0;la<like.length;la++){
      if(i==like[la]){
        td.classList.add('like')
      }
    }
    if(td.classList.contains('on')&&td.classList.contains('wrong')){
      td.classList.add('onwrong')
    }
    else if(td.classList.contains('on')&&td.classList.contains('like')){
      td.classList.add('onlike')
    }
    else if(td.classList.contains('on')&&td.classList.contains('like')&&td.classList.contains('wrong')){
      td.classList.add('onlikewrong')
    }
    ta.appendChild(td)
  }
  var ques=document.getElementById('no-wrapper')
  ques.appendChild(ta)
  addlistener()
  checklike()
  fill(hasdone)
}
//右侧题号的滚动
function numberscroll(event){
  var event = window.event;
  if(!event){var event=arguments.callee.caller.arguments[0]}
  var top2=document.getElementById('num-bar')
  var ss= window.getComputedStyle(top2,null).getPropertyValue('top')
  if(event.target.id=='flipup'){
    if(parseInt(ss)+384>0){
      top2.style.top='0px'
    }
    else{top2.style.top=(parseInt(ss)+384)+'px'}
  }
  else if (event.target.id=='flipdown'){
    var ss2=document.getElementsByClassName('number').length*(-32)+384
    if(parseInt(ss)<ss2){
    }
    else{
    top2.style.top=(parseInt(window.getComputedStyle(top2,null).getPropertyValue('top'))-384)+'px'
    }
  }
}
//填充题目
function fill(para){
  var request
  var ssd=document.getElementById('nowssd').className
  request=new XMLHttpRequest()
  var address='./'+ssd+'/'+para
  //1.txt改成address就可以了
  request.open('get','1.txt',true)
  request.send()
  request.onreadystatechange=function(){
    if(request.readyState==4&&request.status==200){
      content=request.responseText
      content=eval("("+content+")")
      document.getElementById('content').innerHTML=content.content[0]
      document.getElementById('A').innerHTML=content.content[1]
      document.getElementById('B').innerHTML=content.content[2]
      document.getElementById('C').innerHTML=content.content[3]
      document.getElementById('D').innerHTML=content.content[4]
      }
   }
}
//左侧的计时事件
function time(){
  function changetime(para) {
    if (para < 10) {
      para = "0" + para;
      return para
    } else {
      return para
    }
  }
  sss+=1
  if(sss>=60){
    sss=0
    if(mmm==60){
      mmm=0
      hhh+=1
    }
    mmm+=1
  }
  hhh = changetime(hhh)
  mmm = changetime(mmm)
  sss = changetime(sss)
  var time=String(hhh)+String(mmm)+String(sss)
  var tm= document.getElementById('time').getElementsByClassName('showtime')
  for (var i=0;i<tm.length;i++){  
    tm[i].className="showtime"
    tm[i].classList.add(timetobgp(time.slice(i,i+1)))
  }
  hhh = parseInt(hhh)
  mmm = parseInt(mmm)
  sss = parseInt(sss)
}
//计时事件的循环触发器
function timechange() {
  setInterval(time, 1000)
}
//数字转化器
function timetobgp(para){
  switch(para){
    case '0':
      return "zero"
      break;
    case '1':
      return "one"
      break;
    case '2':
      return "two"
      break;
    case '3':
      return "three"
      break;
    case '4':
      return "four"
      break;
    case '5':
      return "five"
      break;
    case '6':
      return "six"
      break;
    case '7':
      return "seven"
      break;
    case '8':
      return "eight"
      break;
    case '9':
      return "nine"
      break;
  }
}
//右侧导航栏的跳转功能
function jump(){
  var icon=document.getElementById('jumpicon')
  if(document.getElementById('jumpinput')!=null){
    var dd=document.getElementsByClassName('number')
    var i2=document.getElementById('jumpinput2').value
    for (var i=0;i<i2.length;i++){
      if(String(parseInt(i2.slice(i,i+1)))=='NaN'){
        var nonumber=true
        break;
      }
      else{
        var nonumber=false
      }
    }
    if(nonumber||i2>qucount){
      alert('请输入有效的题号')
    }
    for(var i=0;i<dd.length;i++){
      if(i==i2-1){
        document.getElementsByClassName('on')[0].classList.remove('on')
        dd[i].classList.add('on')
        document.getElementById('num-bar').style.top=(i2-1)*(-32)+'px'
        setTimeout(function(){fill(dd[i].innerHTML)},500)
        questionswitch()
      }
    }
    document.getElementById('jumpinput').removeChild(document.getElementById('jumpinput2'))
    setTimeout(function(){document.getElementById('jumpinput').style.width='0px',10})
    setTimeout(function(){document.getElementById('jump').removeChild(document.getElementById('jumpinput'))},510)
    document.getElementById('jumpicon').classList.add('jumpicon')
    icon.setAttribute('src','{% static 'ssd/jumpto.png' %}')
  }
  else{
  var d1=document.createElement('div')
  var i1=document.createElement('input')
  var d2=document.createElement('div')
  d1.setAttribute('id','jumpinput')
  d2.setAttribute('class','arrow-right jumparrow')
  i1.setAttribute('id','jumpinput2')
  i1.setAttribute('placeholder','跳转到')
  icon.setAttribute('src','{% static 'ssd/jumpto2.png' %}')
  d1.appendChild(d2)
  document.getElementById('jump').appendChild(d1)
  setTimeout(function(){d1.style.width='60px'},10)
  setTimeout(function(){d1.appendChild(i1)},510)
  setTimeout(function(){document.getElementById('jumpicon').classList.remove('jumpicon')},10)
  }
}
//右侧导航栏的只做错题功能
function wrongcollect(){
  var wr=document.getElementsByClassName('wrong')
  var dd=document.getElementsByClassName('number')
  var tt=document.getElementById('wrong-col')
  var icon=document.getElementById('wrongicon')
  if(tt.classList.contains('wrongon')){
    tt.classList.remove('wrongon')
    icon.setAttribute('src','{% static 'ssd/close.png' %}')
    if(document.getElementById('like').classList.contains('likeon')){
       for (var i=0;i<dd.length;i++){
         if(dd[i].classList.contains('wrong')&&dd[i].classList.contains('like')==false){
           dd[i].classList.add('hidden')
         }
       }
    }
    else{
      for(var i=0;i<dd.length;i++){
        dd[i].classList.remove('hidden')
      }
    }
  }
  else{
    tt.classList.add('wrongon')
    icon.setAttribute('src','{% static 'ssd/close2.png' %}')
    for (var i=0;i<dd.length;i++){
      if(dd[i].classList.contains('wrong')){
        if(document.getElementById('like').classList.contains('likeon')){
          dd[i].classList.remove('hidden')
        }
      }
      else{
        if(document.getElementById('like').classList.contains('likeon')&&dd[i].classList.contains('like')){
        }
        else{
          dd[i].classList.add('hidden')
        }
      }
    }
  }
}
//右侧导航栏的只做收藏功能
function likecollect(){
  var col=document.getElementsByClassName('like')
  var dd=document.getElementsByClassName('number')
  var tt=document.getElementById('like')
  var icon=document.getElementById('likeicon')
  if(tt.classList.contains('likeon')){
    tt.classList.remove('likeon')
    icon.setAttribute('src','{% static 'ssd/star.png' %}')
    if(document.getElementById('wrong-col').classList.contains('wrongon')){
      for(var i=0;i<dd.length;i++){
        if(dd[i].classList.contains('like')&&dd[i].classList.contains('wrong')==false){
          dd[i].classList.add('hidden')
        }
      }
    }
    else{
      for(var i=0;i<dd.length;i++){
        dd[i].classList.remove('hidden')
      }
    }
  }
  else{
    tt.classList.add('likeon')
    icon.setAttribute('src','{% static 'ssd/star2.png' %}')
    for (var i=0;i<dd.length;i++){
      if(dd[i].classList.contains('like')){
        if(document.getElementById('wrong-col').classList.contains('wrongon')){
           dd[i].classList.remove('hidden')
         }
      }
      else{
        if(document.getElementById('wrong-col').classList.contains('wrongon')&&dd[i].classList.contains('wrong')){
        }
        else{
          dd[i].classList.add('hidden')
        }
      }
    }
  }
}
//为题号添加title属性
var listcollectwrong = []
var listcollect = []
var listwrong = []
function addtitle(){
  var dd=document.getElementsByClassName('number')
  for (var i=0;i<dd.length;i++){
    if(dd[i].classList.contains('wrong')&&dd[i].classList.contains('like')){
      dd[i].setAttribute('title','LIKE but WRONG')
      listcollectwrong.push(i)
    }
    else if(dd[i].classList.contains('wrong')){
      dd[i].setAttribute('title','WRONG HERE!')
      listwrong.push(i)
    }
    else if(dd[i].classList.contains('like')){
      dd[i].setAttribute('title',"I'm LOVING it!")
      listcollect.push(i)
    }
    else{
      dd[i].setAttribute('title','Nothing here')
    }
  }
}
var formofquestions=[listcollect, listwrong, listcollectwrong];
var form1 = document.getElementById('formofquestions');
form1.submit();
//题目切换的效果
function questionswitch(){
  setTimeout(function(){
    document.getElementById('content').classList.add('questionswitch')
  },10)
  setTimeout(function(){
    document.getElementById('choicewrapper').classList.add('questionswitch2')
  },10)
  setTimeout(function(){
    document.getElementById('questionarea').classList.add('questionswitch3')
  },510)
  setTimeout(function(){
    var dd=document.getElementsByClassName('answer-choice')
    for (var i=0;i<dd.length;i++){
      if (dd[i].classList.contains('choiceright')){
        dd[i].classList.remove('choiceright')
      }
      else{
        dd[i].classList.remove('choicewrong')
      }
    }
  },600)
  setTimeout(function(){
    document.getElementById('content').classList.remove('questionswitch')
    document.getElementById('choicewrapper').classList.remove('questionswitch2')
    document.getElementById('questionarea').classList.remove('questionswitch3')
  },1110)
}
//读取openid
function getopenid(){
    var request
    request=new XMLHttpRequest()
    request.open('get','id1.txt',true)
    request.send()
    request.onreadystatechange=function(){
    if(request.readyState==4&&request.status==200){
      content=request.responseText
      content=eval("("+content+")")
      wronglist=content.mistake.split(';')
      openid=content.id
      var wrong=wronglist[0].split(',')
      likelist=content.mark.split(';')
      var like=likelist[0].split(',')
      hasdonelist=content.hasdone.split(';')
      donequestion=hasdonelist[0].split(',')
      predonelist=content.predone.split(';')
      var predone1=predonelist[0]
      qucount=95
      numbercreate(wrong,like,predone1,qucount)
      questionleft()
      }
   }
}
//左侧导航栏的计算共做的题
function counttotal(para){
  totalr++
  if(para==false){
    wrongr++
  }
  else{
    wrongr=parseInt(wrongr)
  }
  var tc=document.getElementsByClassName('showtotalcount')
  var wc=document.getElementsByClassName('showwrongcount')
  var rtc=document.getElementsByClassName('showrightrate')
  rightr=parseInt(((totalr-wrongr)/totalr)*100)
  facestatus(rightr)
  rightr=changetotal(rightr)
  totalr=changetotal(totalr)
  wrongr=changetotal(wrongr)
  for (var i=2;i>=0;i-=1){
    tc[2-i].className="showtotalcount"
    wc[2-i].className="showwrongcount"
    rtc[2-i].className="showrightrate"
    tc[2-i].classList.add(timetobgp(totalr.slice(2-i,3-i)))
    wc[2-i].classList.add(timetobgp(wrongr.slice(2-i,3-i)))
    rtc[2-i].classList.add(timetobgp(rightr.slice(2-i,3-i)))
  }
}
//左侧导航栏计算错题个数
function changetotal(para){
  if(para<100){
    if(para<10){
      return '00'+para
    }
    else{
      return '0'+para
    }
  }
  else{
    return String(para)
  }
}
//与服务期同步
function sync(quesnumber,postbody){
  var request
  if (window.XMLHttpRequest){
    request=new XMLHttpRequest()
  }
  else if (window.ActiveXObject){
    request=new ActiveXObject("Microsoft.XMLHTTP")
  }
  sortarray(hasdonelist)
  sortarray(likelist)
  sortarray(wronglist)
  postbody='{"id":'+'"'+openid+'"'+',"mistake":'+'"'+wronglist.join(';')+'"'+',"mark":'+'"'+likelist.join(';')+'"'+',"hasdone":'+'"'+hasdonelist.join(';')+'"'+',"predone":'+'"'+predonelist.join(';')+'"'+'}'
  var address='./user/'+openid
  request.open('post',address,true)
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.send(postbody)
}
//计算还有几题剩余的功能
function questionleft(){
  var show=document.getElementsByClassName('showleftcount')
  var a=donequestion.length
  var ssd=document.getElementById('nowssd').className.slice(3,4)
  var quesdone=changetotal(a)
  var quesall=changetotal(qucount)
  var all=String(quesdone)+String(quesall)
  for (var i=0;i<all.length;i++){
    show[i].className='showleftcount'
    show[i].classList.add(timetobgp(all.slice(i,i+1)))
  }
}
//左侧导航栏的最下面的功能
function facestatus(para){
  var face=document.getElementById('facestatus')
  face.style.fontSize='40px'
  face.style.position='relative'
  face.style.left='0px'
  face.style.width=''
  face.style.zIndex=''
  if(para==100){
    face.innerHTML='(≧▽≦)/'
    face.setAttribute('title','这个正确率○|￣|_受我一拜')
  }
  else if(para>=95&&para<100){
    face.innerHTML='o(≧v≦)o'
    face.setAttribute('title','请叫我学神(￣_,￣ )')
  }
  else if(para>=90&&para<95){
    face.innerHTML='O(∩_∩)O'
    face.setAttribute('title','gpa4.0！(＾－＾)V')
  }
  else if(para>=85&&para<90){
    face.innerHTML='(>^ω^<)'
    face.setAttribute('title','乃在加油一点就有4.0辣！ヽ(✿ﾟ▽ﾟ)ノ')
  }
  else if(para>=80&&para<85){
    face.innerHTML='( =•ω•= )'
    face.setAttribute('title','嘛3.0也口以(╯▽╰)')
  }
  else if(para>=75&&para<80){
    face.innerHTML='=￣ω￣='
    face.setAttribute('title','有种不妙的感觉')
  }
  else if(para>=70&&para<75){
    face.innerHTML='(⊙▽⊙)'
    face.setAttribute('title','这个趋势不对劲，坑定是乃的做题方式不对')
  }
  else if(para>=65&&para<70){
    face.innerHTML='(⊙o⊙)'
    face.setAttribute('title','不要再掉辣_( ﾟДﾟ)ﾉ')
  }
  else if(para>=60&&para<65){
    face.innerHTML='╭(°A°`)╮'
    face.style.width='200px'
    face.setAttribute('title','要挂啦辣(ﾟДﾟ≡ﾟДﾟ)')
  }
  else if(para>=55&&para<60){
    face.innerHTML='"(ºAº|||)'
    face.setAttribute('title','还有一点机会！再来一点')
  }
  else if(para>=50&&para<55){
    face.innerHTML='ºAº'
    face.style.fontSize='150px'
    face.style.position='absolute'
    face.style.zIndex='1'
    face.setAttribute('title','没救辣辣辣~~平时分都没辣┌(。Д。)┐')
  }
  else if(para>=45&&para<50){
    face.innerHTML='(ಥ_ಥ)'
    face.setAttribute('title','还敢再低点么(￣m￣)')
  }
  else if(para>=40&&para<45){
    face.innerHTML='（´Д`）'
    face.setAttribute('title','还真敢(´Д`)')
  }
  else if(para>=35&&para<40){
    face.innerHTML='(#‵Д′)'
    face.setAttribute('title','乃上课划了多少手机？说！ヾ(｡｀Д´｡)')
  }
  else if(para>=30&&para<35){
    face.innerHTML='(╯‵Д′)╯︵┻━┻'
    face.style.position='absolute'
    face.style.width='600px'
    face.style.zIndex='1'
    face.setAttribute('title','不要每次都想着搞大新闻')
  }
  else if(para>=25&&para<30){
    face.innerHTML='┻━┻︵╰(‵□′)╯︵┻━┻'
    face.setAttribute('title','jojo,我不做题啦！')
    face.style.position='absolute'
    face.style.left='500px'
    face.style.width='1000px'
    face.style.zIndex='1'
  }
  else if(para>=20&&para<25){
    face.innerHTML='ヽ(´･д･｀)ﾉ'
    face.style.position='absolute'
    face.style.left='500px'
    face.style.width='600px'
    face.style.zIndex='1'
    face.setAttribute('title','看来乃是没药救了')
  }
  else if(para>=15&&para<20){
    face.innerHTML='╮(╯▽╰)╭'
    face.setAttribute('title','孩子，做题老不对，多半是废了')
    face.style.position='absolute'
    face.style.left='200px'
    face.style.width='600px'
    face.style.zIndex='1'
  }
  else if(para>=10&&para<15){
    face.innerHTML='ε=(´o｀)'
    face.setAttribute('title','还是等下一个人吧')
  }
  else if(para>=8&&para<10){
    face.innerHTML='(๑´ㅂ`๑)'
    face.setAttribute('title','我还是2young2simple')
  }
  else if(para>=6&&para<8){
    face.innerHTML='ヾ(￣▽￣)Bye'
    face.setAttribute('title','下学期债见！')
  }
  else if(para>=4&&para<6){
    face.innerHTML='ㄟ( ▔, ▔ )ㄏ'
    face.setAttribute('title','这种正确率和咸鱼有什么区别')
  }
  else if(para>=2&&para<4){
    face.innerHTML='_(:_」∠)_'
    face.setAttribute('title','还是睡吧')
  }
  else if(para>=1&&para<2){
    face.innerHTML='(:3▓▒'
    face.setAttribute('title','zzzzzzzzzzzzzz')
  }
}
//切换ssd
function changessd(){
  var ti=document.getElementById('toggleicon')
  var input=document.createElement('input')
  var inputhas=document.getElementsByClassName('inputssd')[0]
  if(inputhas==null){
    input.setAttribute('class','inputssd')
    input.setAttribute('placeholder','1~9')
    document.getElementById('ssd').appendChild(input)
  }
  else{
    var iv=document.getElementsByClassName('inputssd')[0].value
    if(iv==1||iv==2||iv==3||iv==4||iv==5||iv==6||iv==7||iv==8||iv==9){
      document.getElementById('nowssd').className='ssd'+iv
      document.getElementsByClassName('inputssd')[0].parentNode.removeChild(document.getElementsByClassName('inputssd')[0])
      donequestion=hasdonelist[iv-1].split(',')
      var q='95,306,105,101,173,257,107,176,395'
      qucount=q.split(',')[iv-1]
      var wrong=wronglist[iv-1]
      var like=likelist[iv-1]
      var predone1=predonelist[iv-1]
      numbercreate(wrong,like,predone1,qucount)
      questionleft()
    }
    else if(iv==''){
      document.getElementsByClassName('inputssd')[0].parentNode.removeChild(document.getElementsByClassName('inputssd')[0])
    }
  }
  sync()
}
//右侧导航栏的喜欢功能
function addlike(){
  var now=document.getElementsByClassName('on')[0]
  if(now.classList.contains('like')){
    now.classList.remove('like')
  }
  else{
    now.classList.add('like')
    var ssd=document.getElementById('nowssd').className.slice(3,4)-1
    likelist[ssd]=likelist[ssd]+','+now.innerHTML
  }
  checklike()
}
//检测是否喜欢过的功能
function checklike(){
  if(document.getElementsByClassName('on')[0].classList.contains('like')){
    document.getElementById('likeit').setAttribute('src','notlike.png')
  }
  else{
    document.getElementById('likeit').setAttribute('src','likeit.png')
  }
}
//数列去重整理功能
function sortarray(para){
  function sortNumber(a,b){
    return a - b
  }
  for(var i=0;i<para.length;i++){
    var sort=new Array()
    for(var a=0;a<para[i].split(',').length;a++){
      var ss=para[i].split(',')
      if(sort.indexOf(ss[a])==-1){
        sort.push(ss[a])
      }
    }
    sort.sort(sortNumber)
    para[i]=sort.join(',')
  }
}
timechange()
getopenid()
setTimeout(addtitle,1000)
setTimeout(addlistener,100)

