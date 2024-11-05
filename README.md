# Los Santos RED Config Tool
This is a simple web-app for installing LSR configs with a GUI.

## Add a Config
I've tried to make adding a custom config as easy as I could, with my limited knowledge of LSR.  
  
I suggest looking at `./public/configs/configList.ts` to get a general idea of how configurations are structured.

### Splitting a Config
Let's say you have a config thats called "LC Gang Pack" that adds 5 different gans. We'll call these gang A, B, C, D, E  
A user may only want *some*, not all of these gangs.  
Therefore, it's advised to **split up** you configuration into multiple **addons**.  
  
The addons for this "LC Gang Pack" could look something like this.  
  
LC Gang Pack:
- Gang A
- Gang B
- Gang C
- Gang D
- Gang E 

With your configs split up the user may at the click of a button decide which parts of your config to install. Cool, right?  

### Addons
An addon is just a folder with a name of your choosing, (see `/public/configs/0/` for examples) that contains some XML files, like `Gangs.xml`, `ModItems.xml`, etc.  
Every addon of your config should have it's *own config files*  
  
Take the time now to split up your config into addon folders.
  
As an example, the "LC Gang Pack", split up into folders might look something like this.
1. /GANG_A/
  - Gangs.xml
2. /GANG_B/
  - Gangs.xml
3. /GANG_C/
  - Gangs.xml
4. /GANG_D/
  - Gangs.xml
5. /GANG_E/
  - Gangs.xml

#### Addon Files
When creating the files for your addon, only include the top-level element, and whichever element group you wish to add to.  
  
For example, to add the Sloppy Joe Burger:
```xml
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
</PossibleItems>
```
  
Here, `PossibleItems` is the root element, and everything in it is called a *category*.  
All child elements in a category are called *category elements*.  
  
It may seem a bit confusing, but how the tool works is it loops through this root elements children (the categories), takes their name (in this case `FoodItems`), finds it recursively in the matching user config file (in this case, `ModItems.xml`), then loops through the categories children, (in this case, just the "Sloppy Joe Burger"), and adds it to the users config.  
  
It seems a bit confusing, but this allows you to write even 10 elements deep if required.  
  
### configList.ts
Now that your config is split up into addons, you may fork this repository, and start editing `configList.ts`.  
`configList.ts` is where you define your configurations structure. So, things like the name, description, what addons it has, etc.  
  
Below is an example config `Burger Shot Pack`, as seen in `./public/configs/configList.ts`.  
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
  
You should create your configuration at the bottom of the list.  
Here are the config fields explained:  
- `id`: A number that should always be 1 integer higher than the one that came before it.
- `title`: Can be any name you want, just don't use slurs or something.
- `description`: Here you should accurately and concisely describe what your configuration adds.
- `author`: Can be any of your names / usernames. I just put my Discord.
- `modVersion`: The version of the mod that this configuration was created for.
  
#### Addon List
The `addons` field in the config should be self explanatory, but for the sake of covering all cases i'll go over it anyway.
- `id`: A number that is relative to how many addons you have in your config. So, the first addon in *your* config will be id 0, and so on and so forth.
- `name`: Can be any name you want.
- `description`: Describe accurately and concise what things this addon adds. Also make note of if it *overrides* anything in the base-configs.
- `addonFolderName`: the folder name of where the addon will live. For example, the `GANG_A` addon folder from our "LC Gang Pack".
- `addonFolerFiles`: The list of filenames for this addon. `ModItems.xml`, `Gangs.xml`, etc.
- `isRequired`: Whether or not the user can choose to not install this addon when installing your config. You must always have at least ONE required addon in your config.

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

## How the Updater works.
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
