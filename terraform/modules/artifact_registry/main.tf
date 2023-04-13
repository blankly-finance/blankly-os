# Deployment API
resource "google_artifact_registry_repository" "artifact_registry" {
  provider = google-beta

  location = "us"
  repository_id = var.service_name
  description = var.description
  format = "DOCKER"
}
