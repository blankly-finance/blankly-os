terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.19.0"
    }
    google-beta = {
      source = "hashicorp/google-beta"
      version = "4.19.0"
    }
  }
}

provider "google" {
  credentials = file("blankly-dev.json")

  project = "blankly-dev"
  region  = "us-central1"
  zone    = "us-central1-c"
}

provider "google-beta" {
  credentials = file("blankly-dev.json")

  project = "blankly-dev"
  region  = "us-central1"
  zone    = "us-central1-c"
}

# Artifact registry pairs
module "artifact_registry_pairs" {
  source = "./modules/artifact_registry"

  count = length(var.service_pairs)

  description  = var.service_pairs[count.index]["description"]
  service_name = var.service_pairs[count.index]["name"]
}

module "cloud_run_pairs" {
  source = "./modules/cloud_run"

  count = length(var.service_pairs)

  service_name = var.service_pairs[count.index]["name"]
  project_id   = var.project_id
}

# Single artifact registry
module "artifact_registry_single" {
  source = "./modules/artifact_registry"

  count = length(var.artifact_registries)

  description  = var.service_pairs[count.index]["description"]
  service_name = var.service_pairs[count.index]["name"]
}
