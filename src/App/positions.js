const positions = {
    "GK": {
        name: "Goalkeeper",
        penalties: {
            low: [],
            medium: [],
            high: [
                "LWB", "LB", "CB", "RB", "RWB",
                "LF", "CF", "RF", "ST",
                "LM", "LW", "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "LWB": {
        name: "Left wing back",
        penalties: {
            low: ["CB", "LM", "RB", "RWB"],
            medium: ["LW"],
            high: [
                "GK",
                "LF", "CF", "RF", "ST",
                "LM", "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "LB": {
        name: "Left back",
        penalties: {
            low: ["CB", "LM", "RB", "RWB"],
            medium: [],
            high: [
                "GK",
                "LF", "CF", "RF", "ST",
                "LM", "LW", "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "CB": {
        name: "Centre back",
        penalties: {
            low: ["LB", "RB", "CDM"],
            medium: ["CM", "LWB", "RWB"],
            high: [
                "GK",
                "LF", "CF", "RF", "ST",
                "LM", "LW", "CAM", "RM", "RW"
            ],
        }
    },
    "RWB": {
        name: "Right wing back",
        penalties: {
            low: ["CB", "RM", "LB", "LWB"],
            medium: ["RW"],
            high: [
                "GK",
                "LF", "CF", "RF", "ST",
                "LM", "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "RB": {
        name: "Right back",
        penalties: {
            low: ["CB", "RM", "LB", "LWB"],
            medium: [],
            high: [
                "GK",
                "LF", "CF", "RF", "ST",
                "LM", "LW", "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "LF": {
        name: "Left forward",
        penalties: {
            low: ["RF", "ST", "LM", "LW"],
            medium: ["CF"],
            high: [
                "GK",
                "LWB", "LB", "CB", "RB", "RWB",
                "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "CF": {
        name: "Centre forward",
        penalties: {
            low: ["ST", "LF", "RF", "CAM"],
            medium: ["CM"],
            high: [
                "GK",
                "LWB", "LB", "CB", "RB", "RWB",
                "LM", "LW", "CDM", "RM", "RW"
            ],
        }
    },
    "RF": {
        name: "Right forward",
        penalties: {
            low: ["LF", "ST", "RM", "RW"],
            medium: ["CF"],
            high: [
                "GK",
                "LWB", "LB", "CB", "RB", "RWB",
                "CAM", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "ST": {
        name: "Striker",
        penalties: {
            low: ["CF", "LF", "RF", "CAM"],
            medium: [],
            high: [
                "GK",
                "LWB", "LB", "CB", "RB", "RWB",
                "LM", "LW", "CM", "CDM", "RM", "RW"
            ],
        }
    },
    "LM": {
        name: "Left midfielder",
        penalties: {
            low: ["LW", "LF", "RM"],
            medium: ["CAM", "CM", "RW"],
            high: [
                "GK",
                "LWB", "CB", "RB", "RWB",
                "CF", "RF", "ST",
                "CDM"
            ],
        }
    },
    "LW": {
        name: "Left wing",
        penalties: {
            low: ["LF", "LM", "RW"],
            medium: ["CAM", "CM", "RM"],
            high: [
                "GK",
                "LWB", "CB", "RB", "RWB",
                "CF", "RF", "ST",
                "CDM"
            ],
        }
    },
    "CAM": {
        name: "Centre attacking midfielder",
        penalties: {
            low: ["ST", "CA"],
            medium: ["CM"],
            high: [
                "GK",
                "LWB", "LB", "CB", "RB", "RWB",
                "LF", "RF",
                "LM", "LW", "CDM", "RM", "RW"
            ],
        }
    },
    "CM": {
        name: "Centre midfielder",
        penalties: {
            low: ["CAM", "CDM"],
            medium: ["CA", "LM", "RM"],
            high: [
                "GK",
                "LWB", "LB", "CB", "RB", "RWB",
                "LF", "RF", "ST",
                "LW", "RW"
            ],
        }
    },
    "CDM": {
        name: "Centre defensive midfielder",
        penalties: {
            low: ["CM", "CB"],
            medium: ["CM", "LM", "RM"],
            high: [
                "GK",
                "LWB", "LB", "RB", "RWB",
                "LF", "RF", "ST", "CA",
                "LW", "RW"
            ],
        }
    },
    "RM": {
        name: "Right midfielder",
        penalties: {
            low: ["RW", "RF", "LM"],
            medium: ["CAM", "CM", "LW"],
            high: [
                "GK",
                "LWB", "CB", "RB", "RWB",
                "CF", "LF", "ST",
                "CDM"
            ],
        }
    },
    "RW": {
        name: "Right wing",
        penalties: {
            low: ["RF", "RM", "LW"],
            medium: ["CAM", "CM", "LM"],
            high: [
                "GK",
                "LWB", "CB", "RB", "RWB",
                "CF", "LF", "ST",
                "CDM"
            ],
        }
    },
};

export default positions;