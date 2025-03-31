# cli-actions-guides generator
Project is done mainly for my classes ;). Provides simple (html/react/json) enviroment to generate single-file html/javascript guides to conduct some cli actions. Output file consists of two parts:
* commands panel - generated commands ouptu based on given [data](#commands-data-structure).
* plan-panel - written by hand html plan 
Main concept is to gather commands on the left panel and refferenced by e.g. html ``<a href>`` tags - clicking on it will scroll the commands panel to the refferenced command.

## Usage
```shell
git clone https://github.com/kodziarz/cli-actions-guides-generator.git
```
```shell
cd cli-actions-guides-generator
```
```shell
npm install
```
Then modify [/src/data/index.json](src/data/index.json) to collect commands and write your plan in HTML/js in [/src/App.tsx](src/App.tsx) in ``<div id="plan-panel">``.
Feel free to refference to hrefs defined in _commands_ in source data.

Then run:
```shell
npm run build
```
Your output HTML file is [/dist/index.html](/dist/index.html).


## Commands data structure (data.json)
Source JSON data structure is declared in [data.ts](src/utils/data.ts) file.

It is assumed, that each _command_ may have its _mode_, which may influence the prompt.

_Commands_ may be groupped in _segments_, which are concept similar to filesystem's folders.

### Main file structure
Very similar to [segment](#segment). The only addition is:
* ``commandModes`` - list of [commans](#command)

#### Relations between objects
So linking objects works in the following way:
* _segments_ may have ``href`` field, which id of their tags.
* _command modes_ have ``enterModeHref``. One can require another with ``promptPrecedent``, wich is ``enterModeHref`` of 'parent' command mode.
* _commands _ may require _command mode_ using their ``enterModeHref`` in the _command's_ ``commandMode`` field.

#### Command mode
* ``enterModeHref`` - id of _segment_, which explains, how to to enter the _mode_. It also id of the _mode_ (used by other objects). The actual _segment_ does not need to be defined in data.
* ``promptPrecedent`` - id (i.e. ``enterModeHref``) of the _command mode_ required to enter the mode - sort of nesting.
* ``promptPart`` - displayed before _command_ part of prompt (the whole 'precedence stack' is shown in prompt).

#### Command
* ``command`` - cli command.
* ``commandMode`` - required _command mode's_ ``enterModeHref`` to execute command.
* ``needsDoVersion`` - in Cisco IOS systems commands from normal mode may be executed in other modes only with proceeded by 'do' command. This parameter enables that - I sad, I needed that for classes ;-). By default its values is true, if no commandMode is defined.

#### Segment
* ``name`` - title of the segment.
* ``href`` - id of the segment (used by other objects).
* ``commands`` - List of _commands_ in the segment.
* ``subsegments`` - List of nested segments.

### Splitting and nesting files
Source data files are stroed in [/src/data](src/data) Splitting source files is supported in the following way:
* file [index.json](src/data/index.json) contains [Main file](#main-file-structure) attributes,
* each file is interpreted as _segment_ data - the file name doesn't matter (only name field in its content is taken into account),
* each folder name is interpreted as _segment_ name and all its contents are sub-_segments_.


BTW thanks for @jaanonim for recommending vite and few tips, how to configure it.