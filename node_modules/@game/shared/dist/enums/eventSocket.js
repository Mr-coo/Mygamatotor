export var EventSocket;
(function (EventSocket) {
    EventSocket[EventSocket["POSITION"] = 0] = "POSITION";
    EventSocket[EventSocket["INPUT"] = 1] = "INPUT";
    EventSocket[EventSocket["CONNECTED"] = 2] = "CONNECTED";
    EventSocket[EventSocket["DISCONNECTED"] = 3] = "DISCONNECTED";
    EventSocket[EventSocket["CREATE_ENTITY"] = 4] = "CREATE_ENTITY";
    EventSocket[EventSocket["REMOVE_ENTITY"] = 5] = "REMOVE_ENTITY";
})(EventSocket || (EventSocket = {}));
