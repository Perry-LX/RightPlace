export type Lang = "zh" | "en";

export type TranslationKey =
  | "app.title"
  | "app.subtitle"
  | "home.startGame"
  | "home.startGameDesc"
  | "home.noviceMode"
  | "home.noviceModeDesc"
  | "home.levelMode"
  | "home.levelModeDesc"
  | "home.freePlay"
  | "home.difficulty.easy"
  | "home.difficulty.normal"
  | "home.difficulty.hard"
  | "home.difficulty.expert"
  | "home.difficulty.hell"
  | "home.difficultyDesc.easy"
  | "home.difficultyDesc.normal"
  | "home.difficultyDesc.hard"
  | "home.difficultyDesc.expert"
  | "home.difficultyDesc.hell"
  | "home.bottles"
  | "levelSelect.title"
  | "levelSelect.back"
  | "levelSelect.bottles"
  | "levelSelect.level"
  | "levelSelect.noLevels"
  | "game.back"
  | "game.judge"
  | "game.judgeCount"
  | "game.judgeTimes"
  | "game.restart"
  | "game.correct"
  | "game.allCorrect"
  | "game.bottlesPlaced"
  | "game.of"
  | "game.levelUnit"
  | "game.judgeHistory"
  | "game.notInitialized"
  | "game.selected"
  | "game.toAdjust"
  | "game.emptySlot"
  | "settlement.level"
  | "settlement.freePlay"
  | "settlement.perfect"
  | "settlement.good"
  | "settlement.pass"
  | "settlement.time"
  | "settlement.judgments"
  | "settlement.nextLevel"
  | "settlement.retry"
  | "settlement.mainMenu"
  | "settlement.stars"
  | "language.zh"
  | "language.en"
  | "language.switchTo"
  | "home.multiplayer"
  | "home.multiplayerDesc"
  | "home.uniform"
  | "home.uniformDesc"
  | "novice.title"
  | "novice.back"
  | "multiplayer.title"
  | "multiplayer.bottleCount"
  | "multiplayer.playerCount"
  | "multiplayer.players"
  | "multiplayer.createRoom"
  | "multiplayer.comingSoon"
  | "multiplayer.back"
  | "multiplayer.selectPlayers"
  | "tutorial.title"
  | "tutorial.step1.title"
  | "tutorial.step1.desc"
  | "tutorial.step2.title"
  | "tutorial.step2.desc"
  | "tutorial.step3.title"
  | "tutorial.step3.desc"
  | "tutorial.step4.title"
  | "tutorial.step4.desc"
  | "tutorial.start"
  | "tutorial.help"
  | "tutorial.note"
  | "uniform.title"
  | "uniform.subtitle"
  | "uniform.desc"
  | "uniform.bottles"
  | "uniform.difficulty.beginner"
  | "uniform.difficulty.normal"
  | "uniform.difficulty.advanced"
  | "uniform.difficulty.expert"
  | "uniform.difficulty.ultimate"
  | "uniform.back"
  | "uniform.badge"
  | "uniform.tutorial.title"
  | "uniform.tutorial.desc"
  | "coach.initial"
  | "coach.selected"
  | "coach.swapped"
  | "coach.judged"
  | "coach.close"
  | "coach.won";

const translations: Record<Lang, Record<TranslationKey, string>> = {
  zh: {
    "app.title": "摆瓶子游戏",
    "app.subtitle":
      "凭借记忆和逻辑推理，将每一个瓶子摆放到其正确的位置",
    "home.startGame": "开始游戏",
    "home.startGameDesc": "继续你的关卡挑战",
    "home.noviceMode": "新手模式",
    "home.noviceModeDesc": "选择瓶子数量自由挑战",
    "home.levelMode": "关卡模式",
    "home.levelModeDesc": "630 个循序渐进的挑战",
    "home.freePlay": "自由模式",
    "home.difficulty.easy": "简单",
    "home.difficulty.normal": "普通",
    "home.difficulty.hard": "困难",
    "home.difficulty.expert": "专家",
    "home.difficulty.hell": "地狱",
    "home.difficultyDesc.easy": "新手入门",
    "home.difficultyDesc.normal": "一般玩家",
    "home.difficultyDesc.hard": "进阶玩家",
    "home.difficultyDesc.expert": "硬核玩家",
    "home.difficultyDesc.hell": "终极挑战",
    "home.bottles": "个",
    "home.multiplayer": "联机模式",
    "home.multiplayerDesc": "2-6人对战 · 即将上线",
    "home.uniform": "同瓶挑战",
    "home.uniformDesc": "外观相同 · 推理挑战",
    "levelSelect.title": "关卡选择",
    "levelSelect.back": "返回",
    "levelSelect.bottles": "瓶",
    "levelSelect.level": "第",
    "levelSelect.noLevels": "暂未解锁任何关卡",
    "game.back": "返回",
    "game.judge": "判定",
    "game.judgeCount": "判定次数",
    "game.judgeTimes": "次",
    "game.restart": "重新开始",
    "game.correct": "已正确摆放",
    "game.allCorrect": "全部正确！",
    "game.bottlesPlaced": "个瓶子均已摆放正确！",
    "game.of": "/",
    "game.levelUnit": "关",
    "game.judgeHistory": "判定记录",
    "game.notInitialized": "游戏未初始化",
    "game.selected": "已选中",
    "game.toAdjust": "位置待调整",
    "game.emptySlot": "空位",
    "settlement.level": "第 {n} 关",
    "settlement.freePlay": "自由模式",
    "settlement.perfect": "完美通关！",
    "settlement.good": "干得不错！",
    "settlement.pass": "挑战成功！",
    "settlement.time": "游玩时间",
    "settlement.judgments": "判定次数",
    "settlement.nextLevel": "下一关",
    "settlement.retry": "重试",
    "settlement.mainMenu": "主菜单",
    "settlement.stars": "颗星",
    "language.zh": "中文",
    "language.en": "English",
    "language.switchTo": "切换语言",
    "multiplayer.title": "联机模式",
    "multiplayer.bottleCount": "选择瓶子数量",
    "multiplayer.playerCount": "选择玩家数量",
    "multiplayer.players": "人",
    "multiplayer.createRoom": "创建房间",
    "multiplayer.comingSoon": "联机功能即将上线",
    "multiplayer.back": "返回",
    "multiplayer.selectPlayers": "请选择玩家数量",
    "tutorial.title": "如何游玩",
    "tutorial.step1.title": "交换瓶子",
    "tutorial.step1.desc": "点击一个瓶子选中它，再点击另一个瓶子，两者互换位置。也可以直接拖拽瓶子到目标位置。",
    "tutorial.step2.title": "发起判定",
    "tutorial.step2.desc": "点击「判定」按钮，系统会告知当前摆放正确的瓶子数量，但不会告诉你具体哪个正确。",
    "tutorial.step3.title": "推理与调整",
    "tutorial.step3.desc": "根据判定结果，推理哪些瓶子需要调整位置。重复「交换 → 判定」的步骤，逐步逼近正确答案。",
    "tutorial.step4.title": "获得胜利",
    "tutorial.step4.desc": "当所有瓶子都摆放到正确位置时发起判定，系统宣判胜利！",
    "tutorial.start": "开始游戏",
    "tutorial.help": "帮助",
    "uniform.badge": "同瓶挑战",
    "uniform.tutorial.title": "同瓶挑战",
    "uniform.tutorial.desc": "这一关所有瓶子外观相同，但每个瓶子的正确位置不同。你需要通过判定反馈来推理每个瓶子的正确位置。",
    "tutorial.note": "注意：部分关卡中所有瓶子外观相同，你需要完全依靠判定反馈来推理位置。",
    "uniform.title": "同瓶挑战",
    "uniform.subtitle": "同瓶推理挑战",
    "uniform.desc": "每个关卡中所有瓶子外观相同，你需要完全依靠判定反馈来推理每个瓶子的正确位置。",
    "uniform.bottles": "瓶",
    "uniform.difficulty.beginner": "入门",
    "uniform.difficulty.normal": "普通",
    "uniform.difficulty.advanced": "进阶",
    "uniform.difficulty.expert": "高手",
    "uniform.difficulty.ultimate": "终极",
    "uniform.back": "返回",
    "novice.title": "新手模式",
    "novice.back": "返回",
    "coach.initial": "点击一个瓶子来选中它",
    "coach.selected": "再点击另一个瓶子，两者会互换位置",
    "coach.swapped": "试试点击「判定」按钮查看结果",
    "coach.judged": "有 {correct}/{total} 个位置正确，继续调整",
    "coach.close": "只差一点了！仔细想想哪个位置需要调整",
    "coach.won": "全部正确！太棒了！通关成功！",
  },

  en: {
    "app.title": "RightPlace",
    "app.subtitle":
      "Arrange each bottle to its correct position using memory and logic",
    "home.startGame": "Start Game",
    "home.startGameDesc": "Continue your level challenge",
    "home.noviceMode": "Novice Mode",
    "home.noviceModeDesc": "Pick a bottle count to play",
    "home.levelMode": "Level Mode",
    "home.levelModeDesc": "630 progressive challenges",
    "home.freePlay": "Free Play",
    "home.difficulty.easy": "Easy",
    "home.difficulty.normal": "Normal",
    "home.difficulty.hard": "Hard",
    "home.difficulty.expert": "Expert",
    "home.difficulty.hell": "Hell",
    "home.difficultyDesc.easy": "Getting started",
    "home.difficultyDesc.normal": "Casual play",
    "home.difficultyDesc.hard": "Advanced",
    "home.difficultyDesc.expert": "Hardcore",
    "home.difficultyDesc.hell": "Ultimate challenge",
    "home.bottles": " bottles",
    "home.multiplayer": "Multiplayer",
    "home.multiplayerDesc": "2-6 players · Coming soon",
    "home.uniform": "Identical Bottle",
    "home.uniformDesc": "Same look · Pure deduction",
    "levelSelect.title": "Level Select",
    "levelSelect.back": "Back",
    "levelSelect.bottles": "bot",
    "levelSelect.level": "Lv",
    "levelSelect.noLevels": "No levels unlocked yet",
    "game.back": "Back",
    "game.judge": "Judge",
    "game.judgeCount": "Judgments",
    "game.judgeTimes": "",
    "game.restart": "Restart",
    "game.correct": "Correctly placed",
    "game.allCorrect": "All correct!",
    "game.bottlesPlaced": " bottles placed correctly!",
    "game.of": "/",
    "game.levelUnit": "",
    "game.judgeHistory": "History",
    "game.notInitialized": "Game not initialized",
    "game.selected": "Selected",
    "game.toAdjust": "Needs adjustment",
    "game.emptySlot": "Empty slot",
    "settlement.level": "Level {n}",
    "settlement.freePlay": "Free Play",
    "settlement.perfect": "Perfect!",
    "settlement.good": "Well done!",
    "settlement.pass": "Challenge cleared!",
    "settlement.time": "Time",
    "settlement.judgments": "Judgments",
    "settlement.nextLevel": "Next Level",
    "settlement.retry": "Retry",
    "settlement.mainMenu": "Main Menu",
    "settlement.stars": " stars",
    "language.zh": "中文",
    "language.en": "English",
    "language.switchTo": "Switch language",
    "multiplayer.title": "Multiplayer",
    "multiplayer.bottleCount": "Bottle count",
    "multiplayer.playerCount": "Player count",
    "multiplayer.players": " players",
    "multiplayer.createRoom": "Create Room",
    "multiplayer.comingSoon": "Multiplayer coming soon",
    "multiplayer.back": "Back",
    "multiplayer.selectPlayers": "Please select player count",
    "tutorial.title": "How to Play",
    "tutorial.step1.title": "Swap Bottles",
    "tutorial.step1.desc": "Click a bottle to select it, then click another bottle to swap their positions. You can also drag a bottle to another slot.",
    "tutorial.step2.title": "Judge",
    "tutorial.step2.desc": "Click the Judge button to check how many bottles are in the correct position. The system will only tell you the count, not which ones.",
    "tutorial.step3.title": "Deduce & Adjust",
    "tutorial.step3.desc": "Use the judge results to figure out which bottles need to move. Repeat Swap -> Judge until you narrow down the correct arrangement.",
    "tutorial.step4.title": "Win",
    "tutorial.step4.desc": "When all bottles are in the correct positions, the judge will declare victory!",
    "tutorial.start": "Start Playing",
    "tutorial.help": "Help",
    "uniform.badge": "Identical Bottle Challenge",
    "uniform.tutorial.title": "Identical Bottle Challenge",
    "uniform.tutorial.desc": "All bottles look identical in this level, but each has a different correct position. Use the judge feedback to deduce where each one belongs.",
    "tutorial.note": "Note: some levels have identical-looking bottles. You will need to rely entirely on judge feedback to deduce their positions.",
    "uniform.title": "Identical Bottle Challenge",
    "uniform.subtitle": "Identical Bottle Challenge",
    "uniform.desc": "All bottles look identical in each level. Use the judge feedback to deduce the correct position of every bottle.",
    "uniform.bottles": " bottles",
    "uniform.difficulty.beginner": "Beginner",
    "uniform.difficulty.normal": "Normal",
    "uniform.difficulty.advanced": "Advanced",
    "uniform.difficulty.expert": "Expert",
    "uniform.difficulty.ultimate": "Ultimate",
    "uniform.back": "Back",
    "novice.title": "Novice Mode",
    "novice.back": "Back",
    "coach.initial": "Click a bottle to select it",
    "coach.selected": "Now click another bottle to swap their positions",
    "coach.swapped": "Try clicking the Judge button to check your progress",
    "coach.judged": "{correct}/{total} correct. Keep going!",
    "coach.close": "Almost there! Think carefully about which bottles need to move",
    "coach.won": "All correct! Great job!",
  },
};

export default translations;
