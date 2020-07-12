This is a small CLI tool to bootstrap creating components easier.

Install globally with `npm install -g mkcomp`
Configure it initially with `mkcomp --init` and set up the folder structure like you want to.

Create components!

For example, to create a 'LoginScreen' component under `src/screens`, you would do `mkcomp --name LoginScreen --path src/screens`

Don't worry if the path does not exist, the tool will create each folder recursively.

Flags:

-n / --name : The name of the component Folder to create
-p / --path (optional): Path to create at. If not specified, will create in the current directory
-- init : Configure file extensions, which files to generate, etc.
