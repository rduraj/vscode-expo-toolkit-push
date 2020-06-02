import * as vscode from 'vscode'

import { ExpoNotification } from '../lib/dto'
import { sendExpoNotification } from '../lib/request'

export const selectConfig = vscode.commands.registerCommand('expo-toolkit-push.selectConfig', async (notificationList: ReadonlyArray<ExpoNotification>) => {
  const notification = await vscode.window.showQuickPick(
    [
      'Create new notification...',
      ...notificationList.map((notification, index) => `${index}. ${notification.title}`)
    ]
  )

  if (notification === 'Create new notification...') {
    vscode.commands.executeCommand('expo-toolkit-push.createNotification')

    return
  }

  const matches = notification?.match(new RegExp('^([0-9]+)', 'i'))

  if (matches && matches.length) {
    const [index] = matches

    sendExpoNotification(notificationList[+index])
  }
})
