"use client";

import { XMLParser } from "fast-xml-parser";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import configList from "@/lib/configs/configList";


const ConfigList = ({
    selectedConfigId,
    setSelectedConfigId
}: {
    selectedConfigId: number | null,
    setSelectedConfigId: Dispatch<SetStateAction<number | null>>,
}) => {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-playfair font-bold mb-2">
                    Select a Config
                </h2>

                <p className="text-sm opacity-75">
                    The configs listed below are all unofficial, and made by community members.
                </p>
            </div>

            {configList.map((config, index) => {
                return (
                    <div 
                        key={index}
                        className="flex min-h-[320px] justify-between w-full border-[1px] border-zinc-700 duration-300 p-4 rounded-sm bg-zinc-800 group/config"
                    >
                        <div className="flex w-1/3 gap-2 justify-between relative">
                            <div className="flex flex-col">
                                <h4 className="font-playfair -translate-y-1 text-xl font-semibold break-all">
                                    {config.title}
                                </h4>

                                <p className="text-xs font-mono opacity-50 mb-4">
                                    {config.author}
                                </p>

                                <div className="rounded-full font-inter font-bold uppercase bg-sky-400 bg-opacity-10 border-sky-400 text-xs w-max flex items-center py-1 px-4 border-2 ">
                                    <p>
                                        V{config.modVersion}
                                    </p>
                                </div>
                            </div>

                            <div className="border-2 border-zinc-400 relative h-[90px] w-[90px]">
                                <Image
                                    src={`/images/configs/${config.id}/thumbnail.jpg`}
                                    alt={config.title}
                                    fill
                                    objectFit="cover"
                                />
                            </div>

                            <button
                                onClick={() => setSelectedConfigId(config.id)}
                                className="mt-auto absolute duration-300 group-hover/config:border-green-500 hover:bg-opacity-10 hover:bg-emerald-500 bottom-0 py-2 font-bold uppercase text-xs font-inter left-0 right-0 border-[1px] border-zinc-600 bg-black bg-opacity-10 rounded-sm text-center">
                                select config
                            </button>
                        </div>

                        <div className="w-2/3 flex flex-col gap-8 overflow-y-scroll border-l-[1px] ml-6 pl-6 border-zinc-700">
                            <div>
                                <h4 className="font-inter text-xs mb-2 font-bold uppercase">
                                    description
                                </h4>

                                <p className="opacity-80 text-sm">
                                    "{config.description}"
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    <h4 className="font-inter font-bold uppercase text-xs">
                                        addons
                                    </h4>

                                    <p className="text-xs opacity-50">
                                        ({config.addons.filter(addon => addon.isRequired).length} Required, {config.addons.length} Total)
                                    </p>
                                </div>

                                {config.addons.map((addon, index) => {
                                    return (
                                        <div 
                                            key={index}
                                        >
                                            <h5 className="text-sm">
                                                {addon.name}
                                            </h5>

                                            <p className="text-xs opacity-50">
                                                {addon.description}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
};

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

const RequestUserConfig = ({
    setUserConfigFiles
}: {
    setUserConfigFiles: Dispatch<SetStateAction<File[] | undefined>>,
}) => {
    const handleUserFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;

        if (!files) {
            return;
        }

        setUserConfigFiles(Array.from(files));
    };

    return (
        <div className="flex w-full h-screen justify-center mt-20">
            <div className="max-w-[900px] w-full mx-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 font-playfair">LSR Config Addon Tool</h1>

                    <p className="text-sm opacity-75">
                        Easily add custom configs to your LSR, whilst preserving your pre-existing ones.
                    </p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center aspect-video rounded-xl border-2 border-zinc-700 bg-zinc-800 bg-opacity-10 w-full relative hover:bg-opacity-80 duration-200">
                    <div className="flex items-center gap-3">
                        <Image
                            src={"/images/icons/xml.svg"}
                            width="40"
                            height="40"
                            alt="An SVG of an XML File Icon."
                        />

                        <p className="font- font-bold text-xl">
                            {"Drag & Drop"}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm opacity-75">
                            Navigate to this directory, choose every XML file, and drop it here.
                        </p>

                        <span className="text-sm font-mono p-1 bg-black bg-opacity-10 rounded-md">
                            Grand Theft Auto V/Plugins/LosSantosRED/
                        </span>
                    </div>

                    <input
                        className="opacity-0 absolute inset-0 hover:cursor-pointer"
                        type="file"
                        multiple={true}
                        onChange={handleUserFileUpload}
                    />
                </div>
            </div>
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
            <div>
            </div>
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
