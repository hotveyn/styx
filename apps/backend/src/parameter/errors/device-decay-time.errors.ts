export class DeviceDecayTimeWrongValueError extends Error {
  constructor() {
    super('Device decay time parameter provided by wrong value');
  }
}

export class DeviceDecayTimeNotExistError extends Error {
  constructor() {
    super('Device decay time parameter did not provide');
  }
}
