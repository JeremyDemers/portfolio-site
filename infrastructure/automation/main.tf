data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}

data "aws_iam_openid_connect_provider" "github" {
  arn = var.github_oidc_provider_arn
}

locals {
  repositories = {
    arcade       = "arcade"
    digital_twin = "digital-twin"
    portfolio    = "portfolio-site"
  }
}

data "aws_iam_policy_document" "github_assume_role" {
  for_each = local.repositories

  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_owner}/${each.value}:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "github_deploy" {
  for_each = local.repositories

  name                 = "github-actions-${replace(each.key, "_", "-")}-production"
  description          = "Least-privilege production deployment role for ${var.github_owner}/${each.value}"
  assume_role_policy   = data.aws_iam_policy_document.github_assume_role[each.key].json
  max_session_duration = 3600
}

data "aws_iam_policy_document" "arcade_deploy" {
  statement {
    sid = "UpdateArcadeLambda"
    actions = [
      "lambda:GetFunction",
      "lambda:GetFunctionConfiguration",
      "lambda:UpdateFunctionCode",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${var.arcade_lambda_name}",
    ]
  }
}

resource "aws_iam_role_policy" "arcade_deploy" {
  name   = "deploy-arcade-application"
  role   = aws_iam_role.github_deploy["arcade"].id
  policy = data.aws_iam_policy_document.arcade_deploy.json
}

data "aws_iam_policy_document" "digital_twin_deploy" {
  statement {
    sid = "UpdateDigitalTwinLambda"
    actions = [
      "lambda:GetFunction",
      "lambda:GetFunctionConfiguration",
      "lambda:UpdateFunctionCode",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${var.digital_twin_lambda_name}",
    ]
  }

  statement {
    sid = "ListDigitalTwinFrontend"
    actions = [
      "s3:GetBucketLocation",
      "s3:ListBucket",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:s3:::${var.digital_twin_bucket_name}",
    ]
  }

  statement {
    sid = "SyncDigitalTwinFrontend"
    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:s3:::${var.digital_twin_bucket_name}/*",
    ]
  }

  statement {
    sid = "RefreshDigitalTwinCloudFront"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetDistribution",
      "cloudfront:GetInvalidation",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${var.digital_twin_distribution_id}",
    ]
  }
}

resource "aws_iam_role_policy" "digital_twin_deploy" {
  name   = "deploy-digital-twin-application"
  role   = aws_iam_role.github_deploy["digital_twin"].id
  policy = data.aws_iam_policy_document.digital_twin_deploy.json
}

data "aws_iam_policy_document" "portfolio_deploy" {
  statement {
    sid = "ListPortfolioFrontend"
    actions = [
      "s3:GetBucketLocation",
      "s3:ListBucket",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:s3:::${var.portfolio_bucket_name}",
    ]
  }

  statement {
    sid = "SyncPortfolioFrontend"
    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:s3:::${var.portfolio_bucket_name}/*",
    ]
  }

  statement {
    sid = "RefreshPortfolioCloudFront"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetDistribution",
      "cloudfront:GetInvalidation",
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${var.portfolio_distribution_id}",
    ]
  }
}

resource "aws_iam_role_policy" "portfolio_deploy" {
  name   = "deploy-portfolio-application"
  role   = aws_iam_role.github_deploy["portfolio"].id
  policy = data.aws_iam_policy_document.portfolio_deploy.json
}
