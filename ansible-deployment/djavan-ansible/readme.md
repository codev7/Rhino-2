# Deployment, Installation, and Updating

## Setting up

Djavan uses a fully-automated set of scripts and Ansible playbooks to install itself, and this is the recommended method of installation and update for Djavan instances. To install Djavan using this method, all you need is:

* A Ubuntu 16.04 LTS server
* A sudo-empowered account
* SSH or Shell access

Upload the provided `Djavan.zip` file to the server into your user account's home directory (home is recommended, not required).

The file `config.yml` in the working directory is where things like usernames, passwords, and installation directories are set. For security reasons, it is recommended that the passwords be changed, but usernames and other variables may be left as is. The file itself contains numerous line-by-line instructions on what needs to be changed and why. Review the file, make the necessary changes, and save it.

Before you install, you will need to make sure that the hostname of the destination server is set. The result of `hostname -f` should return the fully qualified domain name that you intend to direct public web traffic to. This can be done on Ubuntu 16.04+ with the following command:

> `hostnamectl set-hostname new-hostname`

You will also then need to edit `/etc/hosts` as follows:

> `127.0.1.1     your-old-hostname`

If you don't set up the hostname before installing, after installing you will need to modify the variables:

1. The value of `server_name` in `/etc/nginx/conf.d/{{project.name}}.conf`, the line and restart nginx `sudo systemctl restart nginx`
2. This line `HOST = 'http://{{ansible_fqdn}}'` in `./ansible-deployment/djavan-fe-ansible/roles/django/templates/settings.py`

## Installing

Assuming that the `djavan.zip` file is present in your home folder, that the hostname of the server is set correct, and that `config.yml` has been modified with the desired values, all that needs to be done to install djavan is to run the following command in your home folder.

> `sudo apt-get install unzip && unzip ./djavan.zip -d ~/djavan && cd ~/djavan && sudo sh ./djavan-fe-deploy.sh 2>&1 | sudo tee -a /var/log/djavan-fe-deploy.log`

This unzips the `Djavan.zip` containing Djavan's source code, deployment and update scripts, and Ansible playbooks into a "working" directory called `djavan` in the current user's home directory, and then runs the deployment script.

In most cases, you're done! Your new Djavan instance will be accessible at the hostname you specified, but keep in mind that the anti-analysis will prevent access everywhere but at a valid application URL like `/engagements/list`.

### Advanced usage

Advanced users may modify the above command to unzip the djavan source files anywhere they please.

Note that the installation and update scripts for Djavan are located in this working directory by default, so you must be *in* that directory to run them later or you must specify their full path. This guide assumes you will have used `~/djavan` as your working directory.

## Updating Djavan

When an update to the application is ready, you will be provided with an updated copy of `djavan-fe-source.zip` if Djavan needs to be updated. You may also be provided with an updated copy of `djavan-fe-ansible.zip` if changes have been made to our deployment and updating scripts. On rare occasions, new versions of the scripts (like `djavan-fe-deploy.sh` may be provided as well). Simply copy all new files into your djavan installation directory (this tutorial assumes `~/djavan/`) directory and overwrite the existing ones.

Note that overwriting the old files with the new ones will not affect your existing Djavan installation's data in any way, as these zip files contain only *source code* of the application and deployment solution.

To actually apply the updates, you must run the following command:

> `sudo sh ./djavan-fe-update.sh 2>&1 | sudo tee -a /var/log/djavan-fe-update.log`