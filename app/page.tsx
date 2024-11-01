"use client";

import { ChangeEvent, useState } from "react";
import ConfigList from "./components/ConfigList";
import RequestUserConfig from "./components/RequestUserConfig";
import InstallConfig from "./components/InstallConfig";

const MappedUserFiles = ({
    files,
}: {
    files: File[]
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {files.map((file, index) => {
                return (
                    <div className="text-xs font-mono" key={index}>
                        {file.name}
                    </div>
                )
            })}
        </div>
    )
};

const configFileNames = [
    "Agencies.xml",
    "Cellphones.xml",
    "Contacts.xml",
    "CountyJurisdictions.xml",
    "Crimes.xml",
    "Dances.xml",
    "DispatchablePeople.xml",
    "DispatchableVehicles.xml",
    "Gangs.xml",
    "GangTerritories.xml",
    "Gestures.xml",
    "Heads.xml",
    "Interiors.xml",
    "IssueableWeapons.xml",
    "Itoxicants.xml",
    "Locations.xml",
    "LocationTypes.xml",
    "ModItems.xml",
    "Names.xml",
    "Organizations.xml",
    "PedGroups.xml",
    "PhysicalItems.xml",
    "PlateTypes.xml",
    "SavedOutfits.xml",
    "SaveGames.xml",
    "Settings.xml",
    "ShopMenus.xml",
    "SpawnBlocks.xml",
    "Speeches.xml",
    "Streets.xml",
    "Weapons.xml",
    "ZoneJurisdictions.xml",
    "Zones.xml",
];

export default function Home() {
    const [userConfigFiles, setUserConfigFiles] = useState<File[]>();

    const [selectedConfigId, setSelectedConfigId] = useState<number | null>(null);

    if (!userConfigFiles) {
        return (
            <RequestUserConfig
                setUserConfigFiles={setUserConfigFiles}
            />
        )
    }

    if (selectedConfigId !== null) {
        return (
            <InstallConfig 
                setSelectedConfigId={setSelectedConfigId}
                selectedConfigId={selectedConfigId}
                userFiles={userConfigFiles}
            />
        )
    }

    const handleUserFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;

        if (!files) {
            return;
        }


        const filesAsArray = Array.from(files);
        const allFilesAsArray = [...userConfigFiles, ...filesAsArray];

        setUserConfigFiles(Array.from(new Map(allFilesAsArray.map((file) => [file.name, file])).values()));
    };
 
    return (
        <main className="w-full h-screen overflow-x-hidden select-none">
            <div className="flex justify-center mt-20">
                <div className="max-w-[900px] w-full mx-4">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4 font-playfair">LSR Config Addon Tool</h1>

                        <p className="text-sm opacity-75">
                            Easily add custom configs to your LSR, whilst preserving your pre-existing ones.
                        </p>
                    </div>

                    <div className="mb-20">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-1 mb-2">
                                <h4 className="font-inter font-bold uppercase text-xs">
                                    files selected
                                </h4>

                                <p className="text-xs opacity-50">
                                    ({userConfigFiles.length})
                                </p>
                            </div>

                            <div className="relative px-4 py-2 rounded-sm border-[1px] border-zinc-800 bg-black bg-opacity-10 text-xs uppercase font-bold">
                                Add Files

                                <input
                                    className="opacity-0 absolute inset-0 hover:cursor-pointer"
                                    type="file"
                                    multiple={true}
                                    onChange={handleUserFileUpload}
                                />
                            </div>
                        </div>

                        <MappedUserFiles files={userConfigFiles}/>

                        {userConfigFiles.length < configFileNames.length && (
                            <div className="p-3 py-2 rounded-sm border-2 border-yellow-300 bg-yellow-300 bg-opacity-10 mt-4 w-max duration-300">
                                <h3 className="font-semibold">
                                    Warning!
                                </h3>

                                <p className="text-sm opacity-75 mb-4"> 
                                    You have selected only {userConfigFiles.length} files out of {configFileNames.length} known config files.<br/>
                                    It&apos;s recommended to include <b>all</b> config files, or they program may not work properly.
                                </p>

                                <details className="duration-300">
                                    <summary className="text-xs uppercase font-bold font-inter mb-2 hover:cursor-pointer hover:opacity-50 duration-300">
                                        View Known Config File Names
                                    </summary>

                                    <div className="flex flex-col gap-2 p-2 bg-black bg-opacity-30 mb-1">
                                        {configFileNames.map((fileName: string, index: number) => { 
                                            return <p 
                                                key={index} 
                                                className="select-text text-sm font-mono"
                                            >
                                                ({index + 1}) {fileName}
                                            </p>
                                        })}
                                    </div>
                                </details>
                            </div>
                        )}
                    </div>

                    <ConfigList
                        selectedConfigId={selectedConfigId} 
                        setSelectedConfigId={setSelectedConfigId}
                    />
                </div>
            </div>
        </main>
    )
}
