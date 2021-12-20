export interface IReading {
    customer_device_id: string;
    timestamp: any;
    name: string;
    value: string;
    unit: string;
}

export interface IKinesisSensorPayload {
    id: string,
    timestamp: any,
    readings: SensorReading[];
}

interface SensorReading {
    name: string;
    value: string;
    unit: string;
}
