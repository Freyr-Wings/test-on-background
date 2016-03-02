#coding:cp936
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
from django import forms
from models import User
from django.contrib.postgres.fields.jsonb import JSONField

#表单
class UserForm(forms.Form): 
    username = forms.CharField(label='用户名',max_length=100)
    password = forms.CharField(label='密码',widget=forms.PasswordInput())

class UserList(forms.Form):
    username = forms.CharField(label='用户名',max_length=100)
    listofquestions = JSONField()
#注册
def regist(req):
    if req.method == 'POST':
        uf = UserForm(req.POST)
        if uf.is_valid():
            #获得表单数据
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #添加到数据库
            User.objects.create(username= username,password=password)
#             return HttpResponse('regist success!!')
            return HttpResponseRedirect('/ssd/login/')
    else:
        uf = UserForm()
    return render(req,'regist.html',{'uf':uf})

#登陆
def login(req):
    if req.method == 'POST':
        uf = UserForm(req.POST)
        if uf.is_valid():
            #获取表单用户密码
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #获取的表单数据与数据库进行比较
            user = User.objects.filter(username__exact = username,password__exact = password)
            if user:
                #比较成功，跳转index
                response = HttpResponseRedirect('/ssd/index/')
                #将username写入浏览器cookie,失效时间为3600
                response.set_cookie('username',username,3600)
                return response
            else:
                #比较失败，还在login
                return HttpResponseRedirect('/ssd/login/')
    else:
        uf = UserForm()
    return render(req,'login.html',{'uf':uf})

#登陆成功
def index(req):
    username = req.COOKIES.get('username','')
    if req.method == 'POST':
        loq = UserList(req.POST)
        if loq.is_valid():
            username = loq.cleaned_data['username']
            listofquestions = loq.cleaned_data['formofquestions']
            if User.objects.filter(username__exact == username):
                User.objects.create(username= username, listofquestions= listofquestions)
    elif req.method == 'GET':
        return render_to_response('index.html', {'username':username}, {'formofquestions':listofquestions}, {''})
    return render_to_response('index.html' ,{'username':username} ,{''})

#退出
def logout(req):
    response = HttpResponseRedirect('/ssd/login/')
#     response = HttpResponse('logout !!')
    #清理cookie里保存username
    response.delete_cookie('username')
    return response







