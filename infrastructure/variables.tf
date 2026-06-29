variable "aws_region" {
  description = "AWS region for regional resources."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Canonical portfolio domain with a public Route 53 hosted zone."
  type        = string
  default     = "jeremysdemers.com"
}

variable "project_name" {
  description = "Resource name prefix."
  type        = string
  default     = "jeremy-portfolio"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "prod"
}

