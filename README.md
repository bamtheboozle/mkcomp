# mkcomp

#### A highly-configurable lightweight CLI tool to easily scaffold react component folders.

Let's assume we created a new react app and want to start building our components. The flow would generally be something like:

1. Create the features folder to group files by feature.
2. Create a components folder to hold your components.
3. Create a folder for your component, let's call this `LoginButton`.
4. Create a jsx/tsx file called `LoginButton.{jsx,tsx}`
5. Create a `LoginButton.test.{jsx,tsx}` file for the unit tests.
6. Create a `LoginButton.module.scss` or similar (js-in-css maybe?) file for the styles.

This is boring and takes a lot of time for what can be done with a single command.

## mkcomp!

`mkcomp` lets you easily facilitate this process by providing a simple to use cli tool to create your components. Here's the above scenario with `mkcomp`:

1. In the project root, run `mkcomp Button -p src/features/components/LoginButton`
2. There is no step 2.

Simple, right? `mkcomp` takes care of the folders for you. It recursively creates folders that don't exist. If the path supplied as args already has data in it, it will ask you to confirm overwriting it by using the `-f` or `--force` flag.

## Install:

Install globally with `npm install -g mkcomp`

## Usage:

Configure it initially with `mkcomp --init {name}` and set up the folder structure like you want to. `Name` is an optional argument that specifies what "project" the config file belongs to.

Create components!

For example, to create a 'LoginScreen' component under `src/screens`, you would do `mkcomp --name LoginScreen --path src/screens`

Don't worry if the path does not exist, the tool will create each folder recursively.
Flags:

-n / --name : The name of the component Folder to create

-p / --path (optional): Path to create at. If not specified, will create in the current directory

-- init : Configure file extensions, which files to generate, etc.
