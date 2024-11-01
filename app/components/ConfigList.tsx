import { Dispatch, SetStateAction, } from "react";
import Image from "next/image";
import configList from "@/lib/configs/configList";

const ConfigList = ({
    setSelectedConfigId,
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
                                    &quot;{config.description}&quot;
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

                                <div className="flex flex-col gap-2">
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
                    </div>
                )
            })}

        </div>
    )
};

export default ConfigList;
