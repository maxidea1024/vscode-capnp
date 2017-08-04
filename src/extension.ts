'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {



    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.generateCapnpID', () => {
        // The code you place here will be executed every time your command is executed

        generateCapnpID();
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}
import * as bignum from 'big-integer'

function randint(min=0, max){
    return min + Math.floor(Math.random() * (max - min + 1))
}
function calcCapnpID(){
    return bignum(randint(0, Math.pow(2, 64))).or(bignum(1).shiftLeft(63)).toString(16)
}

export function generateCapnpID(){
    let capnpidline = "@0x" + calcCapnpID() + "\n";
    const document = vscode.window.activeTextEditor.document;
    vscode.window.activeTextEditor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(0,0), capnpidline)
    }) 
}
// this method is called when your extension is deactivated
export function deactivate() {
}