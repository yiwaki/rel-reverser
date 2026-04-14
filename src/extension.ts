// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function reverseRelation(line: string): string {
// 矢印の正規表現を拡張: オプション [...] 部分を許容
    // グループ4: 矢印全体 (例: -[hidden]->, o-up->, ||--|{)
    const regex = /^(\s*)([^\s"<>|{}-]+|"[^"]+")\s+("[^"]*")?\s*([|{}o\-\.<>~\\/x+?\[\]\w]+)\s*("[^"]*")?\s*([^\s"<>|{}-]+|"[^"]+")(.*)$/u;

    const match = line.match(regex);
	if (!match) {
		return line;
	}; // マッチしない場合は元の行を返す

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

    // 2. 記号の反転 (o--, -->, <|-- など)
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

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('plantuml-helper.reverseRelation', () => {
        const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

        const selection = editor.selection;
        const lineText = editor.document.lineAt(selection.start.line).text;

        const reversed = reverseRelation(lineText);
		console.log(`Reversed line: ${reversed}`);

        editor.edit(editBuilder => {
            const range = new vscode.Range(selection.start.line, 0, selection.start.line, lineText.length);
            editBuilder.replace(range, reversed);
        });
    });
}

// This method is called when your extension is deactivated
export function deactivate() {}
