import configList from "@/lib/configs/configList";
import { useState } from "react";
import getParsedFromPath from "@/lib/installConfig";


const findKeyValue = (obj: Record<string, any>, key: string): any => {
    if (key in obj) return obj[key];

    for (const k in obj) {
        if (typeof obj[k] === "object" && obj[k] !== null) {
            const result = findKeyValue(obj[k], key);
            if (result !== undefined) return result;
        }
    }

    return undefined;
};


const installConfig = async (userFiles: File[], config: Config) => {
    config.addons.forEach(async addon => {
        addon.addonFolderFiles.forEach(async fileName => {
            const pathName = `/lib/configs/${config.id}/${addon.addonFolderName}/${fileName}`;

            const parsedXML = await getParsedFromPath(pathName)

            const addonFileKeys = Object.keys(parsedXML);
            const rootElement = parsedXML[addonFileKeys[0]];

            console.log(rootElement);
        })
    })
}

const InstallConfig = ({
    selectedConfigId
}: {
    selectedConfigId: number,
}) => {
    const [selectedConfig] = useState(configList[selectedConfigId]);

    return (
        <div>
            You've chosen the config:
            {selectedConfig.title}

            <button  
                onClick={async () => {
                    await installConfig([], selectedConfig)
                }}
                className="p-2 rounded-md bg-black text-white">
                INSTALL
            </button>
        </div>
    )
};

export default InstallConfig;
