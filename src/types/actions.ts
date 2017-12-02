/**
 * Action 共通のインターフェイス
 */
export interface IAction<T> {
  type: string
  payload: T
  error?: boolean
  meta?: any
}