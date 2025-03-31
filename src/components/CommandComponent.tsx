import { ReactNode } from "react";
import CommandMode from "./CommandMode"

export default function CommandComponent({ command, commandMode, needsDoVersion }:
    { command: string, commandMode?: CommandMode, needsDoVersion?: boolean }
) {

    // let { command, commandMode, needsDoVersion } = commandData;
    if (needsDoVersion === undefined)
        needsDoVersion = commandMode === undefined; // commands on the basic mode
    // need 'do' version to be executed in any different mode - others even can't
    // be executed in this way

    let promptParts: CommandMode[] = commandMode ? commandMode.getPrecedenceList() : [];

    return (
        <div className="code-box">
            <code className="mode">{generatePrompt(promptParts)}#</code>
            <code>
                {command}
            </code>
            <input type="submit" value="Skopiuj" onClick={() => { copyToClipboard(command) }} />
            {
                needsDoVersion ?
                    <input type="submit" value='"do"' onClick={() => { copyToClipboard("do " + command) }} />
                    : null
            }
        </div>
    )

    function copyToClipboard(text: string): void {

        (navigator as Navigator).clipboard.writeText(text);
    }

    function generatePrompt(promptParts: CommandMode[]): ReactNode {
        return <>
            {commandMode ? "(" : null}
            {
                promptParts.length > 0 ?
                    <a href={"#" + promptParts[0].enterModeHref}>{promptParts[0].prompt}</a>
                    : null
            }
            {
                promptParts.slice(1).map((promptPart) => {
                    return <>-<a href={"#" + promptPart.enterModeHref}>{promptPart.prompt}</a></>
                })
            }
            {commandMode ? ")" : null}
        </>
    }
}