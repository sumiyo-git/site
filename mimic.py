
import requests
import json
import os
import tkinter as tk
import pytz
import subprocess

from configparser import ConfigParser
from datetime import datetime, timezone, timedelta



# 初始化
env = {}

env["path"] = os.path.dirname(os.getcwd()) + "\\config\\"
env["line"] = 0



# 读取配置文件
def config():
    global env
    f = env["path"] + "config.ini"
    c = ConfigParser()

    if (os.path.exists(f)):
        c.read(f)

        env["project"] = c.get("TOKEN", "project")
        env["token"] = c.get("TOKEN", "api_token")
        env["aid"] = c.get("TOKEN", "account_id")
        env["zid"] = c.get("TOKEN", "zone_id")
        env["bid"] = c.get("TOKEN", "database_id")
        env["des"] = c.get("GIT", "description")
        env["cmt"] = int(c.get("GIT", "commit"))
        env["offset"] = int(c.get("LOG", "offset"))
        env["lmt"] = c.get("LOG", "limit")
    else:
        # 添加节并设置键值对
        c.add_section("TOKEN")
        c.set("TOKEN", "project", "null")
        c.set("TOKEN", "api_token", "null")
        c.set("TOKEN", "account_id", "null")
        c.set("TOKEN", "zone_id", "null")
        c.set("TOKEN", "database_id", "null")
        
        c.add_section("GIT")
        c.set("GIT", "commit", "0")
        c.set("GIT", "description", "UPDATE")

        c.add_section("LOG")
        c.set("LOG", "offset", "1")
        c.set("LOG", "limit", "100")

        # 写入文件
        with open(f, "w") as file:
           c.write(file)

        config()

config()



# 分析命令
def analysis(string):
    parts = []
    current_part = []
    in_quotes = False

    for char in string:
        if char == '"':
            in_quotes = not in_quotes
            if not in_quotes:
                continue
        elif char == ' ' and not in_quotes:
            if current_part:
                parts.append(''.join(current_part))
                current_part = []
        else:
            current_part.append(char)

    if current_part:
        parts.append(''.join(current_part))

    for i in range(len(parts)):
        parts[i] = parts[i].strip('"')
    for i in range(0, 10):
        parts.append("null")

    return parts



# 打印文本
def wprint(string, tag):
    text.insert(tk.END, string)
    text.see(tk.END)
    text.update()
    text.yview_moveto(1.0)

    env['line'] = line = int(text.index('end-1c').split('.')[0]) - 1
    text.tag_add("tag" + str(tag), str(line) + ".0", str(line) + ".end")



# 限制编辑
def onpress(event):
    if not ((event.state & 0x0004) and (event.keysym == 'c')):
        index = text.index(tk.INSERT)
        line_number = int(index.split(".")[0])

        if line_number == env["line"]:
            text.insert(tk.END, "\n")
        if line_number <= env["line"]:
            return "break"



# 限制全选
def onall(event):
    return "break"



# 打印日志表格
def table1(a):
    r1 = a["data"]["viewer"]["scope"][0]["logs"]
    wprint("正在生成数据表格\n", 1)
    wprint("lines:\t" + str(len(r1)) + "\n", 0)
    for i in range(0, len(r1)):
        r1[i]["datetime"] = datetime.strptime(r1[i]["datetime"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Shanghai')).strftime("%Y-%m-%d %H:%M:%S").replace("T", " ").replace("Z", " ")

    wprint("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\ntime\t\tCountry\t\tAction\t\tIP\t\t\tUA\t\t\t\t\t\t\tRequestPath\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n", 0)
    r = ""
    for i in range(0, len(r1)):
        r = r + r1[i]["datetime"][11:19] + "\t\t" + r1[i]["clientCountryName"] + "\t\t" + r1[i]["securityAction"].replace("unknown", "") + "\t\t" + (r1[i]["clientIP"][:20]).ljust(20) + "\t\t\t" + (r1[i]["userAgent"][:50]).ljust(50)  + "\t\t\t\t\t\t\t" + (r1[i]["clientRequestPath"][:70]).ljust(50)+ "\n"

    wprint(r + "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n", 0)



# 执行 git 命令
def git(string):
    return subprocess.run(string, capture_output=True, text=True, shell=True)



# 执行命令
def command(event):
    global env
    line = text.index("end-1c linestart")
    cmd0 = text.get(line, line + " lineend")
    cmd1 = analysis(cmd0)
    text.delete(line, line + " lineend + 1c")

    if cmd0 != "":
        wprint("\n" + cmd0 + "\n", 0)
    else:
        wprint("\n", 0)
        env["line"] -= 1



    # 帮助
    if (cmd1[0] == "?") or (cmd1[0].lower() == "help"):
        wprint('''--------------------------------------------------------------------
? \ help\t\t\t显示帮助信息
cls\t\t\t清空控制台
exit\t\t\t关闭控制台
config\t\t\t打开配置文件
data -develop\t\t\t获取所有部署信息
data -save\t\t\t备份当前数据库
data -sql\t\t\t查看 SQL 命令帮助
data -sql "string"\t\t\t执行原生 SQL 命令
log\t\t\t查询日志
log -t date0 date1\t\t\t查询指定时间段的日志
log -ts\t\t\t生成当前时间戳
log -save\t\t\t下载日志
log -read "string"\t\t\t打开指定日志
log -list\t\t\t读取本地日志列表
git -push\t\t\t上传并部署更新
git -reduce 0\t\t\t减少当前 commit 次数
git -clear\t\t\t压缩 .git 文件夹
git "string"\t\t\t执行原生 git 命令
--------------------------------------------------------------------
''', 0)
        return "break"

    # 清屏
    if (cmd1[0].lower() == "cls"):
        text.delete("1.0", tk.END)
        wprint("已清空控制台记录\n", 1)
        env["line"] = 0
        return "break"

    # 关闭
    if (cmd1[0].lower() == "exit"):
        root.destroy()
        return "break"

    # 打开配置文件
    if (cmd1[0].lower() == "config"):
        os.startfile(env['path'] + "config.ini")
        return "break"

    # 获取日志
    if (cmd1[0].lower() == "log"):
        if (cmd1[1].lower() == "-t") or (cmd1[1].lower() == "null") or (cmd1[1].lower() == "-save"):
            if (cmd1[3] != "null"):
                geq = cmd1[2]
                leq = cmd1[3]
            else:
                geq = (datetime.now(timezone.utc) - timedelta(days=env['offset'])).strftime("%Y-%m-%dT%H:%M:%SZ")
                leq = (datetime.now(timezone.utc) - timedelta(days=env['offset'] - 1)).strftime("%Y-%m-%dT%H:%M:%SZ")

            wprint("正在下载日志数据\n", 1)
            wprint("from:\t{}\nto:\t{}\n".format(leq, geq), 0)

            body = {
                "operationName": "GetSecuritySampledLogs",
                "variables": {
                    "zoneTag": env["zid"],
                    "accountTag": env["aid"],
                    "filter": {
                        "AND": [
                            {
                                "datetime_geq": geq,
                                "datetime_leq": leq,
                                "requestSource": "eyeball"
                            }
                        ]
                    }
                },
                "query": '''query GetSecuritySampledLogs {
                    viewer {
                        scope: zones(filter: {zoneTag: $zoneTag}) {
                            logs: httpRequestsAdaptive(filter: $filter, limit: ''' + env["lmt"] + ''', orderBy: [\"datetime_DESC\"]) {
                                leakedCredentialCheckResult
                                clientASNDescription
                                clientAsn
                                clientCountryName
                                clientIP
                                clientRequestHTTPHost
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
    
            headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(env['token'])}
            response = requests.post("https://api.cloudflare.com/client/v4/graphql", headers=headers, data=json.dumps(body))
            result = response.json()

            if ("-save" in cmd0):
                f = env["path"] + "logs\\" + datetime.now(timezone.utc).astimezone(pytz.timezone('Asia/Shanghai')).strftime("%Y-%m-%d %H-%M-%S") + ".log"
                with open(f, "w") as file:
                    json.dump(result, file, indent=4, ensure_ascii=False)
    
                wprint("日志已保存: " + f + "\n", 2)
                os.startfile(env["path"] + "logs\\")
                return "break"
            else:
                table1(result)
                return "break"

        # 读取日志
        if (cmd1[2] != "null") and (cmd1[1].lower() == "-read"):
            f = env["path"] + "\\logs\\" + cmd1[2]

            if (os.path.exists(f)):
                with open(f, 'r') as file:
                    table1(json.loads(file.read()))
                return "break"
            else:
                wprint("无法读取指定文件\n", 3)
                return "break"

        # 生成时间戳
        if (cmd1[1].lower() == "-ts"):
            wprint(datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ") + "\n", 0)
            return "break"

        # 获取本地日志列表
        if (cmd1[1].lower() == "-list"):
            p = env["path"] + "\\logs"
            e = os.listdir(p)
            files = [f for f in e if not os.path.isdir(os.path.join(p, f))]
            r = ""
            for i in range(0, len(files)):
                r = r + files[i] + "\n"

            wprint("--------------------------------------------------------------------\n" + r + "--------------------------------------------------------------------\n", 0)
            return "break"

    # git
    if (cmd1[0].lower() == "git"):

        # 上传
        if (cmd1[1].lower() == "-push"):
            if ("nothing to commit" in git("git status").stdout):
                wprint("无需提交任何内容，你的本地代码与最新提交的版本完全一致\n", 4)
                wprint('或键入 "git -push -force" 以强制提交更新\n', 0)
                return "break"
            else:
                wprint("准备连接到远程仓库\n", 1)

                wprint(git("git add .").stdout, 0)
                wprint(git("git commit -m " + env["des"]).stdout, 0)
                if (cmd1[2].lower() == "-force"):
                    a = git("git push -u origin main").stdout
                else:
                    a = git("git push -u origin main --force").stdout

                if ("set up to track" in a):
                    wprint("更新已部署\n", 2)

                    env['cmt'] += 1
                    root.title("uploader.py (commit: {})".format(str(env['cmt'])))

                    f = env["path"] + "config.ini"
                    config.read(f)
                    config.set("GIT", env['cmt'])
                    with open(f) as configfile:
                        config.write(configfile)
                else:
                    wprint("更新部署失败\n", 3)
                return "break"

        # 减少 commit 值
        if (cmd1[1].lower() == "-reduce") and (cmd1[2].lower() != "null"):
            env['cmt'] = abs(env['cmt'] - int(cmd1[2])) or 1

            wprint(git("git reset --soft HEAD~" + str(env['cmt'])).stdout, 0)
            wprint(git("git add .").stdout, 0)
            wprint(git("git commit -m " + env["des"]).stdout, 0)
            a = git("git push -u origin main --force").stdout

            if ("set up to track" in a):
                wprint("更新已部署\n", 2)

                root.title("uploader.py (commit: {})".format(str(env['cmt'])))

                f = env["path"] + "config.ini"
                config.read(f)
                config.set("GIT", env['cmt'])
                with open(f) as configfile:
                    config.write(configfile)
            else:
                wprint("更新部署失败\n", 3)
            return "break"

        # 压缩仓库
        if (cmd1[1].lower() == "-clear"):
            wprint(git("git gc --prune=now").stdout, 0)
            return "break"

        # 执行 git 命令
        if (cmd1[1].lower() != "null") and (cmd1[2].lower() == "null"):
            wprint("执行结果:\n", 4)
            wprint(git(cmd1[1]).stdout, 0)
            return "break"


    # 数据互交
    if (cmd1[0].lower() == "data"):
        # 获取部署信息
        if (cmd1[2] == "null") and (cmd1[1].lower() == "-develop"):
            headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(env["token"])}
            response = requests.get("https://api.cloudflare.com/client/v4/accounts/{}/pages/projects/{}/deployments".format(env["aid"], env["project"]), headers=headers)
            data = response.json()["result"]
            r = ""
            for i in range(0, len(data)):
                r = r + data[i]["created_on"][0:19] + "\t\t\t" + data[i]["short_id"] + "\t\t" + data[0]["stages"][1]["status"] + "\n"

            wprint("--------------------------------------------------------------------\n时间\t\t\tID\t\t状态\n--------------------------------------------------------------------\n", 0)
            wprint(r + "--------------------------------------------------------------------\n", 0)
            return "break"

        # 备份数据库
        if (cmd1[2] == "null") and (cmd1[1].lower() == "-save"):
            wprint("开始备份当前数据库\n", 1)

            url0 = "https://api.cloudflare.com/client/v4/accounts/{}/d1/database/{}/export".format(env["aid"], env["bid"])
            body = { "output_format": "polling" }
            headers = {"Content-Type": "application/json", "Authorization": "Bearer {}".format(env["token"])}

            response = requests.post(url0, headers=headers, data=json.dumps(body))
            r1 = response.json()

            if (len(r1["errors"]) == 0):
                wprint("bookmark: " + r1["result"]["at_bookmark"] + "\n", 0)

                body =  { "current_bookmark": r1["result"]["at_bookmark"] }
                response = requests.post(url0, headers=headers, data=json.dumps(body))
                r2 = response.json()

                if (len(r2["errors"]) == 0):
                    wprint("signed_url: " + r2["result"]["signed_url"] + "\n", 0)
                    url2 = r2["result"]["signed_url"]
                    f = env["path"] + "database\\" + datetime.now(timezone.utc).astimezone(pytz.timezone('Asia/Shanghai')).strftime("%Y-%m-%d %H-%M-%S") + ".sql"
                    response = requests.get(url2)
                    with open(f, 'wb') as file:
                        file.write(response.content)
                        
                    wprint("数据库备份成功: " + f + "\n", 2)
                    os.startfile(env["path"] + "database\\")
                else:
                    wprint("备份过程中抛出异常\n", 2)

                return "break"
            else:
                wprint("备份过程中抛出异常\n", 2)
                return "break"

        # 执行 sql 命令
        if (cmd1[2] != "null") and (cmd1[1].lower() == "-sql"):
            headers = {"Content-Type": "application/json", "Authorization": "Bearer {}".format(env["token"])}
            body = {
                "sql": cmd1[2]
            }
            response = requests.post("https://api.cloudflare.com/client/v4/accounts/{}/d1/database/{}/query".format(env["aid"], env["bid"]), headers=headers, data=json.dumps(body))
            wprint("查询结果:\n", 4)
            wprint(str(response.json()) + "\n", 0)
            return "break"

        # 显示 sql 命令帮助
        if (cmd1[2] == "null") and (cmd1[1].lower() == "-sql"):
            wprint('''------------------------------------------------------------------------------------------------
查询所有表名\t\t\tselect name from sqlite_schema where type='table' and name != '_cf_KV' ORDER BY name
查询指定表的全部数据\t\t\tselect * from 表名
查询指定表指定行的数据\t\t\tselect * from 表名 where 列名='数据'
修改指定位置的数据\t\t\tupdate 表名 set 列名='新数据' where 列名='数据'
重命名表\t\t\talter table 旧表名 rename to 新表名
重命名列\t\t\talter table 表名 rename column 旧列名 to 新列名
写入新数据\t\t\tinsert into 表名 (列名1, 列名2) VALUES (数据1, 数据2)
删除指定行\t\t\tdelete from 表名 where 列名='数据'
------------------------------------------------------------------------------------------------
''', 0)
            return "break"


    wprint("无效的命令语句 (" + line.replace(".", ", ") + ")\n", 3)
    return "break"



root = tk.Tk()

root.title("uploader.py (commit: {})".format(str(env['cmt'])))
root.geometry("600x380")
root.resizable(True, True)
root.configure(bg="#000000")

scrollbar = tk.Scrollbar(root, orient="vertical")
scrollbar.pack(side=tk.RIGHT, fill="both")

text = tk.Text(root, font=("Microsoft YaHei", 10, "bold"), fg="#D5D5D5", bg="#000000", yscrollcommand=scrollbar.set, borderwidth=0, highlightthickness=0)
text.pack(expand=True, fill="both")
text.focus_set()

scrollbar.config(command=text.yview)

text.tag_config("tag0", foreground="#D5D5D5") # 白
text.tag_config("tag1", foreground="#97DBFE") # 蓝
text.tag_config("tag2", foreground="#55B155") # 绿
text.tag_config("tag3", foreground="#F55B65") # 红
text.tag_config("tag4", foreground="#D69D85") # 橙

text.bind("<Key>", onpress)
text.bind('<Control-a>', onall)
text.bind("<Return>", command)



# 初始化
wprint("uploader.py 1.0.241\n", 1)
wprint('键入 "?" 或 "help" 以查看帮助信息\n', 0)


root.mainloop()


