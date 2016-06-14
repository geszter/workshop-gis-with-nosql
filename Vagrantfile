# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = 'ubuntu/trusty64'
  config.vm.network 'forwarded_port', guest: 8000, host: 8000

  config.vm.provider 'virtualbox' do |v|
    v.memory = 2048
    v.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL

    # Install MongoDB.
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    apt-get update
    apt-get install -y mongodb-org

    # Install PIP & useful modules.
    apt-get install -y python3-pip
    pip3 install django simplejson pymongo

    # Load database dumps.
    cd /vagrant/workshop/dbdump && mongorestore -d pubs pubs/

    # Move to /vagrant directory by default.
    echo "cd /vagrant" >> /home/vagrant/.bash_profile
  SHELL
end
