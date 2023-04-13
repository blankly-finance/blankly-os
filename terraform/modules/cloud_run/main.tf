module "cloud_run" {
  source  = "GoogleCloudPlatform/cloud-run/google"
  version = "~> 0.2.0"

  # Required variables
  service_name = var.service_name
  project_id = var.project_id
  location = var.location
  ports =  {
    "name": "http1",
    "port": "80"
  }
  template_annotations = {
    "autoscaling.knative.dev/maxScale": 3,
    "autoscaling.knative.dev/minScale": 1
  }
  image = "us-docker.pkg.dev/${var.project_id}/${var.service_name}/${var.service_name}:latest"
}
