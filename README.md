# react-native-slot-machine
Text slot machine for react-native is an easy and fully customizable Slot Machine for [React Native](https://facebook.github.io/react-native/) app.

<p align="center">
    <img src="https://user-images.githubusercontent.com/3952700/30516749-919f13e6-9b50-11e7-9e37-c852234e1e58.gif" height="640px" />
</p>

## Usage

```jsx
<View>
    <SlotMachine text={1234} />
    <SlotMachine text="hello" range="abcdefghijklmnopqrstuvwxyz" />
</View>
```
## Props
The following props can be used to modify the slot machine's style and/or behaviour:

| Prop | Type | Opt/Required | Default | Note |
|---|---|---|---|---|
|__`text`__|_String_\|_Number_|Required|`0`| The text the slot machine animates to.
|__`width`__|_Number_|Optional|`37`| The width of each slot.
|__`height`__|_Number_|Optional|`50`| The height of each slot.
|__`padding`__|_Number_|Optional|`4`|minimum number of slots. Added slots will be filled with 'defaultChar'
|__`duration`__|_Number_|Optional|`2000`|The total time of the animation of all the slots.
|__`delay`__|_Number_|Optional|`4`|Time to wait since componentDidMount until animation begins.
|__`slotInterval`__|_Number_|Optional|`500`|The added animation time per slot. last slot animation time = 'duration'.
|__`defaultChar`__|_Number_|Optional|`0`|The default character to be used until animation starts & with 'padding'
|__`range`__|_String_|Optional|`9876543210`|The range of characters to be used when animating the slot machine.
|__`initialAnimation`__|_Boolean_|Optional|`true`|Should initial animation be activated or only subsequent text changes animations
|__`renderTextContent`__|_Function_|Optional|`(char, index, range) => char`|Allows replacing the inner content of the Text element
|__`renderContent`__|_Function_|Optional|`(char, index, range) => char`|Allows replacing the entire Text element with your own implementation
|__`styles`__|_Object_|Optional|`{}`|Allows overriding each of the inner components (container, slotWrapper, slotInner, innerBorder, outerBorder, overlay, text)
|__`useNativeDriver`__|_Boolean_|Optional|`true`|Enable use of NativeDriver on Animation. See https://facebook.github.io/react-native/docs/animations.html#using-the-native-driver

## Methods
#### `spinTo(text)`
Spins the slot machine from current position to the specified text position.

<br />

## Advanced Example

```
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {duration: 4000, slot1: 1234, slot2: 'hello', slot3: '2351'};
    }

    componentDidMount() {
        setTimeout(() => this.setState({duration: 1000, slot1: '4321', slot2: 'world', slot3: '1234'}), 5000);
        setTimeout(() => this.setState({duration: 4000, slot1: '1234', slot2: 'hello', slot3: '2351'}), 7000);
        setTimeout(() => this.refs.slot.spinTo('prize'), 12000);
    }
    render() {
        const symbols = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌']; // can't use emojies in SlotMachine because some of them are comprised of 2 chars
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height: 200, justifyContent: 'space-between', alignItems: 'center'}}>
                    <SlotMachine text={this.state.slot1} duration={this.state.duration} />
                    <SlotMachine
                        text={this.state.slot2}
                        range="abcdefghijklmnopqrstuvwxyz"
                        width={45} duration={this.state.duration}
                        ref="slot"
                    />
                    <SlotMachine text={this.state.slot3} range="012345" renderContent={c => <Text style={{fontSize: 25}}>{symbols[c]}</Text>} duration={this.state.duration} />
                </View>
            </View>
        );
    }
}
```
