# PlantUML Relationship Reverser

PlantUML Relationship Reverser is a tool for reversing relationships in several diagrams on PlantUML, including class diagrams, ERDs (Entity-Relationship Diagrams) and the other diagrams.

## Features

<img src="https://github.com/yiwaki/rel-reverser/image/demo.gif">

Reverse the relationship between the classes as follows.

"Class A" "\*" \*-[#blue,thickness=2]-> "1..5" "Class B" : > label\
⇔\
"Class B" "1..5" <-[#blue,thickness=2]-\* "\*" "Class A" : < label

Just place the cursor on the line you want to change and press Ctrl+Shift+/.

Pressing Ctrl+Shift+Alt+/ swaps the only classes or entities while keeping the relationship or arrow intact.

"Class A" "1" -up-> "1..5" "Class B" : > label\
⇔\
"Class B" "1..5" -up-> "1" "Class A" : > label

It supports not only class diagrams but also other types of diagrams, such as ERDs (Entity-Relationship Diagrams).
It also supports all types of relationships and arrows supported by PlantUML.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release.
