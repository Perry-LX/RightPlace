# RightPlace — 摆瓶子游戏

基于位置推理的休闲益智游戏。玩家通过拖拽或点击交换瓶子位置，利用判定反馈推理出每个瓶子的正确摆放位置。

## 快速开始

```bash
npm install
npm run dev        # 开发模式 → http://localhost:3000
npm run build      # 生产构建
npm run preview    # 预览构建产物
```

## 游戏模式

### 🎓 新手模式
首页首位按钮，从 5 档瓶子数（4/6/8/10/12）中任选一局快速开始，每次随机分配一套主题。
从 5 档瓶子数（4/6/8/10/12）中任选一局快速开始，每次随机分配一套主题。
首次进入时弹出操作引导，游戏过程中 **4 瓶和 6 瓶** 模式有实时动态教练提示（箭头 + 脉冲光环 + 文字指引）。

### 🚀 开始游戏
自动跳转到当前已解锁的最高关卡，方便玩家快速继续征程。

### 🎯 关卡模式
630 个循序渐进的关卡，瓶子数从 3 到 12 波动（不单调递增），每关根据判定次数评定 1~3 星。通关解锁下一关，进度自动保存到浏览器本地。

| 星级 | 条件 | 示例（6 瓶） |
|------|------|-------------|
| ★★★ | 判定次数 ≤ 瓶子数 × 2 | ≤ 12 次 |
| ★★ | 判定次数 ≤ 瓶子数 × 3 | ≤ 18 次 |
| ★ | 完成即可 | 不限 |

### 🧩 同瓶挑战
所有瓶子外观相同的特殊模式。5 档难度（4/6/8/10/12 瓶），每局随机使用 bottle2~bottle13 其中一张作为统一外观，完全依靠判定反馈推理位置。

### 👥 联机模式（框架）
支持 8/9/10/11/12 瓶对战，可选择 2~6 名玩家。联机逻辑待实现。

## 操作方式

- **点击交换**：点击一个瓶子使其高亮，再点击另一个瓶子，两者互换位置
- **拖拽交换**：将一个瓶子拖拽到另一个瓶子的位置，释放后互换
- **判定**：点击「判定」按钮获取当前正确摆放数量（不告知具体哪个正确）
- **选中特效**：瓶子选中时放大上浮 + 绿色描边 + 阴影
- **帮助暂停**：点击 `?` 按钮打开帮助面板时游戏计时暂停，关闭后继续

## 视觉主题

4 套主题交错出现，不影响关卡难度。所有瓶子使用 13 张真实 PNG 图片渲染（位于 `public/bottles/`）：

| 主题 | 风格 | 图片 |
|------|------|------|
| 经典调酒 | 马提尼、红酒、威士忌等 | bottle1~12 |
| 科学实验室 | 锥形瓶、量筒、试管等 | bottle2~13 交错 |
| 魔法药水 | 水晶球、魔法瓶、星月瓶等 | 同上交错 |
| 远古遗迹 | 陶罐、石像、符文瓶等 | 同上交错 |

## SEO & GEO 优化

项目已针对搜索引擎和 AI 搜索引擎进行了优化：

### 传统 SEO
- 完整 Meta 标签（description、keywords、robots、canonical）
- Open Graph / Twitter Cards 社交分享标签
- hreflang 多语言标注（中文 / English）
- 语义化 title 结构
- 结构化数据（JSON-LD: WebApplication + Organization）

### GEO（AI 搜索引擎优化）
- **FAQPage Schema**（+40% AI 可见性）— 5 个问答覆盖游戏介绍、判定机制、关卡数量、游戏模式、免费信息
- **robots.txt** 明确允许所有 AI 机器人：
  - `GPTBot` / `ChatGPT-User` → ChatGPT 网页浏览
  - `PerplexityBot` → Perplexity AI
  - `ClaudeBot` / `anthropic-ai` → Claude AI
  - `Google-Extended` → Google AI / Gemini
- 结构化内容嵌入统计数据（630 关、11 阶段、6 种模式等）
- `sitemap.xml` 含 hreflang 替代链接

### 配置文件
- `public/robots.txt` — 搜索引擎和 AI 机器人访问规则
- `public/sitemap.xml` — XML 站点地图

## 可视适配

所有游戏界面严格限制在视口（`100dvh`）内，不溢出、不滚动：
- **弹性间距布局**：首页和游戏页使用 flex spacer 自动分配空间，大屏舒展、小屏紧凑
- **自适应瓶子尺寸**：瓶子图片使用 `clamp(68px, 20dvh, 160px)` 随视口高度缩放
- **提示窗口**：引导和结算面板限制 `max-h-[85dvh]` 内部可滚动，滚动条隐藏

## 多语言支持

右上角语言切换按钮，支持中文 / English，所有文字实时切换。偏好保存在 localStorage。

## 技术栈

| 层 | 选型 |
|----|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS v4 |
| 动画 | Motion（原 Framer Motion） |
| 状态 | Zustand + persist（localStorage） |
| 图标 | @phosphor-icons/react |
| 多语言 | React Context + 翻译表 |

## 项目结构

```
RightPlace/
├── index.html                  # 入口 HTML（含 SEO/GEO meta + JSON-LD）
├── vite.config.ts              # Vite 配置
├── package.json
│
├── public/
│   ├── bottles/                # 13 张瓶子图片 (bottle1.png ~ bottle13.png)
│   ├── robots.txt              # 搜索引擎 / AI 机器人访问规则
│   └── sitemap.xml             # XML 站点地图
│
├── src/
│   ├── types/game.ts           # 类型定义
│   ├── data/
│   │   ├── levels.ts           # 630 个关卡配置
│   │   └── themes.ts           # 4 套主题（13 张瓶子图片索引）
│   ├── stores/
│   │   ├── gameStore.ts        # 游戏状态（瓶子、位置、判定、计时）
│   │   └── levelStore.ts       # 关卡进度持久化（localStorage）
│   ├── i18n/
│   │   ├── translations.ts     # 中英文翻译表（80+ key）
│   │   └── LanguageProvider.tsx # 语言 Context + useTranslation hook
│   ├── components/
│   │   ├── HomeScreen.tsx       # 主菜单（6 种模式入口，弹性间距布局）
│   │   ├── LevelSelect.tsx     # 关卡选择（仅显示已解锁关卡）
│   │   ├── MultiplayerMode.tsx  # 联机模式配置页
│   │   ├── UniformChallenge.tsx # 同瓶挑战模式选择页
│   │   ├── NoviceMode.tsx       # 新手模式选择页（5 档瓶数）
│   │   ├── GameScreen.tsx       # 核心游戏界面（dvh 约束 + 自适应布局）
│   │   ├── TutorialGuide.tsx    # 操作引导弹窗（4 步骤 + 同瓶提示）
│   │   ├── GameCoach.tsx        # 动态游戏教练（上下文提示）
│   │   ├── Bottle.tsx           # 瓶子组件（图片加载容错 + dvh 自适应）
│   │   ├── Timer.tsx            # 计时器（支持暂停冻结）
│   │   ├── JudgeFeedback.tsx    # 判定结果反馈动画
│   │   ├── JudgeHistory.tsx     # 判定历史记录
│   │   ├── SettlementPanel.tsx  # 结算面板（星星、时间、判定次数）
│   │   └── LanguageSwitcher.tsx # 语言切换下拉（Portal 渲染）
│   ├── App.tsx                 # 页面路由（7 个页面）
│   ├── main.tsx                # 入口
│   └── index.css               # 全局样式（含 hide-scrollbar 工具类）
│
├── .claude/                    # Claude Code 配置
│   └── skills/seo-geo/        # SEO/GEO 优化技能参考
│
└── dist/                       # 构建产物
```

## 数据持久化

- **关卡进度**：`localStorage` key `rightplace-level-progress`，存星级、最佳记录
- **语言偏好**：`localStorage` key `gameshin:language`，默认 English
- **首次引导**：`rightplace-tutorial-done`，首次自由模式弹窗后标记

## 关卡难度分布

| 阶段 | 关卡 | 瓶子范围 |
|------|------|---------|
| 新手期 | 1~15 | 3~4 |
| 过渡期 | 16~35 | 4~6 |
| 进阶期 | 36~60 | 5~8 |
| 高手期 | 61~85 | 7~10 |
| 专家期 | 86~110 | 8~12 |
| 大师期 | 111~130 | 9~12 |
| 巅峰期 | 131~230 | 8~12 |
| 终极期 | 231~330 | 8~12 |
| 无尽期 | 331~430 | 8~12 |
| 混沌期 | 431~530 | 8~12 |
| 传说期 | 531~630 | 8~12 |

难度不随关卡号递增，每个阶段内瓶子数上下波动。完整 630 关中 206 次难度下降，223 次上升。
