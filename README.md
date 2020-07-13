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

2. There is no step 2!

Simple, right? `mkcomp` takes care of the folders for you. It recursively creates folders that don't exist. If the path supplied as args already has data in it, it will ask you to confirm overwriting it by using the `-f` or `--force` flag.

## Install:

Install globally with `npm install -g mkcomp`

## Options:

`mkcomp --init | -i {name}` - Initialize the config files based on your projects. Name is optional, default profile is "default".

`mkcomp -n | --name ComponentName -p | --path src/Components` - Will create a component folder based on your config at the given path. The folders will be created recursively, so you don't need to worry about any of the n-level deep folders not existing.

If a folder already exists at that path, the cli tool will console an error and will not overwrite. use the `-f | --force` flag for that.

`mkcomp Component1 Component2 Component3 -p src/Components` - You can also create multiple components at once by using default args as a whitespace separated value.

`mkcomp --lp | --list` - View available project configurations.

`mkcomp -sw | --switch` - Switch configs between projects. Useful when working with multiple projects and each have different folder structures.

`mkcomp --clear` - Reset all configurations and start fresh.

`mkcomp ComponentName -p src/Components --skiptest --skipstyle`. Will generate the component based on your config, but will explicitly skip test or style files based on the arguments. Useful when you generally want test files and styles generated, but not for a particular component.
