export default class CommandMode {
    prompt: string
    enterModeHref: string
    promptPrecedent?: CommandMode

    constructor(prompt: string, enterModeHref: string, promptPrecedent?: CommandMode) {
        this.prompt = prompt;
        this.enterModeHref = enterModeHref;
        this.promptPrecedent = promptPrecedent
    }

    getPrecedenceList(): CommandMode[] {
        if (this.promptPrecedent == undefined) {
            return [this];
        }
        return [...this.promptPrecedent.getPrecedenceList(), this];
    }
}