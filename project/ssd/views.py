#coding:cp936
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
from django import forms
from models import User
from django.contrib.postgres.fields.jsonb import JSONField

#��
class UserForm(forms.Form): 
    username = forms.CharField(label='�û���',max_length=100)
    password = forms.CharField(label='����',widget=forms.PasswordInput())

class UserList(forms.Form):
    username = forms.CharField(label='�û���',max_length=100)
    listofquestions = JSONField()
#ע��
def regist(req):
    if req.method == 'POST':
        uf = UserForm(req.POST)
        if uf.is_valid():
            #��ñ�����
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #��ӵ����ݿ�
            User.objects.create(username= username,password=password)
#             return HttpResponse('regist success!!')
            return HttpResponseRedirect('/ssd/login/')
    else:
        uf = UserForm()
    return render(req,'regist.html',{'uf':uf})

#��½
def login(req):
    if req.method == 'POST':
        uf = UserForm(req.POST)
        if uf.is_valid():
            #��ȡ���û�����
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #��ȡ�ı����������ݿ���бȽ�
            user = User.objects.filter(username__exact = username,password__exact = password)
            if user:
                #�Ƚϳɹ�����תindex
                response = HttpResponseRedirect('/ssd/index/')
                #��usernameд�������cookie,ʧЧʱ��Ϊ3600
                response.set_cookie('username',username,3600)
                return response
            else:
                #�Ƚ�ʧ�ܣ�����login
                return HttpResponseRedirect('/ssd/login/')
    else:
        uf = UserForm()
    return render(req,'login.html',{'uf':uf})

#��½�ɹ�
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

#�˳�
def logout(req):
    response = HttpResponseRedirect('/ssd/login/')
#     response = HttpResponse('logout !!')
    #����cookie�ﱣ��username
    response.delete_cookie('username')
    return response







