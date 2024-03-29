
variable "aws_region" {
  description = "The AWS region to create resources in."
}

# variable "environment" {
#   description = "The environment name."
# }

variable "domain_name" {
  description = "The domain name to be used."
  type        = string
  default     = "hb9gjrh43c.execute-api.us-east-1.amazonaws.com"
}

variable "subdomain_name" {
  description = "The subdomain name to be used."
}

variable "certificate_arn" {
  description = "The arn of the certificate to use for cloudfront"
}
variable "cache_default_ttl" {
  description = "Cloudfront's cache default time to live."
  default     = 3600
}

variable "cache_max_ttl" {
  description = "Cloudfront's cache maximun time to live."
  default     = 86400
}

variable "tags" {
  description = "The tags to attach to created resources"
  default = {
    Terraform   = "true"
  }
}

variable "api_gateway_origin_id" {
  description = "Cloudfront's origin ID"
  type        = string
  default     = "hb9gjrh43c"
}


