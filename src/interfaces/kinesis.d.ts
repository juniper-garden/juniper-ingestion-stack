export interface KinesisFirehosePayload {
    requestId: String;
    timestamp: number;
    records: KinesisRecordsPayload[]
}


export interface KinesisRecordsPayload {
    data: string;
}