"use server";

import { XMLParser } from "fast-xml-parser";
import path from "path";
import fs from "fs";

const getParsedFromPath = async (pathName: string) => {
    "use server";

    const parser = new XMLParser();

    const filePath = path.join(process.cwd(), pathName)

    const file = fs.readFileSync(filePath, "utf8");

    const parsedXML = parser.parse(file);

    return parsedXML;
};

export default getParsedFromPath;
