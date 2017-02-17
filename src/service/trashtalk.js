const trashtalk = {
    '女友': '醒醒吧，你沒有女朋友！',
    '女朋友': '醒醒吧，你沒有女朋友！',
    '早餐': '御飯糰加無糖豆漿！',
    '午餐': '隨便吃個水餃吧！',
    '晚餐': '我想要吃火鍋！',
};

module.exports = (words) => { 
    const matchWords = words.filter(word => trashtalk[word]);
    const randomIdx = Math.floor(Math.random() * matchWords.length);
    const matchWord = matchWords[randomIdx];
    return matchWords.length > 0 ? trashtalk[matchWord] : '我不知道你在說什麼！';
}
