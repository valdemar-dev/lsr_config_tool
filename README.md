# Los Santos RED Config Tool
This is a simple web-app for installing LSR configs with a GUI.

## Add a Config
I've tried to make adding a custom config as easy as I could, with my limited knowledge of LSR.  
  
The list of available configurations is in `./lib/configs/configList.ts`.  
  
Configs have a very simple type.
```ts 
type Config = {
    id: number;
    title: string;
    description: string;
    author: string;
    modVersion: string;
    createdAt: Date;
    addons: Addon[];
}
```
`modVersion` should be the version of LSR you made the config for. It's important to note this in-case some options become deprecated or wish for different datatypes / value ranges.  
`id` should be a 1-increment integer starting at 0 (the default config). This is also the name of the folder where your config lives `/lib/your_id`.  

### Addons 
An addon should be a compartmentalizable portion of your config.  
Each addon contains it's own config files, so `Gangs.xml`, `Locations.xml` etc.  
You can also make each addon optional, if you wish.  
  
Addons are typed like so:
```ts 
type Addon = {
    id: number;
    name: string;
    description: string;
    addonFolderName: string;
    addonFolderFiles: string[];
    isRequired: boolean;
}
```
- `id` should start at 0, and increase by 1 for every addon you have in *your* config.  
- `addonFolderName` is where the config XMLs are located for this addon.  
- `isRequired` determines whether or not the user is required to have this addon enabled when installing your config. You must always have at least one required addon.  

## Example Config
Below is an example config `Burger Shot Pack`, as seen in `./lib/configs/configList.ts`.  
```ts 
    {
        id: 0,
        title: "Burger Shot Pack",
        description: "Ever wanted to eat a burger made of [REDACTED]? Well now you can! Come to burger shot, and try out our all new Sloppy Joe!",
        author: "the.monologue",
        modVersion: "1.00378",
        createdAt: new Date("2008-11-12"),
        addons: [
            {
                id: 0,
                name: "Sloppy Joe Burger",
                description: "The Sloppy Joe Burger.",
                addonFolderName: "SloppyJoeBurger",
                addonFolderFiles: [
                    "ModItems.xml",
                ],
                isRequired: true,
            },
        ]
    }
```
It contains all the necessary information to create a config.  
It's only addon, the "Sloppy Joe Burger", and it's config files can be found at `./lib/configs/0/SloppyJoeBurger/`.

## Important Notes
If your config re-writes things, please **tell the user** in your config/addon description what you are re-writing.  
Your config XMLs should contain the basic structure of whichever file you're wishing to add to.

For example, in the `SloppyJoeBurger`'s `ModItems.xml`:
```xml 
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE PossibleItems []>

<PossibleItems>
    <FoodItems>
        <FoodItem>
            <Name>Sloppy Joe Burger</Name>
            <Description>Burger made of such low quality it's banned in all 50 states.</Description>
            <ItemType>Food</ItemType>
            <ItemSubType>Entree</ItemSubType>
            <MeasurementName>Item</MeasurementName>
            <AmountPerPackage>1</AmountPerPackage>
            <ModelItemID>prop_cs_burger_01</ModelItemID>
            <IsPossessionIllicit>true</IsPossessionIllicit>
            <IsPublicUseIllegal>true</IsPublicUseIllegal>
            <PercentLostOnUse>0</PercentLostOnUse>
            <ConsumeOnPurchase>false</ConsumeOnPurchase>
            <CanConsume>true</CanConsume>
            <FindPercentage>0</FindPercentage>
            <PoliceFindDuringPlayerSearchPercentage>100</PoliceFindDuringPlayerSearchPercentage>
            <IntoxicantName />
            <IntoxicationPerInterval>0.2</IntoxicationPerInterval>
            <HealthChangeAmount>35</HealthChangeAmount>
            <ArmorChangeAmount>0</ArmorChangeAmount>
            <HungerChangeAmount>35</HungerChangeAmount>
            <ThirstChangeAmount>0</ThirstChangeAmount>
            <SleepChangeAmount>0</SleepChangeAmount>
            <AlwaysChangesHealth>false</AlwaysChangesHealth>
            <AnimationCycles>15</AnimationCycles>
        </FoodItem>
    </FoodItems>
    <FlashlightItems>
        <FlashlightItem>
            <Name>TAG-HARD Flashlight</Name>
            <Description>
                Need to beat a suspect, but don't have your nightstick? Look no further.
            </Description>
            <ItemType>Equipment</ItemType>
            <ItemSubType>Flashlight</ItemSubType>
            <MeasurementName>Item</MeasurementName>
            <AmountPerPackage>1</AmountPerPackage>
            <ModelItemID>prop_cs_police_torch</ModelItemID>
            <IsPossessionIllicit>false</IsPossessionIllicit>
            <IsPublicUseIllegal>false</IsPublicUseIllegal>
            <PercentLostOnUse>0</PercentLostOnUse>
            <ConsumeOnPurchase>false</ConsumeOnPurchase>
            <CanConsume>false</CanConsume>
            <FindPercentage>1</FindPercentage>
            <PoliceFindDuringPlayerSearchPercentage>85</PoliceFindDuringPlayerSearchPercentage>
            <LightFollowsCamera>true</LightFollowsCamera>
            <AllowPropRotation>true</AllowPropRotation>
            <UseFakeEmissive>true</UseFakeEmissive>
            <PitchMax>25</PitchMax>
            <PitchMin>-25</PitchMin>
            <HeadingMax>30</HeadingMax>
            <HeadingMin>-30</HeadingMin>
            <EmissiveDistance>75</EmissiveDistance>
            <EmissiveBrightness>0.75</EmissiveBrightness>
            <EmissiveHardness>0</EmissiveHardness>
            <EmissiveRadius>10</EmissiveRadius>
            <EmissiveFallOff>1</EmissiveFallOff>
            <FakeEmissiveDistance>0.4</FakeEmissiveDistance>
            <FakeEmissiveBrightness>5</FakeEmissiveBrightness>
            <FakeEmissiveHardness>0</FakeEmissiveHardness>
            <FakeEmissiveRadius>100</FakeEmissiveRadius>
            <FakeEmissiveFallOff>1</FakeEmissiveFallOff>
            <IsCellphone>false</IsCellphone>
            <CanSearch>true</CanSearch>
        </FlashlightItem>
    </FlashlightItems>
</PossibleItems>
```

### How the Updater works.
#### Parsing
The updater starts by parsing every config file provided by the user.  

It then parses an XML you have provided in an Addon (starting from addonFolderFiles[0] and going through all of them).  
We'll take the `SloppyJoeBurger`'s `ModItems.xml`.  
By parsing, it turns into a big object that we can work with.  

Then it looks at the filename. In our case that's `ModItems.xml`.  
So, it sets the config to edit as the users provided `ModItems.xml`.  

It then selects the first child or the root element. So, `<FoodItems>` for us.  
It then finds the element in the users provided `ModItems.xml`.  
Then, it iterates through the children of food items, and checks their "keys", against a given list of allowed keys.  
For now, just `<(anything)Name>` and `<(anything)ID>`.  

If it does not find an element in the list that contains the key, it appends it.  

It then does this until the root element has no more children to iterate through.  

NOTE: You must ONLY have one level of abstractions.  
So, to add a `<FlashlightItem>`, only define `<FlashlightItems>`, and not all parent elements (which may or may not exist).
You cannot define multiple levels of abstraction due to just limitations of the code essentially.  
The updater does `Object.find(key)`, and takes all children, and either appends / updates.  
If you were to have multiple children, it just like wouldn't work at all lol.  
It could be possible to define the entire tree, and to allow for individual editing of single values, but that would be a lot more computationally expensive, since you'd have to iterate through every single value of the *users* `ModItems.xml` instead of the one in the Config.
