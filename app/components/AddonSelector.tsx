import { Dispatch, SetStateAction } from "react";

const AddonSelector = ({
    config,
    wantedAddons,
    setWantedAddons,
}: {
    config: Config,
    wantedAddons: number[],
    setWantedAddons: Dispatch<SetStateAction<number[]>>
}) => {
    return (
        <div 
            className="w-full border-[1px] border-zinc-700 duration-300 p-4 rounded-sm bg-zinc-800 group/config"
        >
            <h3 className="font-semibold text-xl font-playfair">
                Addons
            </h3>

            <p className="text-sm opacity-75 mb-8">
                Choose which addons to use from this config.<br/>
            </p>

            <p className="text-xs opacity-75 mb-2">
                <span className="font-inter font-bold">Addons:</span> {config.addons.filter(addon => addon.isRequired).length} Required, {wantedAddons.length} Selected. 
            </p>

            <div className="flex flex-col gap-5">
                {config.addons.map((addon, index) => {
                    return (
                        <div 
                            className="flex gap-2 items-center"
                            key={index}
                        >
                            <div
                                className="hover:cursor-not-allowed  aria-required:hover:cursor-pointer "
                                aria-required={!addon.isRequired}
                                onClick={() => {
                                    if (addon.isRequired) return;

                                    if (wantedAddons.includes(addon.id)) {
                                        setWantedAddons(wantedAddons.filter(id => id !== addon.id))
                                    } else {
                                        setWantedAddons([
                                            ...wantedAddons,
                                            addon.id,
                                        ]);
                                    }
                                }}
                            >
                                {wantedAddons.includes(addon.id) && (
                                    <svg 
                                        width="28px"
                                        height="28px" 
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd" 
                                            clipRule="evenodd"
                                            d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821
                                            6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475
                                            18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655
                                            10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911
                                            16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821
                                            5.54289Z"
                                            fill="#22c55e"
                                        />
                                    </svg>
                                )}

                                {!wantedAddons.includes(addon.id) && (
                                    <svg 
                                        className="show"
                                        width="28px" 
                                        height="28px"
                                        viewBox="0 0 24 24"
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path 
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3 12C3 11.4477 3.44772 11 4 11L20 11C20.5523 11 21 11.4477 21
                                            12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                                            fill="#3f3f46"
                                        />
                                    </svg>
                                )}
                            </div>

                            <div 
                                className="aria-disabled:opacity-30 duration-300"
                                aria-disabled={!wantedAddons.includes(addon.id)}
                            >
                                <h4 className="text-xs uppercase font-bold font-inter mb-1">
                                    {addon.name}
                                </h4>

                                <p className="text-xs opacity-75">
                                    {addon.description}
                                </p>
                            </div> 
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default AddonSelector;
