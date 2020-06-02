export type ExpoNotification = {
  readonly to: string,
  readonly title?: string,
  readonly subtitle?: string,
  readonly body?: string,
  readonly badge?: number,
  readonly sound?: boolean,
  readonly data?: Object,
  readonly ttl?: number,
  readonly channelId?: string,
}
