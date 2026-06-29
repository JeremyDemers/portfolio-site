output "site_url" {
  description = "Canonical portfolio URL."
  value       = "https://${var.domain_name}"
}

output "site_bucket_name" {
  description = "Bucket receiving the static export."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Distribution invalidated after deployment."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "AWS-generated CloudFront hostname."
  value       = aws_cloudfront_distribution.site.domain_name
}

