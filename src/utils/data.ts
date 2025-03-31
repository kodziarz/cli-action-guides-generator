import CommandMode from "../components/CommandMode"

// raw versions (without CommandMode objects)
export type CommandRawData = {
    command: string,
    commandMode?: string, // id
    needsDoVersion?: boolean
}

export type SegmentRawData = {
    name: string,
    href?: string,
    commands?: CommandRawData[],
    subsegments?: SegmentRawData[]
}

export type CommandModeRawData = {
    promptPart: string,
    enterModeHref: string, // id of html elements, which shows how to enter the mode
    promptPrecedent?: string // enterModeHref of required state to enter the mode
}

export type CommandDescriptionsRawData = {
    commandModes: CommandModeRawData[],
    commands: CommandRawData[],
    subsegments: SegmentRawData[]
}

// versions with CommandMode objects
export type CommandData = {
    command: string,
    commandMode?: CommandMode, // href of command entering command mode
    needsDoVersion?: boolean
}

export type SegmentData = {
    name: string,
    href?: string,
    commands?: CommandData[],
    subsegments?: SegmentData[]
}


export type CommandDescriptionsData = {
    commandModes: CommandMode[],
    commands: CommandData[],
    subsegments: SegmentData[]
}