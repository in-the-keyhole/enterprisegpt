terraform {

  backend "s3" {
    bucket = "gpt-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}