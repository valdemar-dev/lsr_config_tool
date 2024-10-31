"use client";

import { XMLParser } from "fast-xml-parser";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import configList from "@/lib/configs/configList";
import ConfigList from "./components/ConfigList";
import RequestUserConfig from "./components/RequestUserConfig";
import InstallConfig from "./components/InstallConfig";
import path from "path";

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


export default function Home() {
    const [parser] = useState(new XMLParser());

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
            <InstallConfig selectedConfigId={selectedConfigId}/>
        )
    }

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
                        <div className="flex items-center gap-1 mb-2">
                            <h4 className="font-inter font-bold uppercase text-xs">
                                files selected
                            </h4>

                            <p className="text-xs opacity-50">
                                ({userConfigFiles.length})
                            </p>
                        </div>

                        <MappedUserFiles files={userConfigFiles}/>

                        {userConfigFiles.length !== 33 && (
                            <div className="p-3 py-2 rounded-sm border-2 border-yellow-300 bg-yellow-300 bg-opacity-10 mt-4 w-max">
                                <h3 className="font-semibold">
                                    Warning!
                                </h3>

                                <p className="text-sm opacity-75"> 
                                    You have selected only {userConfigFiles.length} files out of 33.<br/>
                                    Please include <b>all</b> config files, or they program may not work properly.
                                </p>
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
