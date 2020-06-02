import * as vscode from 'vscode'

import { getConfig } from '../lib/files'

export const sendNotification = vscode.commands.registerCommand('expo-toolkit-push.sendNotification', () => {
  const notificationList = getConfig()

  if (notificationList.length === 0) {
    vscode.commands.executeCommand('expo-toolkit-push.createNotification')
    return
  }

  vscode.commands.executeCommand('expo-toolkit-push.selectConfig', notificationList)

})
