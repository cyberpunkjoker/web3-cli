export enum WagmiConnectionStatus {
  /**链接失败 */
  error = "error",
  /**初始化 */
  idle = "idle",
  /**链接成功 */
  success = "success",
  /**链接等待中 */
  pending = "pending",
}