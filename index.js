import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    slotWrapper: {
        backgroundColor: 'gray',
        marginLeft: 5,
    },
    slotInner: {
        backgroundColor: 'black',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    text: {
        fontSize: 55,
        top: -2,
        fontWeight: 'bold',
        color: '#b5b7ba',
    },
    innerBorder: {
        position: 'absolute',
        top: 1,
        right: 1,
        left: 1,
        bottom: 1,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    outerBorder: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        borderColor: '#989898',
        borderWidth: 1,
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: '#ffffff77'
    }
});

export default class SlotMachine extends Component {

    static get defaultProps() {
        return {
            text: 0,
            width: 37,
            height: 50,
            padding: 4,
            duration: 2000,
            delay: 0,
            stopDelay: 500,
            defaultChar: '0',
            range: '9876543210',
            initialAnimation: true,
            styles: {}
        };
    }

    constructor(props) {
        super(props);
        this.renderSlot = this.renderSlot.bind(this);
        this.startInitialAnimation = this.startInitialAnimation.bind(this);

        let values;
        if (props.initialAnimation) {
            values = this.getInitialSlotsValues(props);
        } else {
            values = this.getAlignedValues(props).map(val => new Animated.Value(val));
        }
        this.state = {values, initialAnimation: false};
    }

    componentDidMount() {
        const {delay, initialAnimation} = this.props;
        if (!initialAnimation) {
            return;
        }
        setTimeout(this.startInitialAnimation, delay);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.text === this.props.text) {
            return;
        }

        const {range} = newProps;
        const easing = Easing.inOut(Easing.ease);
        const paddedStr = this.getPaddedString(newProps);
        const newValues = this.getAdjustedAnimationValues(newProps);

        this.setState({values: newValues}, () => {
            const newAnimations = paddedStr.split('').map((char, i) => {
                const index = range.indexOf(char);
                const animationValue = -1 * (index) * newProps.height;
                return Animated.timing(this.state.values[i], {toValue: animationValue, duration: 1000, easing});
            });
            Animated.parallel(newAnimations).start();
        });
    }

    getAdjustedAnimationValues(props) {
        const {values} = this.state;
        const paddedStr = this.getPaddedString(props);
        let neededValues = paddedStr.length - values.length;

        if (neededValues <= 0) {
            return values;
        }

        const defaultIndex = props.range.indexOf(props.defaultChar);
        const defaultPosition = this.getPosition(defaultIndex, props);
        const newValues = [...values];

        while (neededValues--) {
            newValues.unshift(new Animated.Value(defaultPosition));
        }

        return newValues;
    }

    getPosition(index, props = this.props) {
        const position = -1 * (index) * props.height;
        return position;
    }

    getAlignedValues(props) {
        const paddedStr = this.getPaddedString();
        const {range} = props;

        const values = paddedStr.split('').map((char) => {
            const index = range.indexOf(char);
            const animationValue = this.getPosition(index, props);
            return animationValue;
        });

        return values;
    }

    getInitialSlotsValues(props) {
        const values = [];
        const strNum = String(props.text);
        const animationValue = this.getPosition(props.range.length - 1, props);

        let slotCount = Math.max(props.padding, strNum.length);
        while (slotCount--) {
            values.push(new Animated.Value(animationValue));
        }

        return values;
    }

    getPaddedString(props = this.props) {
        const {text, padding, defaultChar} = props;

        let paddedText = String(text);
        let neededPadding = Math.max(0, padding - paddedText.length);
        while ((neededPadding--) > 0) {
            paddedText = `${defaultChar}${paddedText}`;
        }

        return paddedText;
    }

    generateSlots() {
        const paddedStr = this.getPaddedString();
        const elements = paddedStr.split('').map(this.renderSlot);
        return elements;
    }

    startInitialAnimation() {
        const {values} = this.state;
        const {duration, stopDelay} = this.props;
        const easing = Easing.inOut(Easing.ease);

        const animations = values.map((value, i) => {
            const animationDuration = duration - (values.length - 1 - i) * stopDelay;
            return Animated.timing(value, {toValue: 0, duration: animationDuration, easing});
        });

        Animated.parallel(animations).start(() => {
            const newValues = this.getAlignedValues(this.props);
            newValues.forEach((value, i) => values[i].setValue(value));
            this.setState({initialAnimation: false});
        });

        this.setState({initialAnimation: true});
    }

    renderSlot(charToShow, position) {
        const {range, styles: overrideStyles, height, width} = this.props;
        const {initialAnimation, values} = this.state;
        const charToShowIndex = range.indexOf(charToShow);

        const slots = range.split('').map((num, i) => {
            let currentChar = num;
            if (initialAnimation) {
                const currentIndex = (i + charToShowIndex) % range.length;
                currentChar = range[currentIndex];
            }

            return (
                <Animated.View
                    key={i}
                    style={[styles.slotInner, {height}, overrideStyles.slotInner, {top: values[position]}]}
                >
                    <Text style={[styles.text, overrideStyles.text]}>{currentChar}</Text>
                </Animated.View>
            );
        });

        return (
            <View style={[styles.slotWrapper, {height, width}, overrideStyles.slotWrapper]}>
                {slots}
                <View style={[styles.innerBorder, overrideStyles.innerBorder]} />
                <View style={[styles.outerBorder, overrideStyles.outerBorder]} />
                <View style={[styles.overlay, {bottom: height / 1.6}, overrideStyles.overlay]} />
            </View>
        );
    }

    render() {
        const slots = this.generateSlots();
        return (
            <View style={[styles.container, this.props.styles.container]}>
                {slots}
            </View>
        );
    }
}
