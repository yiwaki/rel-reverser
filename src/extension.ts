// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { reverseRelation } from './reverseRelation';

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
