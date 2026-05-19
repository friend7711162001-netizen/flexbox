// 定義物品的 Emoji 字典 (若無圖片時的備用)
const emojiMap = {
    'toilet': '🚽', 'brush': '🪠',
    'carpet': '🪸', 'vacuum': '🧹',
    'bed': '🛏️', 'blanket': '🛌',
    'glass': '🪟', 'rag': '🧽',
    'rag-dirty': '🧽'
};

// 20 關卡設定 (底座與工具的配對機制)
// 從第一關開始每個圖示都不一樣以增加趣味性
const levels = [
    {
        title: "第一關：啟動整理",
        description: "歡迎來到房間整理大作戰！首先，請啟動 Flexbox 排版，把工具推到對應的物件上。",
        hint: "只要在外容器加上 `display: flex;` 就可以啟動 Flex 排版囉！預設的主軸方向就是由左至右橫排。",
        baseItems: ['carpet', 'bed', 'toilet'],
        activeItems: ['vacuum', 'blanket', 'brush'],
        targetCSS: { 'display': 'flex' },
        targetSelector: '.room',
        quickButtons: ['display:flex;']
    },
    {
        title: "第二關：對齊中央",
        description: "請將工具移到正中央的物件旁邊放好。",
        hint: "你可以使用 `justify-content` 屬性來控制主軸的對齊方式。試試看 `center` 這個值。",
        baseItems: ['glass', 'carpet'],
        activeItems: ['rag', 'vacuum'],
        targetCSS: { 'display': 'flex', 'justify-content': 'center' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:center;', 'justify-content:flex-end;']
    },
    {
        title: "第三關：垂直對齊",
        description: "現在請把它們放在正中央（垂直方向）。",
        hint: "使用 `align-items` 可以控制交錯軸（垂直方向）的對齊。試試 `center`。",
        baseItems: ['toilet', 'bed'],
        activeItems: ['brush', 'blanket'],
        targetCSS: { 'display': 'flex', 'align-items': 'center' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'align-items:center;', 'align-items:flex-start;']
    },
    {
        title: "第四關：置中大挑戰",
        description: "請把工具完全置中，對準正中央的物件！",
        hint: "結合上一關的技巧！同時使用 `justify-content` 和 `align-items`。",
        baseItems: ['carpet'],
        activeItems: ['vacuum'],
        targetCSS: { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:center;', 'align-items:center;']
    },
    {
        title: "第五關：靠右對齊",
        description: "打掃完了，把這些工具推到右邊牆角吧。",
        hint: "使用 `justify-content` 的 `flex-end` 屬性可以將物品推向主軸的末端。",
        baseItems: ['bed', 'glass'],
        activeItems: ['blanket', 'rag'],
        targetCSS: { 'display': 'flex', 'justify-content': 'flex-end' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:flex-end;', 'justify-content:flex-start;']
    },
    {
        title: "第六關：靠下對齊",
        description: "工具請放在下方貼齊地面的地方。",
        hint: "交錯軸的末端對齊，試試看 `align-items: flex-end;`",
        baseItems: ['toilet', 'carpet'],
        activeItems: ['brush', 'vacuum'],
        targetCSS: { 'display': 'flex', 'align-items': 'flex-end' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'align-items:flex-end;', 'align-items:center;']
    },
    {
        title: "第七關：分散對齊 (左右貼齊)",
        description: "請將工具分散對齊，最左邊和最右邊要貼齊牆壁，中間的平均分配。",
        hint: "這是 `justify-content: space-between;` 的效果。",
        baseItems: ['glass', 'toilet', 'bed'],
        activeItems: ['rag', 'brush', 'blanket'],
        targetCSS: { 'display': 'flex', 'justify-content': 'space-between' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:space-between;', 'justify-content:space-around;']
    },
    {
        title: "第八關：分散對齊 (平均分配)",
        description: "這次請讓工具周圍的空間都一樣大。",
        hint: "`justify-content: space-around;` 可以讓每個物品兩側擁有相同的空間。",
        baseItems: ['carpet', 'bed', 'toilet'],
        activeItems: ['vacuum', 'blanket', 'brush'],
        targetCSS: { 'display': 'flex', 'justify-content': 'space-around' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:space-around;', 'justify-content:space-evenly;']
    },
    {
        title: "第九關：分散對齊 (完美均分)",
        description: "工具之間的距離、以及最外側到牆壁的距離，全部都要完美相等。",
        hint: "試試看 `space-evenly`，它能讓所有空白處都一樣寬。",
        baseItems: ['glass', 'bed', 'carpet'],
        activeItems: ['rag', 'blanket', 'vacuum'],
        targetCSS: { 'display': 'flex', 'justify-content': 'space-evenly' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:space-evenly;', 'justify-content:space-between;']
    },
    {
        title: "第十關：改變主軸",
        description: "這裡的物件是垂直排列的，請將工具改成由上而下的垂直排列來對齊。",
        hint: "預設的 `flex-direction` 是 `row` (橫向)。請將它改成 `column` (直向)。",
        baseItems: ['bed', 'toilet', 'glass'],
        activeItems: ['blanket', 'brush', 'rag'],
        targetCSS: { 'display': 'flex', 'flex-direction': 'column' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-direction:column;', 'flex-direction:row;']
    },
    {
        title: "第十一關：垂直置中排列",
        description: "把工具垂直排列，並且對準房間正中央的物件。",
        hint: "當 `flex-direction` 變成 `column` 時，主軸和交錯軸就互換了喔！現在 `align-items` 控制的是水平方向。",
        baseItems: ['toilet', 'carpet', 'bed'],
        activeItems: ['brush', 'vacuum', 'blanket'],
        targetCSS: { 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-direction:column;', 'align-items:center;']
    },
    {
        title: "第十二關：主軸反轉",
        description: "這些物件的順序不同！請保持橫向，但將工具的順序左右反轉（由右排到左）來對齊。",
        hint: "`flex-direction` 除了 row 和 column，還有加上 `-reverse` 的後綴字可以反轉方向。",
        baseItems: ['glass', 'carpet', 'toilet'],
        activeItems: ['rag', 'vacuum', 'brush'],
        targetCSS: { 'display': 'flex', 'flex-direction': 'row-reverse' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-direction:row-reverse;', 'flex-direction:column-reverse;']
    },
    {
        title: "第十三關：垂直反轉",
        description: "將工具由下往上垂直疊放，對齊物件。",
        hint: "結合垂直方向與反轉，答案是 `column-reverse`。",
        baseItems: ['carpet', 'bed', 'glass'],
        activeItems: ['vacuum', 'blanket', 'rag'],
        targetCSS: { 'display': 'flex', 'flex-direction': 'column-reverse' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-direction:column-reverse;', 'flex-direction:row-reverse;']
    },
    {
        title: "第十四關：混合換行",
        description: "太多需要打掃的地方了！請讓這些清潔工具在空間不夠時自動換行，對齊下方的物件。",
        hint: "使用 `flex-wrap: wrap;` 允許子元素超出容器時換到下一行。",
        baseItems: ['toilet', 'toilet', 'bed', 'bed', 'toilet', 'toilet', 'bed'],
        activeItems: ['brush', 'brush', 'blanket', 'blanket', 'brush', 'brush', 'blanket'],
        targetCSS: { 'display': 'flex', 'flex-wrap': 'wrap' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-wrap:wrap;', 'flex-wrap:wrap-reverse;']
    },
    {
        title: "第十五關：混合反向換行",
        description: "這次請讓這些工具自動換行，但是是「往上」換行。",
        hint: "`flex-wrap` 也有反向版本，叫做 `wrap-reverse`。",
        baseItems: ['carpet', 'glass', 'bed', 'carpet', 'glass', 'bed', 'carpet'],
        activeItems: ['vacuum', 'rag', 'blanket', 'vacuum', 'rag', 'blanket', 'vacuum'],
        targetCSS: { 'display': 'flex', 'flex-wrap': 'wrap-reverse' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-wrap:wrap-reverse;', 'flex-wrap:wrap;']
    },
    {
        title: "第十六關：複合：右上角",
        description: "把所有清潔工具 垂直排列，並移到房間右上角的物件上。",
        hint: "需要設定 `flex-direction: column;`。在直向模式下，要移到右邊靠的是哪個屬性？",
        baseItems: ['glass', 'toilet', 'carpet'],
        activeItems: ['rag', 'brush', 'vacuum'],
        targetCSS: { 'display': 'flex', 'flex-direction': 'column', 'align-items': 'flex-end' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-direction:column;', 'align-items:flex-end;', 'justify-content:flex-end;']
    },
    {
        title: "第十七關：複合：右下角",
        description: "把棉被和馬桶刷，收到房間右下角的床跟馬桶上。",
        hint: "橫向模式下，水平靠右是 `justify-content`，垂直靠下是 `align-items`。請將它們都設為 `flex-end`。",
        baseItems: ['bed', 'toilet'],
        activeItems: ['blanket', 'brush'],
        targetCSS: { 'display': 'flex', 'justify-content': 'flex-end', 'align-items': 'flex-end' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'justify-content:flex-end;', 'align-items:flex-end;']
    },
    {
        title: "第十八關：複合：垂直平均",
        description: "將工具垂直排列，並對準牆上垂直平均分配的物件。",
        hint: "記得先把方向轉為直向 (`column`)，然後用 `justify-content` 來處理分散對齊 (`space-between`)。",
        baseItems: ['glass', 'carpet', 'bed'],
        activeItems: ['rag', 'vacuum', 'blanket'],
        targetCSS: { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'space-between' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-direction:column;', 'justify-content:space-between;', 'align-items:space-between;']
    },
    {
        title: "第十九關：改變順序",
        description: "找出那個特別指定的吸塵器 (有紅框標示)！請把它排到最後面去吸那張地毯。<br>注意：這關輸入的 CSS 是套用在吸塵器上，而非整個房間。",
        hint: "使用 `order: 1;` 可以讓特定元素的排序數字變大，進而排到其他沒有設定 (預設為 0) 的元素後面。",
        baseItems: ['carpet', 'bed', 'toilet'],
        activeItems: ['vacuum', 'blanket', 'brush'],
        containerCSS: { 'display': 'flex' }, // 房間預設開啟 flex
        targetCSS: { 'order': '1' },
        targetSelector: '.target', // 輸入框顯示 .target { ... }
        quickButtons: ['order:1;', 'order:-1;', 'order:0;']
    },
    {
        title: "第二十關：終極大掃除",
        description: "把所有工具都拿出來！讓他們自動換行，並且無論有幾行，整體都要在畫面正中央整齊排列到傢俱上。",
        hint: "需要 `flex-wrap: wrap;`。至於多行情況下整體垂直置中，需要使用 `align-content: center;`。當然也要加上 `justify-content: center;`。",
        baseItems: ['toilet', 'carpet', 'bed', 'glass', 'toilet', 'carpet', 'bed', 'glass'],
        activeItems: ['brush', 'vacuum', 'blanket', 'rag', 'brush', 'vacuum', 'blanket', 'rag'],
        targetCSS: { 'display': 'flex', 'flex-wrap': 'wrap', 'justify-content': 'center', 'align-content': 'center' },
        targetSelector: '.room',
        quickButtons: ['display:flex;', 'flex-wrap:wrap;', 'justify-content:center;', 'align-content:center;']
    }
];

// 遊戲狀態
let currentLevelIndex = 0;
let maxUnlockedLevel = 0; // 記錄玩家最高解鎖到哪一關

// DOM 元素選取
const ui = {
    levelTitle: document.getElementById('level-title'),
    levelDesc: document.getElementById('level-description'),
    levelIndicator: document.getElementById('level-indicator'),
    cssSelector: document.getElementById('css-selector'),
    cssInput: document.getElementById('css-input'),
    quickButtonsContainer: document.getElementById('quick-buttons'),
    activeRoom: document.getElementById('active-room'),
    targetRoom: document.getElementById('target-room'),
    checkBtn: document.getElementById('check-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    hintBtn: document.getElementById('hint-btn'),
    hintText: document.getElementById('hint-text'),
    modal: document.getElementById('success-modal'),
    modalNextBtn: document.getElementById('next-level-btn')
};

// 支援的 Emmet 縮寫對照表 (冒號後不加空白)
const emmetMap = {
    'df': 'display:flex;',
    'fdc': 'flex-direction:column;',
    'fdr': 'flex-direction:row;',
    'fdrr': 'flex-direction:row-reverse;',
    'fdcr': 'flex-direction:column-reverse;',
    'jcc': 'justify-content:center;',
    'jcfe': 'justify-content:flex-end;',
    'jcfs': 'justify-content:flex-start;',
    'jcsb': 'justify-content:space-between;',
    'jcsa': 'justify-content:space-around;',
    'jcse': 'justify-content:space-evenly;',
    'aic': 'align-items:center;',
    'aife': 'align-items:flex-end;',
    'aifs': 'align-items:flex-start;',
    'fww': 'flex-wrap:wrap;',
    'fwwr': 'flex-wrap:wrap-reverse;',
    'acc': 'align-content:center;'
};

// 初始化遊戲
function init() {
    loadLevel(currentLevelIndex);

    // 綁定事件
    ui.prevBtn.addEventListener('click', () => {
        if (currentLevelIndex > 0) loadLevel(currentLevelIndex - 1);
    });

    ui.nextBtn.addEventListener('click', () => {
        if (currentLevelIndex < levels.length - 1 && currentLevelIndex < maxUnlockedLevel) {
            loadLevel(currentLevelIndex + 1);
        }
    });

    ui.hintBtn.addEventListener('click', () => {
        ui.hintText.classList.remove('hidden');
    });

    ui.checkBtn.addEventListener('click', checkAnswer);

    ui.modalNextBtn.addEventListener('click', () => {
        ui.modal.classList.add('hidden');
        if (currentLevelIndex < levels.length - 1) {
            loadLevel(currentLevelIndex + 1);
        } else {
            // 全破後點擊重新開始
            loadLevel(0);
        }
    });

    // 支援輸入時即時預覽 (非強制作答)
    ui.cssInput.addEventListener('input', applyUserCSS);

    // 支援 Emmet Tab 鍵展開
    ui.cssInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault(); // 防止切換焦點
            const val = ui.cssInput.value;
            const cursorStart = ui.cssInput.selectionStart;
            const textBeforeCursor = val.substring(0, cursorStart);

            // 找出游標前的最後一個連續字母字串
            const match = textBeforeCursor.match(/([a-zA-Z]+)$/);
            if (match) {
                const word = match[1];
                if (emmetMap[word]) {
                    // 取代為對應的 CSS 屬性
                    const newTextBeforeCursor = textBeforeCursor.substring(0, textBeforeCursor.length - word.length) + emmetMap[word];
                    ui.cssInput.value = newTextBeforeCursor + val.substring(ui.cssInput.selectionEnd);
                    // 將游標移到剛插入的 CSS 之後
                    ui.cssInput.selectionStart = ui.cssInput.selectionEnd = newTextBeforeCursor.length;
                    applyUserCSS();
                }
            }
        }
    });
}

// 載入指定關卡
function loadLevel(index) {
    currentLevelIndex = index;
    const level = levels[index];

    // 更新左側文字
    ui.levelTitle.innerHTML = level.title;
    ui.levelDesc.innerHTML = level.description;
    ui.levelIndicator.textContent = `關卡 ${index + 1} / ${levels.length}`;
    ui.cssSelector.textContent = level.targetSelector + ' {';

    // 重設提示與輸入框
    ui.hintText.classList.add('hidden');
    ui.hintText.innerHTML = level.hint;
    ui.cssInput.value = '';
    ui.checkBtn.textContent = '✨ 檢查是否過關';
    ui.checkBtn.classList.remove('shake');

    // 渲染快速點選按鈕
    renderQuickButtons(level);

    // 產生房間內的物品 (底座放進 targetRoom, 工具放進 activeRoom)
    renderRoom(ui.targetRoom, level.baseItems, false);

    // 第19關這類關卡，特別標記指定的工具
    const isTargetLevel = level.targetSelector === '.target';
    renderRoom(ui.activeRoom, level.activeItems, isTargetLevel);

    // 套用目標(正解)樣式給底座房間，讓底座排在正確位置
    applyTargetCSS(level);

    // 清除玩家房間的行內樣式
    ui.activeRoom.style = '';
    ui.activeRoom.classList.remove('is-flex');
    const activeItems = ui.activeRoom.querySelectorAll('.item');
    activeItems.forEach(item => item.style = '');

    // 第19關這類關卡，需要預設開啟玩家容器的 flex，讓他們可以只寫子元素的 css
    if (level.containerCSS) {
        Object.assign(ui.activeRoom.style, level.containerCSS);
        if (level.containerCSS['display'] && level.containerCSS['display'].includes('flex')) {
            ui.activeRoom.classList.add('is-flex');
        }
    }

    // 更新按鈕狀態 (未過關前無法前往下一關)
    ui.prevBtn.disabled = index === 0;
    ui.nextBtn.disabled = index >= maxUnlockedLevel;
}

// 渲染快速點選按鈕 (展開式)
function renderQuickButtons(level) {
    ui.quickButtonsContainer.innerHTML = '';
    if (!level.quickButtons) return;

    // 依據 CSS 屬性分組
    const groups = {};
    const directButtons = [];

    level.quickButtons.forEach(btnText => {
        if (btnText.includes(':')) {
            const parts = btnText.split(':');
            const prop = parts[0].trim();
            if (!groups[prop]) {
                groups[prop] = [];
            }
        } else {
            directButtons.push(btnText);
        }
    });

    const fullOptions = {
        'justify-content': ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
        'align-items': ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'],
        'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
        'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
        'align-content': ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'stretch'],
        'display': ['flex', 'block', 'none'],
        'order': ['-1', '0', '1']
    };

    for (let prop in groups) {
        const wrapper = document.createElement('div');
        wrapper.className = 'quick-btn-group';

        const mainBtn = document.createElement('button');
        mainBtn.className = 'quick-btn main-btn';
        mainBtn.textContent = prop + ':';

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quick-btn-options hidden';

        const optionsToRender = fullOptions[prop] || [];

        optionsToRender.forEach(opt => {
            const optBtn = document.createElement('button');
            optBtn.className = 'quick-btn opt-btn';
            optBtn.textContent = opt;
            optBtn.onclick = () => {
                const textToAppend = prop + ':' + opt + ';';
                appendToInput(textToAppend);
                optionsContainer.classList.add('hidden');
            }
            optionsContainer.appendChild(optBtn);
        });

        mainBtn.onclick = () => {
            const isHidden = optionsContainer.classList.contains('hidden');
            document.querySelectorAll('.quick-btn-options').forEach(el => el.classList.add('hidden'));
            if (isHidden) {
                optionsContainer.classList.remove('hidden');
            }
        };

        wrapper.appendChild(mainBtn);
        wrapper.appendChild(optionsContainer);
        ui.quickButtonsContainer.appendChild(wrapper);
    }
}

function appendToInput(text) {
    const currentVal = ui.cssInput.value.trim();
    if (currentVal) {
        if (!currentVal.includes(text)) {
            ui.cssInput.value = currentVal + '\n' + text;
        }
    } else {
        ui.cssInput.value = text;
    }
    applyUserCSS();
}

// 產生物品 DOM
function renderRoom(container, items, hasTargetHighlight) {
    container.innerHTML = '';
    items.forEach((itemType, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.dataset.type = itemType;

        // 針對需要特別標記的元素 (例如第19關的第一個 activeItem vacuum)
        if (hasTargetHighlight && index === 0 && container.id === 'active-room') {
            div.classList.add('target-highlight');
            div.id = 'active-target';
        }

        container.appendChild(div);
    });
}

// 將正確解答套用到目標容器，以便固定底座傢俱的位置
function applyTargetCSS(level) {
    ui.targetRoom.style = ''; // reset
    const targetItems = ui.targetRoom.querySelectorAll('.item');
    targetItems.forEach(item => item.style = '');

    if (level.containerCSS) {
        Object.assign(ui.targetRoom.style, level.containerCSS);
    }

    if (level.targetSelector === '.room') {
        Object.assign(ui.targetRoom.style, level.targetCSS);
    } else {
        const specificTarget = ui.targetRoom.querySelectorAll('.item')[0];
        if (specificTarget) {
            Object.assign(specificTarget.style, level.targetCSS);
        }
    }
}

// 將使用者輸入的 CSS 套用到實際畫面
function applyUserCSS() {
    const level = levels[currentLevelIndex];
    const userInput = ui.cssInput.value;

    // 只做一般解析，不再自動轉換 Emmet，必須靠 Tab 鍵觸發
    const cssObject = parseCSS(userInput);

    // 先重設玩家房間與物品樣式
    ui.activeRoom.style = '';
    ui.activeRoom.classList.remove('is-flex');
    if (level.containerCSS) {
        Object.assign(ui.activeRoom.style, level.containerCSS); // 保留預設樣式
        if (level.containerCSS['display'] && level.containerCSS['display'].includes('flex')) {
            ui.activeRoom.classList.add('is-flex');
        }
    }

    const activeItems = ui.activeRoom.querySelectorAll('.item');
    activeItems.forEach(item => item.style = '');

    // 根據目前的 targetSelector 套用
    try {
        if (level.targetSelector === '.room') {
            Object.assign(ui.activeRoom.style, cssObject);
            if (cssObject['display'] && cssObject['display'].includes('flex')) {
                ui.activeRoom.classList.add('is-flex');
            }
        } else {
            const specificTarget = ui.activeRoom.querySelector('.target-highlight');
            if (specificTarget) {
                Object.assign(specificTarget.style, cssObject);
            }
        }
    } catch (e) {
        // 忽略無效的 CSS
    }
}

// 解析使用者輸入的 CSS 字串成物件
function parseCSS(cssString) {
    const rules = {};
    const declarations = cssString.split(';');
    for (let dec of declarations) {
        const parts = dec.split(':');
        if (parts.length === 2) {
            const prop = parts[0].trim();
            const val = parts[1].trim();
            if (prop && val) {
                rules[prop] = val;
            }
        }
    }
    return rules;
}

// 檢查是否過關
function checkAnswer() {
    // 強制更新畫面
    applyUserCSS();

    // 我們直接比對 .active-room 內的物品是否與 .target-room 內的物品「位置」重合！

    const targetItems = ui.targetRoom.querySelectorAll('.item');
    const activeItems = ui.activeRoom.querySelectorAll('.item');

    let isCorrect = true;

    if (targetItems.length === 0 || activeItems.length === 0) {
        isCorrect = false;
    }

    for (let i = 0; i < targetItems.length; i++) {
        const tRect = targetItems[i].getBoundingClientRect();
        const aRect = activeItems[i].getBoundingClientRect();

        // 允許較大的容錯率 (X軸 10px, Y軸 15px) 
        // 這是因為 active-room 的物品有 float 動畫 (Y軸位移 up to 8px)
        // 加上瀏覽器縮放與小數點誤差，15px 足以抵銷動畫誤差，又不會讓錯誤排版過關
        const tCenterX = tRect.left + tRect.width / 2;
        const tCenterY = tRect.top + tRect.height / 2;
        const aCenterX = aRect.left + aRect.width / 2;
        const aCenterY = aRect.top + aRect.height / 2;

        if (Math.abs(tCenterX - aCenterX) > 10 || Math.abs(tCenterY - aCenterY) > 15) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        // 解鎖下一關
        if (currentLevelIndex >= maxUnlockedLevel) {
            maxUnlockedLevel = currentLevelIndex + 1;
            ui.nextBtn.disabled = false; // 解鎖按鈕
        }

        // 加上發光的完成特效
        activeItems.forEach(item => item.classList.add('success-glow'));
        ui.checkBtn.textContent = '🎉 成功！準備進入下一關...';
        ui.checkBtn.classList.remove('shake');

        // 自動跳下一關，不再跳出視窗 (除最後一關)
        setTimeout(() => {
            activeItems.forEach(item => item.classList.remove('success-glow'));
            if (currentLevelIndex < levels.length - 1) {
                loadLevel(currentLevelIndex + 1);
            } else {
                showSuccess();
            }
        }, 1200);
    } else {
        // 給予視覺反饋 (抖動按鈕提示失敗)
        ui.checkBtn.classList.add('shake');
        ui.checkBtn.textContent = '❌ 還差一點點！';
        setTimeout(() => {
            ui.checkBtn.classList.remove('shake');
            ui.checkBtn.textContent = '✨ 檢查是否過關';
        }, 1000);
    }
}

// 全部破關時顯示
function showSuccess() {
    ui.modal.classList.remove('hidden');
}

// 啟動應用程式
document.addEventListener('DOMContentLoaded', init);

// 加入失敗時的抖動動畫至樣式表
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
.shake {
  animation: shake 0.4s;
  background-color: #e74c3c !important;
}
`;
document.head.appendChild(style);
