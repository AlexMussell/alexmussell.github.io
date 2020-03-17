---
layout: post
title: Installing both KVM and Vagrant on Ubuntu 18.04.
date: 2020-03-17 19:30:00 +0000
categories: KVM Vagrant Ubuntu18.04 Virtualisation
excerpt: Today we will be looking at how to install KVM, along with Vagrant to create local testing environments on Ubuntu 18.04.
---

Hello! Today we will be looking at how to install KVM, along with Vagrant to create local testing environments on Ubuntu 18.04. The reason for this post is a found a lot of jarring tutorials, but nothing that got me up and running straight away. I will show you how to check if your CPU has virtualisation capabilities, installing KVM, installing Vagrant and the `vagrant-libvirt` provider, creating a VM, and then destroying a VM and removing the image from both Vagrant and then the KVM volume pool.

<br>


### My setup
Although your chip and BIOS will differ from mine, you should be able to follow along. But bare in mind that different BIOS's will make your experience differ.

    - CPU: AMD Ryzen 9 3950x
    - Motherboard: MSI x570 A-PRO
    - OS: Ubuntu 18.04 64-bit
    - Ruby: 2.6.3 (if you use RVM, use whatever)

<br>

## CPU capabilities
Firstly, we need to check if our CPU has the capability to perform virutalisation. You can do this in a number of ways:

    `egrep -c '(vmx|svm)' /proc/cpuinfo`: If 0 is returned, your hardware does not support virtualisation.
        SVM?: AMD's hardware virtualisation technology.
        VMX?: Intel's hardware virtualisation technology

You can also run:

    `kvm-ok `: Which will return either an "exists" or "does not support" message.


It is possible to run a 32-bit kernel when performing virtualisation, however there are some drawbacks. You are limited to the amount of RAM you can allocated to you VMs (2GB), and you can only host 32-bit guests. With 64-bit hosts, you can have more the 2GB RAM and host both 32 and 64-bit hosts. To check your CPU and Kernel, perform these commands:

    egrep -c ' lm ' /proc/cpuinfo  <- CPU
    uname -m  <- Kernel


Assuming you have the correct hardware, restart your machine and go to the BIOS, from there you need to activate either SVM or VMX. For my MSI motherboard, this was locate in OC/CPU-features.

<br>

## Installing KVM and Virtual Machine Manager
First install the packages. Just to note, `libvert-bin` is actually for the Vagrant part of this guide, but it doesn't matter.:

    sudo apt install qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils libvert-bin virt-manager

Now add your user to the required groups:

    sudo adduser <user> libvirt
    sudo adduser <user> libvirt-qemu

Then perform a restart.

It's worth noting that here, we aren't creating or configuring a network bridge as we will not be manually creating VM's. This will all be handled by Vagrant. If you want to set this up as well, [this](https://linuxconfig.org/install-and-set-up-kvm-on-ubuntu-18-04-bionic-beaver-linux) has a great guide on how to do this.


<br>

## Installing Vagrant
The installation of Vagrant is simple. Just `curl` the package and install:

    curl -O https://releases.hashicorp.com/vagrant/2.2.7/vagrant_2.2.7_x86_64.deb
    sudo apt install ./vagrant_2.2.7_x86_64.deb

Now that Vagrant is installed, we need to install the provider plugin that allows for Vagrant to talk to KVM. I had many issues here originally as you need to make sure that `libvert-bin` is installed this:

    vagrant plugin install vagrant-libvirt

Now we are ready to deploy a test VM!


<br>

## Deploying and Destroying VMs
### Deploying

For a test, lets pull a small debian image to deploy.

    vagrant box add debian/stretch64 --provider=libvirt

This will download an image to `~/.vagrant.d/boxes`, where all your boxes will go.
Next lets create a test directory and initialise Vagrant:

    mkdir ~/vagrant-test
    cd ~/vagrant-test
    vagrant init

This will create a Vagrantfile. A file which vagrant uses to create your vm. Put this basic template in the Vagrantfile:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'libvirt'


Vagrant.configure("2") do |config|

  ##### DEFINE VM #####
  config.vm.define "debian-01" do |config|
  config.vm.hostname = "debian-01"
  config.vm.box = "debian/stretch64"
  config.vm.box_check_update = false
  config.vm.network "private_network", ip: "192.168.18.9"
  config.vm.provider :libvirt do |v|
    v.memory = 1024
    end
  end
end
```

I don't think I need to spend any time going over this is it should be self explanatory.

Now deploy your VM!

    vagrant up

Now you may see an error stating that your machine does not support NFS. If you do, just install the nfs packages:

    sudo apt install nfs-common nfs-kernel-server

Then rerun `vagrant up`

It's as easy as that. To test it is working, you can ssh to the VM using `vagrant ssh debian-01`. You can also open up Virtual Manager from your applications and you will see the VM has been built.

<br>

### Destroying
Destroying a VM is easy:

    vagrant destroy

To remove the image is also easy:

    vagrant box remove debian/stretch64

However, this does not remove it from the KVM volume-list pool, only from Vagrants `~/.vagrant.d/boxes`. To remove from KVM, you mean use the `virsh` utility installed in `libvert-bin`:

    virsh vol-list default
    virsh vol-delete <image> --pool default

<br>

## But why?
What is the point of doing this? For me personally it's so I can test my varying deployments from Ansible, Puppet etc in a safe environment without installing things locally, or by paying for public cloud storage.

And there you have it! You have virtualisation set up on your machine. Pretty cool.

