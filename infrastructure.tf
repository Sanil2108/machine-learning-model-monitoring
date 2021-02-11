terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "ap-south-1"
}

resource "aws_s3_bucket" "machineLearningModelMonitoringBucket" {
  bucket = "ml-model-monitoring-bucket"

  tags = {
    Name = "Machine Learning Monitoring Bucket"
  }

  lifecycle_rule {
    id      = "moveToIA"
    enabled = true

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
  }
}

resource "aws_iam_role" "s3BucketWritePermissions" {
  name = "S3BucketWritePermissionsForMLModelMonitoring"

  assume_role_policy = <<EOF
{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "ec2.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    }
EOF
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = aws_iam_role.s3BucketWritePermissions.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "main-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.0.0/16"
  availability_zone = "ap-south-1b"
  tags = {
    "Name" = "public subnet"
  }
}

resource "aws_internet_gateway" "main_igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "main_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main_igw.id
  }
}

resource "aws_route_table_association" "public_subnet_association" {
  route_table_id = aws_route_table.main_rt.id
  subnet_id      = aws_subnet.public.id
}

resource "aws_security_group" "main_sg" {
  name   = "main_sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_instance_profile" "ml_model_monitoring_main_instance_profile" {
  name = "ml_model_monitoring_main_instance_profile"
  role = aws_iam_role.s3BucketWritePermissions.name
}

# resource "aws_instance" "MLModellingMonitoringInstance" {
#   tags = {
#     "Name" = "MLModellingMonitoringInstance"
#   }
#   ami                  = "ami-073c8c0760395aab8"
#   instance_type        = "t2.micro"
#   iam_instance_profile = "ml_model_monitoring_main_instance_profile"
#   subnet_id            = aws_subnet.public.id
#   key_name             = "main-instance"
#   associate_public_ip_address = true
#   security_groups = [ aws_security_group.main_sg.id ]
# }

resource "aws_instance" "MLModelInstance" {
  tags = {
    "Name" = "MLModelInstance"
  }
  ami           = "ami-073c8c0760395aab8"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  key_name      = "main-instance"
  associate_public_ip_address = true
  security_groups = [ aws_security_group.main_sg.id ]
}

# output "MLModellingMonitoringInstanceIP" {
#   value = aws_instance.MLModellingMonitoringInstance.public_ip
# }

output "MLModelInstanceIP" {
  value = aws_instance.MLModelInstance.public_ip
}