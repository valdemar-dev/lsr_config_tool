"use client";

import configList from "@/lib/configs/configList";
import installConfig from "@/lib/installConfig";
import { Dispatch, SetStateAction, useState } from "react";
import ConfigComponent from "./Config";
import AddonSelector from "./AddonSelector";

const InstallConfig = ({
    selectedConfigId,
    setSelectedConfigId,
    userFiles,
}: {
    setSelectedConfigId: Dispatch<SetStateAction<number | null>>,
    selectedConfigId: number,
    userFiles: File[],
}) => {
    const [selectedConfig] = useState(configList[selectedConfigId]);
    const [wantedAddons, setWantedAddons] = useState(selectedConfig.addons.map((addon) => addon.id));

    const [fileReader] = useState(new FileReader());

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

                    <div className="mb-8">
                        <ConfigComponent config={selectedConfig}/>
                    </div>

                    <AddonSelector 
                        config={selectedConfig} 
                        wantedAddons={wantedAddons}
                        setWantedAddons={setWantedAddons}
                    />

                    <div className="flex gap-4 mt-20">
                        <button
                            className="text-xs font-bold uppercase font-inter py-4 px-8 w-1/2 border-[2px] duration-300 hover:border-red-500 hover:bg-opacity-10 hover:bg-red-500 border-zinc-800 bg-black bg-opacity-10"
                            onClick={() => setSelectedConfigId(null)}
                        >
                            go back
                        </button>

                        <button
                            className="text-xs font-bold uppercase font-inter py-4 px-8 w-1/2 border-[2px] duration-300 hover:border-green-500 hover:bg-opacity-10 hover:bg-emerald-500 border-zinc-800 bg-black bg-opacity-10"
                            onClick={async () => {
                                await installConfig(userFiles, selectedConfig, wantedAddons, fileReader)
                            }}
                        >
                            Install Config
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default InstallConfig;
