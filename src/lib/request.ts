import * as HttpStatus from 'http-status-codes'
import * as https from 'https'
import * as querystring from 'querystring'
import * as vscode from 'vscode'

import { ExpoNotification } from './dto'

export const sendExpoNotification = (notification: ExpoNotification) => {
  if (!notification.to) {
    vscode.window.showErrorMessage('`to` field is required to send notifcation.')

    return
  }

  const requestData = querystring.stringify(
    {
      ...notification,
      data: JSON.stringify(notification.data || {}),
    }
  )

  const request = https.request(
    'https://exp.host/--/api/v2/push/send',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(requestData)
      }
    },
    res => {
      console.log(res)


      res.statusCode === HttpStatus.OK
        ? vscode.window.showInformationMessage('PUSH successfully sent.')
        : vscode.window.showErrorMessage('Sending PUSH failed. Check your notification config.')
    }
  )

  request.write(requestData)
  request.end()
}
