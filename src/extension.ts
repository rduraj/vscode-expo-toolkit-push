import * as vscode from 'vscode'

import { createNotification } from './commands/create-notification'
import { selectConfig } from './commands/select-config'
import { sendNotification } from './commands/send-notification'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(sendNotification, selectConfig, createNotification)
}

export function deactivate() {}
