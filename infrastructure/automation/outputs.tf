output "arcade_role_arn" {
  description = "OIDC role used by the Arcade deployment workflow."
  value       = aws_iam_role.github_deploy["arcade"].arn
}

output "digital_twin_role_arn" {
  description = "OIDC role used by the Digital Twin deployment workflow."
  value       = aws_iam_role.github_deploy["digital_twin"].arn
}

output "portfolio_role_arn" {
  description = "OIDC role used by the portfolio deployment workflow."
  value       = aws_iam_role.github_deploy["portfolio"].arn
}
