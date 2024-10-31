
# LSR Config Addon Tool
This is a simple NextJS website to provide an user-friendly way to install custom configurations.



## Add a Config
I've tried to make adding a custom config as easy as I could, with my limited knowledge of LSR.  
  
The list of available configurations is in `./lib/configs/configList.ts`.  
  
Configs have a very simple type.
```ts 
type Config = {
    id: number;
    title: string;
    description: string;
    author: string;
    modVersion: string;
    createdAt: Date;
    addons: Addon[];
}
```
`modVersion` should be the version of LSR you made the config for. It's important to note this in-case some options become deprecated, or wish for different datatypes / value ranges.  
`id` should be a 1-increment integer starting at 0 (the default config). This is also the folder where your config lives.  

### Addons 
An addon should be a compartmentalizable portion of your config.  
Each addon contains it's own config files, so `Gangs.xml`, `Locations.xml` etc.  
You can also make each addon optional, if you wish.  
  
Addons are typed like so:
```ts 
type Addon = {
    id: number;
    name: string;
    description: string;
    addonFolderName: string;
    isRequired: boolean;
}
```
`id` should start at 0, and increase by 1 for every addon you have in *your* config.
`addonFolderName` is where the config XMLs are located for this addon.
`isRequired` determines whether or not the user is required to have this addon enabled when installing your config.

As an example, you could have a **Bloods** addon in your config.
This could contain all the necessary config files to establish the peds that are spawned, the gangs territory, etc.
