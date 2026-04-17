# PlantUML Relationship Reverser

PlantUML Relationship Reverser is a tool for reversing relationships in several diagrams on PlantUML, including class diagrams, ERDs (Entity-Relationship Diagrams) and the other diagrams.

## Features

![demo](images/demo.gif)

Reverse the relationship between the classes as follows.

"Class A" "\*" \*-[#blue,thickness=2]-> "1..5" "Class B" : > label
⇔
"Class B" "1..5" <-[#blue,thickness=2]-\* "\*" "Class A" : < label

Just place the cursor on the line you want to change and press Ctrl+Shift+/.

Pressing Ctrl+Shift+Alt+/ swaps the only classes or entities while keeping the relationship intact.

"Class A" "1" -up-> "1..5" "Class B" : > label
⇔
"Class B" "1..5" -up-> "1" "Class A" : > label

It supports not only class diagrams but also ERD (Entity Relationship Diagrams), and accommodates the representation of all types of relationships.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release.
