import Image from "next/image";

const ConfigComponent = ({
    config,
}: {
    config: Config,
}) => {
    return (
        <div 
            className="flex justify-between w-full border-[1px] border-zinc-700 duration-300 p-4 rounded-sm bg-zinc-800 group/config"
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
            </div>
        </div>
    )
};

export default ConfigComponent;
