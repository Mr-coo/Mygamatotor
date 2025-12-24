export interface InputCommand {
    seq: number;
    tick: number;
    moveX: number;
    moveY: number;
    actions?: {
        attack?: boolean;
        jump?: boolean;
    };
}
