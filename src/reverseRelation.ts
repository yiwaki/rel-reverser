export function reverseRelation(line: string): string {
    const regex = /^(\s*)([^\s"<>|{}-]+|"[^"]+")\s+("[^"]*")?\s*([|{}o\-\.<>~\\/x+?\[\]\w]+)\s*("[^"]*")?\s*([^\s"<>|{}-]+|"[^"]+")(.*)$/u;

    const match = line.match(regex);
	if (!match) {
		return line;
	}

    const [_, indent, leftCls, leftMul, arrow, rightMul, rightCls, label] = match;

    // --- 矢印の反転処理 ---
    let newArrow = arrow;

    // 1. 方向指示の反転 (up <-> down, left <-> right)
    const directionMap: { [key: string]: string } = {
        'up': 'down', 'down': 'up',
        'left': 'right', 'right': 'left'
    };
    for (const [key, val] of Object.entries(directionMap)) {
        if (newArrow.includes(`[${key}]`)) {
            newArrow = newArrow.replace(`[${key}]`, `[${val}]`);
            break;
        } else if (newArrow.includes(`${key}`)) { // ブラケットなしのケース (例: -up->)
            newArrow = newArrow.replace(key, val);
            break;
        }
    }

    // 2. 記号の反転 (-->, <|--, }|-- など)
    const symbolMap: { [key: string]: string } = {
        '{': '}', '}': '{',
        '<': '>', '>': '<'
    };

    // 矢印を文字列として反転させつつ、ペア記号を置換
    newArrow = newArrow.split('').reverse().map(char => symbolMap[char] || char).join('');

    // reverseによって [hidden] が ]neddih[ になるのを修正
    newArrow = newArrow.replace(/\](.*?)\[/g, (m, p1) => `[${p1.split('').reverse().join('')}]`);

    // --- ラベルの反転 ---
    let newLabel = label;
	if (label.includes('>')) {
		newLabel = label.replace('>', '<');
	} else if (label.includes('<')) {
		newLabel = label.replace('<', '>');
	}

    const lm = leftMul ? ` ${leftMul}` : "";
    const rm = rightMul ? ` ${rightMul}` : "";

    return `${indent}${rightCls}${lm} ${newArrow}${rm} ${leftCls}${newLabel}`;
}
