import { ChangeEvent, Dispatch, SetStateAction, } from "react";
import Image from "next/image";


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
        <div className="flex w-full h-screen justify-center pt-20">
            <div className="max-w-[900px] w-full mx-4">
                <div className="mb-8">
                    <div className="flex gap-4 items-center mb-3">
                        <h1 className="text-4xl font-bold font-playfair">LSR Config Addon Tool</h1>

                        <p className="border-2 py-2 px-4 rounded-sm uppercase font-bold text-xs border-blue-400 bg-blue-400 bg-opacity-30">
                            beta release
                        </p>
                    </div>

                    <p className="text-sm opacity-75 mb-8">
                        Easily add custom configs to your LSR, whilst preserving your pre-existing ones.
                    </p>

                    <h4 className="text-xs mb-2 uppercase font-bold">
                        how it works
                    </h4>

                    <div className="flex flex-col gap-2 text-sm opacity-75">
                        <p>
                            1. Add Your Config Files.
                        </p>
                        <p>
                            2. Select a Custom Config.
                        </p>
                        <p>
                            3. Click Install.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center aspect-video rounded-sm border-[1px] border-zinc-800 bg-zinc-900 w-full relative hover:bg-zinc-800 duration-200">
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
                        <p className="text-sm opacity-75 mb-2">
                            {"Your LSR Config Files are located in this directory."}
                        </p>

                        <p className="text-sm border-[1px] border-zinc-800 py-2 px-4 bg-black bg-opacity-30 rounded-full">
                            Grand Theft Auto V/Plugins/LosSantosRED/
                        </p>
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

export default RequestUserConfig;
