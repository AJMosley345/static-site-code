---
slug: "/stack/backend/terraform"
date: "2025-01-28"
title: "Terraform"
---
### Here is where I will describe how my Terraform setup works
## main.tf
```hcl
module "network" {
  source = "./modules/network"
  server_name = var.server_name
  datacenter = var.datacenter
  ip_type = var.ip_type
}

module "dns" {
  source = "./modules/dns"
  domain = var.domain
  porkbun_nameservers = var.porkbun_nameservers
  cloudflare_zone_id = data.hcp_vault_secrets_secret.cloudflare_zone_id.secret_value
  static_ip = module.network.static_ip
}

module "compute" {
  source = "./modules/compute"
  server_name = var.server_name
  os_image = var.os_image
  server_type = var.server_type
  datacenter = var.datacenter
  ansible_user = var.ansible_user
  ansible_user_ssh_key = var.ansible_user_ssh_key
  personal_user = var.personal_user
  workflow_id = var.workflow_id
  repo_name = var.repo_name
  github_pa_token = data.hcp_vault_secrets_secret.github_pa_token.secret_value
  primary_ip_id = module.network.primary_ip_id
  firewall_id = module.network.firewall_id
  tailscale_ip = var.tailscale_ip
  tailscale_tailnet_key = data.hcp_vault_secrets_secret.tailscale_auth_token.secret_value
  tailscale_api_token = data.hcp_vault_secrets_secret.tailscale_api_key.secret_value
}

module "auth" {
  source = "./modules/auth"
  tailscale_tailnet = var.tailscale_tailnet
  server_name = var.server_name
}
```
I'm going to break this down into each module and go through what it does.
## network module
```hcl
module "network" {
  source = "./modules/network"
  server_name = var.server_name
  datacenter = var.datacenter
  ip_type = var.ip_type
}
```
This module creates the network associated resources. For this website that would be the Hetzner Firewall and Primary IP.
## main.tf for network module
```hcl
# Creates a primary ip address for the cloud server
resource "hcloud_primary_ip" "am_static_site_ip" {
  name = var.server_name
  datacenter = var.datacenter
  type = var.ip_type
  assignee_type = "server"
  auto_delete = false
}

# Sets up a firewall for the server that only allows traffic from Tailscale (41641), Port 80 and Port 443 (for website traffic)
resource "hcloud_firewall" "am_static_site_firewall" {
  name = var.server_name
  rule {
    rule definitions...
  }

  rule {
    rule definitions...
  }

  rule {
    rule definitions...
  }
}
```