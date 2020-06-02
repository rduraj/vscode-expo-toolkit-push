import * as vscode from 'vscode'

import { ExpoNotification } from '../lib/dto'
import { getConfig, saveConfig } from '../lib/files'
import { sendExpoNotification } from '../lib/request'

const getObjectIfNotBlank = (value: string | number | boolean | undefined, field: string) => Boolean(value)
  ? { [field]: value }
  : {}

export const createNotification = vscode.commands.registerCommand('expo-toolkit-push.createNotification', async () => {

  const to = await vscode.window.showInputBox({
      placeHolder: 'To (Expo push token from your app) [required]',
      validateInput: (token: string) => token.match(/ExponentPushToken\[(.{22})\]/i)
        ? null
        : 'Please set valid Expo PUSH token: ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]'
    })
  const title = await vscode.window.showInputBox({ placeHolder: 'Message title' })
  const subtitle = await vscode.window.showInputBox({ placeHolder: '[iOS] Message subtitle' })
  const body = await vscode.window.showInputBox({ placeHolder: 'Message body' })
  const badge = await vscode.window.showInputBox({ placeHolder: '[iOS] Badge' })
  const sound = await vscode.window.showQuickPick(['No', 'Yes'], { placeHolder: '[iOS] Play sound'})
  const data = await vscode.window.showInputBox({ placeHolder: 'Data (JSON)' })
  const ttl = await vscode.window.showInputBox({ placeHolder: 'TTL (seconds)' })
  const channelId = await vscode.window.showInputBox({ placeHolder: '[Android] Channel ID' })
  const shouldSave = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Save this notification?'})

  if (!to) {
    vscode.window.showErrorMessage('ExponentPushToken is required to send notification.')
    return
  }

  const notification: ExpoNotification = {
    to,
    ...getObjectIfNotBlank(title, 'title'),
    ...getObjectIfNotBlank(subtitle, 'subtitle'),
    ...getObjectIfNotBlank(body, 'body'),
    ...getObjectIfNotBlank(Number(badge), 'badge'),
    ...getObjectIfNotBlank(sound === 'Yes' ? 'default' : '', 'sound'),
    ...getObjectIfNotBlank(data ? JSON.parse(data) : {}, 'data'),
    ...getObjectIfNotBlank(Number(ttl), 'ttl'),
    ...getObjectIfNotBlank(channelId, 'channelId'),
  }

  sendExpoNotification(notification)

  if (shouldSave) {
    const config = getConfig()
    config.push(notification)

    saveConfig(config)
    vscode.window.showInformationMessage('Notification is saved for further usage.')
  }

  return
})
