'''
    this program is used to manage the website locally.
    by sumiyo

'''



import requests
import os
import subprocess
import threading
import pytz
import json

from tkinter import *
from configparser import ConfigParser
from datetime import datetime, timezone, timedelta



path = os.getcwd()
path = os.path.dirname(path) + "\\config\\"

config = ConfigParser()
wait = 0
process = -50
getinbox = 0
stopwait = 0



# 实时调整元素大小
def resize(event):
    inbox.focus_set()
    h = root.winfo_height()
    w = root.winfo_width()

    text.place(anchor='nw', x=2, y=0, w=w - 4, h=h - 20)
    canvas.place(anchor='nw', x=0, y=h - 20, w=w, h=20)
    if (wait != 1):
        inbox.place(anchor='nw', x=0, y=h - 20, w=w, h=20)
    else:
        inbox.place(anchor='nw', x=0, y=-20, w=w, h=20)



# 读取配置文件
def iniRead():
    if (os.path.exists(path + "config.ini")):
        global token, aid, zid, pj, cm, cmt, font, fontsize
        config.read(path + "config.ini")

        token = config.get("API token", "api_token")
        aid = config.get("API token", "account_id")
        zid = config.get("API token", "zone_id")
        pj = config.get("API token", "project")
        cm = config.get("Git settings", "description")
        cmt = config.get("Git settings", "commit")
        font = config.get("Console", "font")
        fontsize = config.get("Console", "fontsize")
    else:
        # 添加节并设置键值对
        config.add_section("API token")
        config.set("API token", "API_token", "")
        config.set("API token", "account_id", "")
        config.set("API token", "zone_id", "")
        config.set("API token", "project", "")
        
        config.add_section("Git settings")
        config.set("Git settings", "commit", "0")
        config.set("Git settings", "description", "UPDATE")

        config.add_section("Console")
        config.set("Console", "font", "Microsoft YaHei")
        config.set("Console", "fontsize", "10")

        # 写入文件
        with open(path + "config.ini", "w") as configfile:
           config.write(configfile)

        iniRead()

iniRead()



def code(content, tag):
    text.config(state="normal")

    text.insert(END, content)
    text.config(state="disable")

    text.see(END)
    text.update()
    text.yview_moveto(1.0)

    if (tag == "cmd"):
        line = str(int(text.index('end-1c').split('.')[0]) - 1)
        text.tag_add("tag1", line + ".0", line + ".end")

    if (tag == "err"):
        line = str(int(text.index('end-1c').split('.')[0]) - 1)
        text.tag_add("tag2", line + ".0", line + ".end")

    if (tag == "info"):
        line = str(int(text.index('end-1c').split('.')[0]) - 1)
        text.tag_add("tag3", line + ".0", line + ".end")

    if (tag == "su"):
        line = str(int(text.index('end-1c').split('.')[0]) - 1)
        text.tag_add("tag4", line + ".0", line + ".end")



def check():
    global getinbox
    code("mimic.py   1.0.12\n\n", "null")

    code("$ git --version\n", "cmd")
    git = "git --version"
    temp = subprocess.run(git, capture_output=True, text=True, shell=True)
    if (temp.stderr == ""):
        code(temp.stdout, "null")
    else:
        code("fatal: fatal: git failed." + "\n", "err")
        code("ensure that you have added git to the system environment variables." + "\n", "err")
        return

    code("$ read --path: " + path + "config.ini" + "\n", "cmd")
    code("all settings data are as follows:" + "\n", "info")
    code('''[API token]\t\t{}
[account ID]\t\t{}
[zone ID]\t\t{}
[project]\t\t{}
[commit]\t\t{}
[description]\t\t{}

'''.format(token, aid, zid, pj, cmt, cm), "null")

    temp = token != "" and aid != "" and pj != "" and cm != "" and cmt != "" and font != "" and fontsize != ""
    if (temp == False):
        code("fatal: unable to get all env." + "\n", "err")
        code("ensure that the " + path + "config.ini is working properly." + "\n", "err")
        return

    else:

        code("$ git status\n", "cmd")
        git = "git status"
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)

        if ("nothing to commit" in temp.stdout):
            code("nothing to commit, working tree clean." + "\n", "null")
        else:
            code("discover changes.\n", "null")
            code("preparing to connect to the remote repository.\n", "su")

            getinbox = 3
            code("upload the website right now ? [Y/N]\n", "null")

def keep():
    if (int(cmt) > 100):
        global getinbox
        getinbox = 1
        code("the commit ( " + cmt + " ) is too hight, need to reset it ? [Y/N]\n", "null")
        return

    upload(1)



def upload(mode):
    global wait
    wait = 1
    code("start upload.\n", "null")

    threads = []
    t = threading.Thread(target=task2, args=(str(mode)))
    threads.append(t)
    t.start()



def task2(mode):
    global wait

    if (mode == "1"):
        code("$ git add .\n", "cmd")
        git = "git add ."
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        code('$ git commit -m "' + cm +' "\n', "cmd")
        git = "git commit -m " + cm
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        code("$ git push -u origin main\n", "cmd")
        git = "git push -u origin main"
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

    if (mode == "2"):
        global cmt
        cmt = str(int(cmt) - int(cmt1))

        code("$ git reset --soft HEAD~" + cmt + "\n", "cmd")
        git = "git reset --soft HEAD~" + cmt
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        code("$ git add .\n", "cmd")
        git = "git add ."
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        code('$ git commit -m "' + cm +' "\n', "cmd")
        git = "git commit -m " + cm
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        code("$ git push -u origin main --force\n", "cmd")
        git = "git push -u origin main --force"
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        cmt = cmt1

    config.read(path + "config.ini")
    config.set("Git settings", "commit", str(int(cmt) + 1))

    with open(path + "config.ini", "w") as configfile:
        config.write(configfile)

    code("upload succssful.\n", "su")
    code("you can directly close this window.\n", "null")
    wait = 0



def timer():
    global process, stopwait

    if (wait == 1 or stopwait == 1):
        stopwait = 1
        inbox.place(anchor='nw', x=0, y=-20, w=root.winfo_width(), h=20)
        process = process + 1
        canvas.delete("all")
        canvas.create_image(process * 4, 0, anchor='nw', image=img1)
        if (process == root.winfo_width() / 3):
            process = -50

            if (wait == 0):
                stopwait = 0

    canvas.after(15, timer)



def onReturn(event):
    global getinbox, cmt, cmt1, wait
    cmd = inbox.get('1.0', 'end-1c').replace("\n", "")
    inbox.delete("1.0", "end")

    if (getinbox == 1):
        temp = cmd == "y" or cmd == "Y"
        if (temp):
            getinbox = 2
            code("set commit to: ", "null")

        temp = cmd == "n" or cmd == "N"
        if (temp):
            getinbox = 0
            upload(1)
            
        return

    if (getinbox == 2):
        code(cmd + "\n", "null")
        if (cmd.isdigit()):
            if (int(cmd) != 0):
                getinbox = 0
                cmt1 = cmd
                if (int(cmt) - int(cmt1) > 0):
                    upload(2)
                return

        code("set commit to: ", "null")
        return

    if (getinbox == 3):
        temp = cmd == "y" or cmd == "Y"
        if (temp):
            getinbox = 0
            keep()

        temp = cmd == "n" or cmd == "N"
        if (temp):
            getinbox = 0
            code("upload is cancelled.\n", "err")
            
        return


    code("$ " + cmd + "\n", "cmd")

    if (cmd == "?"):
        code('''----------------------------------------------
?\t\t显示帮助信息
cls\t\t清空控制台
exit\t\t关闭控制台
restart\t\t重新开始上传
reduction\t\t减少当前 commit 次数
get\t\t获取所有部署信息
log\t\t查询日志
log -d\t\t下载日志
py\t\t执行原生 python 命令
git\t\t执行原生 git 命令
git-clear\t\t压缩 .git 文件夹
''', "null")
        return

    if (cmd == "exit"):
        root.destroy()
        return

    if (cmd[0:2] == "py"):
        temp = exec(cmd.replace("py ", ""))
        code("traceback: " + str(temp) + "\n", "null")
        return
    
    if (cmd == "cls"):
        text.config(state="normal")
        text.delete("1.0", "end")
        code("console cleared.\n", "null")
        text.config(state="disable")
        return

    if (cmd == "restart"):
        keep()
        return

    if (cmd == "git-clear"):
        temp = subprocess.run('git gc --prune=now', capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")
        code("done.\n", "null")
        return

    if (cmd == "get"):
        wait = 1
        
        threads = []
        t = threading.Thread(target=task1)
        threads.append(t)
        t.start()

        return

    if (cmd[0:3] == "git"):
        git = cmd
        temp = subprocess.run(git, capture_output=True, text=True, shell=True)
        code(temp.stdout, "null")

        return

    if (cmd == "reduction"):
        getinbox = 1
        code("the commit ( " + cmt + " ) is too hight, need to reset it ? [Y/N]\n", "null")
        return

    if (cmd == "log"):
        wait = 1
        
        threads = []
        t = threading.Thread(target=task3, args=(0,))
        threads.append(t)
        t.start()

        return

    if (cmd == "log -d"):
        wait = 1
        
        threads = []
        t = threading.Thread(target=task3, args=(1,))
        threads.append(t)
        t.start()

        return

    code("SyntaxError.\n", "err")



def task1():
    global wait
    headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(token)}
    response = requests.get("https://api.cloudflare.com/client/v4/accounts/{}/pages/projects/{}/deployments".format(aid, pj), headers=headers)
    data = response.json()

    code("id\t\tdate\n----------------------------------------------\n", "null")
    for i in range(0, len(data["result"])):
        code(data["result"][i]["short_id"] + "\t\t" + data["result"][i]["created_on"][0:19] + "\n", "null")
    wait = 0

def task3(d):
    global wait

    body = {
        "operationName": "GetSecuritySampledLogs",
        "variables": {
            "zoneTag": zid,
            "accountTag": aid,
            "filter": {
                "AND": [
                    {
                        "datetime_geq": (datetime.now(timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%SZ"),
                        "datetime_leq": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                        "requestSource": "eyeball"
                    }
                ]
            }
        },
        "query": '''query GetSecuritySampledLogs {
            viewer {
                scope: zones(filter: {zoneTag: $zoneTag}) {
                    logs: httpRequestsAdaptive(filter: $filter, limit: 100, orderBy: [\"datetime_DESC\"]) {
                        leakedCredentialCheckResult
                        cacheStatus
                        clientASNDescription
                        clientAsn
                        clientCountryName
                        clientIP
                        clientRequestHTTPHost
                        clientRequestHTTPMethodName
                        clientRequestHTTPProtocol
                        clientRequestPath
                        clientRequestScheme
                        userAgent
                        securityAction
                        securitySource
                        datetime
                        __typename
                        }
                        __typename
                    }
                    __typename
            }
        }'''
    }
    
    headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(token)}
    response = requests.post("https://api.cloudflare.com/client/v4/graphql", headers=headers, data=json.dumps(body))
    result = response.json()

    r1 = result["data"]["viewer"]["scope"][0]["logs"]
    for i in range(0, len(r1)):
        r1[i]["datetime"] = datetime.strptime(r1[i]["datetime"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Shanghai')).strftime("%Y-%m-%d %H:%M:%S")
    result["data"]["viewer"]["scope"][0]["logs"] = r1

    if (d == 1):
        f = path + "log\\" + datetime.now(timezone.utc).astimezone(pytz.timezone('Asia/Shanghai')).strftime("%Y-%m-%d %H-%M-%S") + ".log"
        with open(f, "w") as file:
            json.dump(result, file, indent=4, ensure_ascii=False)
    
        code("save as: " + f + "\n", "null")
        os.startfile(path + "log\\")

    else:
        r1 = result["data"]["viewer"]["scope"][0]["logs"]
        code("----------------------------------------------------------------------------------------------------------------------------------------------------------------------\ntime\t\tCountry\t\tIP\t\t\tUA\t\t\t\t\t\t\tRequestPath\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------\n", "null")
        for i in range(0, len(r1)):
            if (r1[i]["clientRequestPath"] == "/counter.api" ):
                code(r1[i]["datetime"][11:19] + "\t\t" + r1[i]["clientCountryName"] + "\t\t" + (r1[i]["clientIP"][:20]).ljust(20) + "\t\t\t" + (r1[i]["userAgent"][:50]).ljust(50)  + "\t\t\t\t\t\t\t" + r1[i]["clientRequestPath"]+ "\n", "info")
            else:
                code(r1[i]["datetime"][11:19] + "\t\t" + r1[i]["clientCountryName"] + "\t\t" + (r1[i]["clientIP"][:20]).ljust(20) + "\t\t\t" + (r1[i]["userAgent"][:50]).ljust(50)  + "\t\t\t\t\t\t\t" + r1[i]["clientRequestPath"]+ "\n", "null")

    wait = 0






root = Tk()

root.title('mimic.py')
root.geometry("600x380")
root.resizable(True, True)
root.configure(bg="#2E2E2E")



text = Text(root, font=(font, fontsize, "bold"), fg="#D5D5D5", bg="#2E2E2E", borderwidth=0, highlightthickness=0)
text.place(anchor='nw', x=2, y=0, w=600, h=360)

text.tag_config("tag1", foreground="#97DBFE")
text.tag_config("tag2", foreground="#F55B65")
text.tag_config("tag3", foreground="#D69D85")
text.tag_config("tag4", foreground="#55B155")

canvas = Canvas(root, borderwidth=0, highlightthickness=0)
canvas.place(anchor='nw', x=0, y=360, w=600, h=20)
canvas.configure(bg="#262626")

img1 = PhotoImage(file= path + "assets\processbar.png")

inbox = Text(root, font=(font, fontsize, "bold"), fg="#97DBFE", bg="#262626", borderwidth=0, highlightthickness=0)
inbox.place(anchor='nw', x=2, y=360, w=600, h=20)
inbox.focus_set()



check()
timer()


 
# 检测窗口大小改变
root.bind("<Configure>", resize)
root.bind("<Return>", onReturn)



root.mainloop()


