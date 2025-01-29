---
slug: "/stack/backend"
date: "2025-01-27"
title: "Backend"
---
# General Info
This page will detail the code that makes up the "backend" of this website.\
I used Terraform for provisioning of the cloud server and Ansible for the configuration.\
([Repo for this code](https://github.com/AJMosley345/static-site-iac-code))
# Stack
- ### VM Host: **Hetzner**
- ### DNS Provider: **Cloudflare**
- ### Domain Registrar: **Porkbun**
- ### Secure Access: **Tailscale**
- ### Server Provisioning: **Terraform**
- ### Server Automation/Configuration: **Ansible**

## Folder Structure
### Generated with `tree`
```
├── ansible
│   ├── ansible.cfg
│   ├── inventory
│   │   └── hetzner
│   │       ├── group_vars
│   │       │   └── all.yml
│   │       ├── host_vars
│   │       └── inventory.hcloud.yml
│   ├── playbooks
│   │   ├── bootstrap-server.yml
│   │   └── roles
│   │       ├── bootstrap
│   │       │   ├── files
│   │       │   │   └── hetzner_ansible.pub
│   │       │   ├── meta
│   │       │   │   └── main.yaml
│   │       │   └── tasks
│   │       │       └── main.yaml
│   │       ├── common
│   │       │   ├── defaults
│   │       │   │   └── main.yml
│   │       │   ├── files
│   │       │   │   └── amosley.pub
│   │       │   ├── handlers
│   │       │   │   └── main.yml
│   │       │   └── tasks
│   │       │       └── main.yml
│   │       ├── gatsby
│   │       │   └── tasks
│   │       │       └── main.yml
│   │       ├── git
│   │       │   ├── defaults
│   │       │   │   └── main.yml
│   │       │   └── tasks
│   │       │       └── main.yml
│   │       └── nginx
│   │           ├── defaults
│   │           │   └── main.yml
│   │           ├── files
│   │           │   ├── cloudflare_cert.pem
│   │           │   └── cloudflare_key.pem
│   │           ├── handlers
│   │           │   └── main.yml
│   │           ├── tasks
│   │           │   └── main.yml
│   │           └── templates
│   │               └── nginx-site-config.j2
│   └── requirements.yml
└── terraform
    ├── main.tf
    ├── modules
    │   ├── auth
    │   │   ├── main.tf
    │   │   ├── outputs.tf
    │   │   ├── providers.tf
    │   │   └── variables.tf
    │   │   This folder structure is repeated for all modules
    │   ├── compute
    │   │   ├── cloud-init
    │   │      └── cloud-config.yaml
    │   ├── dns
    │   └── network
    ├── providers.tf
    └── variables.tf
```
# ([Link to Terraform Page](terraform))