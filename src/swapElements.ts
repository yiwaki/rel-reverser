export function swapElements(line: string): string {
    // 矢印もラベルも一切加工せず、クラスと多重度だけをスワップ
    const regex = /^(\s*)([^\s"<>|{}-]+|"[^"]+")\s+("[^"]*")?\s*([|{}o#\+\^\*\-\.<>~\\/x+?\[\]\w]+)\s*("[^"]*")?\s*([^\s":<>|{}-]+|"[^"]+")(.*)$/u;

    const match = line.match(regex);
    if (!match) {
        return line;
    }

    const [_, indent, leftElm, leftMul, arrow, rightMul, rightElm, label] = match;

    const lm = leftMul ? ` ${leftMul}` : "";
    const rm = rightMul ? ` ${rightMul}` : "";

    return `${indent}${rightElm}${lm} ${arrow}${rm} ${leftElm}${label}`;
}