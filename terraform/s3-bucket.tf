locals {
  bucket_name = format("%s.%s", var.subdomain_name, var.domain_name)
}

resource "aws_s3_bucket" "bucket" {
  bucket = local.bucket_name
  tags = var.tags
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership_controls" {
  bucket = aws_s3_bucket.bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.bucket_ownership_controls]

  bucket = aws_s3_bucket.bucket.id
  acl    = "private"
}

# resource "aws_s3_bucket_public_access_block" "public_block" {
#   bucket = aws_s3_bucket.bucket.id
#   block_public_acls       = true
#   block_public_policy     = true
#   restrict_public_buckets = true
#   ignore_public_acls      = true
# }

# resource "aws_s3_bucket_server_side_encryption_configuration" "encrypt" {
#   bucket = aws_s3_bucket.bucket.id
#   rule {
#     apply_server_side_encryption_by_default {
#       sse_algorithm = "AES256"
#     }
#   }
# }

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.bucket_policy_document.json
}

# resource "aws_s3_object" "object" {
#   bucket = aws_s3_bucket.bucket.id
#   for_each     = fileset("uploads/", "*")
#   key          = "website/${each.value}"
#   source       = "uploads/${each.value}"
#   etag         = filemd5("uploads/${each.value}")
#   content_type = "text/html"
#   depends_on = [
#     aws_s3_bucket.bucket
#   ]
# }

# data source to generate bucket policy to let OAI get objects:
data "aws_iam_policy_document" "bucket_policy_document" {
  statement {
    actions = ["s3:GetObject"]
    resources = [
      aws_s3_bucket.bucket.arn,
      "${aws_s3_bucket.bucket.arn}/*"
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}