import { animate, style, transition, trigger } from "@angular/animations";

export const authAnimations = [
    trigger("authSignUpTrigger", [
        transition("void => *", [
            style({
                height: 0,
                opacity: 0,
                transform: "translateY(-46px)",
            }),
            animate(400),
        ]),
        transition("* => void", [
            animate(
                400,
                style({
                    height: 0,
                    opacity: 0,
                    transform: "translateY(-46px)",
                }),
            ),
        ]),
    ]),
    trigger("authErrorTrigger", [
        transition("void => *", [
            style({
                height: 0,
                opacity: 0,
            }),
            animate(400),
        ]),
        transition("* => void", [
            animate(
                400,
                style({
                    height: 0,
                    opacity: 0,
                }),
            ),
        ]),
    ]),
];
