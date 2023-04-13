variable "project_id" {
  description = "The project to apply this configuration to"
  default = "blankly-dev"
}


variable "service_pairs" {
  description = "A list of cloud run services, each of these will also create an artifact repository"
  default = [
    {
      "name" = "billing-api"
      "description" = "Billing API service"
    },
    {
      "name" = "connect-api"
      "description" = "Connect API service"
    },
    {
      "name" = "deployment-api"
      "description" = "Deployment API service"
    },
    {
      "name" = "metrics-service-api"
      "description" = "Metrics API service"
    },
    {
      "name" = "model-events-api"
      "description" = "Model Events API service"
    },
    {
      "name" = "model-usage-api"
      "description" = "Model Usage API service"
    }
  ]
}

variable "artifact_registries" {
  description = "All single service artifact registries. These have no other services associated with them"
  default = [
    {
      name = "blankly-base"
      description = "This repositories holds all base images for kubernetes"
    },
    {
      name = "blankly-discord"
      description = "The discord bot & iterations on the discord bot are held here"
    },
    {
      name = "user-models"
      description = "This holds all user models & versions of each model"
    }
  ]
}
