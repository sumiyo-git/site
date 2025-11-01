


import requests
import json
import os
import pytz
import subprocess

from configparser import ConfigParser
from datetime import datetime, timezone, timedelta
from colorama import init, Fore, Back, Style



# 初始化
env = {}

env["path"] = os.path.dirname(os.getcwd()) + "\\config\\"



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

# 截取命令
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

# 打印日志表格
def table1(a):
	r1 = a["data"]["viewer"]["scope"][0]["logs"]
	print(Style.NORMAL + Fore.WHITE + "正在生成表格")
	print(Style.DIM + Fore.WHITE + "lines:\t" + str(len(r1)))
	for i in range(0, len(r1)):
		r1[i]["datetime"] = datetime.strptime(r1[i]["datetime"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.UTC).astimezone(pytz.timezone("Asia/Shanghai")).strftime("%Y-%m-%d %H:%M:%S").replace("T", " ").replace("Z", " ")

	print("-----------------------------------------------------------------------------------------------------------------------------------------------------\nTime\t\tMethod\t\tCountry\t\tAction\t\tIP\t\t\tUA                                      RequestPath\n-----------------------------------------------------------------------------------------------------------------------------------------------------")
	r = ""
	for i in range(0, len(r1)):
		r = r + r1[i]["datetime"][11:19] + "\t" + r1[i]["clientRequestHTTPMethodName"] + "\t\t" + r1[i]["clientCountryName"] + "\t\t" + r1[i]["securityAction"].replace("unknown", "").replace("jschallenge", Back.YELLOW + Fore.BLACK + "质询" + Back.RESET + Fore.RESET).replace("block", Back.RED + Fore.BLACK + "阻止" + Back.RESET + Fore.RESET) + "\t\t" + (r1[i]["clientIP"][:20]).ljust(20) + "\t" + (r1[i]["userAgent"][:32]).ljust(40) + (r1[i]["clientRequestPath"][:40]).ljust(40).replace("/api/counter", Back.GREEN + Fore.BLACK + "/api/counter" + Back.RESET + Fore.RESET) + "\n"

	print(r + "-----------------------------------------------------------------------------------------------------------------------------------------------------")

# 调用 git
def git(string):
	return subprocess.run(string, capture_output=True, text=True, shell=True)

# 文件大小转换
def format_size(bytes):
    for unit in ['bytes', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024.0:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024.0
    return f"{bytes:.2f} PB"

# 获取目录大小
def get_folder_size(path):
    sum_size = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # 获取文件大小并累加
            sum_size += os.path.getsize(fp)
    return sum_size

# 执行命令
def command(string):
	global env
	cmd0 = string
	cmd1 = analysis(cmd0)



	# 帮助
	if (cmd1[0] == "?") or (cmd1[0].lower() == "help"):
		print(Fore.WHITE + Style.DIM + '''hello from sumiyo. this program is the backend console of the website sumiyo.link/
------------------------------------------------------------
控制台命令
------------------------------------------------------------
显示帮助信息\t\t\t? / help
清空控制台\t\t\tcls
关闭控制台\t\t\texit
打开配置文件\t\t\tconfig
\t\t\t\tsql
备份当前数据库\t\t\t\t-save
执行原生 SQL 命令\t\t\t-run "string" (SQL command)
\t\t\t\tdev
获取所有部署信息\t\t\t-info
删除指定部署\t\t\t\t-del "string" (ID)
\t\t\t\tlog
查询日志
查询指定时间段的日志\t\t\t-t "string" "string" (ts0 < ts1)
生成当前时间戳\t\t\t\t-ts
下载日志\t\t\t\t-save
打开指定日志\t\t\t\t-read "string" (file name)
读取本地日志列表\t\t\t-list
打开日志文件夹\t\t\t\t-open
\t\t\t\tgit
上传并部署更新\t\t\t\t-push
当前 commit 次数的减少值\t\t-reduce 0
优化本地 Git 仓库\t\t\t-clean
联网矫正 commit 次数\t\t\t-check
执行原生 Git 命令\t\t\t-run "string" (Git command)
------------------------------------------------------------
SQL 查询命令
------------------------------------------------------------
查询所有表名\t\t\tselect name from sqlite_schema where type='table' and name != '_cf_KV' ORDER BY name
查询指定表的全部数据\t\tselect * from 表名
查询指定表指定行的数据\t\tselect * from 表名 where 列名='数据'
修改指定位置的数据\t\tupdate 表名 set 列名='新数据' where 列名='数据'
重命名表\t\t\talter table 旧表名 rename to 新表名
重命名列\t\t\talter table 表名 rename column 旧列名 to 新列名
写入新数据\t\t\tinsert into 表名 (列名1, 列名2) VALUES (数据1, 数据2)
删除指定行\t\t\tdelete from 表名 where 列名='数据'
------------------------------------------------------------''')
		return "break"

	# 清屏
	if (cmd1[0].lower() == "cls"):
		os.system('cls')
		print(Style.DIM + Fore.WHITE + "已清空控制台记录")
		return "break"

	# 关闭
	if (cmd1[0].lower() == "exit"):
		raise SystemExit()
		return "break"

	# 打开配置文件
	if (cmd1[0].lower() == "config"):
		os.startfile(env["path"] + "config.ini")
		return "break"

	# 获取日志
	if (cmd1[0].lower() == "log"):
		if (cmd1[1].lower() == "-t") or (cmd1[1].lower() == "null") or (cmd1[1].lower() == "-save"):
			if (cmd1[3] != "null"):
				geq = cmd1[2]
				leq = cmd1[3]
			else:
				geq = (datetime.now(timezone.utc) - timedelta(days=env["offset"])).strftime("%Y-%m-%dT%H:%M:%SZ")
				leq = (datetime.now(timezone.utc) - timedelta(days=env["offset"] - 1)).strftime("%Y-%m-%dT%H:%M:%SZ")

			print(Style.NORMAL + Fore.WHITE + "正在下载日志数据")
			print(Style.DIM + Fore.WHITE + "from:\t{}\nto:\t{}".format(geq, leq))

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
								clientRequestHTTPMethodName
								clientRequestHTTPProtocol
								clientRequestPath
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
	
			headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(env["token"])}
			response = requests.post("https://api.cloudflare.com/client/v4/graphql", headers=headers, data=json.dumps(body))
			result = response.json()

			if ("-save" in cmd0):
				f = env["path"] + "logs\\" + datetime.now(timezone.utc).astimezone(pytz.timezone("Asia/Shanghai")).strftime("%Y-%m-%d %H-%M-%S") + ".log"
				with open(f, "w", encoding="utf-8") as file:
					json.dump(result, file, indent=4, ensure_ascii=False)
	
				print(Style.NORMAL + Fore.GREEN + "日志下载完成")
				print(Style.DIM + Fore.WHITE + "at:\t" + '"' + f + '"')
				os.startfile(env["path"] + "logs\\")
				return "break"
			else:
				table1(result)
				return "break"

		# 读取日志
		if (cmd1[2] != "null") and (cmd1[1].lower() == "-read"):
			f = env["path"] + "\\logs\\" + cmd1[2]

			if (os.path.exists(f)):
				with open(f, "r", encoding='utf-8') as file:
					table1(json.loads(file.read()))
				return "break"
			else:
				print(Style.NORMAL + Fore.RED + "无法读取指定文件")
				return "break"

		# 生成时间戳
		if (cmd1[1].lower() == "-ts"):
			print(Style.DIM + Fore.WHITE + datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
			return "break"

		# 打开日志文件夹
		if (cmd1[1].lower() == "-open"):
			print(Style.DIM + Fore.WHITE + '打开日志目录: "' + env["path"] + "logs\\" + '"')
			os.startfile(env["path"] + "logs\\")
			return "break"

		# 获取本地日志列表
		if (cmd1[1].lower() == "-list"):
			p = env["path"] + "\\logs"
			e = os.listdir(p)
			print(Style.NORMAL + Fore.WHITE + '正在扫描本地文件: "' + env["path"] + "logs\\*" + '"')
			files = [f for f in e if not os.path.isdir(os.path.join(p, f))]
			r = ""

			print(Style.NORMAL + Fore.WHITE + "正在生成表格")
			print(Style.DIM + Fore.WHITE + "lines:\t{}".format(len(files)))
			for i in range(0, len(files)):
				r = r + '"' + files[i] + '"\n'

			print(Style.DIM + Fore.WHITE + "------------------------------------------------------------\n文件名\n------------------------------------------------------------\n" +  r + "------------------------------------------------------------")
			return "break"

	# git
	if (cmd1[0].lower() == "git"):

		# 上传
		if (cmd1[1].lower() == "-push"):
			if ("nothing to commit" in git("git status").stdout) and (cmd1[2].lower() != "-force"):
				print(Style.DIM + Fore.WHITE + '无需提交任何内容\n但您可以键入 "git -push -force" 以强制提交更新')
				return "break"
			else:
				print(Style.NORMAL + Fore.WHITE + "准备连接到远程仓库")

				print(Style.DIM + Fore.WHITE + git("git add .").stdout[1:], end="")
				print(Style.DIM + Fore.WHITE + git("git commit -m " + env["des"]).stdout[1:], end="")
				if (cmd1[2].lower() == "-force"):
					a = git("git push -u origin main").stdout
				else:
					a = git("git push -u origin main --force").stdout

				if ("set up to track" in a):
					print(Style.NORMAL + Fore.GREEN + "操作成功，文件已上传至 github 仓库")
					print(Style.NORMAL + Fore.WHITE + "开始部署更新")

					env["cmt"] += 1
					f = env["path"] + "config.ini"
					c = ConfigParser()
					c.read(f)
					c.set("GIT", "commit", str(env["cmt"]))
					with open(f, "w") as file:
						c.write(file)
				else:
					print(Style.NORMAL + Fore.RED + "更新部署失败")
				return "break"

		# 减少 commit 值
		if (cmd1[1].lower() == "-reduce") and (cmd1[2].lower() != "null"):
			env["cmt"] = env["cmt"] - (int(cmd1[2]) - 1)

			print(Style.DIM + Fore.WHITE + git("git reset --soft HEAD~" + cmd1[2]).stdout[1:], end="")
			print(Style.DIM + Fore.WHITE + git("git add .").stdout[1:], end="")
			print(Style.DIM + Fore.WHITE + git("git commit -m " + env["des"]).stdout[1:], end="")
			a = git("git push -u origin main --force").stdout

			if ("set up to track" in a):
				print(Style.NORMAL + Fore.GREEN + "操作成功，文件已上传至 github 仓库")
				print(Style.NORMAL + Fore.WHITE + "开始部署更新")

				f = env["path"] + "config.ini"
				c = ConfigParser()
				c.read(f)
				c.set("GIT", "commit", str(env["cmt"]))
				with open(f, "w") as file:
					c.write(file)
			else:
				print(Style.NORMAL + Fore.RED + "更新部署失败")
			return "break"

		# 压缩仓库
		if (cmd1[1].lower() == "-clean"):
			print(Style.NORMAL + Fore.WHITE + "开始优化本地仓库")
			o_size = format_size(get_folder_size(".git"))
			git("git gc --aggressive --prune=now").stdout
			n_size = format_size(get_folder_size(".git"))
			print(Style.NORMAL + Fore.GREEN + "操作成功 ({} => {})".format(o_size, n_size))
			return "break"

		# 矫正 commit 值
		if (cmd1[1].lower() == "-check"):
			print(Style.NORMAL + Fore.WHITE + "正在从 github 获取 commit 的实际值")
			env["cmt"] = int(git("git rev-list --all --count").stdout)
			f = env["path"] + "config.ini"
			c = ConfigParser()
			c.read(f)
			c.set("GIT", "commit", str(env["cmt"]))
			with open(f, "w") as file:
				c.write(file)

			print(Style.DIM + Fore.WHITE + "commit:\t{}".format(env["cmt"]))
			print(Style.NORMAL + Fore.GREEN + "操作成功")
			return "break"

		# 执行 git 命令
		if (cmd1[1].lower() == "-run") and (cmd1[2].lower() != "null") and (cmd1[3].lower() == "null"):
			print(Style.DIM + Fore.WHITE + git(cmd1[2]).stdout, end="")
			return "break"

	# 部署控制
	if (cmd1[0].lower() == "dev"):
		# 获取部署信息
		if (cmd1[2] == "null") and (cmd1[1].lower() == "-info"):
			print(Style.NORMAL + Fore.WHITE + "正在下载部署数据")

			headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(env["token"])}
			response = requests.get("https://api.cloudflare.com/client/v4/accounts/{}/pages/projects/{}/deployments".format(env["aid"], env["project"]), headers=headers)
			data = response.json()["result"]
			r = ""

			print(Style.NORMAL + Fore.WHITE + "正在生成表格")
			print(Style.DIM + Fore.WHITE + "lines:\t{}".format(len(data)))
			for i in range(0, len(data)):
				r = r + data[i]["created_on"][5:16].replace("T", " ") + "\t" + data[i]["id"] + "\t" + data[0]["stages"][1]["status"] + "\n"

			print(Style.NORMAL + Fore.WHITE + "------------------------------------------------------------\n时间\t\tID\t\t\t\t\t状态\n------------------------------------------------------------")
			print(Style.NORMAL + Fore.WHITE + r + "------------------------------------------------------------")
			return "break"

		# 删除部署
		if (cmd1[2] != "null") and (cmd1[1].lower() == "-del"):
			print(Style.NORMAL + Fore.WHITE + "发送指令中")
			headers = {"Content-Type": "application/json;charset=UTF-8", "Authorization": "Bearer {}".format(env["token"])}
			response = requests.delete("https://api.cloudflare.com/client/v4/accounts/{}/pages/projects/{}/deployments/{}".format(env["aid"], env["project"], cmd1[2]), headers=headers)
			data = response.json()
			print(Style.DIM + Fore.WHITE + "响应值:")
			print(Style.DIM + Fore.WHITE + "{}".format(data))
			return "break"

	# 数据互交
	if (cmd1[0].lower() == "sql"):
		# 备份数据库
		if (cmd1[2] == "null") and (cmd1[1].lower() == "-save"):
			print(Style.NORMAL + Fore.WHITE + "开始备份当前数据库")

			url0 = "https://api.cloudflare.com/client/v4/accounts/{}/d1/database/{}/export".format(env["aid"], env["bid"])
			body = { "output_format": "polling" }
			headers = {"Content-Type": "application/json", "Authorization": "Bearer {}".format(env["token"])}

			response = requests.post(url0, headers=headers, data=json.dumps(body))
			r1 = response.json()

			if (len(r1["errors"]) == 0):
				print(Style.DIM + Fore.WHITE + "bookmark: " + r1["result"]["at_bookmark"])
				print(Style.NORMAL + Fore.WHITE + "请求下载链接")

				body =  { "current_bookmark": r1["result"]["at_bookmark"] }
				response = requests.post(url0, headers=headers, data=json.dumps(body))
				r2 = response.json()

				if (len(r2["errors"]) == 0):
					print(Style.DIM + Fore.WHITE + "signed_url: " + r2["result"]["signed_url"])
					url2 = r2["result"]["signed_url"]
					f = env["path"] + "database\\" + datetime.now(timezone.utc).astimezone(pytz.timezone("Asia/Shanghai")).strftime("%Y-%m-%d %H-%M-%S") + ".sql"
					response = requests.get(url2)
					with open(f, "wb") as file:
						file.write(response.content)
						
					print(Style.NORMAL + Fore.GREEN + '数据库备份成功: "' + f + '"')
					os.startfile(env["path"] + "database\\")
				else:
					print(Style.NORMAL + Fore.RED + "备份过程中抛出异常")

				return "break"
			else:
				print(Style.NORMAL + Fore.RED + "备份过程中抛出异常")
				return "break"

		# 执行 sql 命令
		if (cmd1[2] != "null") and (cmd1[1].lower() == "-run"):
			headers = {"Content-Type": "application/json", "Authorization": "Bearer {}".format(env["token"])}
			body = {
				"sql": cmd1[2]
			}
			response = requests.post("https://api.cloudflare.com/client/v4/accounts/{}/d1/database/{}/query".format(env["aid"], env["bid"]), headers=headers, data=json.dumps(body))
			print(Style.NORMAL + Fore.WHITE + "响应值:")
			print(Style.DIM + Fore.WHITE + str(response.json()))
			return "break"



	print(Style.NORMAL + Fore.RED + "无法识别的命令语句")
	return "break"



# colorama 初始化并设置自动重置颜色
init(autoreset=True)
# 读取配置文件
config()

print(Fore.WHITE + Style.NORMAL + "uploader.py 1.0.243")
print(Fore.WHITE + Style.DIM + '键入 "?" 或 "help" 以查看帮助信息')



while env != 0:
	command(input(Fore.CYAN + Style.BRIGHT + "$ " + Fore.WHITE))


