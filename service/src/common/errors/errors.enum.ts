export enum CommonErrors {
  ValidationError = 'validation_error',
  FileTypeNotSupported = 'file_type_not_supported',
  MaxFileSizeExceeded = 'max_file_size_exceeded',
  InvalidWebhookHeader = 'invalid_webhook_header_error',
  WebhookSignatureError = 'webhook_signature_error',
  WebhookExpiredError = 'webhook_expired_error',
}
