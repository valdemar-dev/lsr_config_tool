import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { saveAs } from 'file-saver';

// list of "id" keys used to identify things in config files
const idKeys = [
    "ID",
    "Name",
    "DebugName"
];

const findKeyPath = (obj: Record<string, any>, key: string): string[] | undefined => {
    const helper = (obj: Record<string, any>, key: string, path: string[]): string[] | undefined => {
        if (key in obj) return [...path, key];

        for (const k in obj) {
            if (typeof obj[k] === "object" && obj[k] !== null) {
                const result = helper(obj[k], key, [...path, k]);
                if (result) return result;
            }
        }

        return undefined;
    };

    return helper(obj, key, []);
};

const getValueByPath = (obj: Record<string, any>, path: string[]): any => {
    return path.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const setValueByPath = (obj: Record<string, any>, path: string[], value: any): void => {
    path.reduce((acc, key, index) => {
        if (index === path.length - 1) {
            acc[key] = value;
        } else {
            if (!acc[key]) acc[key] = {};
            return acc[key];
        }
    }, obj);
};

const includesKey = (keyToFind: string, object: any) => {
    return Object.keys(object).find(key => key === keyToFind);
};

const includesAnyKeyInList = (keys: string[], object: any) => {
    for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];

        const keyInObj = includesKey(currentKey, object);

        if (!keyInObj) continue;
            
        return { key: keyInObj, value: object[currentKey] };
    }

    return false;
}

const readFile = (reader: FileReader, file: File) => {
    return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = () => {
          reject(new Error("Failed to read file"));
        };

        reader.readAsText(file);
    });
}

// caching configs by the fileName
// makes it so we dont have to parse the user provided xml every single time we want to do something
const cachedUserConfigs: { [key: string]: any } = {};
    
const parseUserConfigFile = async (fileName: string, userFiles: File[], fileReader: FileReader) => {
    const providedUserConfigFile = userFiles.find(file => file.name === fileName);

    if (!providedUserConfigFile) {
        return undefined;
    }

    let configFileData: { [key: string]: any } = cachedUserConfigs[fileName];

    if (!configFileData) {
        const userConfigFileXMLData = await readFile(fileReader, providedUserConfigFile) as string;

        const parser = new XMLParser();
        configFileData = parser.parse(userConfigFileXMLData);
    }

    return configFileData;
}


const addToUserConfigWithID = (
    userConfigCategoryEntries: any,
    userConfigCategory: any,
    userConfigFile: any,
    userConfigCategoryKeys: any,
    customConfigCategoryEntry: any,
    fileName: string,
    customConfigCategoryEntryIdKey: {
        key: string,
        value: any,
    },
) => {
    if (Array.isArray(userConfigCategoryEntries)) {
        const userConfigCategoryEntry = userConfigCategoryEntries.find(entry => {
            const value = entry[customConfigCategoryEntryIdKey.key];

            if (!value) {
                return false
            }

            if (value !== customConfigCategoryEntryIdKey.value) {
                return false;
            }

            return entry;
        });

        if (userConfigCategoryEntry) {
            console.warn(`Overwriting config entry: ${userConfigCategoryEntry}`);

            userConfigCategoryEntries[userConfigCategoryEntries.indexOf(userConfigCategoryEntry)] = customConfigCategoryEntry
        } else {
            userConfigCategoryEntries.push(customConfigCategoryEntry);
        }

        cachedUserConfigs[fileName] = userConfigFile;
    } else {
        const element = userConfigCategory[userConfigCategoryKeys[0]]
        
        if (!element) {
            userConfigCategory[userConfigCategoryKeys[0]] = [
                userConfigCategoryEntries,
                customConfigCategoryEntry,
            ];

            cachedUserConfigs[fileName] = userConfigFile;
            return;
        }

        const elementId = element[customConfigCategoryEntryIdKey.key];

        if (elementId !== customConfigCategoryEntryIdKey.value) {
            userConfigCategory[userConfigCategoryKeys[0]] = [
                userConfigCategoryEntries,
                customConfigCategoryEntry,
            ];

            cachedUserConfigs[fileName] = userConfigFile;
            return;
        }

        console.warn(`Overwriting config entry: ${userConfigCategoryKeys[0]}`);

        userConfigCategory[userConfigCategoryKeys[0]] = customConfigCategoryEntry;

        cachedUserConfigs[fileName] = userConfigFile;
        return;
    }
};

const addToUserConfigWithoutID = (
    userConfigCategoryEntries: any,
    userConfigCategory: any,
    userConfigFile: any,
    userConfigCategoryKeys: any,
    customConfigCategoryEntry: any,
    fileName: string,
) => {
    console.warn("No identifying key found, appending to appropriate user category. Beware of duplicate entries!"); 

    if (Array.isArray(userConfigCategoryEntries)) {
        userConfigCategoryEntries.push(customConfigCategoryEntry);
    } else {
        console.info("Config category is parsed as object, converting to array and appending element.");

        // cant update userConfigCategoryEntries because it doesnt actually update userConfigFile because...
        // javscript.
        userConfigCategory[userConfigCategoryKeys[0]] = [
            userConfigCategoryEntries,
            customConfigCategoryEntry,
        ];
    }

    // dont forget to update cache
    cachedUserConfigs[fileName] = userConfigFile;

    return;
};

const installConfig = async (userFiles: File[], config: Config, wantedAddons: number[], fileReader: FileReader) => {
    "use client";

    console.log("%cSTARTING CONFIG INSTALL", "color: lawngreen; font-size: 20px;");

    // select the config file the user wants to install into their config
    // loop through every addon of the config
    // loop through addon's files 
    // for each addon file, get corresponding user file
    // loop through addon files categories
    // find appropriate category in corresponding user file
    // loop through addon file category entries
    // find entry in user file category with matching ID or Name
    // if exists, replace
    // if doesnt exist, append
    // repeat until world domination  
    const addonsToInstall = config.addons.filter(addon => wantedAddons.includes(addon.id));

   for (let i = 0; i < addonsToInstall.length; i++) {
        const addon = addonsToInstall[i];

        console.log(`%cWorking on addon: ${addon.name}.`, "color: blue; font-size: 14px;");

        for (let i = 0; i < addon.addonFolderFiles.length; i++) {
            const fileName = addon.addonFolderFiles[i];

            console.log(`%cEntered addon file: ${fileName}. Path: /public/configs/${config.id}/${addon.addonFolderName}/${fileName}`, "color: skyblue; font-size: 14px;");

            const userConfigFile = await parseUserConfigFile(fileName, userFiles, fileReader);
            if (!userConfigFile) {
                alert(`To install this config, you must provide: ${fileName}`);

                return;
            }

            console.log(`%cParsed user file: ${fileName}`, "color: blueviolet; font-size: 14px;")

            const customConfigFilePath = `/configs/${config.id}/${addon.addonFolderName}/${fileName}`;

            const customConfigRes = await fetch(customConfigFilePath);
            const customConfigXML = await customConfigRes.text();

            const parser = new XMLParser();
            const customConfigFile = parser.parse(customConfigXML);

            const customConfigFileKeys = Object.keys(customConfigFile);

            // allows us to get the root element, regardless of what it's named
            const rootElement = customConfigFile[customConfigFileKeys[0]];
            
            const customConfigCategories = Object.values(rootElement);
            const customConfigCategoryNames = Object.keys(rootElement);

            for (let i = 0; i < customConfigCategories.length; i++) {
                const customConfigCategory = customConfigCategories[i] as any;
                const customConfigCategoryName = customConfigCategoryNames[i];
                const customConfigCategoryKeys = Object.keys(customConfigCategory);
                const customConfigCategoryEntries = customConfigCategory[customConfigCategoryKeys[0]];

                console.info(`%cWorking on addon config file category: ${customConfigCategoryName}`, "color: aquamarine; font-size: 14px;")

                const categoryInUserConfigKeyPath = findKeyPath(userConfigFile, customConfigCategoryName);
                if (categoryInUserConfigKeyPath === undefined) {
                    alert(`Failed to install: The Key "${customConfigCategoryName}" was not found anywhere during a recursive search in your ${fileName} file.`);
                    return;
                }

                let userConfigCategory = getValueByPath(userConfigFile, categoryInUserConfigKeyPath)

                let userConfigCategoryKeys = Object.keys(userConfigCategory);
                let userConfigCategoryEntries = userConfigCategory[userConfigCategoryKeys[0]]; 

                if (typeof customConfigCategory === "string") {
                    alert("Failed to install: Invalid configuration.");
                    return;
                }

                // category has no entries but exists
                if (userConfigCategory === "") {
                    const categoryItemCommonName = Object.keys(customConfigCategory)[0];

                    console.warn(`Found unpopulated category in the users config with the name ${customConfigCategoryName}.`);

                    let emptyCategoryObject;

                    if (Array.isArray(customConfigCategoryEntries)) {
                        emptyCategoryObject = { [categoryItemCommonName]: customConfigCategoryEntries[0], };
                    } else {
                        emptyCategoryObject = { [categoryItemCommonName]: customConfigCategoryEntries, };
                    }

                    setValueByPath(userConfigFile, categoryInUserConfigKeyPath, emptyCategoryObject);
                    userConfigCategory = getValueByPath(userConfigFile, categoryInUserConfigKeyPath);

                    userConfigCategoryEntries = userConfigCategory[userConfigCategoryKeys[0]];
                    userConfigCategoryKeys = Object.keys(userConfigCategory);
                }

                // if the category in xml contains only one child element, it gets converted into an object, not an array
                if (typeof customConfigCategory === "object") {
                    const customConfigCategoryEntryIdKey = includesAnyKeyInList(idKeys, customConfigCategoryEntries);

                    if (!customConfigCategoryEntryIdKey) {
                        addToUserConfigWithoutID(
                            userConfigCategoryEntries, 
                            userConfigCategory, 
                            userConfigFile, 
                            userConfigCategoryKeys, 
                            customConfigCategoryEntries, 
                            fileName
                        );
                    } else {
                        addToUserConfigWithID(
                            userConfigCategoryEntries, 
                            userConfigCategory, 
                            userConfigFile, 
                            userConfigCategoryKeys, 
                            customConfigCategoryEntries, 
                            fileName, 
                            customConfigCategoryEntryIdKey, 
                        );
                    }

                    continue
                } else {
                    // do array things
                }
            }
        }
    }

    const userConfigFile = await parseUserConfigFile("ModItems.xml", userFiles, fileReader);
    console.log(userConfigFile);

    const builder = new XMLBuilder({
        format: true,
    });

    const newConfigXML = builder.build(userConfigFile);

    const configBlob = new Blob([newConfigXML],{ type: "text/plain;charset=utf-8", })

    saveAs(configBlob, "ModItems.xml");
}

export default installConfig; 
