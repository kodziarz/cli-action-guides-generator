import fs from 'fs';
import path from 'path';

// analogous to https://dev.to/hpouyanmehr/split-your-translations-in-next-intl-in-a-nice-way-4jof loader.ts file
export const loadCommandDescriptionsData = (
    dataPath
) => {
    const absolutePath = path.join(process.cwd(), dataPath);

    let rootSegment = {
        subsegments: []
    };

    try {
        const files = fs.readdirSync(absolutePath, { recursive: true });
        // read index.json
        const indexFileName = "index.json";
        const indexPath = path.join(absolutePath, indexFileName);

        if (files.includes(indexFileName)) {
            Object.assign(rootSegment, JSON.parse(fs.readFileSync(indexPath, 'utf-8')));
            // throw it out
            const i = files.indexOf(indexFileName);
            if (i > -1) {
                files.splice(i, 1);
            }
        }

        files.forEach((file) => {
            if (typeof file === 'string' && file.endsWith('.json')) {
                const namespacePath = file.split(path.sep).slice(0, -1) // manually, because path.dirname returns '.' if in current directory

                namespacePath.push(path.basename(file, ".json"))
                const filePath = path.join(absolutePath, file);
                const segment = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                const { lastSegment } = addNestedSegment(rootSegment, namespacePath);


                Object.assign(lastSegment, segment);

            }
        });
    } catch (error) {
        console.error(
            'The following error occured while loading data files.',
            error
        );
    }

    return rootSegment;
};

const addNestedSegment = (segment, keys) => {
    let current = segment;

    for (const key of keys) {
        if (!key) { throw new Error(`name of key: ${key} is not a valid name.`); }

        if (!Array.isArray(current.subsegments)) {
            current.subsegments = [];
        }

        let searchedSegment = current.subsegments.find(seg => seg?.name == key);
        if (!searchedSegment) {
            searchedSegment = {
                name: key
                // subsegments will be created on the earlier stage if further nesting needed
            }
            current.subsegments.push(searchedSegment);
        }
        current = searchedSegment;
    }

    return { root: segment, lastSegment: current };
};

let result = loadCommandDescriptionsData(path.join("src", "data"));
fs.writeFileSync(path.join(process.cwd(), "src", "utils", "data.json"), JSON.stringify(result));
