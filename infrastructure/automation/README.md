# GitHub deployment roles

This Terraform root manages the least-privilege AWS roles assumed by the three production GitHub Actions workflows. The shared GitHub OIDC provider already exists in the AWS account and is read as a data source.

Each trust policy accepts only the corresponding repository's `main` branch. The roles can update application artifacts but cannot change Terraform infrastructure:

- Arcade: update `arcade-prod-api` Lambda code.
- Digital Twin: update `twin-prod-api`, sync its frontend bucket, and invalidate its distribution.
- Portfolio: sync its frontend bucket and invalidate its distribution.

Initialize this root with the shared state bucket and the `github-actions/prod/terraform.tfstate` key before planning or applying.
