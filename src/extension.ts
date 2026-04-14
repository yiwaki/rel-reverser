// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { reverseRelation } from './reverseRelation';
import { swapElements } from './swapElements';

// 選択範囲の各行に対して、指定された変換処理（transformFn）を実行する共通関数
export function processLines(editor: vscode.TextEditor, transformFn: (text: string) => string) {
    editor.edit(editBuilder => {
        editor.selections.forEach(sel => {
            // 選択された行の開始から終了までループ
            for (let i = sel.start.line; i <= sel.end.line; i++) {
                const line = editor.document.lineAt(i);
                // 渡された関数（reverseやswap）を実行
                const result = transformFn(line.text);

                // 元の行と結果が違う場合のみ置換を実行
                if (result !== line.text) {
                    editBuilder.replace(line.range, result);
                }
            }
        });
    });
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		// 全体反転コマンド
		vscode.commands.registerCommand('plantuml-helper.reverseRelation', () => {
			const editor = vscode.window.activeTextEditor; // 実行時にエディタを取得
			if (editor) {
				processLines(editor, reverseRelation);
			}
		}),

		// 要素入れ替えコマンド
		vscode.commands.registerCommand('plantuml-helper.swapElements', () => {
			const editor = vscode.window.activeTextEditor; // 実行時にエディタを取得
			if (editor) {
				processLines(editor, swapElements);
			}
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
