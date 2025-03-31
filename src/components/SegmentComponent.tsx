import CommandComponent from "./CommandComponent";
import { SegmentData } from "../utils/data";

export default function SegmentComponent({ data, level = 1 }: { data: SegmentData, level: number }) {

    return <div id={data.href} className="segment"
        style={{ backgroundColor: `rgb(calc(var(--segment-red-part) * ${1 - (level * 0.2)}), calc(var(--segment-green-part) * ${1 - (level * 0.2)}), calc(var(--segment-blue-part) * ${1 - (level * 0.2)}))` }}>
        <h3>{data.name}</h3>
        {
            data.commands ?
                data.commands.map(commandData => {
                    return <CommandComponent
                        command={commandData.command}
                        commandMode={commandData.commandMode}
                        needsDoVersion={commandData.needsDoVersion} />
                })
                : null
        }
        {
            data.subsegments ?
                data.subsegments.map(segment => {
                    return <SegmentComponent data={segment} level={level + 1} />
                })
                : null
        }
    </div>
}