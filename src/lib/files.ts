import { existsSync, readFileSync, writeFileSync } from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { extensionFilename } from '../extension.config'
import { ExpoNotification } from './dto'

export const configPath = path.join(vscode.workspace.rootPath || '', extensionFilename)

export const getConfig = () => {
  if (!existsSync(configPath)) {

    return []
  }

  const fileContent = readFileSync(configPath).toString()

  try {

    return JSON.parse(fileContent)
  } catch {
    vscode.window.showErrorMessage(`Problem with parsing ${extensionFilename}`)

    return []
  }
}

export const saveConfig = (config: ReadonlyArray<ExpoNotification>) => {
  writeFileSync(
    configPath,
    JSON.stringify(config, undefined, 2),
    { flag: 'w' }
  )
}
