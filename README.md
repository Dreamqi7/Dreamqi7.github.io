# 孟琪 (Qi Meng) 个人学术主页

纯静态网页，零依赖、零构建。改完直接推到 GitHub 就上线。

---

## 现状

内容已根据你的 AMSS 主页填好，作者列表用 DBLP / arXiv 补全过。**还需要你处理 5 处**，
在 `index.html` 里搜 `【待补】` 和 `【请核对】` 就能定位：

1. `files/CV.pdf` — 简历还没放。不打算放就把侧栏那个 `<li>` 删掉。
2. **Convergence of Deep Random Vortex Network Method**（Physics of Fluids）——
   DBLP 和 arXiv 都没检索到，作者列表要你手填。
3. **Stochastic Lag Time Parameterization for Markov State Models**（JPC 2022）——同上。
4. **Continuous View on Gradient Descent Methods**（你写的是 AAAI-2018）——
   DBLP 上只有 IJCAI-2018 的 *Differential Equations for Modeling Asynchronous Algorithms*
   (Li He, Qi Meng, Wei Chen, Zhi-Ming Ma, Tie-Yan Liu)。如果是同一篇，按注释里的改。
5. **Group 区块** — 目前只有李嘉豪一人（照搬你主页）。学生/博后照格式加。

另外，**Publications 里前 12 篇是我从 DBLP/arXiv 补的近期成果**（TPAMI 2025、ICLR 2025、
KDD 2024、ACL 2024 等，你 AMSS 主页上还没有）。HTML 里有醒目注释标出范围，
请核对；有不是你的就整块删掉。

**News 区块**的日期是我根据论文发表时间推的，请校准。

---

## 一、文件结构

```
person_page/
├── index.html          ← 所有内容都在这里，改这个文件
├── css/style.css       ← 配色、字体、排版
├── js/main.js          ← 明暗主题切换 / 目录高亮（一般不用改）
├── images/
│   ├── avatar.svg      ← 占位头像，换成你自己的照片
│   └── favicon.svg     ← 浏览器标签页小图标
├── files/              ← 把 CV.pdf 放这里
└── .nojekyll           ← 告诉 GitHub 别拿 Jekyll 处理，别删
```

`index.html` 里有 11 处 `【改这里 N】` 注释，按编号从上往下填就行。

---

## 二、本地预览

在 `person_page` 目录下执行：

```bash
python3 -m http.server 8000
```

然后浏览器打开 <http://localhost:8000>。改完文件按 `Ctrl+Shift+R` 强制刷新（普通刷新可能读缓存）。

> 直接双击 `index.html` 也能看，但用本地服务器更接近线上真实效果。
> 停止服务器：在终端按 `Ctrl+C`。

---

## 三、部署到 GitHub Pages

### 第 0 步：准备 GitHub 账号

去 <https://github.com> 注册。**你的用户名会直接变成网址的一部分**，所以想清楚再定——
用户名 `zhangsan` → 网址 `https://zhangsan.github.io`。学术主页建议用真名拼音。

### 第 1 步：创建仓库（关键一步）

1. 登录后点右上角 `+` → **New repository**
2. **Repository name 必须填 `你的用户名.github.io`**（一个字都不能差，全小写）
   - 比如注册用户名是 `qimeng`，仓库名就填 `qimeng.github.io`，网址就是 `https://qimeng.github.io`
   - 学术主页建议用真名拼音做用户名：`qimeng` / `mengqi` / `qimeng-amss` 之类
3. 选 **Public**（Public 才免费用 Pages）
4. **不要**勾选 "Add a README file" —— 保持空仓库，省得后面冲突
5. 点 **Create repository**

> **为什么必须叫这个名字？** GitHub 有个特殊规则：名为 `<用户名>.github.io` 的仓库会
> 被自动当作你的"个人主站"，直接绑到 `https://<用户名>.github.io` 根域名。
> 如果叫别的名字（比如 `homepage`），网址会变成 `https://<用户名>.github.io/homepage/`，
> 多一层路径，不好看。

### 第 2 步：把代码传上去

**方式 A：网页拖拽（不用装 git，最简单）**

1. 进你刚建的空仓库页面
2. 点 **uploading an existing file** 链接
3. 把 `person_page` 文件夹里的**所有内容**（注意是内容，不是文件夹本身）拖进去
   - `index.html`、`css/`、`js/`、`images/`、`files/`、`.nojekyll`
   - ⚠️ `.nojekyll` 是隐藏文件，Mac 上按 `Cmd+Shift+.`、Linux 文件管理器按 `Ctrl+H` 才能看见
4. 底部写个提交说明，点 **Commit changes**

**方式 B：命令行（推荐，以后更新一条命令搞定）**

第一次要先配置身份（只需配一次）：

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"   # 用 GitHub 注册邮箱
```

然后在 `person_page` 目录下：

```bash
git init
git add -A
git commit -m "init: academic homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

推送时会要求登录：
- **用户名**填 GitHub 用户名
- **密码栏填 Personal Access Token，不是你的登录密码**（GitHub 2021 年起就不收密码了）

生成 Token：GitHub 右上角头像 → Settings → 拉到最底 Developer settings →
Personal access tokens → Tokens (classic) → Generate new token (classic) →
勾选 **repo** 权限 → 生成。**Token 只显示一次，立刻复制存好。**

> 想免去每次输密码：`git config --global credential.helper store`
> （会把 token 明文存在 `~/.git-credentials`，自己的机器上用没问题，公用电脑别开）

### 第 3 步：打开 Pages 开关

1. 进仓库 → 顶部 **Settings**
2. 左侧菜单找到 **Pages**
3. **Source** 选 **Deploy from a branch**
4. **Branch** 选 `main`，右边文件夹选 `/ (root)`
5. 点 **Save**

> 很多情况下 GitHub 会自动识别并开启，进去发现已经配好了就不用动。

### 第 4 步：等待上线

回到仓库首页，顶部会有个黄点（正在部署）→ 变绿勾（部署完成），通常 **1–3 分钟**。
首次开通偶尔要等 10 分钟。

然后访问：

```
https://你的用户名.github.io
```

搞定 🎉

### 第 5 步：以后怎么更新

改完文件后：

```bash
git add -A
git commit -m "update publications"
git push
```

推上去 1 分钟左右自动生效。用网页方式的话，直接在 GitHub 网页上点文件 → 铅笔图标 → 改 → Commit 也行。

---

## 四、常见问题

**页面上线了但没有样式，光秃秃一片**
路径大小写错了。GitHub 服务器区分大小写，本地 Windows/Mac 不区分，所以本地好好的、
线上就崩。检查 `href="css/style.css"` 的大小写和实际文件名是否完全一致。
另外确认用的是相对路径 `css/style.css`，不是 `/css/style.css`。

**404 Not Found**
1. 仓库名拼错了？必须严格等于 `<用户名>.github.io`
2. 仓库是不是设成了 Private？改成 Public
3. 根目录有没有 `index.html`？必须是这个名字，不能是 `Index.html` 或 `home.html`
4. Settings → Pages 里的 Branch 是不是选成了别的分支

**改了内容但网页没变**
先等 2 分钟。还不变就 `Ctrl+Shift+R` 强刷；或者开个无痕窗口看。
再不行去仓库的 **Actions** 标签页看部署是不是失败了（红叉）。

**头像不显示**
文件名和 `index.html` 里写的要一致，包括扩展名大小写（`.JPG` ≠ `.jpg`）。
照片建议压到 500KB 以内，尺寸 600×600 左右，正方形。

**中文乱码**
保存文件时确保编码是 UTF-8（VS Code 右下角能看到并切换）。

---

## 五、可选：绑定自己的域名

买个域名（阿里云 / Namecheap / Cloudflare，`.com` 一年几十块，`.me` / `.io` 更贵些）后：

1. 在仓库根目录建一个名为 `CNAME` 的文件（无扩展名），里面写一行你的域名：
   ```
   www.yourname.com
   ```
2. 去域名服务商的 DNS 解析页面加记录：

   | 类型 | 主机记录 | 记录值 |
   |------|---------|--------|
   | CNAME | `www` | `你的用户名.github.io` |

   如果想用不带 www 的裸域名 `yourname.com`，加 4 条 A 记录指向：
   `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`

3. 回 Settings → Pages → **Custom domain** 填上域名 → Save
4. DNS 生效后（几分钟到 24 小时），勾上 **Enforce HTTPS**

---

## 六、上线后建议做的事

- 把主页链接加到 Google Scholar 个人页、简历、邮件签名
- 让 Google 收录：<https://search.google.com/search-console> 提交你的网址
- 定期更新 News 区块——这是访客（尤其是招生的老师）最先看的地方
