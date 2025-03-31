import CommandMode from "../components/CommandMode";
import { CommandData, CommandDescriptionsData, CommandDescriptionsRawData, CommandModeRawData, CommandRawData, SegmentData, SegmentRawData } from "./data";
import data from "./data.json";

export const getCommandDescriptions = () => {
    return objectifyCommandsDescriptionsRawData(data);
}

const objectifyCommandsDescriptionsRawData = (commandsData: CommandDescriptionsRawData): CommandDescriptionsData => {

    let commandsDescriptionsData: CommandDescriptionsData = {
        commandModes: [],
        commands: [],
        subsegments: [],
    }

    // create commandModes
    let commandModesByHrefs: { [href: string]: CommandMode } = {};

    (commandsData.commandModes as CommandModeRawData[]).forEach(modeData => {
        commandModesByHrefs[modeData.enterModeHref] = new CommandMode(modeData.promptPart, modeData.enterModeHref)
    });
    // convert promptPrecedent hrefs to CommandMode objects
    (commandsData.commandModes as CommandModeRawData[]).forEach(modeData => {
        if (!modeData.promptPrecedent)
            return;

        verifyCommandModeExistence(modeData.enterModeHref, commandModesByHrefs);

        commandModesByHrefs[modeData.enterModeHref].promptPrecedent = commandModesByHrefs[modeData.promptPrecedent];

    });

    commandsDescriptionsData.commandModes = Object.values(commandModesByHrefs);
    commandsDescriptionsData.commands = commandsData.commands?.map(
        commandRawData => objectifyCommand(commandRawData, commandModesByHrefs)
    );
    commandsDescriptionsData.subsegments = commandsData.subsegments?.map(
        segmentRawData => objectifySegment(segmentRawData, commandModesByHrefs)
    );

    return commandsDescriptionsData;
}

const objectifyCommand = ({ command, commandMode, needsDoVersion }: CommandRawData, commandModesByHrefs: { [href: string]: CommandMode }): CommandData => {
    if (commandMode)
        verifyCommandModeExistence(commandMode, commandModesByHrefs);

    return {
        command,
        commandMode: commandMode ? commandModesByHrefs[commandMode] : undefined,
        needsDoVersion
    }
}

const objectifySegment = ({ name, href, commands, subsegments }: SegmentRawData, commandModesByHrefs: { [href: string]: CommandMode }): SegmentData => {
    console.log("ObjectifySegment: ", "name: ", name, ", href: ", href);
    return {
        name,
        href,
        commands: commands ?
            commands.map(command => objectifyCommand(command, commandModesByHrefs))
            : undefined,
        subsegments: subsegments ?
            subsegments.map(segment => objectifySegment(segment, commandModesByHrefs))
            : undefined
    }
}

const verifyCommandModeExistence = (commandMode: string, commandModesByHrefs: { [href: string]: CommandMode }): void => {
    if (!Object.keys(commandModesByHrefs).includes(commandMode))
        throw new Error(`commandMode with href ${commandMode} does not exist.`);
}