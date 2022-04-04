// Determines what card to play
const clocks = new Map<string, number>();

const newClock = (lobby: string) => {
    clocks.set(lobby, 0);
};

const getClock = (lobby: string) => {
    const clock = clocks.get(lobby);

    if (clock === undefined) return undefined;

    return clock;
};

const incrementClock = (lobby: string) => {
    let clock = clocks.get(lobby);
    if (clock === undefined) {
        return;
    }
    clock += 1;
    clocks.set(lobby, clock);
};

const deleteClock = (lobby: string) => {
    clocks.delete(lobby);
};
export { newClock, getClock, incrementClock, deleteClock };
