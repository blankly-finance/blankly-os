variable "service_name" {
  description = "The name of the artifact registry/cloud run pair to create"
}

variable "project_id" {
  description = "The GCP project id"
}

variable "location" {
  description = "The location to create the services"
  default = "us-central1"
}
