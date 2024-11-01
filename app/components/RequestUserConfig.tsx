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
                    <h1 className="text-4xl font-bold mb-4 font-playfair">LSR Config Addon Tool</h1>

                    <p className="text-sm opacity-75">
                        Easily add custom configs to your LSR, whilst preserving your pre-existing ones.
                    </p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center aspect-video rounded-sm border-[1px] border-zinc-800 bg-opacity-10 bg-black w-full relative hover:bg-opacity-30 duration-200">
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
                            {"Drag & drop your config files from the below directory in here."}
                        </p>

                        <span className="text-sm font-mono p-1 px-2 bg-black bg-opacity-30 rounded-sm">
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

export default RequestUserConfig;
