import './App.css'
import CommandComponent from "./components/CommandComponent";
import { CommandDescriptionsData } from './utils/data';
import SegmentComponent from './components/SegmentComponent';
import { getCommandDescriptions } from './utils/CommandDescriptionsLoader';

function App() {

  const commandDescriptionsData: CommandDescriptionsData = getCommandDescriptions();

  return (
    <>
      <div id="commands-panel">
        {commandDescriptionsData.commands.map(command =>
          <CommandComponent command={command.command} commandMode={command.commandMode} needsDoVersion={command.needsDoVersion} />
        )}
        {commandDescriptionsData.subsegments.reverse().map(segment =>
          <SegmentComponent data={segment} level={1} />
        )}
      </div>
      <div id="plan-panel">
        <a href="#anchortest">link</a>
      </div>
    </>
  )
}

export default App
