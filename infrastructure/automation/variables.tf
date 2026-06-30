variable "aws_region" {
  description = "AWS region containing the application resources."
  type        = string
  default     = "us-east-1"
}

variable "github_owner" {
  description = "GitHub account that owns the deployment repositories."
  type        = string
  default     = "JeremyDemers"
}

variable "github_oidc_provider_arn" {
  description = "ARN of the existing GitHub Actions OIDC provider."
  type        = string
  default     = "arn:aws:iam::574852786640:oidc-provider/token.actions.githubusercontent.com"
}

variable "arcade_lambda_name" {
  description = "Production Arcade Lambda function name."
  type        = string
  default     = "arcade-prod-api"
}

variable "digital_twin_lambda_name" {
  description = "Production Digital Twin Lambda function name."
  type        = string
  default     = "twin-prod-api"
}

variable "digital_twin_bucket_name" {
  description = "Production Digital Twin frontend bucket."
  type        = string
  default     = "twin-prod-frontend-574852786640"
}

variable "digital_twin_distribution_id" {
  description = "Production Digital Twin CloudFront distribution ID."
  type        = string
  default     = "EM2LTBXWNNTA9"
}

variable "portfolio_bucket_name" {
  description = "Production portfolio frontend bucket."
  type        = string
  default     = "jeremy-portfolio-prod-574852786640"
}

variable "portfolio_distribution_id" {
  description = "Production portfolio CloudFront distribution ID."
  type        = string
  default     = "E5XD1WQEF1WDH"
}
