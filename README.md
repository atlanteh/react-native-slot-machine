# react-native-slot-machine
Text slot machine for react-native is an easy and fully customizable Slot Machine for [React Native](https://facebook.github.io/react-native/) app.

<p align="center">
    <img src="https://cloud.githubusercontent.com/assets/3952700/22622958/12e1d046-eb53-11e6-913f-a1b234485136.gif" height="640px" />
</p>

## Props
The following props can be used to modify the slot machine's style and/or behaviour:

| Prop | Type | Opt/Required | Default | Note |
|---|---|---|---|---|
|__`text`__|_String_\|_Number_|Required|`0`| The text the slot machine animates to.
|__`width`__|_Number_|Optional|`37`| The width of each slot.
|__`height`__|_Number_|Optional|`50`| The height of each slot.
|__`padding`__|_Number_|Optional|`4`|minimum number of slots. Added slots will be filled with 'defaultChar'
|__`duration`__|_Number_|Optional|`4`|The total time of the animation of all the slots.
|__`delay`__|_Number_|Optional|`4`|Time to wait since componentDidMount until animation begins.
|__`slotInterval`__|_Number_|Optional|`500`|The added animation time per slot. last slot animation time = 'duration'.
|__`defaultChar`__|_Number_|Optional|`0`|The default character to be used until animation starts & with 'padding'
|__`range`__|_String_|Optional|`9876543210`|The range of characters to be used when animating the slot machine.
|__`initialAnimation`__|_Boolean_|Optional|`true`|Should initial animation be activated or only subsequent text changes animations 
|__`styles`__|_Object_|Optional|`{}`|Allows overriding each of the inner components (container, slotWrapper, slotInner, innerBorder, outerBorder, overlay, text)
