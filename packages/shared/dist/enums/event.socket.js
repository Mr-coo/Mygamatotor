export var EventSocket;
(function (EventSocket) {
    EventSocket[EventSocket["PositionSnapshot"] = 0] = "PositionSnapshot";
    EventSocket[EventSocket["Input"] = 1] = "Input";
    EventSocket[EventSocket["Connected"] = 2] = "Connected";
    EventSocket[EventSocket["Disconnected"] = 3] = "Disconnected";
    EventSocket[EventSocket["FoodCreated"] = 4] = "FoodCreated";
})(EventSocket || (EventSocket = {}));
