![icon](https://github.com/yiwaki/rel-reverser/blob/main/images/icon.png)

# PlantUML Relationship Reverser

PlantUML Relationship Reverser is a tool for reversing relationships in several diagrams, including class diagrams or ERDs (Entity-Relationship Diagrams) on PlantUML.

## Features

![demo](.images/demo.gif)

Reverse the relationship between the classes as follows.

before: "Class A" "\*" \*--> "1..5" "Class B" : > label\
after: "Class B" "1..5" <--\* "\*" "Class A" : < label

Just place the cursor on the line you want to change and press Ctrl+Shift+/.

Pressing Ctrl+Shift+Alt+/ swaps the only classes or entities while keeping the relationship intact.

before: "Class A" "1" --> "1..5" "Class B" : > label\
after: "Class B" "1..5" --> "1" "Class A" : > label

It supports not only class diagrams but also ERD (Entity Relationship Diagrams), and accommodates the representation of all types of relationships.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release.
