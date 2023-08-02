resource "aws_lambda_function" "strip_api_path_lambda" {
  filename         = "lambda_function.zip" # Replace this with the path to your Lambda function code zip file
  function_name    = "EnterpriseGptStripApiPathLambda"
  role             = aws_iam_role.lambda_execution.arn
  handler          = "index.handler"
  runtime          = "nodejs18.x" # or a compatible version

  # You can adjust the memory size and timeout based on your function requirements
  memory_size      = 128
  timeout          = 3

  # Configure the Lambda function to be deployed at the edge
  publish          = true
  description      = "Lambda function to strip /api path before forwarding to API Gateway"
  environment {
    variables = {
      # Add any environment variables here if needed
    }
  }
}

# IAM Role for the Lambda function
resource "aws_iam_role" "lambda_execution" {
  name = "gpt-lambda-execution-role"

  # This policy allows the Lambda function to log to CloudWatch Logs
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "edgelambda.amazonaws.com"
        }
      },
    ]
  })
}

# IAM Policy for the Lambda function's role (Allow write access to CloudWatch Logs)
resource "aws_iam_policy" "lambda_execution_policy" {
  name        = "gpt-lambda-execution-policy"
  description = "Policy for Lambda function to log to CloudWatch Logs"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# Attach the IAM policy to the Lambda function's role
resource "aws_iam_role_policy_attachment" "lambda_execution_attachment" {
  policy_arn = aws_iam_policy.lambda_execution_policy.arn
  role       = aws_iam_role.lambda_execution.name
}

# Optionally, create a zip file for the Lambda function code
# Make sure your index.js and any other required files are in the zip file's root
# For this example, assume index.js is at the same level as the Terraform files.
data "archive_file" "lambda_function_zip" {
  type        = "zip"
  output_path = "lambda_function.zip"
  source_dir  = "./lambda-edge/strip-api-prefix"
}

