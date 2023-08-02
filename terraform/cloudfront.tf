resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.domain_name}"
}

resource "aws_cloudfront_distribution" "example_distribution" {
  enabled             = true
  aliases = ["${var.subdomain_name}.${var.domain_name}"]
  default_root_object = "index.html"
  origin {
    domain_name = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.bucket.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.bucket.id
    viewer_protocol_policy = "redirect-to-https" # other options - https only, http
    forwarded_values {
      headers      = []
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA"]
    }
  }
  tags = var.tags

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = var.certificate_arn
    ssl_support_method             = "sni-only"
  }

  origin {
    origin_id   = var.origin_id
    domain_name = var.domain_name

    custom_origin_config {
      http_port  = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    origin_path = "" # The path to the API in the origin
  }
  ordered_cache_behavior {
    path_pattern     = "/api/*" # Match all requests under /api
    cache_policy_id  = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    # origin_request_policy_id = "216adef6-5c7f-47e4-b989-5492eafa07d3"
    
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.origin_id # Origin ID for the API Gateway endpoint

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0

    # Lambda@Edge function to strip /api path before forwarding to the origin
    lambda_function_association {
      event_type   = "origin-request"
      lambda_arn   = aws_lambda_function.strip_api_path_lambda.qualified_arn
      include_body = false
    }
  }
}