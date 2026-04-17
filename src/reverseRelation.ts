export function reverseRelation(line: string): string {
    const regex = /^(\s*)([^\s"<>|{}-]+|"[^"]+")\s+("[^"]*")?\s*([|{}o#\+\^\*\-\.<>,=~\\/x+?\[\]\w]+)\s*("[^"]*")?\s*([^\s":<>|{}-]+|"[^"]+")(.*)$/u;

    const match = line.match(regex);
	if (!match) {
		return line;
	}

    const [_, indent, leftElm, leftMul, arrow, rightMul, rightElm, label] = match;

    // --- 矢印の反転処理 ---
    let newArrow = arrow;

    // 記号の反転 (-->, <|--, }|-- など)
    const symbolMap: { [key: string]: string } = {
        '{': '}', '}': '{',
        '<': '>', '>': '<'
    };

    // 矢印を文字列として反転させつつ、ペア記号を置換
    newArrow = newArrow.split('').reverse().map(char => symbolMap[char] || char).join('');

    // reverseによって中の文字もリバースするのを修正
    newArrow = newArrow.replace(/(\-.*?\-)/g, (m, p1) => `${p1.split('').reverse().join('')}`);

    // --- ラベルの反転 ---
    let newLabel = label;
	if (label.includes('>')) {
		newLabel = label.replace('>', '<');
	} else if (label.includes('<')) {
		newLabel = label.replace('<', '>');
	}

    const lm = leftMul ? ` ${leftMul}` : "";
    const rm = rightMul ? ` ${rightMul}` : "";

    return `${indent}${rightElm}${rm} ${newArrow}${lm} ${leftElm}${newLabel}`;
}
